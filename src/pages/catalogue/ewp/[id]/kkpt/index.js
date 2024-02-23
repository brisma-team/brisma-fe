import React, { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  ButtonIcon,
  Card,
  CustomPagination,
  TableField,
  TooltipField,
} from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { useKKPTList } from "@/data/catalog";
import { IconClose, IconPlus } from "@/components/icons";
import Textfield from "@atlaskit/textfield";
import { ProjectInfo } from "@/components/molecules/catalog";
import { BranchSelect, PekerjaSelect } from "@/components/molecules/commons";
import shortenWord from "@/helpers/shortenWord";

const index = () => {
  const router = useRouter();

  const [kkpt, setKKPT] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    kkpttitle: "",
    uker: "",
    activity: "",
    subactivity: "",
    submajor: "",
    riskissue: "",
    auditor: undefined,
    limit: 5,
  });
  const [ukerSelect, setUkerSelect] = useState({
    branch_kode: "",
    branch_name: "",
  });
  const [auditorSelect, setAuditorSelect] = useState({
    pn: "",
    name: "",
    jabatan: "",
  });

  const [selectedValueBranch, setSelectedValueBranch] = useState(null);
  const [selectedValueAuditor, setSelectedValueAuditor] = useState(null);

  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
    });
  }, [router.isReady]);

  const handleBranchChange = useCallback((val) => {
    setUkerSelect({
      ...ukerSelect,
      branch_kode: String(val.branch_kode),
      branch_name: String(val.branch_name),
    });
    setSelectedValueBranch({
      label: `${val.branch_kode} - ${val.branch_name}`,
      value: {
        branch_kode: val.branch_kode,
        branch_name: val.branch_name,
      },
    });
    setCurrentPage(1);
  }, []);

  const handleAuditorChange = useCallback((val) => {
    setAuditorSelect({
      ...auditorSelect,
      pn: String(val.pn),
      name: String(val.name),
      jabatan: String(val.jabatan),
    });
    setSelectedValueAuditor({
      label: `${val.pn} - ${val.name}`,
      value: {
        pn: val.pn,
        name: val.name,
        jabatan: val.jabatan,
      },
    });
    setCurrentPage(1);
  }, []);

  const handleResetBranch = useCallback(async () => {
    setUkerSelect({
      branch_kode: "",
      branch_name: "",
    });
    setSelectedValueBranch(null);
    setCurrentPage(1);
  }, []);

  const handleResetAuditor = useCallback(async () => {
    setAuditorSelect({
      pn: "",
      name: "",
      jabatan: "",
    });
    setSelectedValueAuditor(null);
    setCurrentPage(1);
  }, []);

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.uri },
    { name: "Riwayat KKPT", path: "/catalogue/ewp/" + params.uri + "/kkpt" },
  ];

  const { kkptList } = useKKPTList(
    params.year,
    params.type,
    params.id,
    currentPage,
    filter.limit,
    filter.kkpttitle,
    ukerSelect.branch_kode,
    filter.activity,
    filter.subactivity,
    filter.submajor,
    filter.riskissue,
    auditorSelect.pn
  );
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  const debouncedHandleChange = debounce((e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1);
  }, 500); // Adjust the delay (in milliseconds) as needed
  useEffect(() => {
    if (kkptList != undefined) {
      setTotalData(kkptList.data.total_data);
      const mappingKKPT = kkptList.data.kkpt_list.map((data, key) => {
        return {
          No: (currentPage - 1) * 5 + key + 1,
          "Judul KKPT": (
            <TooltipField
              textButton={
                <p className="hover:text-blue-800 hover:underline">
                  {shortenWord(data.KKPTTitle, 0, 30)}
                </p>
              }
              content={data.KKPTTitle}
              isLink={false}
              isText={false}
            />
          ),
          "Unit Kerja": data.BranchName,
          Aktivitas: data.Activity,
          "Sub Aktivitas": data.SubActivity,
          "Sub Major": data.SubMajorCode + " - " + data.SubMajor,
          "Risk Issue": (
            <TooltipField
              textButton={
                <p className="hover:text-blue-800 hover:underline">
                  {data.RiskIssueCode +
                    " - " +
                    shortenWord(data.RiskIssueName, 0, 30)}
                </p>
              }
              content={data.RiskIssueCode + " - " + data.RiskIssueName}
              isLink={false}
              isText={false}
            />
          ),
          Auditor:
            params.type == "2"
              ? data.Auditor.pn +
                " - " +
                (data?.Auditor?.name ? data.Auditor.name : data.Auditor.nama)
              : data.PICAuditorPN + " - " + data.PICAuditorName,
          Aksi: (
            <div className="text-center col-span-3">
              <div className="">
                <Button
                  href={"/catalogue/ewp/" + params.uri + "/kkpt/" + data.KKPTID}
                  shouldFitContainer
                  appearance="primary"
                >
                  Lihat Dokumen
                </Button>
              </div>
            </div>
          ),
        };
      });
      setKKPT(mappingKKPT);
    }
  }, [kkptList]);
  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Riwayat Dokumen KKPT</div>
          </div>
        </div>
        {/* Start Filter */}
        <div className="my-3 w-40">
          <Button
            appearance="primary"
            iconBefore={IconPlus}
            shouldFitContainer
            onClick={() => setShowFilter(!showFilter)}
          >
            Tampilkan Filter
          </Button>
        </div>
        {showFilter && (
          <div className="flex justify-between w-[49rem]">
            <Card>
              <div className="flex p-2">
                <div className="w-48">
                  <Textfield
                    placeholder="Judul KKPT"
                    className="mx-1"
                    name="kkpttitle"
                    onChange={debouncedHandleChange}
                  />
                </div>
                <div className="w-48">
                  <BranchSelect
                    placeholder={"Unit Kerja"}
                    className={"mx-1"}
                    selectedValue={selectedValueBranch}
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={handleResetBranch}
                      />
                    }
                    handleChange={(e) => handleBranchChange(e.value)}
                  />
                </div>
                <div className="w-48">
                  <Textfield
                    placeholder="Aktivitas"
                    className="mx-1"
                    name="activity"
                    onChange={debouncedHandleChange}
                  />
                </div>
                <div className="w-48">
                  <Textfield
                    placeholder="Sub Aktivitas"
                    className="mx-1"
                    name="subactivity"
                    onChange={debouncedHandleChange}
                  />
                </div>
              </div>
              <div className="flex p-2">
                <div className="w-48">
                  <Textfield
                    placeholder="Sub Major"
                    className="mx-1"
                    name="submajor"
                    onChange={debouncedHandleChange}
                  />
                </div>
                <div className="w-48">
                  <Textfield
                    placeholder="Risk Issue"
                    className="mx-1"
                    name="riskissue"
                    onChange={debouncedHandleChange}
                  />
                </div>
                <div className="w-48">
                  <PekerjaSelect
                    placeholder={"Auditor"}
                    className={"mx-1"}
                    selectedValue={selectedValueAuditor}
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={handleResetAuditor}
                      />
                    }
                    handleChange={(e) => handleAuditorChange(e.value)}
                  />
                </div>
                <div className="w-48"></div>
              </div>
            </Card>
          </div>
        )}
        {/* End Filter */}
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <Link
                className="pl-5 underline"
                target="_blank"
                href={{
                  pathname: "/catalogue/ewp/" + params.uri + "/kkpt/view-all",
                  query: {
                    kkpttitle: filter.kkpttitle,
                    uker: ukerSelect.branch_kode,
                    activity: filter.activity,
                    subactivity: filter.subactivity,
                    submajor: filter.submajor,
                    riskissue: filter.riskissue,
                    auditor: auditorSelect.pn,
                  },
                }}
              >
                Lihat Seluruh Dokumen
              </Link>
              <div className="max-h-[35rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Judul KKPT",
                    "Unit Kerja",
                    "Aktivitas",
                    "Sub Aktivitas",
                    "Sub Major",
                    "Risk Issue",
                    "Auditor",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "5%",
                    "14%",
                    "12%",
                    "12%",
                    "14%",
                    "14%",
                    "12%",
                    "12%",
                    "5%",
                  ]}
                  items={kkpt}
                />
              </div>
              <div className="flex justify-center mt-5">
                <CustomPagination
                  defaultCurrentPage={1}
                  perPage={5}
                  totalData={totalData}
                  handleSetPagination={async (start, end, pageNow) =>
                    setCurrentPage(pageNow)
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

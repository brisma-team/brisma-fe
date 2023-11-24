import React, { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  ButtonIcon,
  Card,
  Pagination,
  TableField,
} from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { useKKPTList } from "@/data/catalog";
import { IconClose, IconPlus } from "@/components/icons";
import Textfield from "@atlaskit/textfield";
import { ProjectInfo } from "@/components/molecules/catalog";
import { BranchSelect } from "@/components/molecules/commons";

const index = () => {
  const router = useRouter();

  const [kkpt, setKKPT] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
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
  const [ukerSelect, setUkerSelect] = useState("");

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
    setUkerSelect(String(val.branch_kode));
  }, []);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
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
    ukerSelect,
    filter.activity,
    filter.subactivity,
    filter.submajor,
    filter.riskissue,
    filter.auditor
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
  }, 500); // Adjust the delay (in milliseconds) as needed

  useEffect(() => {
    if (kkptList != undefined) {
      setTotalPages(kkptList.data.total_page);
      const mappingKKPT = kkptList.data.kkpt_list.map((data, key) => {
        return {
          No: (currentPage - 1) * 5 + key + 1,
          "Judul KKPT": data.KKPTTitle,
          "Unit Kerja": data.BranchName,
          Aktivitas: data.Activity,
          "Sub Aktivitas": data.SubActivity,
          "Sub Major": data.SubMajorCode + " - " + data.SubMajor,
          "Risk Issue": data.RiskIssueCode + " - " + data.RiskIssueName,
          Auditor:
            params.type == "2"
              ? data.Auditor.pn + " - " + data.Auditor.name
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
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-48">
                  <BranchSelect
                    placeholder={"Unit Kerja"}
                    className={"mx-1"}
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={() => handleBranchChange("")}
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
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-48">
                  <Textfield
                    placeholder="Sub Aktivitas"
                    className="mx-1"
                    name="subactivity"
                    onChange={debouncedHandleChange}
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
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
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-48">
                  <Textfield
                    placeholder="Risk Issue"
                    className="mx-1"
                    name="riskissue"
                    onChange={debouncedHandleChange}
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-48">
                  <Textfield
                    placeholder="Auditor"
                    className="mx-1"
                    name="auditor"
                    onChange={debouncedHandleChange}
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
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
                    uker: ukerSelect,
                    activity: filter.activity,
                    subactivity: filter.subactivity,
                    submajor: filter.submajor,
                    riskissue: filter.riskissue,
                    auditor: filter.auditor,
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
                    "2rem",
                    "16rem",
                    "10rem",
                    "10rem",
                    "10rem",
                    "15rem",
                    "20rem",
                    "10rem",
                    "4rem",
                  ]}
                  items={kkpt}
                />
              </div>
              <div className="flex justify-center mt-5">
                <Pagination
                  pages={totalPages}
                  setCurrentPage={setCurrentPage}
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

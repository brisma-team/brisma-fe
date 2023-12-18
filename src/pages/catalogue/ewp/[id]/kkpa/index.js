import React, { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  Card,
  TableField,
  TooltipField,
  ButtonIcon,
  CustomPagination,
} from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { useKKPAList } from "@/data/catalog";

import { IconClose, IconPlus } from "@/components/icons";
import Textfield from "@atlaskit/textfield";
import { ProjectInfo } from "@/components/molecules/catalog";
import shortenWord from "@/helpers/shortenWord";
import { PekerjaSelect } from "@/components/molecules/commons";

const index = () => {
  const router = useRouter();

  const [kkpa, setKKPA] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [auditorSelect, setAuditorSelect] = useState({
    pn: "",
    name: "",
    jabatan: "",
  });
  const [selectedValueAuditor, setSelectedValueAuditor] = useState(null);

  const [filter, setFilter] = useState({
    activity: "",
    subactivity: "",
    submajor: "",
    riskissue: "",
    auditor: "",
    limit: 5,
  });
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

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.uri },
    { name: "Riwayat KKPA", path: "/catalogue/ewp/" + params.uri + "/kkpa" },
  ];

  const { kkpaList } = useKKPAList(
    params.year,
    params.type,
    params.id,
    currentPage,
    filter.limit,
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

  const handleResetAuditor = useCallback(async () => {
    setAuditorSelect({
      pn: "",
      name: "",
      jabatan: "",
    });
    setSelectedValueAuditor(null);
    setCurrentPage(1);
  }, []);
  useEffect(() => {
    if (kkpaList != undefined) {
      setTotalData(kkpaList.data.total_data);
      const mappingKKPA = kkpaList.data.kkpa_list.map((data, key) => {
        return {
          No: (currentPage - 1) * 5 + key + 1,
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
              ? data.Auditor.pn + " - " + data.Auditor.name
              : data.PICAuditorPN + " - " + data.PICAuditorName,
          Aksi: (
            <div className="text-center col-span-3">
              <div className="">
                <Button
                  href={"/catalogue/ewp/" + params.uri + "/kkpa/" + data.KKPAID}
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
      setKKPA(mappingKKPA);
    }
  }, [kkpaList]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Riwayat Dokumen KKPA</div>
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
          <div className="flex justify-between w-[38rem]">
            <Card>
              <div className="flex p-2">
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
                <div className="w-48">
                  <Textfield
                    placeholder="Sub Major"
                    className="mx-1"
                    name="submajor"
                    onChange={debouncedHandleChange}
                  />
                </div>
              </div>
              <div className="flex p-2">
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
                  pathname: "/catalogue/ewp/" + params.uri + "/kkpa/view-all",
                  query: {
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
              <div className="max-h-[29rem] overflow-y-scroll mb-5">
                <TableField
                  headers={[
                    "No",
                    "Aktivitas",
                    "Sub Aktivitas",
                    "Sub Major",
                    "Risk Issue",
                    "Auditor",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "5%",
                    "10%",
                    "15%",
                    "20%",
                    "18%",
                    "17%",
                    "15%",
                  ]}
                  items={kkpa}
                />
              </div>
              <div className="flex justify-center mt-5">
                <CustomPagination
                  defaultCurrentPage={currentPage}
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

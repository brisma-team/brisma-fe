import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField, Pagination } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
// import Link from "next/link";
import { useKKPAList } from "@/data/catalog";

import { IconClose, IconPlus } from "@/components/icons";
import Textfield from "@atlaskit/textfield";
import { ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [kkpa, setKKPA] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    subactivity: "",
    submajor: "",
    riskissue: "",
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
    { name: "Menu", path: "/dashboard" },
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
    filter.subactivity,
    filter.submajor,
    filter.riskissue
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
    if (kkpaList != undefined) {
      const mappingKKPA = kkpaList.data.kkpa_list.map((data, key) => {
        setTotalPages(kkpaList.data.total_page);
        return {
          No: key + 1,
          Aktivitas: data.Activity,
          "Sub Aktivitas": data.SubActivity,
          "Sub Major": data.SubMajorCode + " - " + data.SubMajor,
          "Risk Issue": data.RiskIssueCode,
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
          <div className="flex justify-between w-96">
            <Card>
              <div className="flex p-2">
                <div className="w-1/2">
                  <Textfield
                    placeholder="Sub Aktivitas"
                    className="ml-1"
                    name="subactivity"
                    onChange={debouncedHandleChange}
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Textfield
                    placeholder="Risk Issue"
                    className="ml-1"
                    name="riskissue"
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
                <div className="w-1/2">
                  <Textfield
                    placeholder="Sub Major Name"
                    className="mr-1"
                    name="submajor"
                    onChange={debouncedHandleChange}
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Textfield
                    placeholder="Risk Issue"
                    className="ml-1"
                    name="riskissue"
                    onChange={debouncedHandleChange}
                    elemAfterInput={
                      <button className="justify-center">
                        <IconClose size="large" />
                      </button>
                    }
                  />
                </div>
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
                  columnWidths={["5%", "8%", "20%", "25%", "10%", "17%", "15%"]}
                  items={kkpa}
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

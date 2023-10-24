import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField, Pagination } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { useKKPAList } from "@/data/catalog";

const index = () => {
  const id = useRouter().query.id;

  const [kkpa, setKKPA] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  const idToUse = selectedId ? selectedId : "";

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + selectedId },
    { name: "Riwayat KKPA", path: "/catalogue/ewp/" + selectedId + "/kkpa" },
  ];

  const { kkpaList } = useKKPAList(
    idToUse.split("x1c-")[2],
    idToUse.split("x1c-")[0],
    idToUse.split("x1c-")[1],
    currentPage
  );

  useEffect(() => {
    if (kkpaList != undefined) {
      const mappingKKPA = kkpaList.data.kkpa_list.map((data, key) => {
        setTotalPages(kkpaList.data.total_page);
        console.log(data);
        return {
          No: key + 1,
          Aktivitas: data.Activity,
          "Sub Aktivitas": data.SubActivity,
          "Sub Major": data.SubMajorCode + " - " + data.SubMajor,
          "Risk Issue": data.RiskIssueCode,
          Auditor: data.PICAuditorPN + " - " + data.PICAuditorName,
          Aksi: (
            <div className="text-center col-span-3">
              <div className="">
                <Button
                  href={"/catalogue/ewp/" + selectedId + "/kkpa/" + data.KKPAID}
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
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <Link className="pl-5 underline" href={"#"}>
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

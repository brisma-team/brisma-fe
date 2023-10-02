import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { TableField } from "@/components/atoms";
import useCatalogEWPKKPTList from "@/data/catalog/useCatalogEWPKKPTList";
import Link from "next/link";

const index = () => {
  const id = useRouter().query.id;

  const [kkpt, setKKPT] = useState([]);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Detail", path: "/catalogue/ewp/" + id },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + id },
  ];

  const idToUse = id ? id : "";
  const { kkptList } = useCatalogEWPKKPTList(
    idToUse.split("x1c-")[2],
    idToUse.split("x1c-")[0],
    idToUse.split("x1c-")[1]
  );

  useEffect(() => {
    if (kkptList != undefined) {
      const mappingKKPT = kkptList.data.kkpt_list.map((data, key) => {
        return {
          No: key + 1,
          "Judul KKPT": data.KKPTTitle,
          Aktivitas: data.Activity,
          "Sub Aktivitas": data.SubActivity,
          "Sub Major": data.SubMajorCode + " - " + data.SubMajor,
          "Risk Issue": data.RiskIssueCode,
          Auditor: data.PICAuditorPN + " - " + data.PICAuditorName,
          Aksi: (
            <div className="text-center col-span-3">
              <div className="">
                <Button
                  href={"/catalogue/ewp/" + id + "/kkpt/" + data.KKPTID}
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
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <Link className="pl-5 underline" href={"#"}>
                Lihat Seluruh Dokumen
              </Link>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "Judul KKPT",
                    "Aktivitas",
                    "Sub Aktivitas",
                    "Sub Major",
                    "Risk Issue",
                    "Auditor",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "3%",
                    "20%",
                    "8%",
                    "12%",
                    "20%",
                    "10%",
                    "15%",
                    "12%",
                  ]}
                  items={kkpt}
                />
              </div>
              {/* <div className="flex justify-center mt-5">
                <Pagination pages={1} setCurrentPage={setCurrentPage} />
              </div> */}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { TableField } from "@/components/atoms";
import useCatalogEWPKKPAById from "@/data/catalog/useCatalogEWPKKPAById";

const index = () => {
  const auditprojectid = useRouter().query.id;
  const kkpaid = useRouter().query.detail;

  const [kkpa, setKKPA] = useState([]);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Detail", path: "/catalogue/ewp/" + auditprojectid },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + auditprojectid },
  ];
  const idToUse = auditprojectid ? auditprojectid : "";
  const kkpaidx = kkpaid ? kkpaid : "";

  const { kkpaDetail } = useCatalogEWPKKPAById(
    idToUse.split("x1c-")[2],
    idToUse.split("x1c-")[0],
    kkpaidx
  );

  useEffect(() => {
    if (kkpaDetail != undefined) {
      const mappingKKPA = kkpaDetail.data.map((data, key) => {
        const datePart = data?.CreatedAt.split(".")[0];
        return {
          No: key + 1,
          "Nama Dokumen": data.DocumentName,
          "Tanggal Dibuat": datePart,
          Aksi: (
            <div className="text-center col-span-3">
              <div className="">
                <Button shouldFitContainer isDisabled appearance="primary">
                  Lihat Dokumen
                </Button>
              </div>
            </div>
          ),
        };
      });
      setKKPA(mappingKKPA);
    }
  }, [kkpaDetail]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">
              Riwayat Dokumen KKPA Attachment
            </div>
          </div>
        </div>
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Nama Dokumen", "Tanggal Dibuat", "Aksi"]}
                  columnWidths={["5%", "35%", "30%", "30%"]}
                  items={kkpa}
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

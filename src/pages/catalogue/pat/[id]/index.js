import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { TableField } from "@/components/atoms";

const index = () => {
  const { id } = useRouter().query;

  const [typeList, setTypeList] = useState([]);
  const [selectedId, setSelectedId] = useState(id || "");

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
    { name: "Daftar Dokumen", path: "/catalogue/pat/" + selectedId },
  ];
  const type_list = [
    {
      jenis: "Overview",
      jumlah: "-----",
      url: `${selectedId}/overview`,
      isDisabled: false,
    },
    {
      jenis: "Addendum PAT",
      jumlah: "-----",
      url: `${selectedId}/addendum-pat`,
      isDisabled: true,
    },
  ];

  useEffect(() => {
    if (type_list) {
      const mappingTypeList = type_list.map((data, key) => {
        return {
          No: key + 1,
          "Jenis Dokumen": data.jenis,
          "Jumlah Dokumen": data.jumlah,
          Aksi: (
            <Button
              href={data.url}
              isDisabled={data.isDisabled}
              appearance="primary"
            >
              Lihat Pustaka
            </Button>
          ),
        };
      });
      setTypeList(mappingTypeList);
    }
  }, []);

  useState(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">
              Riwayat Dokumen Perencanaan Audit
            </div>
          </div>
        </div>
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Jenis Dokumen", "Jumlah Dokumen", "Aksi"]}
                  columnWidths={["10%", "40%", "30%", "20%"]}
                  items={typeList}
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

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [typeList, setTypeList] = useState([]);
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    uri: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      ...params,
      id: id,
      uri: id,
    });
  }, [router.isReady]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
    { name: "Daftar Dokumen", path: "/catalogue/pat/" + params.uri },
  ];

  useEffect(() => {
    const type_list = [
      {
        jenis: "Overview",
        jumlah: "-----",
        url: `${params.uri}/overview`,
        isDisabled: false,
      },
      {
        jenis: "Addendum PAT",
        jumlah: "-----",
        url: `${params.uri}/addendum-pat`,
        isDisabled: false,
      },
    ];

    if (type_list) {
      const mappingTypeList = type_list.map((data, key) => {
        return {
          No: key + 1,
          "Jenis Dokumen": data.jenis,
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
  }, [params.uri, params.id]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Riwayat Dokumen PAT</div>
          </div>
        </div>
        <ProjectInfo
          type="pat"
          year={params.year}
          source={params.type}
          id={params.id}
        />
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Jenis Dokumen", "Aksi"]}
                  columnWidths={["10%", "40%", "20%"]}
                  items={typeList}
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

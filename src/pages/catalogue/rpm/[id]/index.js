import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import { ProjectInfo } from "@/components/molecules/catalog";
import { MainLayout } from "@/layouts";
import Button from "@atlaskit/button";

const index = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState();
  const [typeList, setTypeList] = useState([]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: "/catalogue/rpm" },
    { name: selectedId, path: "/catalogue/rpm/" + selectedId },
    { name: "Daftar Dokumen", path: "/catalogue/rpm/" + selectedId },
  ];

  const type_list = [
    {
      nomor_evaluasi: 1,
    },
    {
      nomor_evaluasi: 2,
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setSelectedId(id);
  }, [router.isReady]);

  useEffect(() => {
    if (type_list) {
      const mappingTypeList = type_list.map((data, key) => {
        return {
          No: key + 1,
          Evaluasi: "Tahap ke-" + data.nomor_evaluasi,
          Aksi: (
            <Link
              href={"/catalogue/rpm/" + selectedId + "/" + data.nomor_evaluasi}
            >
              <Button
                href={data.url}
                isDisabled={data.isDisabled}
                appearance="primary"
              >
                Lihat Pustaka
              </Button>
            </Link>
          ),
        };
      });
      setTypeList(mappingTypeList);
    }
  }, [selectedId]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Catalogue R.P.M</div>
          </div>
        </div>
        <ProjectInfo type="rpm" id={selectedId} />
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[40rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Evaluasi", "Aksi"]}
                  columnWidths={["10%", "35%", "30%"]}
                  items={typeList}
                />
              </div>
              <div className="flex justify-center mt-5"></div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

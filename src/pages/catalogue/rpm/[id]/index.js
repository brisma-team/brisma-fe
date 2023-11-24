import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import { ProjectInfo } from "@/components/molecules/catalog";
import { MainLayout } from "@/layouts";
import Button from "@atlaskit/button";

const index = () => {
  const router = useRouter();

  const [typeList, setTypeList] = useState([]);
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
      id,
    });
  }, [router.isReady]);

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: "/catalogue/rpm" },
    { name: "Daftar Evaluasi", path: "/catalogue/rpm/" + params.id },
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
    if (type_list) {
      const mappingTypeList = type_list.map((data, key) => {
        return {
          No: key + 1,
          Evaluasi: "Tahap ke-" + (key + 1),
          Aksi: (
            <Link
              href={"/catalogue/rpm/" + params.id + "/" + data.nomor_evaluasi}
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
  }, [params.id]);

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
        <ProjectInfo
          type="rpm"
          id={params.id}
          year={params.year}
          source={params.type}
        />
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

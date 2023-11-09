import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { TableField } from "@/components/atoms";
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
  ];

  useEffect(() => {
    const type_list = [
      {
        jenis: "SHA",
        jumlah: "-----",
        url: `lha/sha`,
        isDisabled: params.type == "2" ? false : true,
      },
      {
        jenis: "LHA Eksum",
        jumlah: "-----",
        url: `lha/eksum`,
        isDisabled: params.type == "2" ? false : true,
      },
      {
        jenis: "Risk Profile",
        jumlah: "-----",
        url: `lha/risk-profile`,
        isDisabled: true,
        title: "Belum Tersedia",
      },
      {
        jenis: "RTA",
        jumlah: "-----",
        url: `lha/rta`,
        isDisabled: false,
      },
    ];

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
              {data.title != undefined ? data.title : "Lihat Pustaka"}
            </Button>
          ),
        };
      });
      setTypeList(mappingTypeList);
    }
  }, [params.id, params.year, params.type]);

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">Kumpulan Dokumen LHA</div>
          </div>
        </div>
        <ProjectInfo
          type="ewp"
          year={params.year}
          source={params.type}
          id={params.id}
        />
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen LHA</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Jenis Dokumen", "Jumlah Dokumen", "Aksi"]}
                  columnWidths={["10%", "40%", "30%", "20%"]}
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

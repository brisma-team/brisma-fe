import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { TableField } from "@/components/atoms";

const index = () => {
  const { id } = useRouter().query;

  const [typeList, setTypeList] = useState([]);
  const [selectedId, setSelectedId] = useState(id || "");

  useEffect(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Detail", path: "/catalogue/ewp/" + selectedId },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + selectedId },
  ];

  const type_list = [
    {
      jenis: "SHA",
      jumlah: "-----",
      url: `${selectedId}/lha/sha`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "LHA Eksum",
      jumlah: "-----",
      url: `${selectedId}/lha/eksum`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "Risk Profile",
      jumlah: "-----",
      url: `${selectedId}/lha/risk-profile`,
      isDisabled: false,
    },
    {
      jenis: "RTA",
      jumlah: "-----",
      url: `${selectedId}/lha/rta`,
      isDisabled: false,
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
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6 p-5">
              <div className="grid grid-cols-5">
                <div className="col-span-1 font-bold text-lg">Projek ID</div>
                <div className="col-span-4">: 001</div>
                <div className="col-span-1 font-bold text-lg">Nama Projek</div>
                <div className="col-span-4">: -</div>
                <div className="col-span-1 font-bold text-lg">Tahun</div>
                <div className="col-span-4">: 2023</div>
                <div className="col-span-1 font-bold text-lg">Jenis Audit</div>
                <div className="col-span-4">: Reguler</div>
              </div>
            </div>
          </Card>
        </div>
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

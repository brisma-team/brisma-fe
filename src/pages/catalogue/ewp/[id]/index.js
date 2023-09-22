import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { TableField } from "@/components/atoms";
import useCatalogEWPById from "@/data/catalog/useCatalogEWPById";

const index = () => {
  const id = useRouter().query.id;

  const [typeList, setTypeList] = useState([]);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Detail", path: "/catalogue/ewp/" + id },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + id },
  ];

  const type_list = [
    {
      jenis: "MAPA",
      jumlah: "-----",
      url: `${id}/mapa`,
      isDisabled: true,
    },
    {
      jenis: "Addendum MAPA",
      jumlah: "-----",
      url: `${id}/addendum-mapa`,
      isDisabled: true,
    },
    {
      jenis: "KKPA",
      jumlah: "-----",
      url: `${id}/kkpa`,
      isDisabled: true,
    },
    {
      jenis: "KKPT",
      jumlah: "-----",
      url: `${id}/kkpt`,
      isDisabled: false,
    },
    {
      jenis: "Berita Acara",
      jumlah: "-----",
      url: `${id}/berita_acara`,
      isDisabled: true,
    },
  ];

  useEffect(() => {
    if (type_list != undefined) {
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
  }, [type_list]);

  const [catDetailEwp, setCatDetailEwp] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const idToUse = selectedId ? selectedId : "";
  const { ewpDetailData } = useCatalogEWPById(
    idToUse.split("x1c-")[2],
    idToUse.split("x1c-")[0],
    idToUse.split("x1c-")[1]
  );

  useState(() => {
    id && setSelectedId(id);
  }, [id]);

  useEffect(() => {
    if (ewpDetailData != undefined) {
      const mappingCatEwp = ewpDetailData.data.map((v, key) => {
        const datePart = v?.CreatedAt.split(".")[0];
        return {
          No: key + 1,
          "Nama Dokumen": v?.AttachmentName,
          "Tanggal Dibuat": datePart,
          Aksi: (
            <div className="grid grid-cols-3 text-center col-span-3">
              <div className="align-middle px-2">
                <Button shouldFitContainer isDisabled appearance="primary">
                  History
                </Button>
              </div>
              <div className="align-middle px-2">
                <Button shouldFitContainer isDisabled appearance="primary">
                  Preview
                </Button>
              </div>
              <div className="align-middle px-2 ">
                <Button shouldFitContainer isDisabled appearance="primary">
                  Download
                </Button>
              </div>
            </div>
          ),
        };
      });
      setCatDetailEwp(mappingCatEwp);
    }
  }, [ewpDetailData]);
  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="text-3xl font-bold">
              Riwayat Dokumen Audit Project
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
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Seluruh Attachment</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Nama Dokumen", "Tanggal Dibuat", "Aksi"]}
                  columnWidths={["5%", "35%", "30%", "30%"]}
                  items={catDetailEwp}
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

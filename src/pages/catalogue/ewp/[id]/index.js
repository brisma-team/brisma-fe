import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField, Pagination } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { useEWPAllAttachment } from "@/data/catalog";
import shortenWord from "@/helpers/shortenWord";

const index = () => {
  const { id } = useRouter().query;

  const [typeList, setTypeList] = useState([]);
  const [ewpAttachment, setEwpAttachment] = useState([]);
  const [selectedId, setSelectedId] = useState(id || "");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  const idToUse = selectedId ? selectedId : "";

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + selectedId },
  ];
  const type_list = [
    {
      jenis: "MAPA",
      jumlah: "-----",
      url: `${selectedId}/mapa`,
      isDisabled: false,
    },
    {
      jenis: "Addendum MAPA",
      jumlah: "-----",
      url: `${selectedId}/addendum-mapa`,
      // isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
      isDisabled: true,
    },
    {
      jenis: "Entrance Attendance",
      jumlah: "-----",
      url: `${selectedId}/entrance-attendance`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "Entrance Notulen",
      jumlah: "-----",
      url: `${selectedId}/entrance-notulen`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "Entrance Berita Acara",
      jumlah: "-----",
      url: `${selectedId}/entrance-berita-acara`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "KKPA",
      jumlah: "-----",
      url: `${selectedId}/kkpa`,
      isDisabled: false,
    },
    {
      jenis: "KKPT",
      jumlah: "-----",
      url: `${selectedId}/kkpt`,
      isDisabled: false,
    },
    {
      jenis: "Exit Attendance",
      jumlah: "-----",
      url: `${selectedId}/exit-attendance`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "Exit Notulen",
      jumlah: "-----",
      url: `${selectedId}/exit-notulen`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "Exit Berita Acara",
      jumlah: "-----",
      url: `${selectedId}/exit-berita-acara`,
      isDisabled: selectedId.split("x1c-")[0] === "2" ? false : true,
    },
    {
      jenis: "LHA",
      jumlah: "-----",
      url: `${selectedId}/lha`,
      isDisabled: true,
    },
  ];

  useEffect(() => {
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
  }, []);

  const { allAttachmentData } = useEWPAllAttachment(
    idToUse.split("x1c-")[2],
    idToUse.split("x1c-")[0],
    idToUse.split("x1c-")[1],
    currentPage
  );

  useEffect(() => {
    if (allAttachmentData != undefined) {
      setTotalPages(allAttachmentData.data.total_page);
      const mappingAttachment = allAttachmentData.data.all_attachment.map(
        (v, key) => {
          const datePart = v?.CreatedAt.split(".")[0];
          return {
            No: (currentPage - 1) * 5 + key + 1,
            "Nama Dokumen":
              idToUse.split("x1c-")[0] == 1
                ? shortenWord(v?.AttachmentName, 0, 45)
                : shortenWord(v?.AttachmentName.berkas, 0, 45),
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
        }
      );
      setEwpAttachment(mappingAttachment);
    }
  }, [allAttachmentData]);

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
                  headers={["No", "Jenis Dokumen", "Aksi"]}
                  columnWidths={["10%", "40%", "50%"]}
                  items={typeList}
                />
              </div>
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
                  items={ewpAttachment}
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

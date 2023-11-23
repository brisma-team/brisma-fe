import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField, Pagination } from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { useEWPAllAttachment } from "@/data/catalog";
import shortenWord from "@/helpers/shortenWord";
import { ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [typeList, setTypeList] = useState([]);
  const [ewpAttachment, setEwpAttachment] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    const type_list = [
      {
        jenis: "MAPA",
        jumlah: "-----",
        url: `${params.uri}/mapa`,
        isDisabled: false,
      },
      {
        jenis: "Addendum MAPA",
        jumlah: "-----",
        url: `${params.uri}/addendum-mapa`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "Entrance Attendance",
        jumlah: "-----",
        url: `${params.uri}/entrance-attendance`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "Entrance Notulen",
        jumlah: "-----",
        url: `${params.uri}/entrance-notulen`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "Entrance Berita Acara",
        jumlah: "-----",
        url: `${params.uri}/entrance-berita-acara`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "KKPA",
        jumlah: "-----",
        url: `${params.uri}/kkpa`,
        isDisabled: false,
      },
      {
        jenis: "KKPT",
        jumlah: "-----",
        url: `${params.uri}/kkpt`,
        isDisabled: false,
      },
      {
        jenis: "Exit Attendance",
        jumlah: "-----",
        url: `${params.uri}/exit-attendance`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "Exit Notulen",
        jumlah: "-----",
        url: `${params.uri}/exit-notulen`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "Exit Berita Acara",
        jumlah: "-----",
        url: `${params.uri}/exit-berita-acara`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "LHA",
        jumlah: "-----",
        url: `${params.uri}/lha`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "Laporan Temuan Major",
        jumlah: "-----",
        url: `${params.uri}/laporan-temuan-major`,
        isDisabled: params.type === "2" ? false : true,
      },
      {
        jenis: "Berita Acara Temuan Minor",
        jumlah: "-----",
        url: `${params.uri}/berita-acara-temuan-minor`,
        isDisabled: params.type === "2" ? false : true,
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
  }, [params.uri, params.type]);

  const { allAttachmentData } = useEWPAllAttachment(
    params.year,
    params.type,
    params.id,
    currentPage
  );

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.id },
  ];

  useEffect(() => {
    if (allAttachmentData != undefined) {
      setTotalPages(allAttachmentData.data.total_page);
      const mappingAttachment = allAttachmentData.data.all_attachment.map(
        (v, key) => {
          return {
            No: (currentPage - 1) * 5 + key + 1,
            "Nama Dokumen": shortenWord(
              params.type == "1" ? v?.AttachmentName : v?.AttachmentName.berkas,
              0,
              45
            ),
            "Tanggal Dibuat": v?.CreatedAt.split(".")[0],
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
            <div className="text-3xl font-bold">Riwayat Dokumen EWP</div>
          </div>
        </div>
        <ProjectInfo
          type="ewp"
          source={params.type}
          id={params.id}
          year={params.year}
        />
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

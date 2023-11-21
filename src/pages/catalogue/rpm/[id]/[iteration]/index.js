import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  Card,
  // Pagination,
  TableField,
} from "@/components/atoms";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import { ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();
  const [typeList, setTypeList] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [selectedEvaluasi, setSelectedEvaluasi] = useState(1);

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: "/catalogue/rpm" },
    { name: "Daftar Evaluasi", path: "/catalogue/rpm/" + selectedId },
    {
      name: "Daftar Dokumen",
      path: "/catalogue/rpm/" + selectedId + "/" + selectedEvaluasi,
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const { id, iteration } = router.query;
    setSelectedId(id);
    setSelectedEvaluasi(iteration);
  }, [router.isReady]);

  const type_list = [
    {
      jenis: "Negosiasi Attendance",
      jumlah: "-----",
      url: `negosiasi-attendance`,
      isDisabled: selectedEvaluasi == 1 ? true : false,
      title: selectedEvaluasi == 1 ? "Dokumen tidak ada" : "Lihat Pustaka",
    },
    {
      jenis: "Negosiasi Berita Acara",
      jumlah: "-----",
      url: `negosiasi-berita-acara`,
      isDisabled: selectedEvaluasi == 1 ? true : false,
      title: selectedEvaluasi == 1 ? "Dokumen tidak ada" : "Lihat Pustaka",
    },
    {
      jenis: "Negosiasi Notulen",
      jumlah: "-----",
      url: `negosiasi-notulen`,
      isDisabled: selectedEvaluasi == 1 ? true : false,
      title: selectedEvaluasi == 1 ? "Dokumen tidak ada" : "Lihat Pustaka",
    },
    {
      jenis: "Rincian Tindak Lanjut Evaluasi",
      jumlah: "-----",
      url: `rincian-tindak-lanjut-evaluasi`,
      // isDisabled: selectedEvaluasi == 1 ? true : false,
      isDisabled: false,
      title: "Lihat Pustaka",
    },
    {
      jenis: "Surat Hasil Evaluasi",
      jumlah: "-----",
      url: `surat-hasil-evaluasi`,
      isDisabled: false,
      title: "Lihat Pustaka",
    },
    {
      jenis: "Surat Hasil Tindak Lanjut",
      jumlah: "-----",
      url: `surat-hasil-tindak-lanjut`,
      isDisabled: false,
      title: "Lihat Pustaka",
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
              href={selectedEvaluasi + "/" + data.url}
              isDisabled={data.isDisabled}
              appearance="primary"
            >
              {data.title}
            </Button>
          ),
        };
      });
      setTypeList(mappingTypeList);
    }
  }, [selectedId, selectedEvaluasi]);

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
              <div className="text-xl font-bold px-5">Pustaka Dokumen</div>
              <p className="text-sm font-bold px-5">
                Evaluasi ke-{selectedEvaluasi}
              </p>
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
      </div>
    </MainLayout>
  );
};

export default index;

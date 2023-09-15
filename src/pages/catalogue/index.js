import React from "react";
import { MainLayout } from "@/layouts";
import CardCatalog from "@/components/molecules/catalog/CardCatalog";

const index = () => {
  const data = {
    title: "Catalogue",
    content: [
      {
        subtitle: "Pustaka Dokumen",
        subcontent: [
          {
            title: "P.A.T",
            description: "Pustaka Dokumen Perencanaan Audit Tahunan.",
            id: 1,
          },
          {
            title: "E.W.P",
            description: "Pustaka Dokumen Lembar Kerja Pelaksanaan Audit.",
            id: 2,
          },
          {
            title: "R.P.M",
            description: "Pustaka Dokumen Realisasi Perbaikan Manajemen.",
            id: 3,
          },
        ],
      },
      {
        subtitle: "Advance Filtering",
        subcontent: [
          {
            title: "Cari KKPA",
            description: "Pencarian Pustaka Dokumen KKPA.",
            id: 1,
            withModal: false,
            withUrl: "/catalogue/advance-filter/kkpa",
          },
          {
            title: "Cari KKPT",
            description: "Pencarian Pustaka Dokumen KKPT.",
            id: 2,
            withModal: false,
            withUrl: "/catalogue/advance-filter/kkpt",
          },
        ],
      },
    ],
  };
  return (
    <MainLayout>
      <CardCatalog data={data} />
    </MainLayout>
  );
};

export default index;

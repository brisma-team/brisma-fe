import React from "react";
import { MainLayout } from "@/layouts";
import { CardDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Catalogue",
    content: [
      {
        subtitle: "Pustaka Dokumen",
        subcontent: [
          {
            title: "Catalogue P.A.T",
            description: "Pustaka Dokumen Perencanaan Audit Tahunan.",
            url: "/catalogue/pat",
          },
          {
            title: "Catalogue E.W.P",
            description: "Pustaka Dokumen Lembar Kerja Pelaksanaan Audit.",
            url: "/catalogue/ewp",
          },
          {
            title: "Catalogue R.P.M",
            description: "Pustaka Dokumen Realisasi Perbaikan Manajemen.",
            url: "/catalogue/rpm",
          },
        ],
      },
    ],
  };
  return (
    <MainLayout>
      <CardDashboard data={data} />
    </MainLayout>
  );
};

export default index;

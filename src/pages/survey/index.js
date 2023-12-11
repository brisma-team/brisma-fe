import React from "react";
import { MainLayout } from "@/layouts";
import { CardDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Survei",
    content: [
      {
        subtitle: "Inisiator Survei",
        subcontent: [
          {
            title: "Inisiasi Survei",
            description: "Membuat Form Survei.",
            url: "/survey/overview",
          },
          {
            title: "Approval",
            description: "Melihat riwayat approval.",
            url: "/survey/approval",
          },
        ],
      },
      {
        subtitle: "Responden Survei",
        subcontent: [
          {
            title: "Mengisi Survei",
            description: "Membuat kuesioner pada Survei.",
            url: "/survey/responden/overview",
          },
          {
            title: "Approval",
            description: "Melihat riwayat approval.",
            url: "/survey/responden/approval",
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

import React from "react";
import { MainLayout } from "@/layouts";
import { CardDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Inisiator Survei",
    content: [
      {
        subtitle: "PAT",
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
    ],
  };
  return (
    <MainLayout>
      <CardDashboard data={data} />
    </MainLayout>
  );
};

export default index;

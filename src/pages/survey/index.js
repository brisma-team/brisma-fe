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
            url: "/survey/initiator/overview",
          },
          {
            title: "Approval",
            description: "Melihat riwayat approval.",
            url: "/survey/initiator/approval",
          },
        ],
      },
      {
        subtitle: "Responden Survei",
        subcontent: [
          {
            title: "Mengisi Survei",
            description: "Membuat kuesioner pada Survei.",
            url: "/survey/initiator/responden/overview",
          },
          {
            title: "Approval",
            description: "Melihat riwayat approval.",
            url: "/survey/initiator/responden/approval",
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

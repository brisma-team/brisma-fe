import React from "react";
import { MainLayout } from "@/layouts";
import { CardDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Perancangan Audit Tahunan",
    content: [
      {
        subtitle: "PAT",
        subcontent: [
          {
            title: "AUDITOR",
            description: "Penyusunan perencanaan tahunan kegiatan audit.",
            url: "/pat/projects",
          },
          {
            title: "APPROVAL",
            description: "Pelacakan flow approval project PAT.",
            url: "/pat/approval",
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

import React from "react";
import { MainLayout } from "@/layouts";
import { CardDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Rencana Perbaikan Manajemen",
    content: [
      {
        subtitle: "R.P.M Audit",
        subcontent: [
          {
            title: "Konvensional",
            description:
              "Modul pengerjaan Rencana Perbaikan Manajemen Audit dengan metode Konvensional.",
            url: "#",
            isDisabled: true,
          },
          {
            title: "Agile",
            description:
              "Modul pengerjaan Rencana Perbaikan Manajemen Audit dengan metode Agile Scrum.",
            url: "#",
            isDisabled: true,
          },
        ],
      },
      {
        subtitle: "R.P.M Non Audit",
        subcontent: [
          {
            title: "Kegiatan",
            description:
              "Modul pengerjaan Rencana Perbaikan Manajemen Non Audit Kegiatan.",
            url: "/rpm/kegiatan/overview",
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
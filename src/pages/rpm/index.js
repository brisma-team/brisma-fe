import React from "react";
import { MainLayout } from "@/layouts";
import { CardModuleDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Rencana Perbaikan Manajemen",
    content: [
      {
        subtitle: "R.P.M Audit",
        title: "Konvensional",
        description:
          "Modul pengerjaan Rencana Perbaikan Manajemen Audit dengan metode Konvensional.",
        url: "#",
        isDisabled: true,
      },
      {
        subtitle: "R.P.M Audit",
        title: "Agile",
        description:
          "Modul pengerjaan Rencana Perbaikan Manajemen Audit dengan metode Agile Scrum.",
        url: "#",
        isDisabled: true,
      },
      {
        subtitle: "R.P.M Non-Audit",
        title: "Kegiatan",
        description:
          "Modul pengerjaan Rencana Perbaikan Manajemen Audit dengan metode Konvensional.",
        url: "/rpm/kegiatan",
        isDisabled: true,
      },
      {
        subtitle: "R.P.M",
        title: "Approval Monitoring",
        description:
          "Monitoring proses approval pada aktivitas RPM Audit dan Non-Audit per masing-masing user.",
        url: "/rpm/approval",
      },
    ],
  };
  return (
    <MainLayout>
      <div className="p-5">
        <div className="mb-8">
          <p className="text-3xl font-bold">{data?.title}</p>
        </div>
        <div className="grid grid-cols-2 gap-5 w-fit mt-12">
          <CardModuleDashboard data={data} />
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

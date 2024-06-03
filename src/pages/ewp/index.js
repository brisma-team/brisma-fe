import React from "react";
import { MainLayout } from "@/layouts";
import { CardModuleDashboard } from "@/components/molecules/commons";

const index = () => {
  const data = {
    title: "Electronic Working Papers",
    content: [
      {
        subtitle: "E.W.P Audit",
        title: "Konvensional",
        description:
          "Modul pengerjaan Electronic Working Paper Audit dengan metode Konvensional.",
        url: "#",
        isDisabled: true,
      },
      {
        subtitle: "E.W.P Audit",
        title: "Agile",
        description:
          "Modul pengerjaan Electronic Working Paper Audit dengan metode Agile Scrum.",
        url: "#",
        isDisabled: true,
      },
      {
        subtitle: "E.W.P Non-Audit",
        title: "Kegiatan",
        description:
          "Modul pengerjaan Electronic Working Paper Audit untuk Kegiatan Non-Audit.",
        url: "/ewp/konsulting",
      },
      {
        subtitle: "E.W.P Non-Audit",
        title: "Quality Assurance",
        description:
          "Modul pengerjaan Electronic Working Paper Audit untuk Kegiatan Non-Audit Review Quality Assurance.",
        url: "/ewp/quality-assurance",
      },
      {
        subtitle: "E.W.P Non-Audit",
        title: "Monitoring Offsite",
        description:
          "Modul pengerjaan Electronic Working Paper Audit untuk Kegiatan Non-Audit Monitoring Offsite.",
        url: "/ewp/monitoring-offsite",
      },
      {
        subtitle: "E.W.P",
        title: "Approval Monitoring",
        description:
          "Monitoring proses approval pada aktivitas EWP Audit dan Non-Audit per masing-masing user.",
        url: "/ewp/approval",
      },
      {
        subtitle: "E.W.P",
        title: "Kaji Ulang",
        description:
          "Modul pengerjaan Electronic Working Paper Audit untuk Kegiatan Non-Audit Kaji Ulang.",
        url: "/ewp/kaji-ulang",
      },
    ],
  };
  return (
    <MainLayout>
      <div className="p-5">
        <div className="mb-8">
          <p className="text-3xl font-bold">{data?.title}</p>
        </div>
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-5 w-fit mt-12">
          <CardModuleDashboard data={data?.content} color="text-atlasian-red" />
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

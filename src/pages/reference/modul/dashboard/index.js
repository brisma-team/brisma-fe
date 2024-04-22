import React from "react";
import { CardModuleDashboard } from "@/components/molecules/commons";
import { LayoutReferenceGeneral } from "@/layouts/reference";

const index = () => {
  const data = {
    title: "Modul Dashboard",
    content: [
      {
        // subtitle: "Reference Modul",
        title: "Aktivasi Dashboard Visual",
        description: "Pengaturan lanjut terkait Aktivasi Dashboard Visual.",
        url: "/reference/modul/dashboard/active-dashboard-visual",
        isDisabled: false,
      },
      {
        // subtitle: "Reference Modul",
        title: "Aktivasi Dashboard Reporting",
        description: "Pengaturan lanjut terkait Aktivasi Dashboard Reporting.",
        url: "/reference/modul/dashboard/active-dashboard-report",
        isDisabled: false,
      },
      {
        // subtitle: "Reference Modul",
        title: "Manajemen Dashboard",
        description: "Pengaturan lanjut terkait Manajemen Dashboard.",
        url: "/reference/modul/dashboard/manage-dashboard",
        isDisabled: false,
      },
    ],
  };
  return (
    <LayoutReferenceGeneral>
      <div className="p-5">
        <div className="mb-8">
          <p className="text-3xl font-bold">{data?.title}</p>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-1 gap-5 w-fit mt-12">
          <CardModuleDashboard
            data={data?.content}
            color="text-atlasian-red"
            defaultWidth="w-[20rem]"
            contentPercent="w-5/5"
          />
        </div>
      </div>
    </LayoutReferenceGeneral>
  );
};

export default index;

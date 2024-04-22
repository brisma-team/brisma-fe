import React from "react";
import { CardModuleDashboard } from "@/components/molecules/commons";
import { LayoutReferenceGeneral } from "@/layouts/reference";

const index = () => {
  const data = {
    title: "References",
    content: [
      {
        // subtitle: "E.W.P Audit",
        title: "Metodologi",
        description: "Pengaturan terkait Metodologi Aplikasi.",
        url: "#",
        isDisabled: true,
      },
      {
        // subtitle: "E.W.P Audit",
        title: "Modul",
        description: "Pengaturan terkait modul-modul dalam Aplikasi.",
        url: "/reference/modul",
        isDisabled: false,
      },
      {
        // subtitle: "E.W.P Non-Audit",
        title: "Organisasi",
        description: "Pengaturan terkait Unit Kerja dan Pengguna.",
        url: "/reference/organisasi",
        isDisabled: false,
      },
      {
        // subtitle: "E.W.P Non-Audit",
        title: "Data",
        description: "Pengaturan terkait Manajemen dan Koneksivitas Data.",
        url: "#",
        isDisabled: true,
      },
    ],
  };
  return (
    <LayoutReferenceGeneral>
      <div className="p-5">
        <div className="mb-8">
          <p className="text-3xl font-bold">{data?.title}</p>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-1 gap-5 w-fit mt-12">
          <CardModuleDashboard
            data={data?.content}
            color="text-atlasian-brown"
            defaultWidth="w-[18rem]"
            contentPercent="w-5/5"
          />
        </div>
      </div>
    </LayoutReferenceGeneral>
  );
};

export default index;

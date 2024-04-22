import React from "react";
import { CardModuleDashboard } from "@/components/molecules/commons";
import { LayoutReferenceGeneral } from "@/layouts/reference";

const index = () => {
  const data = {
    title: "Modul",
    content: [
      {
        // subtitle: "Reference Modul",
        title: "Dashboard",
        description: "Pengaturan lanjut terkait Modul Dashboard.",
        url: "/reference/modul/dashboard",
        isDisabled: false,
      },
      {
        // subtitle: "Reference Modul",
        title: "Survei",
        description: "Pengaturan lanjut terkait Modul Survei.",
        url: "/reference/modul/survei",
        isDisabled: false,
      },
      {
        // subtitle: "Reference Modul",
        title: "P.A.T",
        description: "Pengaturan terkait Modul Perencanaan Audit Tahunan.",
        url: "#",
        isDisabled: true,
      },
      {
        // subtitle: "Reference Modul",
        title: "E.W.P",
        description: "Pengaturan terkait Modul Electronic Working Papers.",
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
            color="text-atlasian-red"
            defaultWidth="w-[18rem]"
            contentPercent="w-5/5"
          />
        </div>
      </div>
    </LayoutReferenceGeneral>
  );
};

export default index;

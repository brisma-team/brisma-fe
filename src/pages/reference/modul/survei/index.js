import React from "react";
import { CardModuleDashboard } from "@/components/molecules/commons";
import { LayoutReferenceGeneral } from "@/layouts/reference";

const index = () => {
  const data = {
    title: "Modul Survei",
    content: [
      {
        // subtitle: "Reference Modul",
        title: "Template Survei",
        description: "Pengaturan lanjut terkait Template Survei.",
        url: "/reference/modul/survei/overview",
        isDisabled: false,
      },
      {
        // subtitle: "Reference Modul",
        title: "Approval Survei",
        description: "Pengaturan lanjut terkait Riwayat Approval.",
        url: "/reference/modul/survei/approval",
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

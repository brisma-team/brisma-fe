import React from "react";
import { CardModuleDashboard } from "@/components/molecules/commons";
import { LayoutReferenceGeneral } from "@/layouts/reference";

const index = () => {
  const data = {
    title: "Modul",
    content: [
      {
        // subtitle: "Reference Modul",
        title: "Unit Kantor Audit",
        description: "Pengaturan lanjut terkait Unit Kerja Audit.",
        url: "/reference/organisasi/uka",
        isDisabled: false,
      },
      {
        // subtitle: "Reference Modul",
        title: "User S.K.A.I",
        description: "Pengaturan lanjut terkait User Pengguna Aplikasi.",
        url: "/reference/organisasi/users/skai",
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

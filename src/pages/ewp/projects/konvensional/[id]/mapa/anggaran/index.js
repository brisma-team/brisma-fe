import React from "react";
import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useRouter } from "next/router";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import {
  ModalAddBudget,
  DataTables,
} from "@/components/molecules/ewp/konvensional/anggaran";
import { useState } from "react";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const { auditorEWP } = useAuditorEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `${baseUrl}`,
    },
    {
      name: "Anggaran",
      path: `${baseUrl}/anggaran`,
    },
  ];

  const { mapaEWP, mapaEWPMutate } = useMapaEWP("anggaran", {
    id,
  });

  return (
    <LandingLayoutEWP>
      <div className="pr-16">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        {/* Start Content */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text="Anggaran" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/jadwal-audit"}
            nextUrl={"/dokumen"}
          />
        </div>
        <div className="mb-4" />
        <div className="w-[80rem]">
          <Card>
            <div className="px-6 pt-2 pb-4 w-full">
              <p className="ml-2 font-bold text-base">Usulan Anggaran</p>
              <div className="my-2 " />
              <DataTables
                data={mapaEWP?.data}
                mutate={mapaEWPMutate}
                setShowModal={setShowModal}
                setTypeModal={setTypeModal}
                setSelectedId={setSelectedId}
              />
            </div>
          </Card>
        </div>
        <ModalAddBudget
          showModal={showModal}
          setShowModal={setShowModal}
          mutate={mapaEWPMutate}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWP>
  );
};

export default index;

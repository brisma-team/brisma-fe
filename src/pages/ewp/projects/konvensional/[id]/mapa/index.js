import {
  Breadcrumbs,
  ButtonField,
  CardLanding,
  PageTitle,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useMapaStatusEWP } from "@/data/ewp/konvensional/mapa";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id } = useRouter().query;
  const [data, setData] = useState([]);
  const { auditorEWP } = useAuditorEWP({ id });
  const { mapaStatusEWP } = useMapaStatusEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `/ewp/projects/konvensional/${id}/mapa`,
    },
  ];

  useEffect(() => {
    setData([
      {
        title: "Latar Belakang",
        description: "Pemaparan latar belakang usulan P.A.T",
        status: mapaStatusEWP?.data?.latar_belakang ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/latar-belakang`,
      },
      {
        title: "Tujuan",
        description: "Pemaparan latar belakang usulan P.A.T",
        status: mapaStatusEWP?.data?.tujuan ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/tujuan`,
      },
      {
        title: "Sumber Informasi",
        description: "Pemaparan usulan sumber informasi P.A.T",
        status: mapaStatusEWP?.data?.sumber_informasi ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/sumber-informasi`,
      },
      {
        title: "Pemetaan Prioritas",
        description: "Pemaparan usulan sumber informasi P.A.T",
        status: mapaStatusEWP?.data?.pemetaan_prioritas ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/pemetaan-prioritas`,
      },
      {
        title: "Tim Audit",
        description: "Pembentukan tim audit.",
        status: mapaStatusEWP?.data?.tim_audit ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/tim-audit`,
      },

      {
        title: "UKER Assessment",
        description: "Pembentukan tim audit.",
        status: mapaStatusEWP?.data?.uker_assesment ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/uker-asessment`,
      },
      {
        title: "Analisis Perencanaan",
        description: "Pembentukan tim audit.",
        status: mapaStatusEWP?.data?.analisis_perencanaan
          ? "success"
          : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/analisis-perencanaan`,
      },
      {
        title: "Penugasan",
        description: "Pembentukan tim audit.",
        status: mapaStatusEWP?.data?.penugasan ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/penugasan`,
      },
      {
        title: "Jadwal Audit",
        description: "Pembuatan jadwal audit.",
        status: mapaStatusEWP?.data?.jadwal_audit ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/jadwal-audit`,
      },
      {
        title: "Anggaran",
        description: "Melihat ringkasan objek audit.",
        status: mapaStatusEWP?.data?.anggaran ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/anggaran`,
      },
      {
        title: "Dokumen M.A.P.A",
        description: "Melihat ringkasan objek audit.",
        status: mapaStatusEWP?.data?.doc_mapa ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/dokumen-mapa`,
      },
      {
        title: "Surat Perintah Audit",
        description: "Generate Documents dan approval.",
        status: mapaStatusEWP?.data?.pic_document ? "success" : "failed",
        url: `/ewp/projects/konvensional/${id}/mapa/surat-perintah-audit`,
      },
    ]);
  }, [mapaStatusEWP]);

  return (
    <LandingLayoutEWP>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-7">
          <PageTitle text="Memorandom Analisis Perancanaan Audit" />
          <div className="my-3 w-40 bg-atlasian-red rounded">
            <ButtonField text="Perubahan MAPA" />
          </div>
        </div>
        {/* Start Content */}
        <div className="grid grid-cols-4 my-4 -mx-3">
          {data.map((v, i) => {
            return (
              <CardLanding
                key={i}
                title={v.title}
                description={v.description}
                status={v.status}
                url={v.url}
              />
            );
          })}
        </div>
        {/* End Content */}
      </div>
    </LandingLayoutEWP>
  );
};

export default index;

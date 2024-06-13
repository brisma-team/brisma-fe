import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useLandingStatus } from "@/data/ewp/common";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/quality-assurance/${id}`;
  const [data, setData] = useState([]);

  const { auditInfo } = useAuditInfo({ module: "qa", id });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id,
  });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Overview", path: "/ewp/quality-assurance" },
    {
      name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
      path: baseUrl + "/info",
    },
    { name: "Perencanaan Kegiatan", path: baseUrl + "/perencanaan" },
  ];

  useEffect(() => {
    if (landingStatus?.data) {
      setData([
        {
          title: "Latar Belakang",
          description: "Usulan terkait Latar Belakang Kegiatan.",
          status: landingStatus?.data?.latar_belakang ? "success" : "failed",
          url: `${baseUrl}/perencanaan/latar-belakang`,
        },
        {
          title: "Tujuan",
          description: "Usulan terkait Tujuan Kegiatan.",
          status: landingStatus?.data?.tujuan ? "success" : "failed",
          url: `${baseUrl}/perencanaan/tujuan`,
        },
        {
          title: "Analisa",
          description: "Usulan terkait Analisa Kegiatan.",
          status: landingStatus?.data?.analisa ? "success" : "failed",
          url: `${baseUrl}/perencanaan/analisa`,
        },
        {
          title: "Tim",
          description: "Perencanaan terkait Tim Kegiatan.",
          status: landingStatus?.data?.tim_audit ? "success" : "failed",
          url: `${baseUrl}/perencanaan/tim`,
        },
        {
          title: "UKER Assessment",
          description: "Perencanaan terkait UKER Assessment Kegiatan",
          status: landingStatus?.data?.uker_assesment ? "success" : "failed",
          url: `${baseUrl}/perencanaan/uker-assessment`,
        },
        {
          title: "Analisis Perencanaan",
          description: "Perencanaan terkait Analisis Perencanaan Kegiatan",
          status: landingStatus?.data?.analisis_perencanaan
            ? "success"
            : "failed",
          url: `${baseUrl}/perencanaan/analisis-perencanaan`,
        },
        {
          title: "Penugasan",
          description: "Perencanaan terkait Penugasan Kegiatan",
          status: landingStatus?.data?.penugasan ? "success" : "failed",
          url: `${baseUrl}/perencanaan/penugasan`,
        },
        {
          title: "Jadwal",
          description: "Perencanaan terkait Jadwal Kegiatan",
          status: landingStatus?.data?.jadwal_audit ? "success" : "failed",
          url: `${baseUrl}/perencanaan/jadwal`,
        },
        {
          title: "Anggaran",
          description: "Perencanaan terkait Anggaran Kegiatan",
          status: landingStatus?.data?.anggaran ? "success" : "failed",
          url: `${baseUrl}/perencanaan/anggaran`,
        },
        {
          title: "Dokumen",
          description: "Hasil Dokumen Perencanaan Kegiatan.",
          url: `${baseUrl}/perencanaan/dokumen`,
        },
      ]);
    } else {
      setData([]);
    }
  }, [landingStatus]);

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Perencanaan Kegiatan" />
      </div>
      {/* Start Content */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

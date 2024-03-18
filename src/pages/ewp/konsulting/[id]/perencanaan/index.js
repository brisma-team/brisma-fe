import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/ewp/konsulting/landing";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const [data, setData] = useState([]);

  const { projectDetail } = useProjectDetail({ id });
  const { landingStatus } = useLandingStatus({ type: "mapa", id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Overview", path: "/ewp/konsulting" },
    {
      name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
      path: baseUrl + "/info",
    },
    { name: "Perencanaan Kegiatan", path: baseUrl + "/perencanaan" },
  ];

  useEffect(() => {
    setData([
      {
        title: "Sumber Informasi",
        description: "Usulan terkait Sumber Informasi Kegiatan.",
        status: landingStatus?.data?.sumber_informasi ? "success" : "failed",
        url: `${baseUrl}/perencanaan/sumber-informasi`,
      },
      {
        title: "Tim & Timeplan",
        description: "Perencanaan Tim dan Timeplan Kegiatan.",
        status: landingStatus?.data?.tim_audit ? "success" : "failed",
        url: `${baseUrl}/perencanaan/tim-timeplan`,
      },
      {
        title: "Anggaran",
        description: "Perancangan Anggaran Kegiatan.",
        status: landingStatus?.data?.anggaran ? "success" : "failed",
        url: `${baseUrl}/perencanaan/anggaran`,
      },
      {
        title: "Program Kerja",
        description: "Perencanaan Program Kerja Kegiatan.",
        status: landingStatus?.data?.program_kerja ? "success" : "failed",
        url: `${baseUrl}/perencanaan/program-kerja`,
      },
      {
        title: "Dokumen",
        description: "Hasil Dokumen Perencanaan Kegiatan.",
        url: `${baseUrl}/perencanaan/dokumen`,
      },
    ]);
  }, [landingStatus]);

  return (
    <LandingLayoutEWPConsulting>
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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

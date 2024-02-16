import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/ewp/konsulting/landing";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const [data, setData] = useState([]);

  const { projectDetail } = useProjectDetail({ id });
  const { landingStatus } = useLandingStatus({ type: "mapa", id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Overview", path: "/ewp/konsulting/overview" },
    {
      name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
      path: `${baseUrl}/${projectDetail?.data?.project_info?.project_id}`,
    },
    {
      name: `Perencanaan Kegiatan`,
      path: `${baseUrl}/${projectDetail?.data?.project_info?.project_id}/perencanaan`,
    },
  ];

  useEffect(() => {
    setData([
      {
        title: "Sumber Informasi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: landingStatus?.data?.sumber_informasi ? "success" : "failed",
        url: `${baseUrl}/sumber-informasi`,
      },
      {
        title: "Tim & Timeplan",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: landingStatus?.data?.tim_audit ? "success" : "failed",
        url: `${baseUrl}/tim-timeplan`,
      },
      {
        title: "Anggaran",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: landingStatus?.data?.anggaran ? "success" : "failed",
        url: `${baseUrl}/anggaran`,
      },
      {
        title: "Program Kerja",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: landingStatus?.data?.program_kerja ? "success" : "failed",
        url: `${baseUrl}/program-kerja`,
      },
      {
        title: "Dokumen",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        status: landingStatus?.data?.doc_mapa ? "success" : "failed",
        url: `${baseUrl}/dokumen`,
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

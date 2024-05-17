import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { usePerencanaaanStatus } from "@/data/ewp/monitoring-offsite/perencanaan";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/monitoring-offsite/${id}`;
  const [data, setData] = useState([]);

  const { projectDetail } = useProjectDetail({ id });
  const { perencanaaanStatus } = usePerencanaaanStatus({ type: "mapa", id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP / Monitoring Offsite", path: "/ewp" },
    { name: "Overview", path: "/ewp/monitoring-offsite" },
    {
      name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Perencanaan Kegiatan`,
      path: baseUrl,
    },
  ];

  useEffect(() => {
    setData([
      {
        title: "Tim",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero.",
        status: perencanaaanStatus?.data?.tim_audit ? "success" : "failed",
        url: `${baseUrl}/perencanaan/tim`,
      },
      {
        title: "UKER Assessment",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero.",
        status: perencanaaanStatus?.data?.uker_assesment ? "success" : "failed",
        url: `${baseUrl}/perencanaan/uker-assessment`,
      },
    ]);
  }, [perencanaaanStatus]);

  return (
    <LandingLayoutEWPMonOff>
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
    </LandingLayoutEWPMonOff>
  );
};

export default index;

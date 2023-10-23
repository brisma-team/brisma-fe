import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useKkpaStatusEWP } from "@/data/ewp/konvensional/kkpa";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id, kkpa_id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/kkpa/audited/${kkpa_id}`;
  const [data, setData] = useState([]);
  const { auditorEWP } = useAuditorEWP({ id });
  const { kkpaStatusEWP } = useKkpaStatusEWP({ id: kkpa_id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / KKPA`,
      path: baseUrl,
    },
  ];

  useEffect(() => {
    setData([
      {
        title: "Program Audit",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: kkpaStatusEWP?.data?.program_audit ? "success" : "failed",
        url: `${baseUrl}/program-audit`,
      },
      {
        title: "Kriteria",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: kkpaStatusEWP?.data?.kriteria ? "success" : "failed",
        url: `${baseUrl}/kriteria`,
      },
      {
        title: "Ruang Lingkup",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        url: `${baseUrl}/ruang-lingkup`,
      },
      {
        title: "Pengujian Sample",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: kkpaStatusEWP?.data?.pengujian_sample ? "success" : "failed",
        url: `${baseUrl}/pengujian-sample`,
      },
      {
        title: "Pengujian Kontrol",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: kkpaStatusEWP?.data?.pengujian_kontrol ? "success" : "failed",
        url: `${baseUrl}/pengujian-kontrol`,
      },

      {
        title: "Kesimpulan",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        url: `${baseUrl}/kesimpulan`,
      },
      {
        title: "Dokumen KKPA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        url: `${baseUrl}/dokumen`,
      },
    ]);
  }, [kkpaStatusEWP]);

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Kertas Kerja Pelaksanaan Audit" />
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
    </LandingLayoutEWP>
  );
};

export default index;

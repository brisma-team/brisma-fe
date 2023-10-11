import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useMapaStatusEWP } from "@/data/ewp/konvensional/mapa";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id, kkpa_id } = useRouter().query;
  const [data, setData] = useState([]);
  const { auditorEWP } = useAuditorEWP({ id });
  const { mapaStatusEWP } = useMapaStatusEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / KKPA`,
      path: `/ewp/projects/konvensional/${id}/kkpa`,
    },
  ];

  useEffect(() => {
    setData([
      {
        title: "Program Audit",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: "success",
        url: `/ewp/projects/konvensional/${id}/kkpa/${kkpa_id}/program-audit`,
      },
      {
        title: "Kriteria",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: "failed",
        url: `/ewp/projects/konvensional/${id}/kkpa/${kkpa_id}/kriteria`,
      },
      {
        title: "Ruang Lingkup",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: "success",
        url: `/ewp/projects/konvensional/${id}/kkpa/${kkpa_id}/ruang-lingkup`,
      },
      {
        title: "Pengujian Sample",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: "success",
        url: `/ewp/projects/konvensional/${id}/kkpa/${kkpa_id}/pengujian-sample`,
      },
      {
        title: "Pengujian Kontrol",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tristique elit ut bibendum. Quisque tellus lacus, rutrum vitae felis id, accumsan pharetra libero. Nullam quam odio, accumsan convallis velit et, ultrices sollicitudin lacus. Praesent tincidunt id mauris eu bibendum. Donec feugiat orci lorem, at sollicitudin erat vulputate sit amet. Nulla tincidunt mi nunc, nec malesuada mi interdum in. Quisque sollicitudin, dolor sed egestas accumsan, purus lacus hendrerit turpis, vel porttitor mi ligula id neque.",
        status: "failed",
        url: `/ewp/projects/konvensional/${id}/kkpa/${kkpa_id}/pengujian-kontrol`,
      },

      {
        title: "Kesimpulan",
        description: "Pembentukan tim audit.",
        status: "success",
        url: `/ewp/projects/konvensional/${id}/kkpa/${kkpa_id}/kesimpulan`,
      },
      {
        title: "Dokumen KKPA",
        description: "Pembentukan tim audit.",
        status: "success",
        url: `/ewp/projects/konvensional/${id}/mapa/dokumen`,
      },
    ]);
  }, [mapaStatusEWP]);

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

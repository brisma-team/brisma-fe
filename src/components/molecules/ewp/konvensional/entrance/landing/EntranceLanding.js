import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useEffect, useState } from "react";

const EntranceLanding = () => {
  const { id } = useRouter().query;
  const [data, setData] = useState([]);
  const baseUrl = `/ewp/projects/konvensional/${id}/entrance`;
  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Entrance Meeting`,
      path: `/ewp/projects/konvensional/${id}/entrance`,
    },
  ];

  useEffect(() => {
    setData([
      {
        title: "Daftar Kehadiran",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
        status: "success",
        url: `${baseUrl}/attendance`,
      },
      {
        title: "Notulen",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
        status: "failed",
        url: `${baseUrl}/notulen`,
      },
      {
        title: "Berita Acara",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
        status: "failed",
        url: `${baseUrl}/berita-acara`,
      },
    ]);
  }, []);

  return (
    <>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-start items-center mb-6">
        <PageTitle text="Entrance" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
    </>
  );
};

export default EntranceLanding;

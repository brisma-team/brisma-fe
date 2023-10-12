import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useEffect, useState } from "react";

const EntranceLanding = ({ data }) => {
  const { id } = useRouter().query;
  const [cards, setCards] = useState([]);
  const baseUrl = `/ewp/projects/konvensional/${id}/entrance/${data?.attendance_id}`;
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
    setCards([
      {
        title: "Daftar Kehadiran",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
        status: data?.status_filled?.attendance ? "success" : "failed",
        url: `${baseUrl}/attendance/${data?.attendance_id}`,
      },
      {
        title: "Notulen",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
        status: data?.status_filled?.notulen ? "success" : "failed",
        url: `${baseUrl}/notulen/${data?.notulen_id}`,
      },
      {
        title: "Berita Acara",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
        status: data?.status_filled?.berita_acara ? "success" : "failed",
        url: `${baseUrl}/berita-acara/${data?.ba_id}`,
      },
    ]);
  }, [data]);

  return (
    <>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-start items-center mb-6">
        <PageTitle text="Entrance" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {cards.map((v, i) => {
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

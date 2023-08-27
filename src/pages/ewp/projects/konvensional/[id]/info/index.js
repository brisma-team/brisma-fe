import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import {
  ProjectDetail,
  InformativeLetter,
  RealizationTable,
} from "@/components/molecules/ewp/konvensional/info";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";

const index = () => {
  const { id } = useRouter().query;

  const { auditorEWP } = useAuditorEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Info`,
      path: `/ewp/projects/konvensional/${id}/info`,
    },
  ];

  return (
    <LandingLayoutEWP>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Info" />
        <div className="mt-7">
          <Card>
            <div className="px-6 pt-1 pb-3 w-full">
              <div className="flex gap-9">
                <ProjectDetail data={auditorEWP?.data?.project_info} />
                {
                  // Jika jadwalnya bukan dari PAT, maka tampilkan Informasi Surat
                  !auditorEWP?.data?.project_info?.is_pat ? (
                    <InformativeLetter data={auditorEWP?.data?.project_info} />
                  ) : (
                    // Jika dari jadwal PAT maka tidak perlu ditampilkan
                    <div className="w-full"></div>
                  )
                }
              </div>
              <div className="my-4"></div>
              <RealizationTable data={auditorEWP?.data?.realisasi} />
            </div>
          </Card>
        </div>
      </div>
    </LandingLayoutEWP>
  );
};

export default index;

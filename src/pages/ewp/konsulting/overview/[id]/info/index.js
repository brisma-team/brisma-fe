import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import {
  ProjectDetail,
  InformativeLetter,
  RealizationTable,
} from "@/components/molecules/ewp/konsulting/info";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { errorSwalTimeout, fetchApi } from "@/helpers";

import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;

  const [isError, setIsError] = useState(false);
  const [dataTables, setDataTables] = useState([]);
  const { projectDetail, projectDetailError, projectDetailMutate } =
    useProjectDetail({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${projectDetail?.data?.project_info?.project_id} / Info`,
      path: `/ewp/projects/konvensional/${id}/info`,
    },
  ];

  useEffect(() => {
    const status_code =
      parseInt(projectDetail?.data?.project_info?.status_kode) || 0;
    setDataTables([
      {
        is_open: status_code >= 2,
        is_close: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        status_code: 2,
        label: "Perencanaan",
        start_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        log: "Menambahkan Sesuatu...",
      },
      {
        is_open: status_code >= 4,
        is_close: projectDetail?.data?.realisasi?.entrance_meeting_real_end
          ? true
          : false,
        status_code: 4,
        label: "Analisa & Peluang Peningkatan",
        start_date:
          projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        log: "Menambahkan Sesuatu...",
      },
      {
        is_open: status_code >= 7,
        is_close: projectDetail?.data?.realisasi?.Penyusunan_LHA_real_end
          ? true
          : false,
        status_code: 7,
        label: "Meeting",
        start_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_start,
        end_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_end,
        log: "Menambahkan Sesuatu...",
      },
      {
        is_open: status_code >= 8,
        is_close: projectDetail?.data?.realisasi?.exit_meeting_real_end
          ? true
          : false,
        status_code: 8,
        label: "Monitoring",
        start_date: projectDetail?.data?.realisasi?.monitoring_real_start,
        end_date: projectDetail?.data?.realisasi?.monitoring_real_end,
        log: "Menambahkan Sesuatu...",
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (projectDetailError) {
      setIsError(true);
    }
  }, [projectDetailError]);

  const handleClickInitiate = async (statusCode, type) => {
    const pathMappings = {
      2: "mapa",
      4: "pelaksanaan",
      7: "wrapup_meeting",
      8: "monitoring",
    };

    let path = pathMappings[statusCode] || "";
    path += `/${type === "close" ? "close" : "initiate"}`;

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${path}/${id}`,
      {}
    );
    projectDetailMutate();
  };

  if (isError) {
    errorSwalTimeout(projectDetailError, "/ewp/konsulting/overview");
  }

  return (
    <LandingLayoutEWPConsulting>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Info" />
        <div className="mt-7">
          <Card>
            <div className="px-6 pt-1 pb-3 w-full">
              <div className="flex gap-9">
                <ProjectDetail data={projectDetail?.data?.project_info} />
                {
                  // Jika jadwalnya bukan dari PAT, maka tampilkan Informasi Surat
                  !projectDetail?.data?.project_info?.is_pat ? (
                    <InformativeLetter
                      data={projectDetail?.data?.project_info}
                    />
                  ) : (
                    // Jika dari jadwal PAT maka tidak perlu ditampilkan
                    <div className="w-full"></div>
                  )
                }
              </div>
              <div className="my-4"></div>
              <RealizationTable
                data={dataTables}
                currentStatusCode={parseInt(
                  projectDetail?.data?.project_info?.status_kode
                )}
                handleClickInitiate={handleClickInitiate}
              />
            </div>
          </Card>
        </div>
      </div>
    </LandingLayoutEWPConsulting>
  );
};

export default index;

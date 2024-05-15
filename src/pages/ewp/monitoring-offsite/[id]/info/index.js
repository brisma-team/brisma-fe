import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { NavigationTab } from "@/components/molecules/commons";
import {
  ProjectDetail,
  RealizationTable,
  RelatedProjectTable,
  // CardPATInfo,
} from "@/components/molecules/ewp/monitoring-offsite/info";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { useRelatedProject } from "@/data/ewp/monitoring-offsite/info";
import { errorSwalTimeout, fetchApi } from "@/helpers";

import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const navigationTabItems = [
    { idx: 1, title: "Project Details" },
    { idx: 2, title: "Proyek Terkait" },
    // { idx: 3, title: "Info P.A.T" },
  ];
  const [isError, setIsError] = useState(false);
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [dataTables, setDataTables] = useState([]);
  const [dataRelatedTables, setDataRelatedTables] = useState([]);
  const { relatedProject } = useRelatedProject({ id });
  const { projectDetail, projectDetailError, projectDetailMutate } =
    useProjectDetail({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP - Monitoring Offsite", path: "/ewp" },
    {
      name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Info`,
      path: `/ewp/monitoring-offsite/${id}/info`,
    },
  ];

  useEffect(() => {
    const status_code =
      parseInt(projectDetail?.data?.project_info?.status_kode) || 0;

    setDataTables([
      {
        is_open: true,
        is_onprogress: status_code === 2,
        is_close: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        status_code: 2,
        label: "Perencanaan",
        start_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        url: `/ewp/monitoring-offsite/${id}/perencanaan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        is_onprogress: status_code === 4,
        is_close: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        status_code: 4,
        label: "Pelaksanaan",
        start_date:
          projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        url: `/ewp/monitoring-offsite/${id}/pelaksanaan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        is_onprogress: status_code === 10,
        is_close: projectDetail?.data?.realisasi?.reporting_audit_real_end
          ? true
          : false,
        status_code: 10,
        label: "Reporting",
        start_date: projectDetail?.data?.realisasi?.reporting_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.reporting_audit_real_end,
        url: `/ewp/monitoring-offsite/${id}/reporting`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.reporting_audit_real_end,
        is_onprogress: status_code === 11,
        is_close: projectDetail?.data?.realisasi?.tindak_lanjut_real_end
          ? true
          : false,
        status_code: 11,
        label: "Tindak Lanjut",
        start_date: projectDetail?.data?.realisasi?.tindak_lanjut_real_start,
        end_date: projectDetail?.data?.realisasi?.tindak_lanjut_real_end,
        url: `/ewp/monitoring-offsite/${id}/tindak-lanjut`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (relatedProject?.data?.length) {
      setDataRelatedTables(relatedProject?.data);
    }
  }, [projectDetail]);

  useEffect(() => {
    if (projectDetailError) {
      setIsError(true);
    }
  }, [projectDetailError]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  const handleClickLog = () => {
    router.push(`/ewp/monitoring-offsite/${id}/log`);
  };

  const handleClickInitiate = async (statusCode, type) => {
    const pathMappings = {
      2: "mapa",
      4: "pelaksanaan",
      10: "reporting",
      11: "tindak-lanjut",
      9: "final",
    };

    let path = pathMappings[statusCode] || "";
    path += `/${type === "close" ? "close" : "initiate"}`;

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/initiate/${path}/${id}`,
      {}
    );
    projectDetailMutate();
  };

  if (isError) {
    errorSwalTimeout(projectDetailError, "/ewp/monitoring-offsite");
  }

  return (
    <LandingLayoutEWPMonOff>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Info" />
        <div className="mt-7">
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            width={"w-60"}
            handleChange={handleChangeTab}
          />
          {currentContentStage === 1 ? (
            <div className="w-full">
              <Card>
                <div className="px-6 pt-1 pb-3 w-full">
                  <div className="flex gap-9 w-1/2">
                    <ProjectDetail data={projectDetail?.data?.project_info} />
                  </div>
                  <div className="my-4"></div>
                  <RealizationTable
                    data={dataTables}
                    handleClickInitiate={handleClickInitiate}
                    handleClickLog={handleClickLog}
                  />
                </div>
              </Card>
            </div>
          ) : currentContentStage === 2 ? (
            <RelatedProjectTable data={dataRelatedTables} />
          ) : (
            ""
            // <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
            //   <CardPATInfo data={[]} />
            // </div>
          )}
        </div>
      </div>
    </LandingLayoutEWPMonOff>
  );
};

export default index;

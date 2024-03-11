import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { NavigationTab } from "@/components/molecules/commons";
import {
  ProjectDetail,
  InformativeLetter,
  RealizationTable,
  RelatedProjectTable,
  UkerInfoTable,
} from "@/components/molecules/ewp/konsulting/info";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { errorSwalTimeout, fetchApi } from "@/helpers";

import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const { id } = useRouter().query;
  const navigationTabItems = [
    { idx: 1, title: "Project Details" },
    { idx: 2, title: "Proyek Terkait" },
    { idx: 3, title: "UKER Info" },
  ];
  const [isError, setIsError] = useState(false);
  const [currentContentStage, setCurrentContentStage] = useState(1);
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
    console.log("status_kode => ", status_code);
    setDataTables([
      {
        is_open: status_code >= 2,
        is_close: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        prev_status_code: 1,
        status_code: 2,
        label: "Perencanaan",
        start_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        url: `/ewp/konsulting/overview/${id}/perencanaan`,
        log: "Menambahkan Sesuatu...",
      },
      {
        is_open: status_code >= 4,
        is_close: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        prev_status_code: 2,
        status_code: 4,
        label: "Analisa",
        start_date:
          projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        url: `/ewp/konsulting/overview/${id}/analisa/lingkup`,
        log: "Menambahkan Sesuatu...",
      },
      {
        is_open: status_code >= 6,
        is_close: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end
          ? true
          : false,
        prev_status_code: 4,
        status_code: 6,
        label: "Peluang Peningkatan",
        start_date:
          projectDetail?.data?.realisasi?.peluang_peningkatan_real_start,
        end_date: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end,
        url: `/ewp/konsulting/overview/${id}/peluang-peningkatan`,
        log: "Menambahkan Sesuatu...",
      },
      {
        is_open: status_code >= 8,
        is_close: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_end
          ? true
          : false,
        prev_status_code: 6,
        status_code: 8,
        label: "Wrap-Up",
        start_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_start,
        end_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_end,
        url: `/ewp/konsulting/overview/${id}/wrapup`,
        log: "Menambahkan Sesuatu...",
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (projectDetailError) {
      setIsError(true);
    }
  }, [projectDetailError]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  const handleClickInitiate = async (statusCode, type) => {
    const pathMappings = {
      2: "mapa",
      4: "pelaksanaan",
      6: "peluang_peningkatan",
      8: "wrapup_meeting",
      9: "final",
    };

    let path = pathMappings[statusCode] || "";
    path += `/${type === "close" ? "close" : "initiate"}`;

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/initiate/${path}/${id}`,
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
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            width={"w-80"}
            handleChange={handleChangeTab}
          />
          {currentContentStage === 1 ? (
            <div className="w-full">
              <Card>
                <div className="px-6 pt-1 pb-3 w-full">
                  <div className="flex gap-9">
                    <ProjectDetail data={projectDetail?.data?.project_info} />
                    <InformativeLetter
                      data={projectDetail?.data?.project_info}
                    />
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
              <div className="w-full flex items-center justify-end mt-4">
                <div className="w-48 text-sm font-semibold my-1 bg-atlasian-red rounded">
                  <ButtonField
                    text={"Ubah Project Info"}
                    handler={() => console.log("test")}
                  />
                </div>
              </div>
            </div>
          ) : currentContentStage === 2 ? (
            <RelatedProjectTable data={[]} />
          ) : (
            <UkerInfoTable data={[]} />
          )}
        </div>
      </div>
    </LandingLayoutEWPConsulting>
  );
};

export default index;

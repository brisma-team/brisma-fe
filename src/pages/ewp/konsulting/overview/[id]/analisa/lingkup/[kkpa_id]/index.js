import { Breadcrumbs, Card, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/ewp/konsulting/landing";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id, kkpa_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameSubModulAnalisa = `${baseUrl}/analisa`;
  const pathNameLandingPage = `${baseUrl}/analisa/lingkup/${kkpa_id}`;

  const [dataInfo, setDataInfo] = useState([]);
  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { projectDetail } = useProjectDetail({ id });
  const { landingStatus } = useLandingStatus({ type: "kkpa", id: kkpa_id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Analisa / Lingkup Konsulting Ringkasan`,
        path: `${pathNameSubModulAnalisa}/lingkup`,
      },
      {
        name: `Kertas Kerja`,
        path: `${pathNameLandingPage}`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (landingStatus?.data) {
      const responseInfo = landingStatus?.data?.info;
      const mappingDataInfo = [
        {
          label: "P.I.C Auditor",
          value: responseInfo?.auditor?.name,
        },
        {
          label: "Status",
          value: responseInfo?.status_persetujuan,
        },
        {
          label: "Lingkup Pemeriksaan",
          value:
            responseInfo?.mapa_uker_mcr?.lingkup_pemeriksaan
              ?.judul_lingkup_pemeriksaan,
        },
        {
          label: "Risk Issue",
          value: `${responseInfo?.mapa_uker_mcr?.mtd_risk_issue?.abbr} - ${responseInfo?.mapa_uker_mcr?.mtd_risk_issue?.nama}`,
        },
        {
          label: "Control",
          value: `${responseInfo?.mapa_uker_mcr_control?.mtd_control?.abbr} - ${responseInfo?.mapa_uker_mcr_control?.mtd_control?.nama}`,
        },
      ];

      const mappingDataCarding = [
        {
          title: "Analisis Data",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.analisis_data ? "success" : "failed",
          url: `${pathNameLandingPage}/analisis-data`,
        },
        {
          title: "Resume",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.resume ? "success" : "failed",
          url: `${pathNameLandingPage}/resume`,
        },
        {
          title: "Hasil Analisa",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.hasil_analisa ? "success" : "failed",
          url: `${pathNameLandingPage}/hasil-analisa`,
        },
        {
          title: "Rekomendasi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.rekomendasi ? "success" : "failed",
          url: `${pathNameLandingPage}/rekomendasi`,
        },
        {
          title: "Dokumen",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status:
            landingStatus?.data?.status_persetujuan === "Final"
              ? "success"
              : "failed",
          url: `${pathNameLandingPage}/dokumen`,
        },
      ];

      setDataInfo(mappingDataInfo);
      setDataCarding(mappingDataCarding);
    } else {
      setDataInfo([]);
      setDataCarding([]);
    }
  }, [landingStatus]);

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Kertas Kerja Analisa" />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-3">
        <Card>
          <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-2 px-4">
            {dataInfo?.length
              ? dataInfo?.map((v, i) => {
                  return (
                    <Card key={i}>
                      <div className="w-full px-6 min-h-[4rem]">
                        <p className="font-bold text-sm">{v?.label}</p>
                        <p className="text-sm mt-0">{v?.value}</p>
                      </div>
                    </Card>
                  );
                })
              : ""}
          </div>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {dataCarding.map((v, i) => {
            return (
              <CardLanding
                key={i}
                title={v?.title}
                description={v?.description}
                status={v?.status}
                url={v?.url}
              />
            );
          })}
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

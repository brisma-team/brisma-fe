import { Breadcrumbs, Card, CardLanding, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useLandingStatus } from "@/data/ewp/konsulting/peluang-peningkatan/matrix/detail";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const { id, matrix_id, kkpt_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan`;
  const pathNameOverview = `${baseUrl}/peluang-peningkatan/${matrix_id}/overview`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${matrix_id}/overview/${kkpt_id}`;

  const [dataInfo, setDataInfo] = useState([]);
  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { projectDetail } = useProjectDetail({ id });
  const { landingStatus } = useLandingStatus(kkpt_id);
  console.log(landingStatus);

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
        name: `Peluang Peningkatan`,
        path: `${pathNameBase}`,
      },
      {
        name: `Overview`,
        path: `${pathNameOverview}`,
      },
      {
        name: `Landing Peluang Peningkatan`,
        path: `${pathNameContent}`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (landingStatus?.data) {
      const responseInfo = landingStatus?.data?.info;
      const mappingDataInfo = [
        {
          label: "Judul Peluang",
          value: responseInfo?.judul_kkpt || "N/A",
        },
        {
          label: "P.I.C Auditor",
          value: responseInfo?.auditor?.name || "N/A",
        },
        {
          label: "Kode Lingkup",
          value: "N/A",
        },
        {
          label: "Kode Risk",
          value: "N/A",
        },
        {
          label: "Kode Control",
          value: "N/A",
        },
      ];

      const mappingDataCarding = [
        {
          title: "Kondisi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.kondisi ? "success" : "failed",
          url: `${pathNameContent}/kondisi`,
        },
        {
          title: "Sebab",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.sebab ? "success" : "failed",
          url: `${pathNameContent}/sebab`,
        },
        {
          title: "Risk Issue dan Rekomendasi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.risk_rekomendasi ? "success" : "failed",
          url: `${pathNameContent}/#`,
        },
        {
          title: "Tanggapan Client",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.tanggapan_management
            ? "success"
            : "failed",
          url: `${pathNameContent}/tanggapan-client`,
        },
        {
          title: "Dokumen",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: landingStatus?.data?.doc === "Final" ? "success" : "failed",
          url: `${pathNameContent}/dokumen`,
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
        <PageTitle text="Peluang Peningkatan" />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-3">
        <Card>
          <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4 py-2 px-4">
            {dataInfo?.length
              ? dataInfo?.map((v, i) => {
                  return (
                    <Card key={i}>
                      <div className="w-full px-4 min-h-[4rem]">
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

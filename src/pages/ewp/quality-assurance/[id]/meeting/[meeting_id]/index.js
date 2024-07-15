import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useLandingStatus } from "@/data/ewp/common/meeting";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuditInfo } from "@/data/ewp/common/info";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    meeting_id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathNameSubModulMeeting = `${baseUrl}/meeting`;
  const pathNameLandingPage = `${pathNameSubModulMeeting}/${params?.meeting_id}`;

  const [dataCarding, setDataCarding] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { auditInfo } = useAuditInfo({ id: params?.id, module: "qa" });
  const { landingStatus } = useLandingStatus({ id: params?.meeting_id });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, meeting_id } = router.query;
    setParams({
      id,
      meeting_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Meeting`,
        path: pathNameSubModulMeeting,
      },
      {
        name: `Entrance`,
        path: `${pathNameSubModulMeeting}/${params?.meeting_id}`,
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      const mappingDataCarding = [
        {
          title: "Daftar Kehadiran",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: !landingStatus?.data?.attendance?.is_open
            ? "success"
            : "failed",
          url: `${pathNameLandingPage}/attendance`,
        },
        {
          title: "Notulen",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.notulen?.content ? "success" : "failed",
          url: `${pathNameLandingPage}/notulen`,
        },
        {
          title: "Berita Acara",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
          status: landingStatus?.data?.ba?.content ? "success" : "failed",
          url: `${pathNameLandingPage}/berita-acara`,
        },
      ];

      setDataCarding(mappingDataCarding);
    } else {
      setDataCarding([]);
    }
  }, [landingStatus]);

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Meeting" />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-3">
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

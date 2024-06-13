import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useLandingStatus } from "@/data/ewp/common";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const [data, setData] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "reporting",
    id: params?.id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: "Reporting",
        path: baseUrl + "/reporting",
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      const matrix_id = landingStatus?.data?.id;
      setData([
        {
          title: "List Survei QA",
          description: "Daftar Survei Quality Assurance.",
          status: landingStatus?.data?.list_survey_qa ? "success" : "failed",
          url: `${baseUrl}/reporting/${matrix_id}/list`,
        },
        {
          title: "Dokumen Reporting",
          description: "List Dokumen Reporting Quality Assurance.",
          status: landingStatus?.data?.dokumen_reporting ? "success" : "failed",
          url: `${baseUrl}/reporting/${matrix_id}/dokumen-reporting`,
        },
      ]);
    } else {
      setData([]);
    }
  }, [landingStatus]);

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Reporting Landing" />
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

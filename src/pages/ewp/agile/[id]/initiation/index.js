import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useLandingStatus } from "@/data/ewp/common";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [data, setData] = useState([]);

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "agile",
    submodule: "assesment",
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
    if (auditInfo?.data) {
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "EWP", path: "/ewp" },
        { name: "Overview", path: "/ewp/agile" },
        {
          name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
          path: `${baseUrl}/info`,
        },
        { name: "Project Initiation", path: `${baseUrl}/initiation` },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      setData([
        {
          title: "Audit Canvas",
          description: "Project Mind-mapping BMC.",
          status: landingStatus?.data?.audit_canvas ? "success" : "failed",
          url: `${baseUrl}/initiation/audit-canvas`,
        },
        {
          title: "Working Agreements",
          description: "Project guidelines.",
          status: landingStatus?.data?.working_aggreements
            ? "success"
            : "failed",
          url: `${baseUrl}/initiation/working-agreements`,
        },
        {
          title: "Documents",
          description:
            "Tempat merangkum dan menginisiasi proposal workflow approval",
          url: `${baseUrl}/initiation/dokumen`,
        },
      ]);
    } else {
      setData([]);
    }
  }, [landingStatus]);

  return (
    <LandingLayoutEWPAgile>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Project Initiation" />
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
    </LandingLayoutEWPAgile>
  );
};

export default index;

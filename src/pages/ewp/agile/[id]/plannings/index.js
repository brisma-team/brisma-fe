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

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "agile",
    submodule: "perencanaan",
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
        { name: "Project Plannings", path: `${baseUrl}/plannings` },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      setData([
        {
          title: "Story Aggregations",
          description:
            "Fitur utama pada flow Agile Method. Dimana segala macam kegiatan dan kebutuhan dari proyek dijabarkan.",
          status: landingStatus?.data?.aggregation ? "success" : "failed",
          url: `${baseUrl}/plannings/story-aggregations`,
        },
        {
          title: "User Story (CRUD)",
          description:
            "Penjabaran kebutuhan audit sebagai parent dari implementasi kegiatan audit.",
          status: landingStatus?.data?.audit_backlog ? "success" : "failed",
          url: `${baseUrl}/plannings/user-story`,
        },
        {
          title: "Audit Backlog (CRUD)",
          description:
            "Fitur utama pada flow Agile Method. Dimana segala macam kegiatan dan kebutuhan dari proyek dijabarkan.",
          status: landingStatus?.data?.audit_backlog ? "success" : "failed",
          url: `${baseUrl}/plannings/audit-backlog`,
        },
        {
          title: "Sprint Planning",
          description:
            "Bagian ini memuat business value atau Tujuan  yang diharapkan dari melakukan audit di area tersebut.",
          status: landingStatus?.data?.sprint_planning ? "success" : "failed",
          url: `${baseUrl}/plannings/sprint-planning`,
        },
        {
          title: "Dokumen",
          description:
            "Tempat merangkum dan menginisiasi proposal workflow approval.",
          url: `${baseUrl}/plannings/dokumen`,
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
        <PageTitle text="Project Plannings" />
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

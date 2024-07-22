import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
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
        { name: "Project Executions", path: `${baseUrl}/executions` },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    setData([
      {
        title: "Audit Backlog",
        description:
          "Fitur utama pada flow Agile Method. Dimana segala macam kegiatan dan kebutuhan dari proyek dijabarkan.",
        url: `${baseUrl}/executions/audit-backlog`,
      },
      {
        title: "Sprint Executions",
        description:
          "Bagian ini memuat data yang menampilkan User Story yang dikelompokkan berdasarkan Sprint.",
        url: `${baseUrl}/executions/sprint-executions`,
      },
    ]);
  }, [params]);

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

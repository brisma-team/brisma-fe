import React, { useEffect, useState } from "react";
import { Breadcrumbs, CardLanding, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useObjectAuditDetailRPM } from "@/data/rpm/common";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
  });
  const baseUrl = `/rpm/quality-assurance/${params?.id}/overview/${params?.kkpt_id}`;

  const [data, setData] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { objectAuditDetailRPM } = useObjectAuditDetailRPM({
    id: params?.id,
    kkpt_id: params?.kkpt_id,
    module: "qa",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, kkpt_id } = router.query;
    setParams({
      id,
      kkpt_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Overview", path: "/rpm/quality-assurance" },
      {
        name: objectAuditDetailRPM?.data?.project?.project_id?.toUpperCase(),
        path: `/rpm/quality-assurance/${params?.id}/overview`,
      },
      {
        name: "Landing",
        path: baseUrl,
      },
    ]);
  }, [objectAuditDetailRPM]);

  useEffect(() => {
    if (params?.id) {
      setData([
        {
          title: "Tindak Lanjut",
          description: "Tindak lanjut action plan dalam ranah Submitter.",
          url: `${baseUrl}/tindak-lanjut`,
        },
        {
          title: "Evaluasi",
          description: "Evaluasi action plan dalam ranah Evaluator.",
          url: `${baseUrl}/evaluasi`,
        },
        {
          title: "Negosiasi",
          description: "Negosiasi action plan dalam ranah Negotiator.",
          url: `${baseUrl}/negosiasi`,
        },
        {
          title: "Summary",
          description:
            "Kesimpulan seluruh rangkaian monitoring tindak lanjut, evaluasi, dan negosiasi.",
          url: `${baseUrl}/summary`,
        },
      ]);
    } else {
      setData([]);
    }
  }, [params]);

  return (
    <LandingLayoutRPM
      module_page={"quality-assurance"}
      module_data={"qa"}
      withObjectAuditInfo
    >
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="mb-6">
        <PageTitle text={"Object Landing"} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {data.map((v, i) => {
          return (
            <CardLanding
              key={i}
              title={v?.title}
              description={v?.description}
              url={v?.url}
            />
          );
        })}
      </div>
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;

import React, { useEffect, useState } from "react";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { TableObjectOverview } from "@/components/molecules/rpm/common/object-overview";
import { useObjectOverview } from "@/data/rpm/common/object-overview";
import { useProjectDetailRPM } from "@/data/rpm/common";
import _ from "lodash";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });

  const [data, setData] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { projectDetailRPM } = useProjectDetailRPM({
    id: params?.id,
    module: "qa",
  });
  const { objectOverview } = useObjectOverview({
    id: params?.id,
    module: "qa",
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
      { name: "RPM", path: "/rpm" },
      { name: "Overview", path: "/rpm/quality-assurance" },
      {
        name: projectDetailRPM?.data?.project?.project_id?.toUpperCase(),
        path: `/rpm/quality-assurance/${params?.id}/overview`,
      },
      {
        name: "Object Overview",
        path: `/rpm/quality-assurance/${params?.id}/overview`,
      },
    ]);
  }, [projectDetailRPM]);

  useEffect(() => {
    if (objectOverview?.data?.kkpt?.length) {
      const mapping = objectOverview?.data?.kkpt?.map((data) => {
        return {
          ..._.pick(data, [
            "id",
            "total_rekomendasi",
            "total_action_plan",
            "total_memadai",
          ]),
          project_id:
            data?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_id,
          project_name:
            data?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_name,
          branch: {
            kode: data?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.mapa_uker
              ?.ref_auditee_branch_kode,
            name: data?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.mapa_uker
              ?.ref_auditee_branch_name,
          },
          orgeh: {
            kode: data?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.mapa_uker
              ?.ref_auditee_orgeh_kode,
            name: data?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.mapa_uker
              ?.ref_auditee_orgeh_name,
          },
          survey_id:
            data?.kkpt_ewp?.kkpt?.kkpa?.project_survey?.project_survey_id,
        };
      });
      setData(mapping);
    } else {
      setData([]);
    }
  }, [objectOverview]);

  return (
    <LandingLayoutRPM module_page={"quality-assurance"} module_data={"qa"}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="mb-6">
        <PageTitle text={"Object Overview"} />
      </div>
      <TableObjectOverview
        data={data}
        pathName={`/rpm/quality-assurance/${params?.id}/overview`}
      />
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;

import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/agile/executions/auditBacklogExecutionEWPAgileSlice";
import _ from "lodash";
import { TableAuditBacklog } from "@/components/molecules/ewp/agile/executions/audit-backlog";
import { useAuditBacklog } from "@/data/ewp/agile/executions/audit-backlog";

const routes = [
  {
    name: "Audit Backlog",
    slug: "audit-backlog",
  },
  {
    name: "Sprint Executions",
    slug: "sprint-executions",
  },
  {
    name: "Sprint Working Papper",
    slug: "sprint-working-papper",
  },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/executions`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const data = useSelector(
    (state) => state.auditBacklogExecutionEWPAgile.objData
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { auditBacklog } = useAuditBacklog({
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
          path: `/ewp/agile/${params?.id}`,
        },
        { name: "Project Executions", path: baseUrl },
        {
          name: "Audit Backlog",
          path: `${baseUrl}/audit-backlog`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (auditBacklog?.data?.length) {
      const mapping = auditBacklog?.data?.map((v) => {
        return {
          ..._.pick(v, ["id", "feature", "priority", "user_story_desc"]),
          status: v?.status_penyelesaian,
          sprint: v?.sprint?.no
            ? { no: v?.sprint?.no, nama: v?.sprint?.sprint_name }
            : null,
          uker: v?.user_stories_uker?.length
            ? v?.user_stories_uker?.map((uker) => {
                return {
                  branch: {
                    kode: uker?.ref_auditee_branch_kode,
                    nama: uker?.ref_auditee_branch_name,
                  },
                  orgeh: {
                    kode: uker?.ref_auditee_orgeh_kode,
                    nama: uker?.ref_auditee_orgeh_name,
                  },
                };
              })
            : [],
          risk_issue: {
            kode: v?.ref_risk_issue_kode,
            abbr: v?.ref_risk_issue_abbr,
            nama: v?.ref_risk_issue_name,
          },
          sub_major: _.pick(v?.mtd_risk_issue?.mtd_sub_major_proses, [
            "kode",
            "abbr",
            "nama",
          ]),
          mandays: v?.estimate,
          dor: v?.definition_of_ready,
          dod: v?.definition_of_done,
          operating: v?.user_story_task?.length
            ? v?.user_story_task?.filter(
                (user_story) => user_story?.task_type_kode === 1
              )
            : [],
          design: v?.user_story_task?.length
            ? v?.user_story_task?.filter(
                (user_story) => user_story?.task_type_kode === 2
              )
            : [],
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [auditBacklog]);

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[95rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-7">
          <PageTitle text="Audit Backlog" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            nextUrl={"/sprint-executions"}
            marginLeft={"-80px"}
            widthDropdown={"w-[16rem]"}
          />
        </div>
        {/* Start Content */}
        <TableAuditBacklog data={data} />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

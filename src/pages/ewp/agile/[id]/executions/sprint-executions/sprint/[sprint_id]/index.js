import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataWorkingPapper,
  resetObjDataWorkingPapper,
} from "@/slices/ewp/agile/executions/workingPapperExecutionEWPAgileSlice";
import { useDetailSprint } from "@/data/ewp/agile/plannings/sprint-planning";
import { useWorkingPapper } from "@/data/ewp/agile/executions/working-papper";
import _ from "lodash";
import { TableWorkingPapper } from "@/components/molecules/ewp/agile/executions/working-papper";
const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    sprint_id: 0,
  });

  const baseUrl = `/ewp/agile/${params?.id}/executions`;
  const [pageTitle, setPageTitle] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const dataWorkingPapper = useSelector(
    (state) => state.workingPapperExecutionEWPAgile.objDataWorkingPapper
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { workingPapper } = useWorkingPapper({
    id: params?.id,
    sprint_id: params?.sprint_id,
  });
  const { detailSprint } = useDetailSprint({ id: params?.sprint_id });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, sprint_id } = router.query;
    setParams({
      id,
      sprint_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (workingPapper?.data?.length) {
      const mapping = workingPapper?.data?.map((v) => {
        return {
          ..._.pick(v, ["kkpa_id", "auditor", "risk_issue", "sub_major"]),
          status: v?.status_persetujuan,
          uker: v?.story_uker,
          sub_major: v?.sub_major_proses,
        };
      });
      dispatch(setObjDataWorkingPapper(mapping));
    } else {
      dispatch(resetObjDataWorkingPapper());
    }
  }, [workingPapper]);

  useEffect(() => {
    if (auditInfo?.data && detailSprint?.data) {
      const responseSprint = detailSprint?.data;
      setPageTitle(`${responseSprint?.no} - ${responseSprint?.sprint_name}`);
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
          name: "Sprint Executions",
          path: `${baseUrl}/sprint-executions`,
        },
        {
          name: "Sprint",
          path: `${baseUrl}/sprint-executions/${params?.user_story_id}`,
        },
      ]);
    } else {
      setPageTitle("");
      setBreadcrumbs([]);
    }
  }, [auditInfo, detailSprint]);

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[95rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex gap-3 items-center mb-7">
          <ButtonIconBack backUrl={`${baseUrl}/sprint-executions`} />
          <PageTitle text={pageTitle} />
        </div>
        {/* Start Content */}
        <div className="flex flex-col gap-4">
          <TableWorkingPapper data={dataWorkingPapper} pathName={baseUrl} />
        </div>
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

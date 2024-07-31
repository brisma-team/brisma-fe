import {
  Breadcrumbs,
  ButtonIconBack,
  CardLanding,
  PageTitle,
} from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { useSelector, useDispatch } from "react-redux";
import { useDetailSprint } from "@/data/ewp/agile/plannings/sprint-planning";
import {
  setObjDataWorkingPapper,
  setObjDataMenu,
  resetObjDataWorkingPapper,
  resetObjDataMenu,
} from "@/slices/ewp/agile/executions/workingPapperExecutionEWPAgileSlice";
import {
  useWorkingPapperDetail,
  useWorkingPapperStatus,
} from "@/data/ewp/agile/executions/working-papper";
import _ from "lodash";
import { CardContentWorkingPapperDetail } from "@/components/molecules/ewp/agile/executions/working-papper";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    sprint_id: 0,
    kkpa_id: 0,
  });

  const baseUrl = `/ewp/agile/${params?.id}/executions`;
  const pathSprint = `${baseUrl}/sprint-executions/sprint/${params?.sprint_id}`;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const dataWorkingPapper = useSelector(
    (state) => state.workingPapperExecutionEWPAgile.objDataWorkingPapper
  );
  const dataMenu = useSelector(
    (state) => state.workingPapperExecutionEWPAgile.objDataMenu
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { workingPapperDetail } = useWorkingPapperDetail({
    id: params?.kkpa_id,
  });
  const { workingPapperStatus } = useWorkingPapperStatus({
    id: params?.kkpa_id,
  });
  const { detailSprint } = useDetailSprint({ id: params?.sprint_id });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, sprint_id, kkpa_id } = router.query;
    setParams({
      id,
      sprint_id,
      kkpa_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (workingPapperDetail?.data) {
      const response = workingPapperDetail?.data;
      dispatch(
        setObjDataWorkingPapper({
          ..._.pick(response, [
            "auditor",
            "status_persetujuan",
            "risk_issue",
            "sub_major_proses",
          ]),
          uker: response?.story_uker,
        })
      );
    } else {
      dispatch(resetObjDataWorkingPapper());
    }
  }, [workingPapperDetail]);

  useEffect(() => {
    if (workingPapperStatus?.data) {
      dispatch(
        setObjDataMenu([
          {
            title: "Design Effectiveness",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
            status: workingPapperStatus?.data?.design_effectiveness
              ? "success"
              : "failed",
            url: `${pathSprint}/design-effectiveness`,
          },
          {
            title: "Operating Effectiveness",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
            status: workingPapperStatus?.data?.operating_effectiveness
              ? "success"
              : "failed",
            url: `${pathSprint}/operating-effectiveness`,
          },
          {
            title: "Conclusion",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
            status: workingPapperStatus?.data?.kesimpulan
              ? "success"
              : "failed",
            url: `${pathSprint}/conclusion`,
          },
          {
            title: "Document",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna libero, lobortis non est quis, pharetra dignissim massa.",
            status: workingPapperStatus?.data?.dokument ? "success" : "failed",
            url: `${pathSprint}/dokumen`,
          },
        ])
      );
    } else {
      dispatch(resetObjDataMenu());
    }
  }, [workingPapperStatus]);

  useEffect(() => {
    if (auditInfo?.data && detailSprint?.data) {
      const responseSprint = detailSprint?.data;
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
          name: responseSprint?.sprint_name,
          path: pathSprint,
        },
        {
          name: "Working Papper",
          path: `${pathSprint}/working-papper/${params?.kkpa_id}`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo, detailSprint]);

  return (
    <LandingLayoutEWPAgile>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack backUrl={pathSprint} />
        <PageTitle text={"Working Papper"} />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-1">
        <CardContentWorkingPapperDetail data={dataWorkingPapper} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {dataMenu?.length
            ? dataMenu?.map((v, i) => {
                return (
                  <CardLanding
                    key={i}
                    title={v.title}
                    description={v.description}
                    status={v.status}
                    url={v.url}
                  />
                );
              })
            : ""}
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPAgile>
  );
};

export default index;

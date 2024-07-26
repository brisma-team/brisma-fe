import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataSprintExecution,
  resetObjDataSprintExecution,
} from "@/slices/ewp/agile/executions/sprintExecutionEWPAgileSlice";
import {
  checkStatusSprint,
  confirmationSwal,
  fetchApi,
  loadingSwal,
} from "@/helpers";
import { useSprintExecution } from "@/data/ewp/agile/executions/sprint-execution";
import _ from "lodash";
import { TableSprintExecution } from "@/components/molecules/ewp/agile/executions/sprint-executions";
const routes = [
  {
    name: "Story Aggregations",
    slug: "story-aggregations",
  },
  {
    name: "Story Aggegations Selected",
    slug: "story-aggregations-selected",
  },
  {
    name: "Audit Backlog",
    slug: "audit-backlog",
  },
  {
    name: "Sprint Planning",
    slug: "sprint-planning",
  },
  { name: "Documents", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/executions`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [expansionMap, setExpansionMap] = useState({});

  const dataSprintExecution = useSelector(
    (state) => state.sprintExecutionEWPAgile.objDataSprintExecution
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { sprintExecution, sprintExecutionMutate } = useSprintExecution({
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
          name: "Sprint Executions",
          path: `${baseUrl}/sprint-executions`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (sprintExecution?.data?.length) {
      const sprintNow = checkStatusSprint(sprintExecution?.data);
      const mapping = sprintExecution?.data?.map((sprint, sprint_index) => {
        return {
          id: sprint?.id,
          sprint: { no: sprint?.no, nama: sprint?.sprint_name },
          status: sprint?.status_penyelesaian,
          is_open:
            sprint?.no === 1 ? true : sprint?.no === sprintNow ? true : false,
          is_onprogress: Boolean(sprint?.start_date_real),
          is_close: Boolean(sprint?.start_date_real && sprint?.end_date_real),
          role: "parent",
          children: sprint?.user_stories?.length
            ? sprint?.user_stories?.map((user_story, user_story_index) => {
                return {
                  ..._.pick(user_story, ["id", "comment"]),
                  sprint_index,
                  user_story_index,
                  risk_issue: {
                    kode: user_story?.ref_risk_issue_kode,
                    abbr: user_story?.ref_risk_issue_abbr,
                    nama: user_story?.ref_risk_issue_name,
                  },
                  uker: user_story?.user_stories_uker?.length
                    ? user_story?.user_stories_uker?.map((uker) => {
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
                  status: user_story?.status_penyelesaian,
                  completion_status: user_story?.user_story_desc,
                  role: "child",
                };
              })
            : [],
        };
      });
      dispatch(setObjDataSprintExecution(mapping));
    } else {
      dispatch(resetObjDataSprintExecution());
    }
  }, [sprintExecution]);

  useEffect(() => {
    console.log("dataSprint => ", dataSprintExecution);
  }, [dataSprintExecution]);

  // [ START ] handler for table
  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  // [ START ] sprint
  const handleClickInitiateSprint = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin memulai Sprint ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/sprint/start/${params?.id}`,
      { sprint_id: id }
    );
    sprintExecutionMutate();
    loadingSwal("close");
  };

  const handleClickTerminateSprint = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menyelesaikan Sprint ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/sprint/end/${params?.id}`,
      { sprint_id: id }
    );
    sprintExecutionMutate();
    loadingSwal("close");
  };
  // [ END ] sprint

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[95rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-7">
          <PageTitle text="Sprint Executions" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/audit-backlog"}
            nextUrl={"/dokumen"}
            marginLeft={"-95px"}
            widthDropdown={"w-[16rem]"}
          />
        </div>
        {/* Start Content */}
        <TableSprintExecution
          data={dataSprintExecution}
          pathName={`${baseUrl}/sprint-executions`}
          expansionMap={expansionMap}
          handleClickToggleExpansion={handleToggleExpansion}
          handleClickInitiate={handleClickInitiateSprint}
          handleClickTerminate={handleClickTerminateSprint}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

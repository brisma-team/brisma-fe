import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataUserStory,
  setObjDataTask,
  setObjDataTeam,
  setObjPayload,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjDataTeam,
  resetObjPayload,
} from "@/slices/ewp/agile/executions/storyPointDetailEWPAgileSlice";
import { fetchApi, infoSwal, loadingSwal } from "@/helpers";
import {
  CardContentStoryPointDetail,
  TableTask,
} from "@/components/molecules/ewp/agile/executions/story-point-detail";
import {
  useSprintTeam,
  useStoryPointDetail,
} from "@/data/ewp/agile/executions/story-point-detail";
import _ from "lodash";
const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    user_story_id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/executions`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [sprintId, setSprintId] = useState(0);

  const dataUserStory = useSelector(
    (state) => state.storyPointDetailEWPAgile.objDataUserStory
  );
  const dataTask = useSelector(
    (state) => state.storyPointDetailEWPAgile.objDataTask
  );
  const dataTeam = useSelector(
    (state) => state.storyPointDetailEWPAgile.objDataTeam
  );
  const payload = useSelector(
    (state) => state.storyPointDetailEWPAgile.objPayload
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { storyPointDetail, storyPointDetailMutate } = useStoryPointDetail({
    id: params?.user_story_id,
  });
  const { sprintTeam } = useSprintTeam({ id: sprintId });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, user_story_id } = router.query;
    setParams({
      id,
      user_story_id,
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
        {
          name: "Story Point Detail",
          path: `${baseUrl}/sprint-executions/${params?.user_story_id}`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (storyPointDetail?.data) {
      const response = storyPointDetail?.data;
      const team = [];
      if (sprintTeam?.data?.length) {
        sprintTeam?.data?.map((v) => {
          let role;
          switch (v?.stc_auditor_type_team_kode) {
            case "ma":
              role = "Product Owner";
              break;
            case "kta":
              role = "Scrum Master";
              break;
            case "ata":
              role = "Scrum Team";
              break;
          }
          team.push({
            role,
            pic: {
              pn: v?.pn_auditor,
              name: v?.nama_auditor,
            },
            is_initiator: Boolean(v?.is_initiator),
          });
        });
      }
      const mappingUserStory = {
        ..._.pick(response, [
          "feature",
          "priority",
          "estimate",
          "user_story_desc",
          "definition_of_ready",
          "definition_of_done",
        ]),
        sprint: {
          ..._.pick(response?.sprint, ["no", "start_date", "end_date"]),
          name: response?.sprint?.sprint_name,
        },
        risk: {
          abbr: response?.ref_risk_issue_abbr,
          name: response?.ref_risk_issue_name,
        },
        uker: response?.user_stories_uker?.length
          ? response?.user_stories_uker?.map((v) => {
              return {
                branch: {
                  kode: v?.ref_auditee_branch_kode,
                  nama: v?.ref_auditee_branch_name,
                },
                orgeh: {
                  kode: v?.ref_auditee_orgeh_kode,
                  nama: v?.ref_auditee_orgeh_name,
                },
              };
            })
          : [],
        team,
      };
      if (response?.user_story_task?.length) {
        const mapping = response?.user_story_task?.map((task) => {
          return {
            ..._.pick(task, ["id", "comment", "description"]),
            task_type: {
              kode: task?.task_type_kode,
              nama: task?.task_type_name,
            },
            status: task?.status_penyelesaian,
            pic: task?.pn_auditor
              ? { pn: task?.pn_auditor, name: task?.name_auditor }
              : null,
          };
        });
        dispatch(setObjDataTask(mapping));
      } else {
        dispatch(resetObjDataTask());
      }
      setSprintId(response?.sprint?.id);
      dispatch(setObjDataUserStory(mappingUserStory));
    } else {
      setSprintId(0);
      dispatch(resetObjDataUserStory());
      dispatch(resetObjDataTask());
    }
  }, [storyPointDetail, sprintTeam]);

  useEffect(() => {
    console.log("userDataStory => ", dataUserStory);
  }, [dataUserStory]);

  useEffect(() => {
    if (sprintTeam?.data?.length) {
      const filterOptionValueTeam = sprintTeam?.data?.filter(
        (v) =>
          v?.stc_auditor_type_team_kode === "kta" ||
          v?.stc_auditor_type_team_kode === "ata"
      );
      const mappingOptionValueTeam = filterOptionValueTeam?.length
        ? filterOptionValueTeam?.map((v) => {
            return {
              label: `${v?.pn_auditor} - ${v?.nama_auditor}`,
              value: { pn: v?.pn_auditor, name: v?.nama_auditor },
            };
          })
        : [];
      dispatch(setObjDataTeam(mappingOptionValueTeam));
    } else {
      dispatch(resetObjDataTeam());
    }
  }, [sprintTeam]);

  // [ START ] handler for table task
  const handleClickCheckbox = (isChecked, task_id) => {
    const newData = [...(payload?.task || [])];
    if (isChecked) {
      const findId = newData.some((value) => value === task_id);

      if (!findId) {
        newData.push(task_id);
      }
    } else {
      const filter = newData.filter((value) => value !== task_id);
      dispatch(setObjPayload({ ...payload, task: filter }));
      return;
    }

    dispatch(setObjPayload({ ...payload, task: newData }));
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleSubmitAssigne = async () => {
    if (!payload?.task?.length) {
      await infoSwal("Silahkan pilih task terlebih dahulu!");
      return;
    }
    if (!payload?.pic?.pn) {
      await infoSwal("P.I.C penugasan belum terpilih!");
      return;
    }
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/sprint/user_stories/task/${params?.id}`,
      {
        task_id: payload?.task,
        pn_auditor: payload?.pic?.pn,
        name_auditor: payload?.pic?.name,
      }
    );
    storyPointDetailMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table task

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[95rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex gap-3 items-center mb-7">
          <ButtonIconBack backUrl={`${baseUrl}/sprint-executions`} />
          <PageTitle text="Story Point Detail" />
        </div>
        {/* Start Content */}
        <div className="flex flex-col gap-4">
          <CardContentStoryPointDetail data={dataUserStory} />
          <TableTask
            data={dataTask}
            dataUserStory={dataUserStory}
            dataTeam={dataTeam}
            payload={payload}
            handleClickCheckbox={handleClickCheckbox}
            handleChangePayload={handleChangePayload}
            handleSubmitPenugasan={handleSubmitAssigne}
          />
        </div>
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

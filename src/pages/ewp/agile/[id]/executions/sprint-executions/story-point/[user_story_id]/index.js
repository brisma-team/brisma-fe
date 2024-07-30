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
  setObjPayloadTask,
  setObjPayloadCommentTask,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjDataTeam,
  resetObjPayloadCommentTask,
} from "@/slices/ewp/agile/executions/storyPointDetailEWPAgileSlice";
import { confirmationSwal, fetchApi, infoSwal, loadingSwal } from "@/helpers";
import {
  CardContentStoryPointDetail,
  TableTask,
} from "@/components/molecules/ewp/agile/executions/story-point-detail";
import {
  useSprintTeam,
  useStoryPointDetail,
} from "@/data/ewp/agile/executions/story-point-detail";
import _ from "lodash";
import { ModalDescription } from "@/components/molecules/commons";
const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    user_story_id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/executions`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModalCommentTask, setShowModalCommentTask] = useState(false);
  const [selectedSprintId, setSelectedSprintId] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState(0);

  const dataUserStory = useSelector(
    (state) => state.storyPointDetailEWPAgile.objDataUserStory
  );
  const dataTask = useSelector(
    (state) => state.storyPointDetailEWPAgile.objDataTask
  );
  const dataTeam = useSelector(
    (state) => state.storyPointDetailEWPAgile.objDataTeam
  );
  const payloadTask = useSelector(
    (state) => state.storyPointDetailEWPAgile.objPayload
  );
  const payloadCommentTask = useSelector(
    (state) => state.storyPointDetailEWPAgile.objPayloadCommentTask
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { storyPointDetail, storyPointDetailMutate } = useStoryPointDetail({
    id: params?.user_story_id,
  });
  const { sprintTeam } = useSprintTeam({ id: selectedSprintId });

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
          path: `${baseUrl}/sprint-executions/story-point/${params?.user_story_id}`,
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
        sprintTeam?.data
          ?.sort((a, b) => {
            const order = { ma: 1, kta: 2, ata: 3 };
            return (
              order[a.stc_auditor_type_team_kode] -
              order[b.stc_auditor_type_team_kode]
            );
          })
          ?.map((v) => {
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
        const mapping = response?.user_story_task?.map((task, index) => {
          return {
            ..._.pick(task, ["id", "comment", "description"]),
            index,
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
      setSelectedSprintId(response?.sprint?.id);
      dispatch(setObjDataUserStory(mappingUserStory));
    } else {
      setSelectedSprintId(0);
      dispatch(resetObjDataUserStory());
      dispatch(resetObjDataTask());
    }
  }, [storyPointDetail, sprintTeam]);

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
    const newData = [...(payloadTask?.task || [])];
    if (isChecked) {
      const findId = newData.some((value) => value === task_id);

      if (!findId) {
        newData.push(task_id);
      }
    } else {
      const filter = newData.filter((value) => value !== task_id);
      dispatch(setObjPayloadTask({ ...payloadTask, task: filter }));
      return;
    }

    dispatch(setObjPayloadTask({ ...payloadTask, task: newData }));
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayloadTask({ ...payloadTask, [property]: value }));
  };

  const handleSubmitAssigne = async () => {
    if (!payloadTask?.task?.length) {
      await infoSwal("Silahkan pilih task terlebih dahulu!");
      return;
    }
    if (!payloadTask?.pic?.pn) {
      await infoSwal("P.I.C penugasan belum terpilih!");
      return;
    }
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/sprint/user_stories/task/${params?.id}`,
      {
        task_id: payloadTask?.task,
        pn_auditor: payloadTask?.pic?.pn,
        name_auditor: payloadTask?.pic?.name,
      }
    );
    storyPointDetailMutate();
    loadingSwal("close");
  };

  const handleChangeStatusTask = async (id, value) => {
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/task/update/${id}`,
      { status_penyelesaian: value },
      true
    );
    storyPointDetailMutate();
  };

  const handleClickEditComment = (task_index) => {
    setSelectedTaskId(dataTask[task_index].id);
    dispatch(setObjPayloadCommentTask(dataTask[task_index].comment));
    setShowModalCommentTask(true);
  };
  // [ END ] handler for table task

  // [ START ] handler for modal update comment task
  const handleCloseModalCommentTask = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalCommentTask(false);
    dispatch(resetObjPayloadCommentTask());
  };

  const handleSubmitUpdateCommentTask = async (value) => {
    if (!value) {
      infoSwal("Silahkan isi comment!");
      return;
    }

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/task/update/${selectedTaskId}`,
      { comment: value }
    );
    storyPointDetailMutate();
    dispatch(resetObjPayloadCommentTask());
    setShowModalCommentTask(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal update comment task

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
            payload={payloadTask}
            handleClickCheckbox={handleClickCheckbox}
            handleChangePayload={handleChangePayload}
            handleChangeStatusTask={handleChangeStatusTask}
            handleSubmitPenugasan={handleSubmitAssigne}
            handleClickEditComment={handleClickEditComment}
          />
        </div>
        <ModalDescription
          isEdit
          headerText={"Ubah Comment Task"}
          data={payloadCommentTask}
          showModal={showModalCommentTask}
          handleCloseModal={handleCloseModalCommentTask}
          handleSubmit={handleSubmitUpdateCommentTask}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

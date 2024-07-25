import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import {
  ModalDescription,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataSprintPlanning,
  setObjDataUserStory,
  setObjDataUkerAssessment,
  setObjPayloadSprint,
  setObjPayloadUserStory,
  setObjPayloadTask,
  setObjPayloadUkerAssessment,
  setObjPayloadCompletionStatusUserStory,
  setObjPayloadPotentialProblemTask,
  setObjPayloadCommentTask,
  setValidationErrorsSprint,
  setValidationErrorsUserStory,
  setValidationErrorsTask,
  setValidationErrorsUkerAssessment,
  resetObjDataSprintPlanning,
  resetObjDataUserStory,
  resetObjDataUkerAssessment,
  resetObjPayloadSprint,
  resetObjPayloadUserStory,
  resetObjPayloadTask,
  resetObjPayloadUkerAssessment,
  resetObjPayloadCompletionStatusUserStory,
  resetObjPayloadPotentialProblemTask,
  resetObjPayloadCommentTask,
  resetValidationErrorsSprint,
  resetValidationErrorsUserStory,
  resetValidationErrorsTask,
  resetValidationErrorsUkerAssessment,
} from "@/slices/ewp/agile/plannings/sprintPlanningEWPAgileSlice";
import {
  confirmationSwal,
  fetchApi,
  generateSprintNo,
  infoSwal,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  useDetailSprint,
  useSprintPlanning,
  useDetailTask,
} from "@/data/ewp/agile/plannings/sprint-planning";
import {
  ModalSprint,
  ModalTask,
  ModalUkerAssessment,
  ModalUserStory,
  TableSprintPlanning,
} from "@/components/molecules/ewp/agile/plannings/sprint-planning";
import ukerAssessmentEWPSchema from "@/helpers/schemas/ewp/agile/planning/ukerAssessmentEWPSchema";
import {
  useAuditBacklog,
  useDetailAuditBacklog,
} from "@/data/ewp/agile/plannings/audit-backlog";
import {
  taskSchema,
  sprintSchema,
} from "@/helpers/schemas/ewp/agile/planning/sprintPlanningEWPAgileSchema";
import _ from "lodash";
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
  const baseUrl = `/ewp/agile/${params?.id}/plannings`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [expansionMap, setExpansionMap] = useState({});
  const [selectedSprintId, setSelectedSprintId] = useState(0);
  const [selectedUserStoryId, setSelectedUserStoryId] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState(0);

  const [showModalSprint, setShowModalSprint] = useState(false);
  const [showModalUserStory, setShowModalUserStory] = useState(false);
  const [showModalUkerAssessment, setShowModalUkerAssessment] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [
    showModalCompletionStatusUserStory,
    setShowModalCompletionStatusUserStory,
  ] = useState(false);
  const [showModalPotentialProblemTask, setShowModalPotentialProblemTask] =
    useState(false);
  const [showModalCommentTask, setShowModalCommentTask] = useState(false);

  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [isUpdateSprint, setIsUpdateSprint] = useState(false);
  const [isUpdateTask, setIsUpdateTask] = useState(false);

  const [sprintNo, setSprintNo] = useState(1);

  const dataSprintPlanning = useSelector(
    (state) => state.sprintPlanningEWPAgile.objDataSprintPlanning
  );
  const dataUserStory = useSelector(
    (state) => state.sprintPlanningEWPAgile.objDataUserStory
  );
  const dataUkerAssessment = useSelector(
    (state) => state.sprintPlanningEWPAgile.objDataUkerAssessment
  );
  const payloadSprint = useSelector(
    (state) => state.sprintPlanningEWPAgile.objPayloadSprint
  );
  const payloadUserStory = useSelector(
    (state) => state.sprintPlanningEWPAgile.objPayloadUserStory
  );
  const payloadTask = useSelector(
    (state) => state.sprintPlanningEWPAgile.objPayloadTask
  );
  const payloadUkerAssessment = useSelector(
    (state) => state.sprintPlanningEWPAgile.objPayloadUkerAssessment
  );
  const payloadCompletionStatusUserStory = useSelector(
    (state) => state.sprintPlanningEWPAgile.objPayloadCompletionStatusUserStory
  );
  const payloadPotentialProblemTask = useSelector(
    (state) => state.sprintPlanningEWPAgile.objPayloadPotentialProblemTask
  );
  const payloadCommentTask = useSelector(
    (state) => state.sprintPlanningEWPAgile.objPayloadCommentTask
  );
  const validationSprint = useSelector(
    (state) => state.sprintPlanningEWPAgile.validationErrorsSprint
  );
  const validationTask = useSelector(
    (state) => state.sprintPlanningEWPAgile.validationErrorsTask
  );
  const validationUkerAssessment = useSelector(
    (state) => state.sprintPlanningEWPAgile.validationErrorsUkerAssessment
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { sprintPlanning, sprintPlanningMutate } = useSprintPlanning({
    id: params?.id,
  });
  const { detailSprint } = useDetailSprint({
    id: selectedSprintId,
  });
  const { detailTask } = useDetailTask({
    id: selectedTaskId,
  });
  const { auditBacklog, auditBacklogMutate } = useAuditBacklog({
    id: params?.id,
  });
  const { detailAuditBacklog, detailAuditBacklogMutate } =
    useDetailAuditBacklog({
      id: selectedUserStoryId,
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
        { name: "Project Plannings", path: baseUrl },
        {
          name: "Sprint Planning",
          path: `${baseUrl}/sprint-planning`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (sprintPlanning?.data?.length) {
      const getSprintNo = generateSprintNo(sprintPlanning?.data);
      const mapping = sprintPlanning?.data?.map((sprint, sprint_index) => {
        return {
          id: sprint?.id,
          sprint: { no: sprint?.no, nama: sprint?.sprint_name },
          status: sprint?.status_penyelesaian,
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
                  role: "parent-child",
                  children: user_story?.user_story_task?.length
                    ? user_story?.user_story_task?.map((task, task_index) => {
                        return {
                          ..._.pick(task, ["id", "comment", "description"]),
                          sprint_id: sprint?.id,
                          sprint_index,
                          user_story_id: user_story?.id,
                          user_story_index,
                          task_index,
                          task_type: {
                            kode: task?.task_type_kode,
                            nama: task?.task_type_name,
                          },
                          potential_problem: task?.potensial_isu,
                          status: task?.status_penyelesaian,
                          role: "child",
                        };
                      })
                    : [],
                };
              })
            : [],
        };
      });
      setSprintNo(getSprintNo);
      dispatch(setObjDataSprintPlanning(mapping));
    } else {
      setSprintNo(1);
      dispatch(resetObjDataSprintPlanning());
    }
  }, [sprintPlanning]);

  useEffect(() => {
    console.log("sprintNo => ", sprintNo);
  }, [sprintNo]);

  useEffect(() => {
    if (detailTask?.data) {
      dispatch(
        setObjPayloadTask({
          ..._.pick(detailTask?.data, ["id", "description"]),
          task_type: {
            kode: detailTask?.data?.task_type_kode,
            nama: detailTask?.data?.task_type_name,
          },
        })
      );
    } else {
      dispatch(resetObjPayloadTask());
    }
  }, [detailTask, showModalTask]);

  useEffect(() => {
    if (detailSprint?.data) {
      dispatch(
        setObjPayloadSprint({
          ..._.pick(detailSprint?.data, [
            "no",
            "sprint_name",
            "start_date",
            "end_date",
          ]),
        })
      );
    } else {
      dispatch(resetObjPayloadSprint());
    }
  }, [detailSprint, showModalSprint]);

  useEffect(() => {
    if (auditBacklog?.data?.length) {
      const filterData = auditBacklog?.data?.filter(
        (user_story) => user_story?.sprint_id === null
      );
      const mappingData = filterData?.length
        ? filterData?.map((data) => {
            return {
              ..._.pick(data, [
                "id",
                "definition_of_ready",
                "definition_of_done",
              ]),
              user_story: {
                kode: data?.ref_risk_issue_kode,
                abbr: data?.ref_risk_issue_abbr,
                nama: data?.ref_risk_issue_name,
              },
            };
          })
        : [];
      dispatch(setObjDataUserStory(mappingData));
    } else {
      dispatch(resetObjDataUserStory());
    }
  }, [auditBacklog, showModalSprint]);

  useEffect(() => {
    if (detailAuditBacklog?.data?.user_stories_uker?.length) {
      const mapping = detailAuditBacklog?.data?.user_stories_uker?.map(
        (v, index) => {
          return {
            index,
            uker_id: v?.id,
            branch: {
              branch_kode: v?.ref_auditee_branch_kode,
              branch_name: v?.ref_auditee_branch_name,
            },
            orgeh: {
              orgeh_kode: v?.ref_auditee_orgeh_kode,
              orgeh_name: v?.ref_auditee_orgeh_name,
            },
            uker_type: { name: v?.tipe_uker },
            is_edit: false,
            is_new: false,
          };
        }
      );
      dispatch(setObjDataUkerAssessment(mapping));
    } else {
      dispatch(resetObjDataUkerAssessment());
    }
  }, [detailAuditBacklog, showModalUkerAssessment]);

  // [ START ] handler for table
  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  // [ START ] sprint
  const handleClickAddSprint = () => {
    setShowModalSprint(true);
  };

  const handleClickEditSprint = (sprint_id) => {
    setSelectedSprintId(sprint_id);
    setShowModalSprint(true);
    setIsUpdateSprint(true);
  };

  const handleClickDeleteSprint = async (sprint_id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menghapus data Sprint ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/sprint/delete/${sprint_id}`,
      {}
    );
    sprintPlanningMutate();
    loadingSwal("close");
  };
  // [ END ] sprint

  // [ START ] user story
  const handleClickAddUserStory = (id) => {
    setSelectedSprintId(id);
    setShowModalUserStory(true);
  };

  const handleClickDeleteUserStory = async (user_story_id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menghapus data User Story ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/sprint_planning/remove_risk/${user_story_id}`,
      {}
    );
    sprintPlanningMutate();
    auditBacklogMutate();
    loadingSwal("close");
  };
  // [ END ] user story

  // [ START ] task
  const handleClickAddTask = (user_story_id) => {
    setShowModalTask(true);
    setSelectedUserStoryId(user_story_id);
  };

  const handleClickEditTask = (task_id) => {
    setIsUpdateTask(true);
    setSelectedTaskId(task_id);
    setShowModalTask(true);
  };

  const handleClickEditCompletionStatusUserStory = (
    sprint_index,
    user_story_index
  ) => {
    setSelectedUserStoryId(
      dataSprintPlanning[sprint_index].children[user_story_index].id
    );
    dispatch(
      setObjPayloadCompletionStatusUserStory(
        dataSprintPlanning[sprint_index].children[user_story_index]
          .completion_status
      )
    );
    setShowModalCompletionStatusUserStory(true);
  };

  const handleClickEditPotentialProblemTask = (
    sprint_index,
    user_story_index,
    task_index
  ) => {
    setSelectedTaskId(
      dataSprintPlanning[sprint_index].children[user_story_index].children[
        task_index
      ].id
    );
    dispatch(
      setObjPayloadPotentialProblemTask(
        dataSprintPlanning[sprint_index].children[user_story_index].children[
          task_index
        ].potential_problem
      )
    );
    setShowModalPotentialProblemTask(true);
  };

  const handleClickEditCommentTask = (
    sprint_index,
    user_story_index,
    task_index
  ) => {
    setSelectedTaskId(
      dataSprintPlanning[sprint_index].children[user_story_index].children[
        task_index
      ].id
    );
    dispatch(
      setObjPayloadCommentTask(
        dataSprintPlanning[sprint_index].children[user_story_index].children[
          task_index
        ].comment
      )
    );
    setShowModalCommentTask(true);
  };

  const handleClickDeleteTask = async (task_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data Task ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/task/delete/${task_id}`,
      {}
    );
    sprintPlanningMutate();
    loadingSwal("close");
  };
  // [ END ] task

  // [ START ] uker assessment
  const handleEditUkerAssessment = (id) => {
    setSelectedUserStoryId(id);
    setShowModalUkerAssessment(true);
  };
  // [ END ] uker assessment
  // [ END ] handler for table

  // [ START ] handler for modal sprint
  const handleCloseModalSprint = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setIsUpdateSprint(false);
    setShowModalSprint(false);
    dispatch(resetValidationErrorsSprint());
  };

  const handleChangePayloadSprint = (property, value) => {
    dispatch(
      setObjPayloadSprint({
        ...payloadSprint,
        [property]: value,
      })
    );
  };

  const handleResetPayloadSprint = (property) => {
    dispatch(
      setObjPayloadSprint({
        ...payloadSprint,
        [property]: "",
      })
    );
  };

  const handleRefreshGenerateSprintNo = () => {
    const sprintNo = generateSprintNo(sprintPlanning?.data);
    dispatch(
      setObjPayloadSprint({
        ...payloadSprint,
        no: sprintNo,
      })
    );
  };

  const handleSubmitSprint = async (e, isUpdate) => {
    e.preventDefault();
    const schemaMapping = {
      schema: sprintSchema,
      resetErrors: resetValidationErrorsSprint,
      setErrors: setValidationErrorsSprint,
    };
    const validate = setErrorValidation(payloadSprint, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      const payload = { ...payloadSprint };
      if (!isUpdate) {
        const sprintNo = generateSprintNo(sprintPlanning?.data);
        payload.no = sprintNo;
      }
      await fetchApi(
        isUpdate ? "PATCH" : "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/sprint/${
          isUpdate ? `update/${selectedSprintId}` : `create/${params?.id}`
        }`,
        payload
      );
      sprintPlanningMutate();
      dispatch(resetObjPayloadSprint());
      dispatch(resetValidationErrorsSprint());
      setShowModalSprint(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal task

  // [ START ] handler for uker assessment
  const handleCloseModalUkerAssessment = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setSelectedUserStoryId(0);
    setShowModalUkerAssessment(false);
    dispatch(resetValidationErrorsUkerAssessment());
  };

  const handleChangePayloadUkerAssessment = (property, value) => {
    dispatch(
      setObjPayloadUkerAssessment({
        ...payloadUkerAssessment,
        [property]: value,
      })
    );
  };

  const handleClickEditUkerAssessment = (index) => {
    const objData = dataUkerAssessment[index];
    const newData = [...dataUkerAssessment];
    newData[index] = { ...newData[index], is_edit: true };
    dispatch(setObjDataUkerAssessment(newData));
    dispatch(
      setObjPayloadUkerAssessment({
        branch: {
          branch_kode: objData?.branch?.branch_kode,
          branch_name: objData?.branch?.branch_name,
        },
        orgeh: {
          orgeh_kode: objData?.orgeh?.orgeh_kode,
          orgeh_name: objData?.orgeh?.orgeh_name,
        },
        tipe_uker: objData?.uker_type?.name,
      })
    );
  };

  const handleClickAddRowUkerAssessment = () => {
    if (!isAddNewRowUker) {
      const newDataUkerAssessment = [...dataUkerAssessment];
      newDataUkerAssessment.push({
        ...payloadUkerAssessment,
        index: dataUkerAssessment?.length,
        is_edit: false,
        is_new: true,
      });
      dispatch(setObjDataUkerAssessment(newDataUkerAssessment));
      setIsAddNewRowUker(true);
    }
  };

  const handleClickDeleteUkerAssessment = async (uker_id, index) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirm.value) {
      return;
    }

    if (isAddNewRowUker) {
      const newData = [...dataUkerAssessment];
      setIsAddNewRowUker(false);
      newData.splice(index, 1);
      dispatch(setObjDataUkerAssessment(newData));
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories_uker/delete/${uker_id}`,
      {}
    );
    detailAuditBacklogMutate();
    sprintPlanningMutate();
    loadingSwal("close");
  };

  const handleSaveUkerAssessment = async (isUpdate, uker_id) => {
    const schemaMapping = {
      schema: ukerAssessmentEWPSchema,
      resetErrors: resetValidationErrorsUkerAssessment,
      setErrors: setValidationErrorsUkerAssessment,
    };
    const validate = setErrorValidation(
      {
        ref_auditee_orgeh_kode: payloadUkerAssessment?.orgeh?.orgeh_kode,
        ref_auditee_branch_kode: payloadUkerAssessment?.branch?.branch_kode,
      },
      dispatch,
      schemaMapping
    );

    if (validate) {
      const payload = {
        ref_auditee_branch_kode: parseInt(
          payloadUkerAssessment?.branch?.branch_kode
        ),
        ref_auditee_branch_name: payloadUkerAssessment?.branch?.branch_name,
        ref_auditee_orgeh_kode: parseInt(
          payloadUkerAssessment?.orgeh?.orgeh_kode
        ),
        ref_auditee_orgeh_name: payloadUkerAssessment?.orgeh?.orgeh_name,
      };

      if (!isUpdate) {
        payload.user_story_id = selectedUserStoryId;
      }

      loadingSwal();
      const response = await fetchApi(
        isUpdate ? "PATCH" : "POST",
        `${
          process.env.NEXT_PUBLIC_API_URL_EWP
        }/ewp/agile/perencanaan/user_stories_uker/${
          isUpdate ? `update/${uker_id}` : "create"
        }`,
        payload
      );
      if (response.isDismissed) return;
      setIsAddNewRowUker(false);
      detailAuditBacklogMutate();
      sprintPlanningMutate();
      dispatch(resetObjPayloadUkerAssessment());
      dispatch(resetValidationErrorsUkerAssessment());
      loadingSwal("close");
    }
  };
  // [ END ] handler for uker assessment

  // [ START ] handler for modal user story
  const handleCloseModalUserStory = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalUserStory(false);
  };

  const handleChangeCheckboxUserStory = (isChecked, id) => {
    const updatedData = [...payloadUserStory];
    if (isChecked) {
      const findId = updatedData.some((value) => value === id);

      if (!findId) {
        updatedData.push(id);
      }
    } else {
      const filter = updatedData.filter((value) => value !== id);
      dispatch(setObjPayloadUserStory(filter));
      return;
    }

    dispatch(setObjPayloadUserStory(updatedData));
  };

  const handleSubmitUserStory = async (e) => {
    e.preventDefault();
    if (!payloadUserStory?.length) {
      infoSwal("Silahkan pilih user story terlebih dahulu!");
      return;
    }
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/sprint_planning/add_risk/${selectedSprintId}`,
      { user_story: payloadUserStory }
    );
    sprintPlanningMutate();
    auditBacklogMutate();
    dispatch(resetObjPayloadUserStory());
    setShowModalUserStory(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal user story

  // [ START ] handler for modal task
  const handleCloseModalTask = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setIsUpdateTask(false);
    setShowModalTask(false);
    dispatch(resetValidationErrorsTask());
  };

  const handleChangePayloadTask = (property, value) => {
    dispatch(
      setObjPayloadTask({
        ...payloadTask,
        [property]: value,
      })
    );
  };

  const handleResetPayloadTask = (property) => {
    dispatch(
      setObjPayloadTask({
        ...payloadTask,
        [property]: "",
      })
    );
  };

  const handleSubmitTask = async (e, isUpdate) => {
    e.preventDefault();
    const payload = {
      ewp_id: params?.id,
      user_story_id: selectedUserStoryId,
      description: payloadTask?.description,
      task_type_kode: payloadTask?.task_type?.kode,
      task_type_name: payloadTask?.task_type?.nama,
    };
    const schemaMapping = {
      schema: taskSchema,
      resetErrors: resetValidationErrorsTask,
      setErrors: setValidationErrorsTask,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      await fetchApi(
        isUpdate ? "PATCH" : "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/task/${
          isUpdate ? `update/${selectedUserStoryId}` : "create"
        }`,
        payload
      );
      sprintPlanningMutate();
      dispatch(resetObjPayloadTask());
      dispatch(resetValidationErrorsTask());
      setShowModalTask(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal task

  // [ START ] handler for modal update user story desc
  const handleCloseModalCompletionStatusUserStory = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalCompletionStatusUserStory(false);
    dispatch(resetObjPayloadCompletionStatusUserStory());
  };

  const handleSubmitUpdateCompletionStatusUserStory = async (value) => {
    if (!value) {
      infoSwal("Silahkan isi user story deskripsi!");
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/update/${selectedUserStoryId}`,
      { user_story_desc: value }
    );
    sprintPlanningMutate();
    dispatch(resetObjPayloadCompletionStatusUserStory());
    setShowModalCompletionStatusUserStory(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal update user story desc

  // [ START ] handler for modal update potential problem task
  const handleCloseModalPotentialProblemTask = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalPotentialProblemTask(false);
    dispatch(resetObjPayloadPotentialProblemTask());
  };

  const handleSubmitUpdatePotentialProblemTask = async (value) => {
    if (!value) {
      infoSwal("Silahkan isi potensi isu!");
      return;
    }

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/task/update/${selectedTaskId}`,
      { potensial_isu: value }
    );
    sprintPlanningMutate();
    dispatch(resetObjPayloadPotentialProblemTask());
    setShowModalPotentialProblemTask(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal update potential problem task

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
    sprintPlanningMutate();
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
        <div className="flex justify-between items-center mb-7">
          <PageTitle text="Sprint Planning" />
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
        <TableSprintPlanning
          data={dataSprintPlanning}
          expansionMap={expansionMap}
          handleClickToggleExpansion={handleToggleExpansion}
          handleClickAddSprint={handleClickAddSprint}
          handleClickEditSprint={handleClickEditSprint}
          handleClickDeleteSprint={handleClickDeleteSprint}
          handleClickAddUserStory={handleClickAddUserStory}
          handleClickDeleteUserStory={handleClickDeleteUserStory}
          handleClickEditUkerAssessment={handleEditUkerAssessment}
          handleClickAddTask={handleClickAddTask}
          handleClickDeleteTask={handleClickDeleteTask}
          handleClickEditTask={handleClickEditTask}
          handleClickEditCompletionStatusUserStory={
            handleClickEditCompletionStatusUserStory
          }
          handleClickEditPotentialProblemTask={
            handleClickEditPotentialProblemTask
          }
          handleClickEditCommentTask={handleClickEditCommentTask}
        />
        <ModalSprint
          showModal={showModalSprint}
          data={payloadSprint}
          sprintNo={sprintNo}
          isUpdate={isUpdateSprint}
          validation={validationSprint}
          handleCloseModal={handleCloseModalSprint}
          handleChange={handleChangePayloadSprint}
          handleReset={handleResetPayloadSprint}
          handleRefreshGenerateSprintNo={handleRefreshGenerateSprintNo}
          handleSubmit={handleSubmitSprint}
        />
        <ModalUserStory
          showModal={showModalUserStory}
          data={dataUserStory}
          payload={payloadUserStory}
          handleCloseModal={handleCloseModalUserStory}
          handleChangeChecbox={handleChangeCheckboxUserStory}
          handleSubmit={handleSubmitUserStory}
        />
        <ModalUkerAssessment
          showModal={showModalUkerAssessment}
          data={dataUkerAssessment}
          payload={payloadUkerAssessment}
          validation={validationUkerAssessment}
          handleCloseModal={handleCloseModalUkerAssessment}
          handleChange={handleChangePayloadUkerAssessment}
          handleClickAddUkerAssessment={handleClickAddRowUkerAssessment}
          handleClickDelete={handleClickDeleteUkerAssessment}
          handleClickEdit={handleClickEditUkerAssessment}
          handleClickSave={handleSaveUkerAssessment}
        />
        <ModalTask
          showModal={showModalTask}
          data={payloadTask}
          isUpdate={isUpdateTask}
          validation={validationTask}
          handleChange={handleChangePayloadTask}
          handleReset={handleResetPayloadTask}
          handleCloseModal={handleCloseModalTask}
          handleSubmit={handleSubmitTask}
        />
        <ModalDescription
          isEdit
          headerText={"Ubah Comment Task"}
          data={payloadCommentTask}
          showModal={showModalCommentTask}
          handleCloseModal={handleCloseModalCommentTask}
          handleSubmit={handleSubmitUpdateCommentTask}
        />
        <ModalDescription
          isEdit
          headerText={"Ubah User Story Description"}
          data={payloadCompletionStatusUserStory}
          showModal={showModalCompletionStatusUserStory}
          handleCloseModal={handleCloseModalCompletionStatusUserStory}
          handleSubmit={handleSubmitUpdateCompletionStatusUserStory}
        />
        <ModalDescription
          isEdit
          headerText={"Ubah Potensi Isu"}
          data={payloadPotentialProblemTask}
          showModal={showModalPotentialProblemTask}
          handleCloseModal={handleCloseModalPotentialProblemTask}
          handleSubmit={handleSubmitUpdatePotentialProblemTask}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

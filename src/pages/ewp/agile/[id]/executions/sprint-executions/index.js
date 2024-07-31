import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataSprintExecution,
  setObjPayloadTeam,
  setValidationErrorsTeam,
  resetObjDataSprintExecution,
  resetObjPayloadTeam,
  resetValidationErrorsTeam,
} from "@/slices/ewp/agile/executions/sprintExecutionEWPAgileSlice";
import {
  checkStatusSprint,
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { useSprintExecution } from "@/data/ewp/agile/executions/sprint-execution";
import _ from "lodash";
import { TableSprintExecution } from "@/components/molecules/ewp/agile/executions/sprint-executions";
import { useSprintTeam } from "@/data/ewp/agile/executions/story-point-detail";
import { ModalProjectTeam } from "@/components/molecules/ewp/agile/initiation/audit-canvas";
import timEWPAgileSchema from "@/helpers/schemas/ewp/agile/initiation/timEWPAgileSchema";
const routes = [
  {
    name: "Audit Backlog",
    slug: "audit-backlog",
  },
  {
    name: "Sprint Executions",
    slug: "sprint-executions",
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

  const [expansionMap, setExpansionMap] = useState({});
  const [showModalTeam, setShowModalTeam] = useState(false);
  const [sprintId, setSprintId] = useState(0);

  const dataSprintExecution = useSelector(
    (state) => state.sprintExecutionEWPAgile.objDataSprintExecution
  );

  const payloadTeam = useSelector(
    (state) => state.sprintExecutionEWPAgile.objPayloadTeam
  );
  const validationTeam = useSelector(
    (state) => state.sprintExecutionEWPAgile.validationErrorsTeam
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { sprintExecution, sprintExecutionMutate } = useSprintExecution({
    id: params?.id,
  });
  const { sprintTeam } = useSprintTeam({ id: sprintId });

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
          team: sprint?.execution_tim_audit?.length
            ? sprint?.execution_tim_audit
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
                  return {
                    role,
                    pic: {
                      pn: v?.pn_auditor,
                      name: v?.nama_auditor,
                    },
                    is_initiator: Boolean(v?.is_initiator),
                  };
                })
            : [],
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
    if (sprintTeam?.data?.length) {
      const filterByTeamCode = (code) =>
        sprintTeam?.data?.filter(
          (v) => v?.stc_auditor_type_team_kode === code
        ) || [];

      const mappingMA = filterByTeamCode("ma");
      const mappingKTA = filterByTeamCode("kta");
      const mappingATA = filterByTeamCode("ata");

      const mappingPayloadTeam = {
        ma: mappingMA.map((v) => ({
          pn: v?.pn_auditor,
          nama: v?.nama_auditor,
          is_initiator: v?.is_initiator,
        })),
        kta: mappingKTA.map((v) => ({
          pn: v?.pn_auditor,
          nama: v?.nama_auditor,
          is_initiator: v?.is_initiator,
        })),
        ata: mappingATA.map((v) => ({
          pn: v?.pn_auditor,
          nama: v?.nama_auditor,
          is_initiator: v?.is_initiator,
        })),
      };
      dispatch(setObjPayloadTeam(mappingPayloadTeam));
    } else {
      dispatch(resetObjPayloadTeam());
    }
  }, [sprintTeam, showModalTeam]);

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

  const handleClickEditSprintTeam = (id) => {
    setSprintId(id);
    setShowModalTeam(true);
  };

  const handleClickWorkingPaper = (id) => {
    router.push(`${baseUrl}/sprint-executions/sprint/${id}`);
  };
  // [ END ] sprint

  // [ START ] user story
  const handleChangeStatusUserStory = async (id, value) => {
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/update/${id}`,
      { status_penyelesaian: value },
      true
    );
    sprintExecutionMutate();
  };
  // [ END ] user story
  // [ START ] handler for table

  // [ START ] handler for modal edit sprint team
  const handleCloseModalTeam = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalTeam(false);
    setSprintId(0);
    dispatch(resetObjPayloadTeam());
    dispatch(resetValidationErrorsTeam());
  };

  const handleAddObjectPayloadTim = (property) => {
    const newTimAudit = [...payloadTeam[property]];
    newTimAudit.push({ pn: "", nama: "", is_initiator: false });
    dispatch(setObjPayloadTeam({ ...payloadTeam, [property]: newTimAudit }));
  };

  const handleDeleteObjectPayloadTim = (index, property) => {
    const newData = [...payloadTeam[property]];
    newData.splice(index, 1);
    dispatch(setObjPayloadTeam({ ...payloadTeam, [property]: newData }));
  };

  const handleChangeSelectPayloadTim = (property, index, value) => {
    const newData = [...payloadTeam[property]];
    const updated = {
      ...newData[index],
      pn: value?.pn,
      nama: value?.name,
    };
    newData[index] = updated;
    dispatch(
      setObjPayloadTeam({
        ...payloadTeam,
        [property]: newData,
      })
    );
  };

  const handleSubmitTim = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: timEWPAgileSchema,
      resetErrors: resetValidationErrorsTeam,
      setErrors: setValidationErrorsTeam,
    };
    const validate = setErrorValidation(payloadTeam, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/sprint/tim/${sprintId}`,
        { tim_audit: payloadTeam }
      );

      setShowModalTeam(false);
      sprintExecutionMutate();
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal edit sprint team

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
            marginLeft={"-80px"}
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
          handleClickEditSprintTeam={handleClickEditSprintTeam}
          handleClickWorkingPaper={handleClickWorkingPaper}
          handleChangeStatusUserStory={handleChangeStatusUserStory}
        />
        <ModalProjectTeam
          showModal={showModalTeam}
          payload={payloadTeam}
          validation={validationTeam}
          handleCloseModal={handleCloseModalTeam}
          handleAddObject={handleAddObjectPayloadTim}
          handleDeleteObject={handleDeleteObjectPayloadTim}
          handleChangeSelectValue={handleChangeSelectPayloadTim}
          handleSubmit={handleSubmitTim}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

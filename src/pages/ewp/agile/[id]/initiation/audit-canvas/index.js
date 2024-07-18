import { Breadcrumbs } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  DataNotFound,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import {
  useAuditCanvas,
  useAuditTimelineDetail,
} from "@/data/ewp/agile/initiation/audit-canvas";
import { useAuditInfo } from "@/data/ewp/common/info";
import LandingLayoutEWPAgile from "@/layouts/ewp/LandingLayoutEWPAgile";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  CardContent,
  ModalAuditTimelines,
  ModalCKEditor,
  ModalKeyStakeholder,
  ModalTableAuditTimelines,
} from "@/components/molecules/ewp/agile/initiation/audit-canvas";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjDataBusinessConcern,
  setObjDataProjectDrivers,
  setObjDataValueProportions,
  setObjDataCrossFunctionalImpact,
  setObjDataAdditionalInformation,
  setObjDataProjectObjectives,
  setObjDataAuditBacklog,
  setObjDataAuditTimelines,
  setObjDataTeam,
  setObjDataUkerAssessment,
  setObjPayloadBusinessConcern,
  setObjPayloadProjectDrivers,
  setObjPayloadValueProportions,
  setObjPayloadCrossFunctionalImpact,
  setObjPayloadAdditionalInformation,
  setObjPayloadProjectObjectives,
  setObjPayloadAuditBacklog,
  setObjPayloadTeam,
  setObjPayloadUkerAssessment,
  setObjPayloadAuditTimelines,
  setValidationErrorsTeam,
  setValidationErrorsUkerAssessment,
  setValidationErrorsAuditTimelines,
  resetObjDataAuditTimelines,
  resetObjDataTeam,
  resetObjDataUkerAssessment,
  resetObjPayloadBusinessConcern,
  resetObjPayloadProjectDrivers,
  resetObjPayloadValueProportions,
  resetObjPayloadCrossFunctionalImpact,
  resetObjPayloadAdditionalInformation,
  resetObjPayloadProjectObjectives,
  resetObjPayloadAuditBacklog,
  resetObjPayloadTeam,
  resetObjPayloadUkerAssessment,
  resetObjPayloadAuditTimelines,
  resetValidationErrorsTeam,
  resetValidationErrorsUkerAssessment,
  resetValidationErrorsAuditTimelines,
} from "@/slices/ewp/agile/initiation/auditCanvasEWPAgileSlice";
import timEWPAgileSchema from "@/helpers/schemas/ewp/agile/initiation/timEWPAgileSchema";
import {
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { ModalProjectTeam } from "@/components/molecules/ewp/agile/initiation/audit-canvas";
import auditTimelinesEWPSchema from "@/helpers/schemas/ewp/agile/initiation/auditTimelinesEWPAgileSchema";
import _ from "lodash";
import ukerAssessmentEWPSchema from "@/helpers/schemas/ewp/common/ukerAssessmentEWPSchema";
import useUser from "@/data/useUser";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const routes = [
  {
    name: "Audit Canvas",
    slug: "audit-canvas",
  },
  {
    name: "Working Agrements",
    slug: "working-agreements",
  },
  { name: "Documents", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/initiation`;

  const [dataProjectId, setDataProjectId] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [showModalBusinessConcern, setShowModalBusinessConcern] =
    useState(false);
  const [showModalProjectDrivers, setShowModalProjectDrivers] = useState(false);
  const [showModalValueProportions, setShowModalValueProportions] =
    useState(false);
  const [showModalCrossFunctionalImpact, setShowModalCrossFunctionalImpact] =
    useState(false);
  const [showModalAdditionalInformation, setShowModalAdditionalInformation] =
    useState(false);
  const [showModalProjectObjectives, setShowModalProjectObjectives] =
    useState(false);
  const [showModalAuditBacklog, setShowModalAuditBacklog] = useState(false);
  const [showModalAuditTimelines, setShowModalAuditTimelines] = useState(false);
  const [showModalAuditTimelinesTable, setShowModalAuditTimelinesTable] =
    useState(false);
  const [showModalTeam, setShowModalTeam] = useState(false);
  const [showModalUkerAssessment, setShowModalUkerAssessment] = useState(false);

  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const [typeModalAuditTimeline, setTypeModalAuditTimeline] = useState("");
  const [selectedAuditTimelineId, setSelectedAuditTimelineId] = useState(0);

  const dataBusinessConcern = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataBusinessConcern
  );
  const dataProjectDrivers = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataProjectDrivers
  );
  const dataValueProportions = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataValueProportions
  );
  const dataCrossFunctionalImpact = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataCrossFunctionalImpact
  );
  const dataAdditionalInformation = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataAdditionalInformation
  );
  const dataProjectObjectives = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataProjectObjectives
  );
  const dataAuditBacklog = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataAuditBacklog
  );
  const dataAuditTimelines = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataAuditTimelines
  );
  const dataTeam = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataTeam
  );
  const dataUkerAssessment = useSelector(
    (state) => state.auditCanvasEWPAgile.objDataUkerAssessment
  );
  const payloadBusinessConcern = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadBusinessConcern
  );
  const payloadProjectDrivers = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadProjectDrivers
  );
  const payloadValueProportions = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadValueProportions
  );
  const payloadCrossFunctionalImpact = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadCrossFunctionalImpact
  );
  const payloadAdditionalInformation = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadAdditionalInformation
  );
  const payloadProjectObjectives = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadProjectObjectives
  );
  const payloadAuditBacklog = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadAuditBacklog
  );
  const payloadTeam = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadTeam
  );
  const payloadUkerAssessment = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadUkerAssessment
  );
  const payloadAuditTimelines = useSelector(
    (state) => state.auditCanvasEWPAgile.objPayloadAuditTimelines
  );
  const validationTeam = useSelector(
    (state) => state.auditCanvasEWPAgile.validationErrorsTeam
  );
  const validationUkerAssessment = useSelector(
    (state) => state.auditCanvasEWPAgile.validationErrorsUkerAssessment
  );
  const validationAuditTimelines = useSelector(
    (state) => state.auditCanvasEWPAgile.validationErrorsAuditTimelines
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({
    id: params?.id,
    module: "agile",
  });
  const { auditCanvas, auditCanvasMutate } = useAuditCanvas({ id: params?.id });
  const { auditTimelineDetail } = useAuditTimelineDetail({
    id: selectedAuditTimelineId,
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
          path: `/ewp/agile/${params?.id}/info`,
        },
        { name: "Project Initiation", path: baseUrl },
        { name: "Audit Canvas", path: `${baseUrl}/audit-canvas` },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (auditInfo?.data) {
      setDataProjectId(auditInfo?.data?.project_info?.project_id);
    } else {
      setDataProjectId("");
    }

    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

  useEffect(() => {
    const response = auditCanvas?.data;
    dispatch(setObjDataBusinessConcern(response?.latar_belakang || ""));
    dispatch(setObjDataProjectDrivers(response?.tujuan || ""));
    dispatch(setObjDataValueProportions(response?.value_proportions || ""));
    dispatch(
      setObjDataCrossFunctionalImpact(response?.cross_functional_impact || "")
    );
    dispatch(
      setObjDataAdditionalInformation(response?.additional_information || "")
    );
    dispatch(setObjDataProjectObjectives(response?.objectives || ""));
    dispatch(setObjDataAuditBacklog(response?.audit_backlog || ""));
    if (response?.mapa_uker?.length) {
      const mapping = response?.mapa_uker?.map((v, index) => {
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
      });
      dispatch(setObjDataUkerAssessment(mapping));
    } else {
      dispatch(resetObjDataUkerAssessment());
    }

    if (response?.mapa_tim_audit?.length) {
      const mappingData = response?.mapa_tim_audit?.map((v) => {
        let role;
        switch (v?.stc_auditor_type_team_kode) {
          case "ma":
            role = "Audit Product Owner";
            break;
          case "kta":
            role = "Audit Scrum Master";
            break;
          case "ata":
            role = "Audit Scrum Team";
            break;
        }
        return {
          role,
          pic: {
            pn: v?.pn_auditor,
            nama: v?.nama_auditor,
          },
          is_initiator: Boolean(v?.is_initiator),
        };
      });
      dispatch(setObjDataTeam(mappingData));
    } else {
      dispatch(resetObjDataTeam());
    }

    if (response?.audit_timeline?.length) {
      const mapping = response?.audit_timeline?.map((v) => {
        return {
          ..._.pick(v, ["id", "title", "start_date", "end_date"]),
        };
      });
      dispatch(setObjDataAuditTimelines(mapping));
    } else {
      dispatch(resetObjDataAuditTimelines());
    }
  }, [auditCanvas]);

  useEffect(() => {
    if (auditTimelineDetail?.data) {
      dispatch(
        setObjPayloadAuditTimelines({
          ..._.pick(auditTimelineDetail?.data, [
            "title",
            "start_date",
            "end_date",
          ]),
        })
      );
    } else {
      dispatch(resetObjPayloadAuditTimelines());
    }
  }, [auditTimelineDetail, showModalAuditTimelines]);

  // [ START ] handler for content BMC
  const handleEditBusinessConcern = () => {
    setShowModalBusinessConcern(true);
    dispatch(setObjPayloadBusinessConcern(dataBusinessConcern));
  };

  const handleEditProjectDrivers = () => {
    setShowModalProjectDrivers(true);
    dispatch(setObjPayloadProjectDrivers(dataProjectDrivers));
  };

  const handleEditValueProportions = () => {
    setShowModalValueProportions(true);
    dispatch(setObjPayloadValueProportions(dataValueProportions));
  };

  const handleEditCrossFunctionalImpact = () => {
    setShowModalCrossFunctionalImpact(true);
    dispatch(setObjPayloadCrossFunctionalImpact(dataCrossFunctionalImpact));
  };

  const handleEditAdditionalInformation = () => {
    setShowModalAdditionalInformation(true);
    dispatch(setObjPayloadAdditionalInformation(dataAdditionalInformation));
  };

  const handleEditProjectObjectives = () => {
    setShowModalProjectObjectives(true);
    dispatch(setObjPayloadProjectObjectives(dataProjectObjectives));
  };

  const handleEditAuditBacklog = () => {
    setShowModalAuditBacklog(true);
    dispatch(setObjPayloadAuditBacklog(dataAuditBacklog));
  };

  const handleEditAuditTimelines = () => {
    setShowModalAuditTimelinesTable(true);
  };

  const handleEditProjectTeam = () => {
    setShowModalTeam(true);
    const mappingMA = dataTeam?.filter(
      (v) => v?.role === "Audit Product Owner"
    );
    const mappingKTA = dataTeam?.filter(
      (v) => v?.role === "Audit Scrum Master"
    );
    const mappingATA = dataTeam?.filter((v) => v?.role === "Audit Scrum Team");
    const mappingPayloadTeam = {
      ma: _.map(mappingMA, (v) => v?.pic),
      kta: _.map(mappingKTA, (v) => ({
        ...v?.pic,
        is_initiator: v?.is_initiator,
      })),
      ata: _.map(mappingATA, (v) => v?.pic),
    };
    dispatch(setObjPayloadTeam(mappingPayloadTeam));
  };

  const handleEditUkerAssessment = () => {
    setShowModalUkerAssessment(true);
  };
  // [ END ] handler for content BMC

  // [ START ] handler for modal CKEditor
  const handleCloseModalCKEditor = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    dispatch(resetObjPayloadBusinessConcern());
    dispatch(resetObjPayloadProjectDrivers());
    dispatch(resetObjPayloadValueProportions());
    dispatch(resetObjPayloadCrossFunctionalImpact());
    dispatch(resetObjPayloadAdditionalInformation());
    dispatch(resetObjPayloadProjectObjectives());
    dispatch(resetObjPayloadAuditBacklog());
    setShowModalBusinessConcern(false);
    setShowModalProjectDrivers(false);
    setShowModalValueProportions(false);
    setShowModalCrossFunctionalImpact(false);
    setShowModalAdditionalInformation(false);
    setShowModalProjectObjectives(false);
    setShowModalAuditBacklog(false);
  };

  const handleChangeBusinessConcern = (value) => {
    dispatch(setObjPayloadBusinessConcern(value));
  };

  const handleChangeProjectDrivers = (value) => {
    dispatch(setObjPayloadProjectDrivers(value));
  };

  const handleChangeValueProportions = (value) => {
    dispatch(setObjPayloadValueProportions(value));
  };

  const handleChangeCrossFunctionalImpact = (value) => {
    dispatch(setObjPayloadCrossFunctionalImpact(value));
  };

  const handleChangeAdditionalInformation = (value) => {
    dispatch(setObjPayloadAdditionalInformation(value));
  };

  const handleChangeProjectObjectives = (value) => {
    dispatch(setObjPayloadProjectObjectives(value));
  };

  const handleChangeAuditBacklog = (value) => {
    dispatch(setObjPayloadAuditBacklog(value));
  };

  const handleSubmitCKEditor = async (type) => {
    const payload = { id: params?.id };
    let url = type.toLowerCase().replace(/ /g, "_");
    switch (type) {
      case "Business Concern":
        payload.latar_belakang = payloadBusinessConcern;
        url = "latar_belakang";
        break;
      case "Project Drivers":
        payload.tujuan = payloadProjectDrivers;
        url = "tujuan";
        break;
      case "Value Proportions":
        payload.value_proportions = payloadValueProportions;
        break;
      case "Cross Functional Impact":
        payload.cross_functional_impact = payloadCrossFunctionalImpact;
        break;
      case "Additional Information":
        payload.additional_information = payloadAdditionalInformation;
        break;
      case "Project Objectives":
        payload.objectives = payloadProjectObjectives;
        url = "objectives";
        break;
      case "Audit Backlog":
        payload.audit_backlog = payloadAuditBacklog;
        url = "audit_backlog";
        break;
      case "Audit Timelines":
        payload.audit_timelines = payloadAuditTimelines;
        url = "audit_timelines";
        break;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/${url}`,
      payload
    );
    auditCanvasMutate();
    setShowModalBusinessConcern(false);
    setShowModalProjectDrivers(false);
    setShowModalValueProportions(false);
    setShowModalCrossFunctionalImpact(false);
    setShowModalAdditionalInformation(false);
    setShowModalProjectObjectives(false);
    setShowModalAuditBacklog(false);
    setShowModalAuditTimelines(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal CKEditor

  // [ START ] handler for team
  const handleCloseModalTeam = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalTeam(false);
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
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/tim_audit/${params?.id}`,
        { tim_audit: payloadTeam }
      );
      auditCanvasMutate();
      setShowModalTeam();
      loadingSwal("close");
    }
  };
  // [ END ] handler for team

  // [ START ] handler for uker assessment
  const handleCloseModalUkerAssessment = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/uker_assesment/${uker_id}`,
      {}
    );

    auditCanvasMutate();
    loadingSwal("close");
  };

  const handleSaveUkerAssessment = async (isUpdate, uker_id) => {
    const payload = {
      ref_auditee_orgeh_kode: payloadUkerAssessment?.orgeh?.orgeh_kode,
      ref_auditee_branch_kode: payloadUkerAssessment?.branch?.branch_kode,
      tipe_uker: payloadUkerAssessment?.tipe_uker,
    };
    const schemaMapping = {
      schema: ukerAssessmentEWPSchema,
      resetErrors: resetValidationErrorsUkerAssessment,
      setErrors: setValidationErrorsUkerAssessment,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      const response = await fetchApi(
        isUpdate ? "PATCH" : "POST",
        `${
          process.env.NEXT_PUBLIC_API_URL_EWP
        }/ewp/agile/assesment/audit_canvas/uker_assesment/${
          isUpdate ? uker_id : params?.id
        }`,
        {
          ref_auditee_branch_kode: parseInt(
            payloadUkerAssessment?.branch?.branch_kode
          ),
          ref_auditee_branch_name: payloadUkerAssessment?.branch?.branch_name,
          ref_auditee_orgeh_kode: parseInt(
            payloadUkerAssessment?.orgeh?.orgeh_kode
          ),
          ref_auditee_orgeh_name: payloadUkerAssessment?.orgeh?.orgeh_name,
          tipe_uker: payloadUkerAssessment?.tipe_uker,
        }
      );
      if (response.isDismissed) return;
      setIsAddNewRowUker(false);
      auditCanvasMutate();
      dispatch(resetObjPayloadUkerAssessment());
      dispatch(resetValidationErrorsUkerAssessment());
      loadingSwal("close");
    }
  };
  // [ END ] handler for uker assessment

  // [ START ] handler for audit timelines
  const handleCloseModalTableAuditTimelines = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalAuditTimelinesTable(false);
  };

  const handleCloseModalAuditTimelines = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalAuditTimelines(false);
    setTypeModalAuditTimeline("");
    setSelectedAuditTimelineId(0);
    dispatch(resetObjPayloadAuditTimelines());
    dispatch(resetValidationErrorsAuditTimelines());
  };

  const handleClickAddAuditTimelines = () => {
    setShowModalAuditTimelines(true);
  };

  const handleClickEditAuditTimelines = (id) => {
    setShowModalAuditTimelines(true);
    setTypeModalAuditTimeline("update");
    setSelectedAuditTimelineId(id);
  };

  const handleClickDeleteAuditTimelines = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/audit_timeline/delete/${id}`,
      {}
    );
    auditCanvasMutate();
    loadingSwal("close");
  };

  const handleChangePayloadAuditTimelines = (property, value) => {
    const updatedData = {
      ...payloadAuditTimelines,
      [property]: value,
    };
    dispatch(setObjPayloadAuditTimelines(updatedData));
  };

  const handleSubmitAuditTimelines = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: auditTimelinesEWPSchema,
      resetErrors: resetValidationErrorsAuditTimelines,
      setErrors: setValidationErrorsAuditTimelines,
    };
    const validate = setErrorValidation(
      payloadAuditTimelines,
      dispatch,
      schemaMapping
    );

    const objPayload = {
      ewp_id: params?.id,
      ...payloadAuditTimelines,
    };

    if (validate) {
      loadingSwal();
      if (typeModalAuditTimeline === "update") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/audit_timeline/update/${selectedAuditTimelineId}`,
          { ..._.omit(objPayload, ["ewp_id"]) }
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/audit_timeline/create`,
          objPayload
        );
      }

      auditCanvasMutate();
      setShowModalAuditTimelines(false);
      setTypeModalAuditTimeline("");
      setSelectedAuditTimelineId(0);
      dispatch(resetObjPayloadAuditTimelines());
      dispatch(resetValidationErrorsAuditTimelines());
      loadingSwal("close");
    }
  };
  // [ END ] handler for audit timelines

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[100rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-end items-center mb-7">
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            nextUrl={"/working-agreements"}
            marginLeft={"-70px"}
          />
        </div>
        {/* Start Content */}
        <CardContentHeaderFooter
          header={
            <div className="p-3 font-semibold text-xl w-full flex items-center">
              Audit Canvas : {dataProjectId?.toUpperCase() || ""}
            </div>
          }
        >
          <div className="p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              {/* [ START ] Business Concern */}
              <CardContent
                title={"Business Concern"}
                handleClickEdit={handleEditBusinessConcern}
                withoutButton={!isInitiator}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[25rem] max-h-[25rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataBusinessConcern,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Business Concern */}
              {/* [ START ] Project Drivers & Value Proportions */}
              <div className="w-full flex flex-col gap-3">
                {/* [ START ] Project Drivers */}
                <CardContent
                  title={"Project Drivers"}
                  handleClickEdit={handleEditProjectDrivers}
                  withoutButton={!isInitiator}
                >
                  <div className="py-1.5">
                    <div
                      className="min-h-[10.5rem] max-h-[10.5rem] overflow-y-scroll px-2"
                      dangerouslySetInnerHTML={{
                        __html: dataProjectDrivers,
                      }}
                    />
                  </div>
                </CardContent>
                {/* [ END ] Project Drivers */}
                {/* [ START ] Value Proportions */}
                <CardContent
                  title={"Value Proportions"}
                  handleClickEdit={handleEditValueProportions}
                  withoutButton={!isInitiator}
                >
                  <div className="py-1.5">
                    <div
                      className="min-h-[10.5rem] max-h-[10.5rem] overflow-y-scroll px-2"
                      dangerouslySetInnerHTML={{
                        __html: dataValueProportions,
                      }}
                    />
                  </div>
                </CardContent>
                {/* [ END ] Value Proportions */}
              </div>
              {/* [ END ] Project Drivers & Value Proportions */}
              {/* [ START ] Cross-Functional Impact */}
              <CardContent
                title={"Cross-Functional Impact"}
                handleClickEdit={handleEditCrossFunctionalImpact}
                withoutButton={!isInitiator}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[25rem] max-h-[25rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataCrossFunctionalImpact,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Cross-Functional Impact */}
            </div>
            <div className="flex gap-3">
              {/* [ START ] Key Stakeholders */}
              <CardContent
                title={"Key Stakeholders"}
                handleClickEdit={handleEditUkerAssessment}
                withoutButton={!isInitiator}
              >
                <div className="p-3">
                  <TableTree>
                    <Headers>
                      <Header
                        width="30%"
                        className="border-x border-t cell-custom-dataTables rounded-ss-lg"
                      >
                        <div
                          className={`custom-table-header text-sm font-semibold`}
                        >
                          UKER Type
                        </div>
                      </Header>
                      <Header
                        width="35%"
                        className="border-x border-t cell-custom-dataTables"
                      >
                        <div
                          className={`custom-table-header text-sm font-semibold`}
                        >
                          Branch
                        </div>
                      </Header>
                      <Header
                        width="35%"
                        className="border-t border-r cell-custom-dataTables rounded-se-lg"
                      >
                        <div className="custom-table-header text-sm font-semibold">
                          Orgeh
                        </div>
                      </Header>
                    </Headers>
                    {dataUkerAssessment?.length ? (
                      <div className="min-h-[9rem] max-h-[9rem] overflow-y-scroll">
                        <Rows
                          items={dataUkerAssessment}
                          render={({ uker_type, branch, orgeh }) => (
                            <Row>
                              <Cell
                                width="30%"
                                className={`border-x ${customCell}`}
                              >
                                <div className="cell-custom-dataTables-padding-0">
                                  <p className="text-base">
                                    {uker_type?.name?.toUpperCase()}
                                  </p>
                                </div>
                              </Cell>
                              <Cell
                                width="35%"
                                className={`border-r ${customCell}`}
                              >
                                <div className="cell-custom-dataTables-padding-0">
                                  <p className="text-base">{`${branch?.branch_kode} - ${branch?.branch_name}`}</p>
                                </div>
                              </Cell>
                              <Cell
                                width="35%"
                                className={`border-r ${customCell}`}
                              >
                                <div className="cell-custom-dataTables-padding-0">
                                  <p className="text-base">{`${orgeh?.orgeh_kode} - ${orgeh?.orgeh_name}`}</p>
                                </div>
                              </Cell>
                            </Row>
                          )}
                        />
                      </div>
                    ) : (
                      <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
                        <DataNotFound />
                      </div>
                    )}
                  </TableTree>
                </div>
              </CardContent>
              {/* [ END ] Key Stakeholders */}
              {/* [ START ] Project Team*/}
              <CardContent
                title={"Project Team"}
                handleClickEdit={handleEditProjectTeam}
                withoutButton={!isInitiator}
              >
                <div className="p-3">
                  <TableTree>
                    <Headers>
                      <Header
                        width="35%"
                        className="border-x border-t cell-custom-dataTables rounded-ss-lg"
                      >
                        <div
                          className={`custom-table-header text-sm font-semibold`}
                        >
                          Role
                        </div>
                      </Header>
                      <Header
                        width="65%"
                        className="border-t border-r cell-custom-dataTables rounded-se-lg"
                      >
                        <div className="custom-table-header text-sm font-semibold">
                          PN & Name
                        </div>
                      </Header>
                    </Headers>
                    <div className="min-h-[9rem] max-h-[9rem] overflow-y-scroll">
                      <Rows
                        items={dataTeam}
                        render={({ role, pic }) => (
                          <Row>
                            <Cell
                              width="35%"
                              className={`border-x ${customCell}`}
                            >
                              <div className="cell-custom-dataTables-padding-0">
                                <p className="text-base">{role}</p>
                              </div>
                            </Cell>
                            <Cell
                              width="65%"
                              className={`border-r ${customCell}`}
                            >
                              <div className="cell-custom-dataTables-padding-0">
                                <p className="text-base">{`${pic?.pn} - ${pic?.nama}`}</p>
                              </div>
                            </Cell>
                          </Row>
                        )}
                      />
                    </div>
                  </TableTree>
                </div>
              </CardContent>
              {/* [ END ] Project Team*/}
              {/* [ START ] Additional Informations */}
              <CardContent
                title={"Additional Informations"}
                handleClickEdit={handleEditAdditionalInformation}
                withoutButton={!isInitiator}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[12.4rem] max-h-[12.4rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataAdditionalInformation,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Additional Informations */}
            </div>
            <div className="flex gap-3">
              {/* [ START ] Project Objectives */}
              <CardContent
                title={"Project Objectives"}
                handleClickEdit={handleEditProjectObjectives}
                withoutButton={!isInitiator}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[25rem] max-h-[25rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataProjectObjectives,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Project Objectives */}
              {/* [ START ] Audit Backlog*/}
              <CardContent
                title={"Audit Backlog"}
                handleClickEdit={handleEditAuditBacklog}
                withoutButton={!isInitiator}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[25rem] max-h-[25rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataAuditBacklog,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Audit Backlog*/}
              {/* [ START ] Audit Timelines */}
              <CardContent
                title={"Audit Timelines"}
                handleClickEdit={handleEditAuditTimelines}
                withoutButton={!isInitiator}
              >
                <div className="p-3">
                  <TableTree>
                    <Headers>
                      <Header className="!hidden" />
                      <Header
                        width="40%"
                        className="border-t border-x cell-jadwal-audit-mapa-ewp rounded-ss-lg"
                      >
                        Keterangan
                      </Header>
                      <Header
                        width="30%"
                        className="border-t border-r cell-jadwal-audit-mapa-ewp"
                      >
                        Tanggal Dimulai
                      </Header>
                      <Header
                        width="30%"
                        className="border-t border-r cell-jadwal-audit-mapa-ewp rounded-se-lg"
                      >
                        Tanggal Berakhir
                      </Header>
                    </Headers>
                    {dataAuditTimelines?.length ? (
                      <div className="min-h-[21.6rem] max-h-[21.6rem] overflow-y-scroll">
                        <Rows
                          items={dataAuditTimelines}
                          render={({ title, start_date, end_date }) => (
                            <Row>
                              <Cell className="!hidden" />
                              <Cell
                                width="40%"
                                className="border-x cell-jadwal-audit-mapa-ewp"
                              >
                                {title}
                              </Cell>
                              <Cell
                                width="30%"
                                className="border-r cell-jadwal-audit-mapa-ewp"
                              >
                                {convertDate(start_date, "/", "d")}
                              </Cell>
                              <Cell
                                width="30%"
                                className="border-r cell-jadwal-audit-mapa-ewp"
                              >
                                {convertDate(end_date, "/", "d")}
                              </Cell>
                            </Row>
                          )}
                        />
                      </div>
                    ) : (
                      <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
                        <DataNotFound />
                      </div>
                    )}
                  </TableTree>
                </div>
              </CardContent>
              {/* [ END ] Audit Timelines */}
            </div>
          </div>
        </CardContentHeaderFooter>
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
        <ModalKeyStakeholder
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
        <ModalCKEditor
          title={"Business Concern"}
          showModal={showModalBusinessConcern}
          data={dataBusinessConcern}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeBusinessConcern}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Project Drivers"}
          showModal={showModalProjectDrivers}
          data={dataProjectDrivers}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeProjectDrivers}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Value Proportions"}
          showModal={showModalValueProportions}
          data={dataValueProportions}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeValueProportions}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Cross Functional Impact"}
          showModal={showModalCrossFunctionalImpact}
          data={dataCrossFunctionalImpact}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeCrossFunctionalImpact}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Additional Information"}
          showModal={showModalAdditionalInformation}
          data={dataAdditionalInformation}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeAdditionalInformation}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Project Objectives"}
          showModal={showModalProjectObjectives}
          data={dataProjectObjectives}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeProjectObjectives}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Audit Backlog"}
          showModal={showModalAuditBacklog}
          data={dataAuditBacklog}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeAuditBacklog}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalTableAuditTimelines
          data={dataAuditTimelines}
          showModal={showModalAuditTimelinesTable}
          handleClickAdd={handleClickAddAuditTimelines}
          handleClickEdit={handleClickEditAuditTimelines}
          handleClickDelete={handleClickDeleteAuditTimelines}
          handleCloseModal={handleCloseModalTableAuditTimelines}
        />
        <ModalAuditTimelines
          showModal={showModalAuditTimelines}
          typeModal={typeModalAuditTimeline}
          data={payloadAuditTimelines}
          validation={validationAuditTimelines}
          handleCloseModal={handleCloseModalAuditTimelines}
          handleChangeText={handleChangePayloadAuditTimelines}
          handleSubmit={handleSubmitAuditTimelines}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

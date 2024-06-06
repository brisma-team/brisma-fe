import React, { useEffect, useState } from "react";
import { OverviewLayoutEWP } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import {
  DataNotFound,
  ModalCopyLink,
  SelectSortFilter,
} from "@/components/molecules/commons";
import {
  confirmationSwal,
  convertDate,
  copyToClipboard,
  errorSwal,
  fetchApi,
  infoSwal,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import {
  CardOverview,
  CardFilterOverview,
} from "@/components/molecules/ewp/quality-assurance/overview";
import { useApprovalEWP, useWorkflowDetailEWP } from "@/data/ewp";
import useUser from "@/data/useUser";
import { useOverview } from "@/data/ewp/quality-assurance/overview";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjDataWorkflow,
  setObjDataHistoryWorkflow,
  setObjPayload,
  setObjPayloadRelatedProject,
  setValidationErrorsSchedulePAT,
  setValidationErrorsSummaryPAT,
  setValidationErrorsScheduleNonPAT,
  setValidationErrorsRelatedProjectNonPAT,
  setValidationErrorsWorkflow,
  resetObjData,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetObjPayload,
  resetObjPayloadRelatedProject,
  resetValidationErrorsSchedulePAT,
  resetValidationErrorsSummaryPAT,
  resetValidationErrorsScheduleNonPAT,
  resetValidationErrorsRelatedProjectNonPAT,
  resetValidationErrorsWorkflow,
} from "@/slices/ewp/quality-assurance/overview/overviewEWPQualityAssuranceSlice";
import {
  schedulePATSchema,
  summaryPATSchema,
  scheduleNonPATSchema,
  relatedProjectNonPATSchema,
} from "@/helpers/schemas/ewp/common/overviewEWPSchema";
import {
  ModalAddProjectEWP,
  ModalWorkflowRequestChangeInitiator,
  ModalWorkflowApproveProjectPat,
} from "@/components/molecules/ewp/common/overview";
import workflowSchema from "@/helpers/schemas/common/workflow/workflowSchema";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Quality Assurance / Overview", path: "/ewp/quality-assurance" },
];

const convertProgressAndPercent = (status) => {
  let progress, percent;
  switch (status) {
    case "init project":
      progress = 0;
      percent = "0%";
      break;
    case "mapa":
      progress = 0.2;
      percent = "20%";
      break;
    case "pelaksanaan":
      progress = 0.4;
      percent = "40%";
      break;
    case "monitoring":
      progress = 0.6;
      percent = "60%";
      break;
    case "wrapup":
      progress = 0.8;
      percent = "80%";
      break;
    case "final":
      progress = 1;
      percent = "100%";
      break;
  }
  return { progress, percent };
};

const index = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);

  // [ START ] state for modal add project
  const [showModal, setShowModal] = useState(false);
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isPat, setIsPat] = useState(false);
  const [isAddNewRowProject, setIsAddNewRowProject] = useState(false);
  const [maxStage, setMaxStage] = useState(null);
  const [differentPIC, setDifferentPIC] = useState(true);
  // [ END ] state for modal add project

  const [showModalProjectPAT, setShowModalProjectPAT] = useState(false);
  const [showModalCopyLink, setShowModalCopyLink] = useState(false);
  const [showModalApprovalExtension, setShowModalApprovalExtension] =
    useState(false);
  const [changeInitiatorId, setChangeInitiatorId] = useState("");
  const [copyLinkUrl, setCopyLinkUrl] = useState("");

  const data = useSelector(
    (state) => state.overviewEWPQualityAssurance.objData
  );
  const dataWorkflow = useSelector(
    (state) => state.overviewEWPQualityAssurance.objDataWorkflow
  );
  const dataHistoryWorkflow = useSelector(
    (state) => state.overviewEWPQualityAssurance.objDataHistoryWorkflow
  );
  const payload = useSelector(
    (state) => state.overviewEWPQualityAssurance.objPayload
  );
  const payloadRelatedProject = useSelector(
    (state) => state.overviewEWPQualityAssurance.objPayloadRelatedProject
  );
  const validationErrorsSchedulePAT = useSelector(
    (state) => state.overviewEWPQualityAssurance.validationErrorsSchedulePAT
  );
  const validationErrorsSummaryPAT = useSelector(
    (state) => state.overviewEWPQualityAssurance.validationErrorsSummaryPAT
  );
  const validationErrorsScheduleNonPAT = useSelector(
    (state) => state.overviewEWPQualityAssurance.validationErrorsScheduleNonPAT
  );
  const validationErrorsRelatedProjectNonPAT = useSelector(
    (state) =>
      state.overviewEWPQualityAssurance.validationErrorsRelatedProjectNonPAT
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.overviewEWPQualityAssurance.validationErrorsWorkflow
  );

  const [filter, setFilter] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  const schemaMappings = {
    true: {
      2: {
        schema: schedulePATSchema,
        resetErrors: resetValidationErrorsSchedulePAT,
        setErrors: setValidationErrorsSchedulePAT,
      },
      3: {
        schema: summaryPATSchema,
        resetErrors: resetValidationErrorsSummaryPAT,
        setErrors: setValidationErrorsSummaryPAT,
      },
    },
    false: {
      2: {
        schema: scheduleNonPATSchema,
        resetErrors: resetValidationErrorsScheduleNonPAT,
        setErrors: setValidationErrorsScheduleNonPAT,
      },
    },
  };

  const { overview, overviewMutate } = useOverview(params);
  const { approvalEWP } = useApprovalEWP("ewp");
  const { user } = useUser();
  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "change_initiator",
    { id: changeInitiatorId }
  );

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (overview?.data?.length) {
      console.log("overview.data => ", overview.data);
      const mapping = overview.data.map((v) => {
        const {
          createdAt,
          need_approved,
          number_adendum,
          status_name,
          status_persetujuan_name,
          project_id,
          project_name,
          initiator,
          change_initiator,
        } = v;
        return {
          id: v?.id,
          tipe: v?.ref_tipe?.nama,
          jenis: v?.ref_jenis?.nama,
          project_code: project_id,
          project_name: project_name,
          period: `${convertDate(
            v?.info_periode_pelaksanaan_start,
            "-",
            "d"
          )} s/d ${convertDate(v?.info_periode_pelaksanaan_end, "-", "d")}`,
          progress: convertProgressAndPercent(v?.status_name).progress,
          percent: convertProgressAndPercent(v?.status_name).percent,
          ma: v?.info_team_audit?.ma || [],
          kta: v?.info_team_audit?.kta || [],
          ata: v?.info_team_audit?.ata || [],
          document_status: status_name,
          approval_status: status_persetujuan_name,
          addendum: number_adendum,
          need_approval: need_approved,
          created_at: createdAt,
          initiator,
          change_initiator,
        };
      });
      dispatch(setObjData(mapping));
      setTotalData(overview?.pagination?.totalData);
    } else {
      dispatch(resetObjData());
      setTotalData(1);
    }
  }, [overview]);

  // [ START ] hook for modal add project
  useEffect(() => {
    if (isPat) {
      setMaxStage(3);
    } else {
      setMaxStage(4);
    }
  }, [isPat]);
  // [ END ] hook for modal add project

  useEffect(() => {
    if (workflowDetailEWP?.data && showModalApprovalExtension) {
      const workflowInfo = workflowDetailEWP?.data?.info;
      const maker = workflowDetailEWP?.data?.initiator;
      const approvers = workflowDetailEWP?.data?.approver;
      const signers = workflowDetailEWP?.data?.signer;

      const newWorkflowData = {
        ...dataWorkflow,
        status_approver: workflowInfo?.status_persetujuan,
        on_approver: workflowInfo?.status_approver,
        initiator_from: {
          pn: workflowInfo?.pn_from,
          name: workflowInfo?.name_from,
        },
        initiator_to: {
          pn: workflowInfo?.pn_to,
          name: workflowInfo?.name_to,
        },
      };

      newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.name}`;
      newWorkflowData.maker = {
        pn: workflowInfo?.pn_from,
        nama: workflowInfo?.name_from,
      };

      if (approvers?.length) {
        const mappingApprovers = _.map(
          approvers,
          ({ pn, nama, is_signed }) => ({
            pn,
            nama,
            is_signed,
          })
        );
        newWorkflowData.ref_tim_audit_approver = mappingApprovers;
      }

      if (signers?.length) {
        const mappingSigners = _.map(signers, ({ nama, pn }) => ({ nama, pn }));
        newWorkflowData.ref_tim_audit_signer = mappingSigners;
      }

      if (workflowDetailEWP?.data?.log?.length) {
        const mapping = workflowDetailEWP?.data?.log?.map((v) => {
          return {
            children: v?.children?.length
              ? v?.children?.map((child) => ({
                  role: "child",
                  pic: child?.from?.pn + " - " + child?.from?.nama,
                  alasan: child?.note,
                  status:
                    child?.is_signed === true
                      ? "Approved"
                      : child?.is_signed === false
                      ? "Rejected"
                      : child?.note || "",
                  tanggal: convertDate(v?.createdAt, "-", "d"),
                }))
              : [],
            id: v?.id,
            role: "parent",
            pic: v?.create_by?.pn + " - " + v?.create_by?.fullName,
            alasan: v?.note,
            status: "",
            tanggal: convertDate(v?.createdAt, "-", "d"),
          };
        });
        dispatch(setObjDataHistoryWorkflow(mapping));
      }

      dispatch(setObjDataWorkflow(newWorkflowData));
    } else {
      dispatch(resetObjDataWorkflow());
      dispatch(resetObjDataHistoryWorkflow());
    }
  }, [workflowDetailEWP, showModalApprovalExtension, changeInitiatorId, user]);

  // [ START ] handler for modal add project
  const handleChangePayload = (props, value) => {
    dispatch(
      setObjPayload({
        ...payload,
        [props]: value,
      })
    );
  };

  const handleChangePICPayload = (e) => {
    dispatch(
      setObjPayload({
        ...payload,
        pn_approver: e.value.pn,
        nama_approver: e.value.name,
      })
    );
  };

  const handleIsPAT = (value) => {
    setIsPat(value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const validate = setErrorValidation(
      payload,
      dispatch,
      schemaMappings[isPat][currentModalStage]
    );

    if (validate) {
      const buttonName = e.target.offsetParent.name;
      const data = {
        ...payload,
        is_pat: isPat,
        audit_year: !isPat
          ? parseInt(new Date().getFullYear())
          : payload.audit_year,
        project_terkait:
          _.map(payload?.project_terkait, ({ project_id, project_name }) => ({
            project_id,
            project_name,
          })) || [],
      };

      if (buttonName === "saveButton" || buttonName === "sendApprovalButton") {
        if (
          isPat &&
          currentModalStage === maxStage &&
          differentPIC &&
          !payload?.pn_approver
        ) {
          dispatch(
            setValidationErrorsSummaryPAT({ pn_approver: "Wajib diisi" })
          );
          return;
        }

        loadingSwal();
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/auditor/create`,
          data
        );
        setShowModal(false);
        setCurrentModalStage(1);
        setIsPat(true);
        dispatch(resetObjPayload());
        overviewMutate();
        loadingSwal("close");
      }
    }
  };

  const handlePrevStage = async () => {
    setCurrentModalStage(currentModalStage - 1);
  };

  const handleNextStage = async () => {
    const data = {
      ...payload,
      is_pat: isPat,
    };

    if (currentModalStage === 3 && !isPat) {
      if (payload?.project_terkait?.some((project) => project.is_new)) {
        await infoSwal(
          "Anda sedang menambahkan data proyek terkait, silahkan dicek kembali!"
        );
        return;
      }
    }

    const validate = setErrorValidation(
      data,
      dispatch,
      schemaMappings[isPat][currentModalStage]
    );

    if (validate) {
      setCurrentModalStage(currentModalStage + 1);
    }
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setCurrentModalStage(1);
    setIsPat(true);
    dispatch(resetObjPayload());
  };

  // [ START ] Handler for change data on sub modal ModalBodySchedule PAT
  const handleClickRowTableSchedulePAT = (value) => {
    const {
      id,
      name_kegiatan_audit,
      ref_penanggung_jawabs,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      audited,
      createdAt,
      create_by,
      deskripsi,
    } = value;

    const updatedData = {
      ...payload,
      project_name: name_kegiatan_audit,
      pat_jadwal_kegiatan_id: id,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      audited,
      deskripsi,
      ref_penanggung_jawabs,
      createdAt,
      create_by,
    };
    dispatch(setObjPayload(updatedData));

    const result = ref_penanggung_jawabs?.find((v) => v?.pn == user?.data?.pn);
    setDifferentPIC(!result);
  };
  // [ END ] Handler for change data on sub modal ModalBodySchedule PAT

  // [ START ] Handler for change data on sub modal ModalBodyDocument Non-PAT
  const handleUploadSurat = ({ url, fileName }) => {
    dispatch(
      setObjPayload({
        ...payload,
        url_file_surat: url,
        nama_file_surat: fileName,
      })
    );
  };
  // [ END ] Handler for change data on sub modal ModalBodyDocument Non-PAT

  // [ START ] handler for modal add project
  const handleChangePayloadProject = (props, value) => {
    const newPayload = {
      ...payloadRelatedProject,
      [props]: value,
    };
    dispatch(setObjPayloadRelatedProject(newPayload));
  };

  const handleClickAddProject = () => {
    if (!isAddNewRowProject) {
      const newDataTables = JSON.parse(JSON.stringify(payload));
      newDataTables?.project_terkait?.push(payloadRelatedProject);
      dispatch(setObjPayload(newDataTables));
      setIsAddNewRowProject(true);
    }
  };

  const handleClickSaveProject = (project_id) => {
    const newData = JSON.parse(JSON.stringify(payload));
    const newDataTables = [...newData.project_terkait];
    const findIndex = newDataTables.findIndex(
      (v) => v.project_id === project_id
    );
    if (findIndex !== -1) {
      const schemaMapping = {
        schema: relatedProjectNonPATSchema,
        resetErrors: resetValidationErrorsRelatedProjectNonPAT,
        setErrors: setValidationErrorsRelatedProjectNonPAT,
      };
      const validate = setErrorValidation(
        payloadRelatedProject,
        dispatch,
        schemaMapping
      );

      if (validate) {
        newDataTables[findIndex] = { ...payloadRelatedProject, is_new: false };
        newData.project_terkait = newDataTables;
        dispatch(setObjPayload(newData));
        dispatch(resetObjPayloadRelatedProject());
        dispatch(resetValidationErrorsRelatedProjectNonPAT());
        setIsAddNewRowProject(false);
      }
    }
  };

  const handleClickDeleteProject = async (project_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    const newDataTables = JSON.parse(
      JSON.stringify(payload.project_terkait || [])
    );
    const findAnswerIndex = newDataTables?.findIndex(
      (v) => v.project_id == project_id
    );
    newDataTables.splice(findAnswerIndex, 1);
    dispatch(setObjPayload({ ...payload, project_terkait: newDataTables }));
    dispatch(resetValidationErrorsRelatedProjectNonPAT());
    setIsAddNewRowProject(false);
  };
  // [ END ] handler for modal add project

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  // [ START ] handler for dropdown carding
  const handleCloseProject = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menutup project ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/disable/${id}`,
      {}
    );
    overviewMutate();
    loadingSwal("close");
  };

  const handleCopyProject = (e, url) => {
    e.stopPropagation();
    copyToClipboard(url, "Link meeting berhasil disalin ke clipboard.");
  };

  const handleOpenCopyProject = (id) => {
    setCopyLinkUrl(window.location.href + `/${id}/info`);
    setShowModalCopyLink(true);
  };
  // [ END ] handler for dropdown carding

  // [ START ] handler for modal change initiator
  const handleChangeInitiator = async (
    e,
    status,
    ewp_id,
    change_initiator_id
  ) => {
    e.stopPropagation();
    if (!status) {
      const confirm = await confirmationSwal(
        "Apakah anda yakin ingin melakukan perubahan Inisiator?"
      );

      if (!confirm.value) {
        return;
      }
      const response = await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/change_initiator/create`,
        { ewp_id, note: "change initiator" }
      );
      setChangeInitiatorId(parseInt(response?.data?.id) + 1);
      overviewMutate();
      setShowModalApprovalExtension(true);
    } else {
      dispatch(resetObjDataWorkflow());
      setChangeInitiatorId(change_initiator_id);
      setShowModalApprovalExtension(!showModalApprovalExtension);
    }
  };

  const handleChangeSelect = (property, index, e) => {
    const newData = [...dataWorkflow[property]];
    const updated = { ...newData[index] };
    updated["pn"] = e?.value?.pn;
    updated["nama"] = e?.value?.name;
    newData[index] = updated;
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
        [property]: newData,
      })
    );
  };

  const handleChangeSelectInitiator = (property, e) => {
    const newData = {
      pn: e?.value?.pn,
      name: e?.value?.name,
    };
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
        [property]: newData,
      })
    );
  };
  const handleSubmitRequestChangeInitiator = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowSchema,
      resetErrors: resetValidationErrorsWorkflow,
      setErrors: setValidationErrorsWorkflow,
    };
    const validate = setErrorValidation(dataWorkflow, dispatch, schemaMapping);
    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "change_initiator",
        sub_modul_id: changeInitiatorId,
      };

      data.pn_to = dataWorkflow?.initiator_to?.pn;
      data.name_to = dataWorkflow?.initiator_to?.name;

      const signedCount = dataWorkflow?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      if (actionType === "" || actionType === undefined) {
        return;
      }

      switch (actionType) {
        case "change":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          data.signers = [];
          break;
        case "create":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          data.signers = [];
          break;
        case "reject":
          if (!dataWorkflow.note) {
            await errorSwal("Silahkan berikan alasan!");
            return;
          }
          data.note = dataWorkflow.note;
          break;
        case "approve":
          if (signedCount >= dataWorkflow?.ref_tim_audit_approver?.length) {
            data.data = "<p>pirli test</p>";
          }
          data.note = dataWorkflow.note;
          break;
      }

      if (actionType === "reset") {
        const confirm = await confirmationSwal(
          "Terkait dengan workflow ini, apakah Anda yakin ingin melakukan pengaturan ulang?"
        );
        if (!confirm.value) {
          return;
        }
      }

      await fetchApi(
        actionType === "change" ? "PATCH" : "POST",
        `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/${actionType}`,
        data
      );

      overviewMutate();
      workflowDetailEWPMutate();
      dispatch(resetObjDataWorkflow());
      setShowModalApprovalExtension(false);
    }
    overviewMutate();
    workflowDetailEWPMutate();
    dispatch(resetObjDataWorkflow());
  };

  const handleCloseModalRequestChangeInitiator = () => {
    dispatch(resetObjDataWorkflow());
  };

  const handleChangeTextRequestChangeInitiator = (property, value) => {
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
        [property]: value,
      })
    );
  };

  const handleAddApproverRequestChangeInitiator = (property) => {
    const newData = [...dataWorkflow[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
        [property]: newData,
      })
    );
  };

  const handleDeleteApproverRequestChangeInitiator = (property, idx) => {
    const newData = [...dataWorkflow[property]];
    newData.splice(idx, 1);
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
        [property]: newData,
      })
    );
  };
  // [ END ] handler for modal change initiator

  return (
    <OverviewLayoutEWP data={approvalEWP?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex items-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField
              handler={() => setShowModal(true)}
              text={"Buat Project"}
            />
          </div>
        </div>
      </div>
      <div className="">
        <CardFilterOverview
          showFilter={showFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilter}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {data?.length ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
          {data.map((v, i) => {
            return (
              <CardOverview
                key={i}
                data={v}
                user={user?.data}
                handleCloseProject={handleCloseProject}
                handleCopyProject={handleOpenCopyProject}
                handleChangeInitiator={handleChangeInitiator}
              />
            );
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
      <CustomPagination
        perPage={filter.limit}
        defaultCurrentPage={1}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        totalData={totalData}
      />
      <ModalAddProjectEWP
        module={"qa"}
        showModal={showModal}
        payload={payload}
        payloadRelatedProject={payloadRelatedProject}
        user={user?.data}
        currentModalStage={currentModalStage}
        setCurrentModalStage={setCurrentModalStage}
        isPat={isPat}
        maxStage={maxStage}
        differentPIC={differentPIC}
        validationErrorsSchedulePAT={validationErrorsSchedulePAT}
        validationErrorsSummaryPAT={validationErrorsSummaryPAT}
        validationErrorsScheduleNonPAT={validationErrorsScheduleNonPAT}
        validationErrorsRelatedProjectNonPAT={
          validationErrorsRelatedProjectNonPAT
        }
        handleChangePayload={handleChangePayload}
        handleChangePICPayload={handleChangePICPayload}
        handleIsPAT={handleIsPAT}
        handleSubmitForm={handleSubmitForm}
        handlePrevStage={handlePrevStage}
        handleNextStage={handleNextStage}
        handleCloseModal={handleCloseModal}
        handleClickRowTableSchedulePAT={handleClickRowTableSchedulePAT}
        handleUploadSurat={handleUploadSurat}
        handleChangePayloadProject={handleChangePayloadProject}
        handleClickAddProject={handleClickAddProject}
        handleClickDeleteProject={handleClickDeleteProject}
        handleClickSaveProject={handleClickSaveProject}
      />
      <ModalWorkflowRequestChangeInitiator
        isExtensionRequest={false}
        isChangeInitiator={true}
        workflowData={dataWorkflow}
        historyWorkflow={dataHistoryWorkflow}
        validationErrors={validationErrorsWorkflow}
        setShowModal={setShowModalApprovalExtension}
        showModal={showModalApprovalExtension}
        headerTitle={"Pergantian Inisiator"}
        handleChange={handleChangeTextRequestChangeInitiator}
        handleChangeSelect={handleChangeSelect}
        handleChangeSelectInitiator={handleChangeSelectInitiator}
        handleDelete={handleDeleteApproverRequestChangeInitiator}
        handleAdd={handleAddApproverRequestChangeInitiator}
        handleSubmit={handleSubmitRequestChangeInitiator}
        handleCloseModal={handleCloseModalRequestChangeInitiator}
      />
      <ModalWorkflowApproveProjectPat
        headerTitle={"Persetujuan Project"}
        showModal={showModalProjectPAT}
        setShowModal={setShowModalProjectPAT}
        handleChangeSelect={handleChangeSelect}
      />
      <ModalCopyLink
        showModal={showModalCopyLink}
        setShowModal={setShowModalCopyLink}
        handleCopyProject={handleCopyProject}
        url={copyLinkUrl}
      />
      {/* End Content */}
    </OverviewLayoutEWP>
  );
};

export default index;

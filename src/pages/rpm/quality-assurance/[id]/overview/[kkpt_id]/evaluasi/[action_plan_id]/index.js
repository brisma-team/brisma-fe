import React, { useEffect, useState } from "react";
import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useObjectAuditDetailRPM, useWorkflowRPM } from "@/data/rpm/common";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjDataContent,
  setObjDataDokumenLampiran,
  setObjDataCatatanNegosiasi,
  setObjDataWorkflow,
  setObjDataHistoryWorkflow,
  setObjPayloadTanggapan,
  setObjPayloadHasilEvaluasi,
  setValidationErrors,
  resetObjDataContent,
  resetObjDataDokumenLampiran,
  resetObjDataCatatanNegosiasi,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetObjPayloadTanggapan,
  resetObjPayloadHasilEvaluasi,
  resetValidationErrors,
} from "@/slices/rpm/quality-assurance/evaluasiActionPlanRPMQualityAssuranceSlice";
import _ from "lodash";
import {
  checkRoleApprovalLog,
  confirmationSwal,
  convertDate,
  fetchApi,
  infoSwal,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  ApprovalItems,
  CardApprovalInfo,
  ModalWorkflow,
} from "@/components/molecules/commons";
import {
  CardContentActionPlan,
  ModalTanggapan,
} from "@/components/molecules/rpm/common";
import useUser from "@/data/useUser";
import {
  TableCatatanNegosiasi,
  TableDokumenLampiran,
} from "@/components/molecules/rpm/common/evaluasi-action-plan";
import workflowSchema from "@/helpers/schemas/common/workflow/workflowSchema";
import { useActionPlan } from "@/data/rpm/common/evaluasi";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
    action_plan_id: 0,
  });
  const baseUrl = `/rpm/quality-assurance/${params?.id}/overview/${params?.kkpt_id}`;
  const pathName = `${baseUrl}/evaluasi/${params?.action_plan_id}`;

  const [isOnProgress, setIsOnProgress] = useState(false);
  const [isPIC, setIsPIC] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModalTanggapan, setShowModalTanggapan] = useState(false);
  const [showModalApproval, setShowModalApproval] = useState(false);

  const dataContent = useSelector(
    (state) => state.evaluasiActionPlanRPMQualityAssurance.objDataContent
  );
  const dataDokumenLampiran = useSelector(
    (state) =>
      state.evaluasiActionPlanRPMQualityAssurance.objDataDokumenLampiran
  );
  const dataCatatanNegosiasi = useSelector(
    (state) =>
      state.evaluasiActionPlanRPMQualityAssurance.objDataCatatanNegosiasi
  );
  const dataWorkflow = useSelector(
    (state) => state.evaluasiActionPlanRPMQualityAssurance.objDataWorkflow
  );
  const dataHistoryWorkflow = useSelector(
    (state) =>
      state.evaluasiActionPlanRPMQualityAssurance.objDataHistoryWorkflow
  );
  const payloadTanggapan = useSelector(
    (state) => state.evaluasiActionPlanRPMQualityAssurance.objPayloadTanggapan
  );
  const payloadHasilEvaluasi = useSelector(
    (state) =>
      state.evaluasiActionPlanRPMQualityAssurance.objPayloadHasilEvaluasi
  );
  const validation = useSelector(
    (state) => state.evaluasiActionPlanRPMQualityAssurance.validationErrors
  );

  const { user } = useUser();
  const { objectAuditDetailRPM } = useObjectAuditDetailRPM({
    id: params?.id,
    kkpt_id: params?.kkpt_id,
    module: "qa",
  });
  const { actionPlan, actionPlanMutate } = useActionPlan({
    id: params?.action_plan_id,
    module: "qa",
  });
  const { workflowRPM, workflowRPMMutate } = useWorkflowRPM({
    type: "action_plan_evaluasi",
    id: params?.action_plan_id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, kkpt_id, action_plan_id } = router.query;
    setParams({
      id,
      kkpt_id,
      action_plan_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (objectAuditDetailRPM?.data) {
      const kkptInfo = objectAuditDetailRPM?.data?.kkpt;
      const projectInfo = objectAuditDetailRPM?.data?.project;

      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "RPM", path: "/rpm" },
        { name: "Overview", path: "/rpm/quality-assurance" },
        {
          name: projectInfo?.project_id?.toUpperCase(),
          path: `/rpm/quality-assurance/${params?.id}/overview`,
        },
        {
          name: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_id,
          path: baseUrl,
        },
        {
          name: "Evaluasi",
          path: `${baseUrl}/evaluasi`,
        },
        {
          name: "Action Plan",
          path: `${baseUrl}/evaluasi/${params?.action_plan_id}`,
        },
      ]);
    } else {
      dispatch(resetObjDataContent());
      setBreadcrumbs([]);
    }
  }, [objectAuditDetailRPM]);

  useEffect(() => {
    if (actionPlan?.data) {
      const response = actionPlan?.data;
      console.log("actionPlan?.data => ", actionPlan?.data);
      const { batas_waktu, hasil_evaluasi } = response;
      const mappingContent = {
        batas_waktu,
        rekomendasi: {
          ..._.pick(response?.rekomendasi_kkpt, ["nama", "description"]),
        },
        action_plan: response?.action_plan_kkpt?.name,
      };
      const mappingDokumenLampiran = response?.lampiran_tindak_lanjut?.length
        ? response?.lampiran_tindak_lanjut?.map((doc) => {
            return {
              ..._.pick(doc, ["file_url", "file_name"]),
              doc_id: doc?.id,
              upload_date: doc?.createdAt,
              uploader: doc?.create_by,
            };
          })
        : [];

      setIsPIC(response?.maker_evaluator?.pn === user?.data?.pn);
      dispatch(setObjDataContent(mappingContent));
      dispatch(setObjDataDokumenLampiran(mappingDokumenLampiran));
      dispatch(setObjPayloadTanggapan(response?.desc_evaluasi));
      dispatch(
        setObjPayloadHasilEvaluasi(
          hasil_evaluasi ? { kode: hasil_evaluasi, name: hasil_evaluasi } : {}
        )
      );
    } else {
      setIsPIC(false);
      dispatch(resetObjDataContent());
      dispatch(resetObjDataDokumenLampiran());
      dispatch(resetObjPayloadTanggapan());
      dispatch(resetObjPayloadHasilEvaluasi());
    }
  }, [actionPlan, user]);

  useEffect(() => {
    if (workflowRPM?.data) {
      const workflowInfo = workflowRPM?.data?.info;
      const maker = workflowRPM?.data?.initiator;
      const approvers = workflowRPM?.data?.approver;
      const signers = workflowRPM?.data?.signer;

      const newWorkflowData = {
        ...dataWorkflow,
        status_approver: workflowInfo?.status_persetujuan_evaluasi,
        on_approver: workflowInfo?.status_approver_evaluasi,
      };

      setIsOnProgress(
        Boolean(workflowInfo?.status_persetujuan_evaluasi == "On Progress")
      );

      newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.nama}`;
      newWorkflowData.maker = maker;

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

      if (workflowRPM?.data?.log?.length) {
        const mappingHistory = workflowRPM?.data?.log?.map((log) => {
          return {
            "P.I.C": `${log?.from?.pn} - ${log?.from?.nama}`,
            Role: checkRoleApprovalLog(log?.note, log?.is_signed),
            Alasan: log?.note,
            Status:
              log?.is_signed === true
                ? "Approved"
                : log?.is_signed === false
                ? "Rejected"
                : "",
            Tanggal: convertDate(log?.createdAt, "-", "d"),
          };
        });
        dispatch(setObjDataHistoryWorkflow(mappingHistory));
      }
      dispatch(setObjDataWorkflow(newWorkflowData));
    } else {
      dispatch(resetObjDataWorkflow());
      dispatch(resetObjDataHistoryWorkflow());
    }
  }, [workflowRPM, showModalApproval]);

  // [ START ] handler for modal tanggapan
  const handleCloseModalTanggapan = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalTanggapan(false);
    dispatch(resetObjPayloadTanggapan());
  };

  const handleClickOpenModalTanggapan = () => {
    setShowModalTanggapan(true);
  };

  const handleChangePayloadTanggapan = (value) => {
    dispatch(setObjPayloadTanggapan(value));
  };

  const handleSubmitTanggapan = async () => {
    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/rekomendasi/action_plan/update`,
      {
        id_action_plan: params?.action_plan_id,
        desc_evaluasi: payloadTanggapan,
      }
    );
    actionPlanMutate();
    setShowModalTanggapan(false);
    dispatch(resetObjPayloadTanggapan());
    loadingSwal("close");
  };
  // [ END ] handler for modal tanggapan

  // [ START ] handler for update hasil evaluasi
  const handleChangePayloadEvaluasi = (value) => {
    dispatch(setObjPayloadHasilEvaluasi(value));
  };

  const handleSubmitSave = async () => {
    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/rekomendasi/action_plan/update`,
      {
        id_action_plan: params?.action_plan_id,
        hasil_evaluasi: payloadHasilEvaluasi?.kode,
      }
    );

    actionPlanMutate();
    dispatch(resetObjPayloadHasilEvaluasi());
    loadingSwal("close");
  };
  // [ END ] handler for update hasil evaluasi

  // [ START ] handler for modal workflow
  const handleCloseModalWorkflow = () => {
    dispatch(resetObjDataWorkflow());
    workflowRPMMutate();
  };

  const handleAdd = (property) => {
    const newData = [...dataWorkflow[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setObjDataWorkflow({ ...dataWorkflow, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = [...dataWorkflow[property]];
    newData.splice(idx, 1);
    dispatch(setObjDataWorkflow({ ...dataWorkflow, [property]: newData }));
  };

  const handleChangeText = (property, value) => {
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
        [property]: value,
      })
    );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(dataWorkflow, dispatch, schemaMapping);

    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "action_plan_evaluasi",
        sub_modul_id: params?.action_plan_id,
        url_path: pathName,
      };

      const signedCount = dataWorkflow?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      if (actionType === "" || actionType === undefined) {
        return;
      }

      switch (actionType) {
        case "change":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          data.signers = dataWorkflow.ref_tim_audit_signer;
          break;
        case "create":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          data.signers = dataWorkflow.ref_tim_audit_signer;
          break;
        case "reject":
          if (!dataWorkflow?.note) {
            await infoSwal("Silahkan berikan alasan!");
            return;
          }
          data.note = dataWorkflow.note;
          break;
        case "approve":
          if (
            signedCount ===
            dataWorkflow?.ref_tim_audit_approver?.length - 1
          ) {
            data.doc_name = `test`;
            data.data = "test";
          }
          data.note = dataWorkflow.note;
          break;
      }

      loadingSwal();
      if (actionType === "reset") {
        const confirm = await confirmationSwal(
          "Terkait dengan workflow ini, apakah Anda yakin ingin melakukan pengaturan ulang?"
        );
        if (!confirm.value) {
          return;
        }
      }

      if (actionType === "change") {
        const response = await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/change`,
          data
        );
        if (!response.isDismissed) return;
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/${actionType}`,
          data
        );
      }

      workflowRPMMutate();
      dispatch(resetObjDataWorkflow());
      setShowModalApproval(false);
      loadingSwal("close");
    }
    workflowRPMMutate();
  };
  // [ END ] handler for modal workflow

  return (
    <LandingLayoutRPM
      module_page={"quality-assurance"}
      module_data={"qa"}
      withObjectAuditInfo
      withMenu
    >
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack backUrl={`${baseUrl}/evaluasi`} />
        <PageTitle text="Evaluasi Action Plan" />
      </div>
      <div className="flex gap-4">
        <CardContentActionPlan
          dataContent={dataContent}
          handleClickOpenModalTanggapan={handleClickOpenModalTanggapan}
        >
          <TableDokumenLampiran
            data={dataDokumenLampiran}
            dataContent={dataContent}
            payload={payloadHasilEvaluasi}
            withoutAction={!(isOnProgress && isPIC)}
            handleChangePayload={handleChangePayloadEvaluasi}
            handleSubmitSave={handleSubmitSave}
          />
          <TableCatatanNegosiasi data={dataCatatanNegosiasi} />
        </CardContentActionPlan>
        <CardApprovalInfo handleClick={() => setShowModalApproval(true)}>
          <p className="text-brisma font-bold text-xl">Approval</p>
          <ApprovalItems
            title={"Proposer"}
            text={dataWorkflow?.maker?.pn + " - " + dataWorkflow?.maker?.nama}
          />
          <ApprovalItems
            title={"Approver"}
            text={dataWorkflow?.ref_tim_audit_approver}
            data={dataWorkflow}
          />
          <ApprovalItems
            title={"Signer"}
            text={dataWorkflow?.ref_tim_audit_signer}
          />
        </CardApprovalInfo>
        <ModalTanggapan
          isEditable={isOnProgress && isPIC}
          data={payloadTanggapan}
          showModal={showModalTanggapan}
          handleChangePayload={handleChangePayloadTanggapan}
          handleCloseModal={handleCloseModalTanggapan}
          handleSubmit={handleSubmitTanggapan}
        />
        <ModalWorkflow
          workflowData={dataWorkflow}
          historyWorkflow={dataHistoryWorkflow}
          validationErrors={validation}
          showModal={showModalApproval}
          headerTitle={"Workflow & Riwayat Approval"}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          setShowModal={setShowModalApproval}
          handleAdd={handleAdd}
          handleChangeSelect={handleChangeSelect}
          handleChangeText={handleChangeText}
          handleCloseModal={handleCloseModalWorkflow}
          withSigner
        />
      </div>
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;

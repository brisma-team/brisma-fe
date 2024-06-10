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
  setObjPayloadUploadDokumen,
  setValidationErrors,
  resetObjDataContent,
  resetObjDataDokumenLampiran,
  resetObjDataCatatanNegosiasi,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetObjPayloadTanggapan,
  resetObjPayloadUploadDokumen,
  resetValidationErrors,
} from "@/slices/rpm/quality-assurance/tindakLanjutActionPlanRPMQualityAssuranceSlice";
import _ from "lodash";
import {
  checkRoleApprovalLog,
  confirmationSwal,
  convertDate,
  fetchApi,
  infoSwal,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";
import {
  ApprovalItems,
  CardApprovalInfo,
  ModalAttachment,
  ModalWorkflow,
} from "@/components/molecules/commons";
import {
  CardContentActionPlan,
  ModalTanggapan,
} from "@/components/molecules/rpm/common";
import workflowSchema from "@/helpers/schemas/common/workflow/workflowSchema";
import { useActionPlan } from "@/data/rpm/common/tindak-lanjut";
import useUser from "@/data/useUser";
import {
  TableCatatanNegosiasi,
  TableDokumenLampiran,
} from "@/components/molecules/rpm/common/tindak-lanjut-action-plan";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
    action_plan_id: 0,
  });
  const baseUrl = `/rpm/quality-assurance/${params?.id}/overview/${params?.kkpt_id}`;
  const pathName = `${baseUrl}/tindak-lanjut/${params?.action_plan_id}`;

  const [isOnProgress, setIsOnProgress] = useState(false);
  const [isPIC, setIsPIC] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModalTanggapan, setShowModalTanggapan] = useState(false);
  const [showModalApproval, setShowModalApproval] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);

  const dataContent = useSelector(
    (state) => state.tindakLanjutActionPlanRPMQualityAssurance.objDataContent
  );
  const dataDokumenLampiran = useSelector(
    (state) =>
      state.tindakLanjutActionPlanRPMQualityAssurance.objDataDokumenLampiran
  );
  const dataCatatanNegosiasi = useSelector(
    (state) =>
      state.tindakLanjutActionPlanRPMQualityAssurance.objDataCatatanNegosiasi
  );
  const dataWorkflow = useSelector(
    (state) => state.tindakLanjutActionPlanRPMQualityAssurance.objDataWorkflow
  );
  const dataHistoryWorkflow = useSelector(
    (state) =>
      state.tindakLanjutActionPlanRPMQualityAssurance.objDataHistoryWorkflow
  );
  const payloadTanggapan = useSelector(
    (state) =>
      state.tindakLanjutActionPlanRPMQualityAssurance.objPayloadTanggapan
  );
  const payloadUploadDokumen = useSelector(
    (state) =>
      state.tindakLanjutActionPlanRPMQualityAssurance.objPayloadUploadDokumen
  );
  const validation = useSelector(
    (state) => state.tindakLanjutActionPlanRPMQualityAssurance.validationErrors
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
    type: "action_plan_tindak_lanjut",
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
          name: "Tindak Lanjut",
          path: `${baseUrl}/tindak-lanjut`,
        },
        {
          name: "Action Plan",
          path: `${baseUrl}/tindak-lanjut/${params?.action_plan_id}`,
        },
      ]);
    } else {
      dispatch(resetObjDataContent());
      setBreadcrumbs([]);
    }
  }, [objectAuditDetailRPM]);

  useEffect(() => {
    if (actionPlan?.data) {
      console.log("actionPlan?.data => ", actionPlan?.data);
      const response = actionPlan?.data;
      const { batas_waktu } = response;
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

      setIsPIC(response?.maker_submitter?.pn === user?.data?.pn);
      dispatch(setObjDataContent(mappingContent));
      dispatch(setObjDataDokumenLampiran(mappingDokumenLampiran));
      dispatch(setObjPayloadTanggapan(response?.desc_tanggapan));
    } else {
      setIsPIC(false);
      dispatch(resetObjDataContent());
      dispatch(resetObjDataDokumenLampiran());
      dispatch(resetObjPayloadTanggapan());
    }
  }, [actionPlan, user]);

  useEffect(() => {
    console.log("workflowRPM?.data => ", workflowRPM?.data);
    if (workflowRPM?.data) {
      const workflowInfo = workflowRPM?.data?.info;
      const maker = workflowRPM?.data?.initiator;
      const approvers = workflowRPM?.data?.approver;
      const signers = workflowRPM?.data?.signer;

      const newWorkflowData = {
        ...dataWorkflow,
        status_approver: workflowInfo?.status_persetujuan_tindak_lanjut,
        on_approver: workflowInfo?.status_approver_tindak_lanjut,
      };

      setIsOnProgress(
        Boolean(workflowInfo?.status_persetujuan_tindak_lanjut == "On Progress")
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
        desc_tanggapan: payloadTanggapan,
      }
    );
    setShowModalTanggapan(false);
    dispatch(resetObjPayloadTanggapan());
    loadingSwal("close");
  };
  // [ END ] handler for modal tanggapan

  // [ START ] handler for modal upload dokumen
  const handleCloseModalUploadDokumen = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalUpload(false);
    dispatch(resetObjPayloadUploadDokumen());
  };

  const handleClickDeleteDokomen = async (doc_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus dokumen ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/rekomendasi/action_plan/berkas/${params?.action_plan_id}?file_id=${doc_id}`,
      {}
    );
    actionPlanMutate();
    loadingSwal("close");
  };

  const handleUploadDokumen = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "rpm",
      });
      dispatch(
        setObjPayloadUploadDokumen({
          file_url: response.url[0],
          file_name: e.target.files[0].name,
        })
      );

      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/rekomendasi/action_plan/berkas/${params?.action_plan_id}`,
        {
          berkas: {
            file_url: response.url[0],
            file_name: e.target.files[0].name,
          },
        }
      );

      actionPlanMutate();
      setShowModalUpload(false);
      dispatch(resetObjPayloadUploadDokumen());
    }
    loadingSwal("close");
  };
  // [ END ] handler for modal upload dokumen

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
        sub_modul: "action_plan_tindak_lanjut",
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
        <ButtonIconBack backUrl={`${baseUrl}/tindak-lanjut`} />
        <PageTitle text="Tindak Lanjut Action Plan" />
      </div>
      <div className="flex gap-4">
        <CardContentActionPlan
          dataContent={dataContent}
          handleClickOpenModalTanggapan={handleClickOpenModalTanggapan}
        >
          <TableDokumenLampiran
            data={dataDokumenLampiran}
            dataContent={dataContent}
            withoutAction={!(isOnProgress && isPIC)}
            handleClickDelete={handleClickDeleteDokomen}
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
        <ModalAttachment
          isEdit
          showModal={showModalUpload}
          data={payloadUploadDokumen?.file_url}
          handleCloseModal={handleCloseModalUploadDokumen}
          handleUpload={handleUploadDokumen}
        />
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

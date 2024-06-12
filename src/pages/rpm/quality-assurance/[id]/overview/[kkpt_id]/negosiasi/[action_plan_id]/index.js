import React, { useEffect, useState } from "react";
import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useObjectAuditDetailRPM, useWorkflowRPM } from "@/data/rpm/common";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjDataContent,
  setObjDataCatatanNegosiasi,
  setObjDataWorkflow,
  setObjDataHistoryWorkflow,
  setValidationErrors,
  resetObjDataContent,
  resetObjDataCatatanNegosiasi,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetValidationErrors,
} from "@/slices/rpm/quality-assurance/negosiasiActionPlanRPMQualityAssuranceSlice";
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
  NavigationTab,
} from "@/components/molecules/commons";
import workflowSchema from "@/helpers/schemas/common/workflow/workflowSchema";
import { useNegosiasiDetail } from "@/data/rpm/common/negosiasi";
import { DetailNegosiasi } from "@/components/molecules/rpm/common/negosiasi-action-plan";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
    action_plan_id: 0,
    is_approval: false,
  });
  const baseUrl = `/rpm/quality-assurance/${params?.id}/overview/${params?.kkpt_id}`;
  const pathName = `${baseUrl}/negosiasi/${params?.action_plan_id}`;
  const navigationTabItems = [
    { idx: 1, title: "Detail Negosiasi" },
    { idx: 2, title: "Catatan Negosiasi" },
  ];

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [negosiasiId, setNegosiasiId] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModalApproval, setShowModalApproval] = useState(false);

  const dataContent = useSelector(
    (state) => state.negosiasiActionPlanRPMQualityAssurance.objDataContent
  );
  const dataCatatanNegosiasi = useSelector(
    (state) =>
      state.negosiasiActionPlanRPMQualityAssurance.objDataCatatanNegosiasi
  );
  const dataWorkflow = useSelector(
    (state) => state.negosiasiActionPlanRPMQualityAssurance.objDataWorkflow
  );
  const dataHistoryWorkflow = useSelector(
    (state) =>
      state.negosiasiActionPlanRPMQualityAssurance.objDataHistoryWorkflow
  );
  const validation = useSelector(
    (state) => state.negosiasiActionPlanRPMQualityAssurance.validationErrors
  );

  const { objectAuditDetailRPM } = useObjectAuditDetailRPM({
    id: params?.id,
    kkpt_id: params?.kkpt_id,
    module: "qa",
  });
  const { workflowRPM, workflowRPMMutate } = useWorkflowRPM({
    type: "action_plan_nego",
    id: negosiasiId,
  });
  const { negosiasiDetail } = useNegosiasiDetail({
    id: params?.action_plan_id,
    module: "qa",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, kkpt_id, action_plan_id, is_approval } = router.query;
    setParams({
      id,
      kkpt_id,
      action_plan_id,
      is_approval,
    });
  }, [router.isReady]);

  useEffect(() => {
    setShowModalApproval(params?.is_approval);
  }, [params?.is_approval]);

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
          name: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_id?.toUpperCase(),
          path: baseUrl,
        },
        {
          name: "Negosiasi",
          path: `${baseUrl}/negosiasi`,
        },
        {
          name: "Action Plan",
          path: `${baseUrl}/negosiasi/${params?.action_plan_id}`,
        },
      ]);
    } else {
      dispatch(resetObjDataContent());
      setBreadcrumbs([]);
    }
  }, [objectAuditDetailRPM]);

  useEffect(() => {
    if (negosiasiDetail?.data?.negosiasi) {
      const responseActionPlan = negosiasiDetail?.data?.action_plan;
      const responseNegosiasi = negosiasiDetail?.data?.negosiasi;
      dispatch(
        setObjDataContent({
          metode_nego: responseNegosiasi?.metode_nego,
          alasan: responseNegosiasi?.alasan,
          created_at: responseNegosiasi?.createdAt,
          action_plan: {
            object: {
              id: responseActionPlan?.rekomendasi_kkpt?.kkpa?.mapa_project_audit
                ?.project_id,
              name: responseActionPlan?.rekomendasi_kkpt?.kkpa
                ?.mapa_project_audit?.project_name,
            },
            uker: responseActionPlan?.rekomendasi_kkpt?.kkpa?.mapa_project_audit
              ?.mapa_uker,
            rekomendasi: {
              ..._.pick(responseActionPlan?.rekomendasi_kkpt, [
                "nama",
                "description",
              ]),
            },
            action_plan: {
              ..._.pick(responseActionPlan?.action_plan_kkpt, ["name"]),
            },
            deadline: responseActionPlan?.batas_waktu,
          },
          negosiasi: {
            object: {
              id: responseNegosiasi?.rekomendasi_kkpt?.kkpa?.mapa_project_audit
                ?.project_id,
              name: responseNegosiasi?.rekomendasi_kkpt?.kkpa
                ?.mapa_project_audit?.project_name,
            },
            uker: responseNegosiasi?.rekomendasi_kkpt?.kkpa?.mapa_project_audit
              ?.mapa_uker,
            rekomendasi: {
              ..._.pick(responseNegosiasi?.rekomendasi_kkpt, [
                "nama",
                "description",
              ]),
            },
            action_plan: {
              ..._.pick(responseNegosiasi?.action_plan_kkpt, ["name"]),
            },
            deadline: responseNegosiasi?.action_plan_kkpt?.batas_waktu,
          },
        })
      );
      setNegosiasiId(negosiasiDetail?.data?.negosiasi?.id);
    } else {
      setNegosiasiId(0);
    }
  }, [negosiasiDetail]);

  useEffect(() => {
    if (workflowRPM?.data) {
      const workflowInfo = workflowRPM?.data?.info;
      const maker = {
        pn: workflowRPM?.data?.initiator?.pn,
        nama: workflowRPM?.data?.initiator?.fullName,
      };
      const approvers = workflowRPM?.data?.approver;
      const signers = workflowRPM?.data?.signer;

      const newWorkflowData = {
        ...dataWorkflow,
        status_approver: workflowInfo?.status_persetujuan,
        on_approver: workflowInfo?.status_approver,
      };

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

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

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
        sub_modul: "action_plan_nego",
        sub_modul_id: negosiasiId,
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

      await fetchApi(
        actionType === "change" ? "PATCH" : "POST",
        `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/${actionType}`,
        data
      );

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
        <ButtonIconBack backUrl={`${baseUrl}/negosiasi`} />
        <PageTitle text="Info Negosiasi" />
      </div>
      <NavigationTab
        items={navigationTabItems}
        currentStage={currentContentStage}
        width={"w-[17rem]"}
        handleChange={handleChangeTab}
      />
      <div className="flex gap-4 w-full">
        {currentContentStage === 1 ? (
          <>
            <DetailNegosiasi data={dataContent} />
            <CardApprovalInfo handleClick={() => setShowModalApproval(true)}>
              <p className="text-brisma font-bold text-xl">Approval</p>
              <ApprovalItems
                title={"Proposer"}
                text={
                  dataWorkflow?.maker?.pn + " - " + dataWorkflow?.maker?.nama
                }
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
          </>
        ) : (
          ""
        )}
      </div>
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;

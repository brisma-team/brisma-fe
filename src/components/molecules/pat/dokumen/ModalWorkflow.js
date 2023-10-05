import { Modal, TableField } from "@/components/atoms";
import { useDispatch, useSelector } from "react-redux";
import {
  resetvalidationErrorsWorkflow,
  resetWorkflowData,
  setWorkflowData,
  setvalidationErrorsWorkflow,
} from "@/slices/pat/documentSlice";
import { useEffect, useState } from "react";
import useUser from "@/data/useUser";
import { useWorkflow } from "@/data/pat";
import { useRouter } from "next/router";
import {
  confirmationSwal,
  convertDate,
  setErrorValidation,
  usePostData,
  useUpdateData,
} from "@/helpers";
import _ from "lodash";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import ModalHeaderWorkflowPAT from "./ModalHeaderWorkflowPAT";
import ModalFooterWorkflowPAT from "./ModalFooterWorkflowPAT";

const ModalWorkflow = ({ showModal, setShowModal }) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const workflowData = useSelector((state) => state.documentPAT.workflowData);
  const validationErrors = useSelector(
    (state) => state.documentPAT.validationErrorsWorkflow
  );

  const [workflowLog, setWorkflowLog] = useState([]);
  const { user } = useUser();
  const { workflow, workflowMutate } = useWorkflow("log", { id });
  const workflowDetail = useWorkflow("detail", { id });

  let workflowResponse = workflowDetail?.workflow?.data,
    findApproval;
  if (workflowResponse?.status_approver) {
    findApproval = user?.data?.pn == workflowResponse?.status_approver?.pn;
  }

  useEffect(() => {
    if (workflow?.data?.log?.length) {
      const mapping = workflow.data.log.map((v) => {
        return {
          "P.I.C": v.from.nama,
          Alasan: v.note,
          Status: v.is_approved ? "Approved" : "Rejected",
          Tanggal: convertDate(v.createdAt, "-", "d"),
        };
      });
      setWorkflowLog(mapping);
    }
  }, [workflow]);

  useEffect(() => {
    const workflowInfo = workflowDetail.workflow?.data;
    const maker = workflowInfo?.pn_maker_akhir;
    const approvers = workflowInfo?.approvers;
    const signers = workflowInfo?.signers;

    const newWorkflowData = {
      ...workflowData,
      statusPat: workflowInfo?.status_pat,
      statusApprover: workflowInfo?.status_approver,
    };

    let mappingMaker;
    if (workflowInfo?.status_pat === "On Progress") {
      mappingMaker = `${user?.data?.pn} - ${user?.data?.fullName}`;
    } else {
      mappingMaker = `${maker?.pn} - ${maker?.nama}`;
    }
    newWorkflowData.ref_tim_audit_maker = mappingMaker;
    newWorkflowData.maker = maker?.pn;

    if (approvers?.length) {
      const mappingApprovers = _.map(approvers, ({ pn, nama, is_signed }) => ({
        pn,
        nama,
        is_signed,
      }));
      newWorkflowData.ref_tim_audit_approver = mappingApprovers;
    }

    if (signers?.length) {
      const mappingSigners = _.map(signers, ({ nama, pn }) => ({ nama, pn }));
      newWorkflowData.ref_tim_audit_signer = mappingSigners;
    }

    dispatch(setWorkflowData(newWorkflowData));
  }, [workflowDetail.workflow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowSchema,
      resetErrors: resetvalidationErrorsWorkflow,
      setErrors: setvalidationErrorsWorkflow,
    };
    const validate = setErrorValidation(workflowData, dispatch, schemaMapping);
    if (validate) {
      let type, data;
      switch (e.target.offsetParent.name) {
        case "update":
          type = "update";
          data = {
            pat_id: id,
            approvers: workflowData.ref_tim_audit_approver,
            signers: workflowData.ref_tim_audit_signer,
          };
          break;
        case "reset":
          type = "reset";
          data = { pat_id: id };
          break;
        case "sendApproval":
          type = "create";
          data = {
            pat_id: id,
            approvers: workflowData.ref_tim_audit_approver,
            signers: workflowData.ref_tim_audit_signer,
          };
          break;
        case "reject":
          type = "reject";
          data = { pat_id: id, note: workflowData.note };
          break;
        case "approve":
          type = "approve";
          data = {
            pat_id: id,
            data: "<p>pirli test</p>",
            ..._.pick(workflowData, ["note"]),
          };
          break;
      }

      if (type === "reset") {
        const confirm = await confirmationSwal(
          "Terkait dengan workflow ini, apakah Anda yakin ingin melakukan pengaturan ulang?"
        );

        if (!confirm.value) {
          return;
        }
      }

      if (type === "update") {
        const response = await useUpdateData(
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow`,
          data
        );
        if (!response.isDismissed) return;
      } else {
        await usePostData(
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow/${type}`,
          data
        );
      }

      dispatch(resetWorkflowData());
      workflowMutate();
      workflowDetail.workflowMutate();
      setShowModal(false);
    }
  };

  const handleChangeText = (property, value) => {
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: value,
      })
    );
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  const statusColors = {
    Approved: "text-atlasian-green",
    Rejected: "text-atlasian-red",
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeaderWorkflowPAT
          user={user?.data}
          data={workflowData}
          status={workflowData?.statusPat}
          dispatch={dispatch}
          validationErrors={validationErrors}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
        />
      }
      footer={
        <ModalFooterWorkflowPAT
          user={user?.data}
          data={workflowData}
          handleSubmit={handleSubmit}
          status={workflowData?.statusPat}
          handleChangeText={handleChangeText}
        />
      }
      widthFullFooter={
        workflowData?.statusPat === "On Approver" && findApproval && true
      }
      withoutFooter={
        workflowData?.statusPat === "On Progress"
          ? false
          : workflowData?.statusPat === "On Approver" && findApproval
          ? false
          : workflowData?.maker === user?.data?.pn &&
            workflowData?.statusPat === "On Approver"
          ? false
          : true
      }
    >
      <div className="w-[61rem]">
        <div className="px-3">
          <p className="font-bold text-xl text-brisma">Riwayat Workflow</p>
          <div className="py-3">
            <TableField
              headers={["P.I.C", "Alasan", "Status", "Tanggal"]}
              columnWidths={["35%", "35%", "15%", "15%"]}
              items={workflowLog}
              customStyle={statusColors}
              customField={"Status"}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWorkflow;

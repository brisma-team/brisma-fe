import {
  Modal,
  ButtonField,
  TableField,
  TextInput,
  ButtonIcon,
} from "@/components/atoms";
import CardFormInputTeam from "../CardFormInputTeam";
import { useDispatch, useSelector } from "react-redux";
import {
  resetvalidationErrorsWorkflow,
  setWorkflowData,
  setvalidationErrorsWorkflow,
} from "@/slices/pat/documentSlice";
import { useEffect, useState } from "react";
import useUser from "@/data/useUser";
import { useWorkflow } from "@/data/pat";
import { useRouter } from "next/router";
import { convertDate, setErrorValidation, usePostData } from "@/helpers";
import { ImageCheck } from "@/helpers/imagesUrl";
import Image from "next/image";
import _ from "lodash";
import { CardFormInput } from "../../commons";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import { IconClose } from "@/components/icons";

const Header = ({ data, dispatch, validationErrors }) => {
  const [optionSigners, setOptionSigners] = useState([]);
  useEffect(() => {
    if (data.ref_tim_audit_approver.length) {
      const mappingSigners = data.ref_tim_audit_approver?.map((v) => {
        const { pn, nama } = v;
        return { label: `${v.pn} - ${v.nama}`, value: { pn, name: nama } };
      });
      setOptionSigners(mappingSigners);
    }
  }, [data]);

  const handleAdd = (property) => {
    const newData = [...data[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setWorkflowData({ ...data, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = { ...data };
    if (newData[property].length > 1) {
      const newData = [...data[property]];
      newData.splice(idx, 1);
      dispatch(setWorkflowData({ ...data, [property]: newData }));
    }
  };

  const handleChange = (property, index, e) => {
    const newData = [...data[property]];
    const updated = { ...newData[index] };
    updated["pn"] = e?.value?.pn;
    updated["nama"] = e?.value?.name;
    newData[index] = updated;
    dispatch(
      setWorkflowData({
        ...data,
        [property]: newData,
      })
    );
  };

  return (
    <div className="w-[61rem]">
      <div className="mx-3">
        {/* <PageTitle text={"Workflow"} /> */}
        <p className="font-bold text-xl text-brisma">Workflow</p>
      </div>
      <div className="flex w-full gap-4 p-3">
        <div className="w-1/3">
          <CardFormInput title={"Maker"}>
            <TextInput
              isDisabled={true}
              value={data?.ref_tim_audit_maker}
              className={"text-black"}
            />
          </CardFormInput>
        </div>
        <div className="w-1/3">
          <CardFormInputTeam
            data={data?.ref_tim_audit_approver}
            type={"Approver"}
            handlerAddParent={handleAdd}
            handlerChangeParent={handleChange}
            handlerDeleteParent={handleDelete}
            property={"ref_tim_audit_approver"}
            iconBeside={
              <div className="my-3 ml-2 flex items-center">
                <Image alt="" src={ImageCheck} />
              </div>
            }
            childProperty={"is_signed"}
            validationErrors={validationErrors}
          />
        </div>
        <div className="w-1/3">
          <CardFormInputTeam
            data={data?.ref_tim_audit_signer}
            type={"Signer"}
            handlerAddParent={handleAdd}
            handlerChangeParent={handleChange}
            handlerDeleteParent={handleDelete}
            property={"ref_tim_audit_signer"}
            optionValue={optionSigners}
            validationErrors={validationErrors}
          />
        </div>
      </div>
    </div>
  );
};

const Footer = ({ user, data, status, handleSubmit, handleChangeText }) => {
  console.log("data => ", data);

  console.log("user ", user);
  let findApproval;

  if (data?.statusApprover) {
    findApproval = user.pn === data?.statusApprover?.pn;
  }
  console.log("findApprover ", findApproval);
  if (status === "On Progress") {
    return (
      <div className="flex justify-end gap-3">
        <div className="rounded w-32 bg-atlasian-red">
          <ButtonField
            text={"Reset Flow"}
            name="reset"
            handler={handleSubmit}
          />
        </div>
        <div className="rounded w-32 bg-atlasian-blue-light">
          <ButtonField
            text={"Send Approval"}
            name="sendApproval"
            handler={handleSubmit}
          />
        </div>
      </div>
    );
  } else if (status === "On Approver" && findApproval) {
    return (
      <div className="flex gap-3">
        <div className="w-full">
          <TextInput
            placeholder={"Masukkan alasan"}
            value={data.note}
            icon={
              <ButtonIcon
                handleClick={() => handleChangeText("note", "")}
                icon={<IconClose />}
              />
            }
            onChange={(e) => handleChangeText("note", e.target.value)}
          />
        </div>
        <div className="rounded w-32 bg-atlasian-red">
          <ButtonField text={"Reject"} name="reject" handler={handleSubmit} />
        </div>
        <div className="rounded w-32 bg-atlasian-green">
          <ButtonField text={"Approve"} name="approve" handler={handleSubmit} />
        </div>
      </div>
    );
  }
};

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
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow/${type}`,
        data
      );
      workflowMutate();
      workflowDetail.workflowMutate();
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

  const statusColors = {
    Approved: "text-atlasian-green",
    Rejected: "text-atlasian-red",
  };

  return (
    <Modal
      showModal={showModal}
      onClickOutside={() => setShowModal(false)}
      header={
        <Header
          data={workflowData}
          dispatch={dispatch}
          validationErrors={validationErrors}
        />
      }
      footer={
        <Footer
          user={user?.data}
          data={workflowData}
          handleSubmit={handleSubmit}
          status={workflowData?.statusPat}
          handleChangeText={handleChangeText}
        />
      }
      widthFullFooter={workflowData?.statusPat === "On Approver" && true}
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

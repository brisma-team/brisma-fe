import { Modal, TableField } from "@/components/atoms";
import { useDispatch, useSelector } from "react-redux";
import useUser from "@/data/useUser";
import { useRouter } from "next/router";
import {
  confirmationSwal,
  convertDate,
  setErrorValidation,
  usePostData,
  useUpdateData,
} from "@/helpers";
import _ from "lodash";
import ModalWorkflowHeader from "./ModalWorkflowHeader";
import {
  resetWorkflowData,
  setWorkflowData,
} from "@/slices/ewp/konvensional/entrance/notulenEntranceEWPSlice";
import ModalWorkflowFooter from "./ModalWorkflowFooter";

const ModalWorkflowEWP = ({
  showModal,
  setShowModal,
  headerTitle,
  handleSubmit,
}) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();

  const workflowData = useSelector(
    (state) => state.notulenEntranceEWP.workflowData
  );
  const validationErrors = useSelector(
    (state) => state.notulenEntranceEWP.validationErrorsWorkflow
  );

  const workflow = {
    ref_tim_audit_maker: "00136165 - Ande",
    ref_tim_audit_approver: [
      {
        pn: "00136165",
        nama: "I Putu Andeandika",
        is_signed: true,
      },
      {
        pn: "00999002",
        nama: "Dandy",
        is_signed: true,
      },
    ],
  };

  const data = [
    {
      "P.I.C": "Mohammad",
      Alasan: "test note",
      Status: "Approved",
      Tanggal: convertDate("2023/10/10", "-", "d"),
    },
  ];

  const { user } = useUser();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const schemaMapping = {
  //     schema: workflowSchema,
  //     resetErrors: resetvalidationErrorsWorkflow,
  //     setErrors: setvalidationErrorsWorkflow,
  //   };
  //   const validate = setErrorValidation(workflowData, dispatch, schemaMapping);
  //   if (validate) {
  //     let type, data;
  //     switch (e.target.offsetParent.name) {
  //       case "update":
  //         type = "update";
  //         data = {
  //           pat_id: id,
  //           approvers: workflowData.ref_tim_audit_approver,
  //           signers: workflowData.ref_tim_audit_signer,
  //         };
  //         break;
  //       case "reset":
  //         type = "reset";
  //         data = { pat_id: id };
  //         break;
  //       case "sendApproval":
  //         type = "create";
  //         data = {
  //           pat_id: id,
  //           approvers: workflowData.ref_tim_audit_approver,
  //           signers: workflowData.ref_tim_audit_signer,
  //         };
  //         break;
  //       case "reject":
  //         type = "reject";
  //         data = { pat_id: id, note: workflowData.note };
  //         break;
  //       case "approve":
  //         type = "approve";
  //         data = {
  //           pat_id: id,
  //           data: "<p>pirli test</p>",
  //           ..._.pick(workflowData, ["note"]),
  //         };
  //         break;
  //     }

  //     if (type === "reset") {
  //       const confirm = await confirmationSwal(
  //         "Terkait dengan workflow ini, apakah Anda yakin ingin melakukan pengaturan ulang?"
  //       );

  //       if (!confirm.value) {
  //         return;
  //       }
  //     }

  //     if (type === "update") {
  //       const response = await useUpdateData(
  //         `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow`,
  //         data
  //       );
  //       if (!response.isDismissed) return;
  //     } else {
  //       await usePostData(
  //         `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow/${type}`,
  //         data
  //       );
  //     }

  //     dispatch(resetWorkflowData());
  //     setShowModal(false);
  //   }
  // };

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
      "Apakah Anda ingin menutup modal ini?"
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
        <ModalWorkflowHeader
          user={user?.data}
          data={workflow}
          status={workflowData?.statusPat}
          validationErrors={validationErrors}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          headerTitle={headerTitle}
        />
      }
      footer={
        <ModalWorkflowFooter
          user={user?.data}
          data={workflow}
          // handleSubmit={handleSubmit}
          status={workflowData?.statusPat}
          handleChangeText={handleChangeText}
        />
      }
      widthFullFooter={true}
      withoutFooter={false}
    >
      <div className="w-[61rem] px-3">
        <p className="font-bold text-xl text-brisma">Riwayat Workflow</p>
        <div className="py-3">
          <TableField
            headers={["P.I.C", "Alasan", "Status", "Tanggal"]}
            columnWidths={["35%", "35%", "15%", "15%"]}
            items={data}
            customStyle={statusColors}
            customField={"Status"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalWorkflowEWP;

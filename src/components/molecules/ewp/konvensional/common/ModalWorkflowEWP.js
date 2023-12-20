import { Modal, TableField } from "@/components/atoms";
import useUser from "@/data/useUser";
import { confirmationSwal } from "@/helpers";
import ModalWorkflowHeader from "./ModalWorkflowHeader";
import ModalWorkflowFooter from "./ModalWorkflowFooter";

const ModalWorkflowEWP = ({
  workflowData,
  historyWorkflow,
  showModal,
  setShowModal,
  headerTitle,
  handleSubmit,
  handleAdd,
  handleChange,
  handleChangeSelect,
  handleDelete,
  handleCloseModal,
  validationErrors,
  widthHeader,
  withoutSigner,
}) => {
  const { user } = useUser();
  let isApproval, isInitiator;
  isInitiator = user?.data?.pn == workflowData?.maker?.pn;
  isApproval = user?.data?.pn == workflowData?.on_approver?.pn;

  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    handleCloseModal && handleCloseModal();
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
          data={workflowData}
          validationErrors={validationErrors}
          handleCloseModal={closeModal}
          showModal={showModal}
          headerTitle={headerTitle}
          handleAdd={handleAdd}
          handleChange={handleChangeSelect}
          handleDelete={handleDelete}
          width={widthHeader}
          withoutSigner={withoutSigner}
        />
      }
      footer={
        <ModalWorkflowFooter
          user={user?.data}
          data={workflowData}
          handleSubmit={handleSubmit}
          handleChangeText={handleChange}
        />
      }
      widthFullFooter={
        workflowData?.status_approver === "On Approver" && isApproval && true
      }
      withoutFooter={
        workflowData?.status_approver === "On Progress" && isInitiator
          ? false
          : workflowData?.status_approver === "On Approver" && isApproval
          ? false
          : workflowData?.maker?.pn === user?.data?.pn &&
            workflowData?.status_approver === "On Approver"
          ? false
          : true
      }
    >
      <div className="w-[61rem] px-3">
        <p className="font-bold text-xl text-brisma">Riwayat Workflow</p>
        <div className="py-3">
          <TableField
            headers={["P.I.C", "Alasan", "Status", "Tanggal"]}
            columnWidths={["35%", "35%", "15%", "15%"]}
            items={historyWorkflow}
            customStyle={statusColors}
            customField={"Status"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalWorkflowEWP;

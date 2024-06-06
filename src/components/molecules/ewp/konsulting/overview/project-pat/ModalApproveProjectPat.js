import { ModalScroll } from "@/components/atoms";
import useUser from "@/data/useUser";
import { checkRoleIsAdmin, confirmationSwal } from "@/helpers";
import ModalWorkflowHeader from "./ModalWorkflowHeader";
import ModalWorkflowFooter from "./ModalWorkflowFooter";

const ModalApproveProjectPat = ({
  workflowData,
  showModal,
  setShowModal,
  headerTitle,
  handleSubmit,
  handleChangeSelect,
  handleCloseModal,
  validationErrors,
  widthHeader,
  objectId,
}) => {
  const { user } = useUser();
  let isApproval, isInitiator, isAdmin;
  isInitiator = user?.data?.pn == workflowData?.maker?.pn;
  isApproval = user?.data?.pn == workflowData?.on_approver?.pn;
  isAdmin = checkRoleIsAdmin(user?.data?.role_kode);

  console.log(objectId);
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

  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalWorkflowHeader
          user={user?.data}
          data={workflowData}
          validationErrors={validationErrors}
          handleCloseModal={closeModal}
          showModal={showModal}
          headerTitle={headerTitle}
          handleChange={handleChangeSelect}
          width={widthHeader}
        />
      }
      footer={
        <ModalWorkflowFooter
          user={user?.data}
          data={workflowData}
          handleSubmit={handleSubmit}
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
          : workflowData?.status_approver === "On Progress" && isAdmin
          ? false
          : true
      }
    ></ModalScroll>
  );
};

export default ModalApproveProjectPat;

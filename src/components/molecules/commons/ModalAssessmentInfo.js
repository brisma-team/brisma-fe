import { CloseModal, Modal, TableField } from "@/components/atoms";
import { confirmationSwal } from "@/helpers";

const ModalAssessmentInfo = ({ showModal, setShowModal }) => {
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  return (
    <Modal showModal={showModal} positionCenter>
      <div className="w-[35rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2 text-xl text-center font-bold">
          Assessment Information
        </div>
        <TableField
          headers={[
            "Lebih dari 2 Tahun",
            "Temuan Fraud",
            "Temuan Major",
            "Temuan Moderate",
          ]}
          columnWidths={["25%", "25%", "25%", "25%"]}
          items={[]}
        />
      </div>
    </Modal>
  );
};

export default ModalAssessmentInfo;

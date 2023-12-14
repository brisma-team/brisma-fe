import { CloseModal, Modal } from "@/components/atoms";
import { confirmationSwal } from "@/helpers";

const ModalGuidelines = ({ showModal, handleCloseModal, data }) => {
  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    handleCloseModal();
  };

  return (
    <Modal showModal={showModal} positionCenter={true}>
      <div className="w-[58rem] relative">
        <CloseModal handleCloseModal={closeModal} showModal={showModal} />
        <p className="text-xl font-bold">Guidelines</p>
        <div
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
      </div>
    </Modal>
  );
};

export default ModalGuidelines;

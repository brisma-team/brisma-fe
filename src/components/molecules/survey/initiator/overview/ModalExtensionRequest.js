import {
  CloseModal,
  Modal,
  TextAreaField,
  ButtonField,
} from "@/components/atoms";
import { confirmationSwal } from "@/helpers";

const ModalFooter = ({ handleSubmit, handleCloseModal }) => {
  return (
    <form
      className="w-full flex justify-end gap-3 -my-1"
      onSubmit={handleSubmit}
    >
      <div className="rounded w-28 bg-atlasian-red">
        <ButtonField text={"Yakin"} handler={handleSubmit} />
      </div>
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text={"Tidak"} handler={handleCloseModal} />
      </div>
    </form>
  );
};

const ModalExtensionRequest = ({
  showModal,
  handleChangeNote,
  handleSubmit,
  handleCloseModal,
}) => {
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
    <Modal
      showModal={showModal}
      positionCenter
      footer={
        <ModalFooter
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
        />
      }
    >
      <div className="w-[30rem] relative">
        <CloseModal handleCloseModal={closeModal} showModal={showModal} />
        <div className="p-3 text-base text-center leading-5">
          <p className="font-bold text-atlasian-red">APA ANDA YAKIN?</p>
          <p className="text-base">
            Mengajukan perpanjangan waktu survei. Admin akan menerima pengajuan
            Anda dan mengaktifkan kembali Survei
          </p>
          <div className="mt-4">
            <TextAreaField handleChange={handleChangeNote} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalExtensionRequest;

import {
  ButtonField,
  CloseModal,
  Modal,
  TextAreaField,
} from "@/components/atoms";
import { confirmationSwal } from "@/helpers";
import { useEffect, useState } from "react";

const ModalFooter = ({ handleConfirm }) => {
  return (
    <div className="w-full flex justify-end -my-1">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text="Simpan" handler={handleConfirm} />
      </div>
    </div>
  );
};

const DescriptionModal = ({
  showModal,
  setShowModal,
  value,
  handleConfirm,
}) => {
  const [editValue, setEditValue] = useState(value || "");

  useEffect(() => {
    setEditValue(value || "");
  }, [value]);

  const handleConfirmWithClose = () => {
    handleConfirm(editValue);
    setShowModal(false);
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

  return (
    <Modal
      showModal={showModal}
      positionCenter
      footer={<ModalFooter handleConfirm={handleConfirmWithClose} />}
    >
      <div className="w-[37.5rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2">Deskripsi Kegiatan</div>
        <TextAreaField
          handleChange={(e) => setEditValue(e.target.value)}
          value={editValue}
        />
      </div>
    </Modal>
  );
};

export default DescriptionModal;

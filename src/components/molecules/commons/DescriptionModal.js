import { ButtonField, Modal, TextAreaField } from "@/components/atoms";
import { useEffect } from "react";
import { useState } from "react";

const ModalFooter = ({ handleCancel, handleConfirm }) => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <div className="rounded w-28 bg-atlasian-blue-light">
        <ButtonField text="Cancel" handler={handleCancel} />
      </div>
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

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirmWithClose = () => {
    handleConfirm(editValue);
    setShowModal(false);
  };

  return (
    <Modal
      showModal={showModal}
      positionCenter
      footer={
        <ModalFooter
          handleCancel={handleCancel}
          handleConfirm={handleConfirmWithClose}
        />
      }
    >
      <div className="w-[37.5rem] relative">
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

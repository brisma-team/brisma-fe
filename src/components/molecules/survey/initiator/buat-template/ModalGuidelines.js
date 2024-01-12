import {
  ButtonField,
  CloseModal,
  ModalScroll,
  TextAreaField,
} from "@/components/atoms";
import { confirmationSwal } from "@/helpers";
import { useEffect, useState } from "react";

const ModalFooter = ({ handleConfirm }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text="Simpan" handler={handleConfirm} />
      </div>
    </div>
  );
};

const ModalGuidelines = ({
  showModal,
  handleCloseModal,
  handleSubmit,
  isUpdate,
  data,
}) => {
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setDesc(data);
  }, [data]);

  const handleChange = (value) => {
    setDesc(value);
  };

  const handleSave = () => {
    handleSubmit(desc);
  };

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
    <ModalScroll
      showModal={showModal}
      footer={isUpdate && <ModalFooter handleConfirm={handleSave} />}
      positionCenter
    >
      <div className="w-[58rem] relative">
        <CloseModal handleCloseModal={closeModal} showModal={showModal} />
        <p className="text-xl font-bold">Guidelines</p>
        {isUpdate ? (
          <div className="mt-3">
            <TextAreaField
              handleChange={(e) => handleChange(e.target.value)}
              value={desc}
            />
          </div>
        ) : (
          <p className="text-base font-semibold text-justify">{desc}</p>
        )}
      </div>
    </ModalScroll>
  );
};

export default ModalGuidelines;

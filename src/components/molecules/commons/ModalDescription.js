import {
  ButtonField,
  CloseModal,
  ModalScroll,
  TextAreaField,
} from "@/components/atoms";
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

const ModalDescription = ({
  data,
  headerText,
  isEdit,
  showModal,
  handleCloseModal,
  handleSubmit,
}) => {
  const [editValue, setEditValue] = useState(data || "");

  useEffect(() => {
    setEditValue(data || "");
  }, [data]);

  return (
    <ModalScroll
      showModal={showModal}
      positionCenter
      footer={
        isEdit && (
          <ModalFooter
            handleConfirm={async () => await handleSubmit(editValue)}
          />
        )
      }
    >
      <div className="w-[37.5rem] relative -mt-2.5">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <p className="mb-2 text-lg font-semibold">
          {headerText || "Deskripsi Kegiatan"}
        </p>
        {isEdit ? (
          <TextAreaField
            handleChange={(e) => setEditValue(e.target.value)}
            value={editValue}
          />
        ) : (
          <p className="text-sm">{data}</p>
        )}
      </div>
    </ModalScroll>
  );
};

export default ModalDescription;

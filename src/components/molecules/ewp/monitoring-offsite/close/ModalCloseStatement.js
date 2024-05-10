import { Modal, TextAreaField } from "@/components/atoms";
import {
  ModalHeader,
  ModalFooter,
  CardContentHeaderFooter,
} from "@/components/molecules/commons";

const ModalCloseStatement = ({
  data,
  showModal,
  handleChangePayload,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={"Tutup Proyek (Close Project)"}
          title={"Closing Statement"}
          titleClassName={"text-base text-atlasian-blue-light mt-1"}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <CardContentHeaderFooter header={<div className="min-h-[2rem]" />}>
        <div className="p-2.5">
          <TextAreaField
            handleChange={handleChangePayload}
            value={data || ""}
            placeholder={"Deskripsi Close Statement"}
          />
        </div>
      </CardContentHeaderFooter>
    </Modal>
  );
};

export default ModalCloseStatement;

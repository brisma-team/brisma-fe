import { Modal, TextAreaField } from "@/components/atoms";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";
import TaskTypeSelect from "./TaskTypeSelect";
import { capitalizeEveryWord } from "@/helpers";

const ModalTask = ({
  data,
  showModal,
  isUpdate,
  validation,
  handleChange,
  handleReset,
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
          headerText={`${isUpdate ? "Ubah" : "Tambah"} Task`}
        />
      }
      footer={
        <ModalFooter
          handleSubmit={async (e) => await handleSubmit(e, isUpdate)}
        />
      }
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Deskripsi"}
          form={
            <TextAreaField
              handleChange={(e) => handleChange("description", e.target.value)}
              value={data?.description || ""}
              placeholder={"Deskripsi"}
            />
          }
          errors={validation?.description}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Tipe Task"}
          form={
            <TaskTypeSelect
              handleChange={(e) => handleChange("task_type", e.value)}
              placeholder={"Tipe Task"}
              handleReset={() => handleReset("task_type")}
              selectedValue={
                data?.task_type?.kode
                  ? {
                      label: capitalizeEveryWord(data?.task_type?.nama),
                      value: data?.task_type,
                    }
                  : null
              }
            />
          }
          errors={validation?.task_type_kode}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
      </CardBodyContent>
    </Modal>
  );
};

export default ModalTask;

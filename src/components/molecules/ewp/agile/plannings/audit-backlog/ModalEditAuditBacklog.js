import {
  ButtonIcon,
  Modal,
  TextAreaField,
  TextInputDecimal,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";
import PrioritySelect from "./PrioritySelect";
import { capitalizeEveryWord } from "@/helpers";

const ModalEditAuditBacklog = ({
  data,
  showModal,
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
          headerText={"Ubah Audit Backlog"}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Feature"}
          form={
            <TextAreaField
              handleChange={(e) => handleChange("feature", e.target.value)}
              value={data?.feature || ""}
              placeholder={"Feature"}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Mandays"}
          form={
            <TextInputDecimal
              value={data?.mandays || ""}
              onChange={(value) => handleChange("mandays", value)}
              placeholder="Mandays"
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("mandays", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Priority"}
          form={
            <PrioritySelect
              handleChange={(e) => handleChange("priority", e.value)}
              placeholder={"Priority"}
              handleReset={() => handleReset("priority")}
              selectedValue={
                data?.priority?.kode
                  ? {
                      label: data?.priority?.nama,
                      value: data?.priority,
                    }
                  : null
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Definition of Ready"}
          form={
            <TextAreaField
              handleChange={(e) =>
                handleChange("definition_of_ready", e.target.value)
              }
              value={data?.definition_of_ready || ""}
              placeholder={"Definition of Ready"}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Definition of Done"}
          form={
            <TextAreaField
              handleChange={(e) =>
                handleChange("definition_of_done", e.target.value)
              }
              value={data?.definition_of_done || ""}
              placeholder={"Definition of Done"}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
      </CardBodyContent>
    </Modal>
  );
};

export default ModalEditAuditBacklog;

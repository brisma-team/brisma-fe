import {
  ButtonIcon,
  Modal,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";

const ModalAddUker = ({
  data,
  validation,
  showModal,
  handleChangeText,
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
          headerText={"Buat Uker"}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Tipe Uker"}
          form={
            <TextInput
              value={data?.tipe_uker || ""}
              onChange={(e) =>
                handleChangeText("tipe_uker", e.target.value)
              }
              placeholder="Tipe Uker"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("tipe_uker", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.tipe_uker}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Branch"}
          form={
            <TextInput
              value={data?.ref_auditee_branch_name || ""}
              onChange={(e) =>
                handleChangeText("ref_auditee_branch_name", e.target.value)
              }
              placeholder="Branch"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("ref_auditee_branch_name", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.ref_auditee_branch_name}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
       <FormWithLabel
          label={"Orgeh"}
          form={
            <TextInput
              value={data?.ref_auditee_orgeh_name || ""}
              onChange={(e) =>
                handleChangeText("ref_auditee_orgeh_name", e.target.value)
              }
              placeholder="Orgeh"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("ref_auditee_orgeh_name", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.ref_auditee_orgeh_name}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        /> 
      </CardBodyContent>
    </Modal>
  );
};

export default ModalAddUker;

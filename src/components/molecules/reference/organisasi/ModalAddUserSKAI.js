import { ButtonIcon, Modal, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";

const ModalAddUserSKAI = ({
  data,
  typeModal,
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
          headerText={
            typeModal == "update" ? "Ubah Pengguna" : "Tambah Pengguna"
          }
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Personal Number"}
          form={
            <TextInput
              value={data?.pn || ""}
              onChange={(e) => handleChangeText("pn", e.target.value)}
              placeholder="Personal Number"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("pn", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.tipe_anggaran_name}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Name"}
          form={
            <TextInput
              value={data?.name || ""}
              onChange={(e) => handleChangeText("name", e.target.value)}
              placeholder="Name"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("name", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.tipe_anggaran_name}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Unit Kantor Audit"}
          form={
            <TextInput
              value={data?.kode_uka || ""}
              onChange={(e) => handleChangeText("kode_uka", e.target.value)}
              placeholder="Unit Kantor Audit"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("kode_uka", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.tipe_anggaran_name}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        {/* <FormWithLabel
          label={"Personal Number"}
          form={
            <TextInput
              value={data?.pn || ""}
              onChange={(e) => handleChangeText("pn", e.target.value)}
              placeholder="Personal Number"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("pn", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.tipe_anggaran_name}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        /> */}
      </CardBodyContent>
    </Modal>
  );
};

export default ModalAddUserSKAI;

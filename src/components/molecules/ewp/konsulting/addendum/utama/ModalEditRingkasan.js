import {
  ButtonIcon,
  ModalScroll,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";

const ModalEditRingkasan = ({
  data,
  showModal,
  handleChangeText,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={"Ubah Ringkasan"}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Keterangan"}
          form={
            <TextInput
              value={data?.keterangan || ""}
              onChange={(e) => handleChangeText("keterangan", e.target.value)}
              placeholder="Keterangan..."
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("keterangan", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Sebelum"}
          form={
            <TextInput
              value={data?.note_sebelum || ""}
              onChange={(e) => handleChangeText("note_sebelum", e.target.value)}
              placeholder="Catatan Sebelum..."
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("note_sebelum", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Sesudah"}
          form={
            <TextInput
              value={data?.note_sesudah || ""}
              onChange={(e) => handleChangeText("note_sesudah", e.target.value)}
              placeholder="Catatan Sesudah..."
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("note_sesudah", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Alasan"}
          form={
            <TextAreaField
              placeholder={"Masukkan alasan..."}
              handleChange={(e) => handleChangeText("alasan", e.target.value)}
              value={data?.alasan || ""}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
      </CardBodyContent>
    </ModalScroll>
  );
};

export default ModalEditRingkasan;

import {
  ButtonIcon,
  Modal,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
  CardContentHeaderFooter,
} from "@/components/molecules/commons";

const ModalRingkasan = ({
  data,
  showModal,
  handleChangeText,
  handleCloseModal,
  handleSubmit,
  typeModal = "update",
}) => {
  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={
            typeModal == "update" ? "Ubah Ringkasan" : "Detail Ringkasan"
          }
        />
      }
      footer={
        typeModal == "update" && <ModalFooter handleSubmit={handleSubmit} />
      }
    >
      {typeModal == "update" ? (
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
                onChange={(e) =>
                  handleChangeText("note_sebelum", e.target.value)
                }
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
                onChange={(e) =>
                  handleChangeText("note_sesudah", e.target.value)
                }
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
                resize="auto"
                placeholder={"Masukkan alasan..."}
                handleChange={(e) => handleChangeText("alasan", e.target.value)}
                value={data?.alasan || ""}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
        </CardBodyContent>
      ) : (
        <div className="w-[80rem] flex justify-between gap-4">
          <CardContentHeaderFooter
            header={
              <h4 className="p-4 text-atlasian-green">Sebelum Addendum</h4>
            }
          >
            {data?.part == "sumber_informasi" ? (
              <div
                className="p-4 h-[40rem] overflow-y-scroll"
                dangerouslySetInnerHTML={{
                  __html: data?.sebelum?.sumber_informasi,
                }}
              />
            ) : null}
          </CardContentHeaderFooter>
          <CardContentHeaderFooter
            header={<h4 className="p-4 text-atlasian-red">Sesudah Addendum</h4>}
          >
            {data?.part == "sumber_informasi" ? (
              <div
                className="p-4 h-[40rem] overflow-y-scroll"
                dangerouslySetInnerHTML={{
                  __html: data?.sesudah?.sumber_informasi,
                }}
              />
            ) : null}
          </CardContentHeaderFooter>
        </div>
      )}
    </Modal>
  );
};

export default ModalRingkasan;

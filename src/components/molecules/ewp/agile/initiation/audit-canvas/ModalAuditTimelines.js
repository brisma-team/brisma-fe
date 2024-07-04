import {
  ButtonIcon,
  DatepickerStartEnd,
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
import { addDaysToDate, dateNow } from "@/helpers";

const ModalAuditTimelines = ({
  data,
  validation,
  showModal,
  typeModal,
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
          headerText={`${
            typeModal === "update" ? "Ubah" : "Tambah"
          } Audit Timeline`}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={<ModalFooter buttonText={"Simpan"} handleSubmit={handleSubmit} />}
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Keterangan"}
          form={
            <TextInput
              value={data?.title || ""}
              onChange={(e) => handleChangeText("title", e.target.value)}
              placeholder="Keterangan"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("title", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.title}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Periode"}
          form={
            <DatepickerStartEnd
              placeholderStart={"Tanggal"}
              placeholderEnd={"Tanggal"}
              handlerChangeStart={(e) => handleChangeText("start_date", e)}
              handlerChangeEnd={(e) => handleChangeText("end_date", e)}
              valueStart={data?.start_date || ""}
              valueEnd={data?.end_date || ""}
              format={"DD/MM/YYYY"}
              maxDateStart={addDaysToDate(data?.end_date, "-", 1) || null}
              minDateEnd={
                addDaysToDate(data?.start_date, "+", 1) ||
                addDaysToDate(dateNow(), "+", 1) ||
                null
              }
              minDateStart={dateNow()}
              validationStart={validation?.start_date}
              validationEnd={validation?.end_date}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
      </CardBodyContent>
    </Modal>
  );
};

export default ModalAuditTimelines;

import {
  ButtonIcon,
  DatepickerStartEnd,
  Modal,
  TextInput,
} from "@/components/atoms";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";
import { addDaysToDate, dateNow } from "@/helpers";
import { IconClose } from "@/components/icons";

const ModalSprint = ({
  data,
  validation,
  showModal,
  isUpdate,
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
          headerText={`${isUpdate ? "Ubah" : "Tambah"} Sprint`}
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
          label={"Nama Sprint"}
          form={
            <TextInput
              value={data?.sprint_name || ""}
              onChange={(e) => handleChange("sprint_name", e.target.value)}
              placeholder="Nama Sprint"
              icon={
                <ButtonIcon
                  handleClick={() => handleReset("sprint_name")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Periode Sprint"}
          form={
            <DatepickerStartEnd
              valueStart={data?.start_date}
              valueEnd={data?.end_date}
              handlerChangeStart={(value) => handleChange("start_date", value)}
              handlerChangeEnd={(value) => handleChange("end_date", value)}
              placeholderStart="Tanggal Dimulai"
              placeholderEnd="Tanggal Berakhir"
              format={"DD/MM/YYYY"}
              minDateStart={dateNow()}
              maxDateStart={addDaysToDate(data?.end_date, "-", 1) || null}
              minDateEnd={
                addDaysToDate(data?.start_date, "+", 1) ||
                addDaysToDate(dateNow(), "+", 1) ||
                null
              }
              validationStart={validation && validation["start_date"]}
              validationEnd={validation && validation["end_date"]}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
      </CardBodyContent>
    </Modal>
  );
};

export default ModalSprint;

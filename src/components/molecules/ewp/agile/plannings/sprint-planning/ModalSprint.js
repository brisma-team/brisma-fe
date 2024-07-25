import {
  ButtonIcon,
  DatepickerStartEnd,
  Modal,
  TextInput,
  TextInputDecimal,
} from "@/components/atoms";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
  RetryButton,
} from "@/components/molecules/commons";
import { addDaysToDate, dateNow } from "@/helpers";
import { IconClose } from "@/components/icons";

const ModalSprint = ({
  data,
  sprintNo,
  validation,
  showModal,
  isUpdate,
  handleChange,
  handleReset,
  handleRefreshGenerateSprintNo,
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
          label={"Nomer Sprint"}
          form={
            <div className="flex items-center gap-3">
              <TextInputDecimal
                value={isUpdate ? data?.no || "" : sprintNo}
                onChange={(e) => handleChange("no", e.target.value)}
                placeholder="Nomer Sprint"
                isDisabled
              />
              {isUpdate ? (
                <ButtonIcon
                  color={"blue"}
                  icon={
                    <div className="p-1 border border-atlasian-blue-light rounded-full flex items-center justify-center">
                      <RetryButton />{" "}
                    </div>
                  }
                  handleClick={handleRefreshGenerateSprintNo}
                />
              ) : (
                ""
              )}
            </div>
          }
          widthLabel={"w-2/5"}
          widthForm={"w-2/5"}
        />
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
              valueStart={data?.start_date || ""}
              valueEnd={data?.end_date || ""}
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

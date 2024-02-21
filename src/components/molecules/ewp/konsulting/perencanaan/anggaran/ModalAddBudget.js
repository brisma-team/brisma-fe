import {
  ButtonIcon,
  DatepickerStartEnd,
  Modal,
  TextAreaField,
  TextInput,
  TextInputDecimal,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";
import { addDaysToDate, dateNow } from "@/helpers";

const ModalAddBudget = ({
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
          headerText={"Buat Anggaran"}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Nama Pengeluaran"}
          form={
            <TextInput
              value={data?.tipe_anggaran_name || ""}
              onChange={(e) =>
                handleChangeText("tipe_anggaran_name", e.target.value)
              }
              placeholder="Nominal Pengeluaran"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("tipe_anggaran_name", "")}
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
          label={"Nominal Biaya"}
          form={
            <TextInputDecimal
              value={data?.amount || ""}
              onChange={(value) => handleChangeText("amount", value)}
              placeholder="Nominal Biaya"
              icon={
                <ButtonIcon
                  handleClick={() => handleChangeText("amount", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          errors={validation?.amount}
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Periode"}
          form={
            <DatepickerStartEnd
              placeholderStart={"Tanggal"}
              placeholderEnd={"Tanggal"}
              handlerChangeStart={(e) => handleChangeText("tanggal", e)}
              handlerChangeEnd={(e) => handleChangeText("tanggal_end", e)}
              valueStart={data?.tanggal || ""}
              valueEnd={data?.tanggal_end || ""}
              format={"DD/MM/YYYY"}
              minDateStart={dateNow()}
              maxDateStart={addDaysToDate(data?.tanggal_end, "-", 1) || null}
              minDateEnd={
                addDaysToDate(data?.tanggal, "+", 1) ||
                addDaysToDate(dateNow(), "+", 1) ||
                null
              }
              validationStart={validation?.tanggal}
              validationEnd={validation?.tanggal_end}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Deskripsi"}
          form={
            <TextAreaField
              resize="auto"
              handleChange={(e) =>
                handleChangeText("deskripsi", e.target.value)
              }
              value={data?.deskripsi || ""}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
      </CardBodyContent>
    </Modal>
  );
};

export default ModalAddBudget;

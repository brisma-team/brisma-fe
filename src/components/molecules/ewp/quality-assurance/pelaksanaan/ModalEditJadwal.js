import { CloseModal, DatepickerField, ModalScroll } from "@/components/atoms";
import { FormWithLabel, ModalFooter } from "@/components/molecules/commons";

const ModalEditJadwal = ({
  payload,
  showModal,
  handleChange,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      positionCenter
      footer={<ModalFooter buttonText={"Simpan"} handleSubmit={handleSubmit} />}
    >
      <div className="w-[28rem] relative">
        <div className="flex">
          <CloseModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
        </div>
        <div className="mt-6">
          <FormWithLabel
            form={
              <DatepickerField
                handleChange={(value) => handleChange("end_date", value)}
                value={payload?.end_date}
                placeholder="Tanggal Berakhir"
              />
            }
            label="Tanggal Berakhir"
            widthLabel={"w-4/12"}
            widthForm={"w-8/12"}
          />
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalEditJadwal;

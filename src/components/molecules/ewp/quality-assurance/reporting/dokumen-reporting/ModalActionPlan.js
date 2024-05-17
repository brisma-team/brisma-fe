import {
  ButtonIcon,
  CloseModal,
  DatepickerField,
  ErrorValidation,
  ModalScroll,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { ModalFooter } from "@/components/molecules/commons";
import { convertDate, dateNow } from "@/helpers";

const ModalActionPlan = ({
  payload,
  validation,
  showModal,
  handleChangePayload,
  handleResetPayload,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[35rem] relative">
        <div className="flex justify-between">
          <CloseModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
          <p className="font-bold">ACTION PLAN</p>
        </div>
        <div className="mt-3 flex gap-3">
          <div className="w-3/4">
            <TextInput
              icon={
                <ButtonIcon
                  handleClick={() => handleResetPayload("desc")}
                  icon={<IconClose size="medium" />}
                />
              }
              onChange={(e) => handleChangePayload("desc", e.target.value)}
              value={payload?.desc || ""}
              placeholder={"Judul action plan"}
            />
            {validation?.desc ? (
              <ErrorValidation
                className={"ml-1.5 mt-1"}
                message={validation?.desc}
              />
            ) : (
              ""
            )}
          </div>
          <div className="w-1/4">
            <DatepickerField
              value={payload?.batas_waktu || ""}
              handleChange={(value) =>
                handleChangePayload("batas_waktu", value)
              }
              placeholder={"Batas Waktu"}
              minDate={dateNow()}
            />
            {validation?.batas_waktu ? (
              <ErrorValidation
                className={"ml-1.5 mt-1"}
                message={validation?.batas_waktu}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalActionPlan;

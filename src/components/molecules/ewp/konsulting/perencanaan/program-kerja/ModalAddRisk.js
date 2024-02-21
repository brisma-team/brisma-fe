import {
  ButtonIcon,
  CloseModal,
  ErrorValidation,
  ModalScroll,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { ModalFooter, RiskSelect } from "@/components/molecules/commons";

const ModalAddRisk = ({
  data,
  validation,
  selectedLingkupPemeriksaan,
  showModal,
  handleChangeSelect,
  handleResetSelect,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[43rem] relative">
        <CloseModal showModal={showModal} handleCloseModal={handleCloseModal} />
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">Resiko</p>
          <TextInput
            value={selectedLingkupPemeriksaan}
            placeholder=""
            isDisabled
          />
          <RiskSelect
            selectedValue={
              data?.kode ? { label: data?.nama, value: data } : null
            }
            customIcon={
              <ButtonIcon
                icon={<IconClose />}
                handleClick={handleResetSelect}
              />
            }
            handleChange={handleChangeSelect}
            placeholder={"Pilih resiko"}
          />
          {validation?.kode ? (
            <div className="-mt-1.5">
              <ErrorValidation message={validation?.kode} className={"ml-1"} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAddRisk;

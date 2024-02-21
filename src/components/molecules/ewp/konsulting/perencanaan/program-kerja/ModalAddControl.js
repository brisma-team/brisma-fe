import {
  ButtonField,
  ButtonIcon,
  CloseModal,
  ErrorValidation,
  ModalScroll,
  TextInput,
} from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import {
  ModalFooter,
  PekerjaSelect,
  RiskControlSelect,
} from "@/components/molecules/commons";

const ModalAddControl = ({
  data,
  validation,
  selectedRisk,
  showModal,
  handleAddSelect,
  handleChangeSelect,
  handleDeleteSelect,
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
          <p className="text-sm font-semibold">Control</p>
          <TextInput value={selectedRisk} placeholder="" isDisabled />
          {data?.length
            ? data?.map((v, i) => {
                return (
                  <div className="w-full flex gap-3" key={i}>
                    <div className="">
                      <RiskControlSelect
                        selectedValue={
                          v?.kode ? { label: v?.nama, value: v } : null
                        }
                        customIcon={
                          <ButtonIcon
                            icon={<IconClose />}
                            handleClick={() => handleDeleteSelect(i)}
                          />
                        }
                        handleChange={(e) => handleChangeSelect(i, e.value)}
                        placeholder={"Pilih control"}
                      />
                      {validation && validation[`[${i}].kode`] ? (
                        <ErrorValidation
                          message={validation[`[${i}].kode`]}
                          className={"ml-1"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <PekerjaSelect />
                  </div>
                );
              })
            : ""}
          {validation?.uniqueControl ? (
            <div className="-mt-1.5">
              <ErrorValidation
                message={validation?.uniqueControl}
                className={"ml-1"}
              />
            </div>
          ) : (
            ""
          )}
          <div className="-mx-4 border-t pt-3 px-4">
            <div className="w-fit rounded">
              <ButtonField
                iconAfter={
                  <div className="text-atlasian-purple">
                    <IconPlus size="medium" />
                  </div>
                }
                text={"Tambah Control"}
                textColor={"purple"}
                handler={handleAddSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAddControl;

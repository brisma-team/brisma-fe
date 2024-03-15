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
  handleChangeSelectControl,
  handleChangeSelectPIC,
  handleDeleteSelect,
  handleCloseModal,
  handleSubmit,
}) => {
  console.log("payloadControl => ", data);
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
          <TextInput value={selectedRisk} isDisabled />
          {data?.length
            ? data?.map((v, i) => {
                console.log("v => ", v);
                return (
                  <div className="w-full flex gap-3" key={i}>
                    <div className="w-1/2">
                      <RiskControlSelect
                        selectedValue={
                          v?.kode ? { label: v?.nama, value: v } : null
                        }
                        customIcon={
                          <ButtonIcon
                            icon={<IconClose />}
                            handleClick={() => handleDeleteSelect(i)}
                            isDisabled={v?.is_default}
                          />
                        }
                        handleChange={(e) =>
                          handleChangeSelectControl(i, e.value)
                        }
                        placeholder={"Pilih control"}
                        isDisabled={v?.is_default}
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
                    <div className="w-1/2">
                      <PekerjaSelect
                        selectedValue={
                          v?.pn_pic
                            ? {
                                label: v?.nama_pic,
                                value: { pn: v?.pn_pic, name: v?.nama_pic },
                              }
                            : null
                        }
                        customIcon={
                          <ButtonIcon
                            icon={<IconClose />}
                            handleClick={() => handleDeleteSelect(i)}
                            isDisabled={v?.is_default}
                          />
                        }
                        handleChange={(e) => handleChangeSelectPIC(i, e.value)}
                        isDisabled={v?.is_default}
                        placeholder={"Pilih P.I.C"}
                      />
                      {validation && validation[`[${i}].pn_pic`] ? (
                        <ErrorValidation
                          message={validation[`[${i}].pn_pic`]}
                          className={"ml-1"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
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

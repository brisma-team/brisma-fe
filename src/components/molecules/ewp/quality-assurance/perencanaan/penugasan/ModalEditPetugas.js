import {
  ButtonField,
  ButtonIcon,
  CloseModal,
  ErrorValidation,
  ModalScroll,
} from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import { ModalFooter, UserSKAISelect } from "@/components/molecules/commons";

const ModalEditPetugas = ({
  payload,
  validation,
  showModal,
  handleClickAdd,
  handleClickDelete,
  handleChangePayload,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[44rem] relative">
        <div className="flex justify-between">
          <CloseModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
          <div className="text-2xl font-semibold mb-2">Penugasan</div>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {payload?.length
            ? payload?.map((petugas, index) => {
                return (
                  <div className="" key={index}>
                    <UserSKAISelect
                      selectedValue={
                        petugas?.pn
                          ? {
                              label: `${petugas?.pn} - ${petugas?.nama}`,
                              value: {
                                pn: petugas?.pn,
                                nama: petugas?.nama,
                              },
                            }
                          : null
                      }
                      customIcon={
                        <ButtonIcon
                          icon={<IconClose />}
                          handleClick={() => handleClickDelete(index)}
                        />
                      }
                      handleChange={(e) => handleChangePayload(index, e.value)}
                    />
                    {validation && validation[`petugas[${index}].pn`] ? (
                      <ErrorValidation
                        message={validation[`petugas[${index}].pn`]}
                        className={"ml-1.5"}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            : ""}
          {validation?.petugas ? (
            <ErrorValidation message={validation?.petugas} />
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end">
          <div className="w-48 text-sm font-semibold p-2 my-1">
            <ButtonField
              iconAfter={
                <div className="text-atlasian-purple">
                  <IconPlus size="medium" />
                </div>
              }
              text={"Tambah Petugas"}
              textColor={"purple"}
              handler={handleClickAdd}
            />
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalEditPetugas;

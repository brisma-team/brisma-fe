import {
  ButtonField,
  ButtonIcon,
  CloseModal,
  ErrorValidation,
  ModalScroll,
} from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import {
  ButtonEdit,
  CardContentHeaderFooter,
  CustomSelect,
  FormWithLabel,
  ModalFooter,
  UserSKAISelect,
} from "@/components/molecules/commons";

const ModalEditProject = ({
  dataTeam,
  payload,
  validation,
  showModal,
  selectedData,
  handleEditAnalisa,
  handleChangePayload,
  handleResetPayload,
  handleAddPetugas,
  handleDeletePetugas,
  handleChangePetugasPayload,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[50rem] relative">
        <div className="flex justify-between">
          <CloseModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
          <div className="text-2xl font-semibold mb-2">{`[${
            selectedData?.project_id?.toUpperCase() || ""
          }] - ${selectedData?.project_name}`}</div>
        </div>
        <div className="mt-3 flex gap-3">
          <CardContentHeaderFooter
            header={
              <div className="p-3">
                <p className="font-semibold text-sm">PROJECT INFORMATION</p>
              </div>
            }
          >
            <div className="px-3">
              <FormWithLabel
                form={
                  <UserSKAISelect
                    selectedValue={
                      payload?.pic?.pn
                        ? {
                            label: `${payload?.pic?.pn} - ${
                              payload?.pic?.nama || payload?.pic?.name
                            }`,
                            value: {
                              pn: payload?.pic?.pn,
                              name: payload?.pic?.nama || payload?.pic?.name,
                            },
                          }
                        : null
                    }
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={() => handleResetPayload("pic")}
                      />
                    }
                    handleChange={(e) => handleChangePayload("pic", e.value)}
                  />
                }
                label="PIC Analisator*"
                errors={validation["pic.pn"]}
                widthLabel={"w-3/12"}
                widthForm={"w-9/12"}
              />
              <FormWithLabel
                form={
                  <div className="flex gap-4">
                    <ButtonIcon
                      handleClick={handleEditAnalisa}
                      icon={<ButtonEdit />}
                    />
                  </div>
                }
                label="Analisa"
                widthLabel={"w-3/12"}
                widthForm={"w-9/12"}
              />
            </div>
          </CardContentHeaderFooter>
          <CardContentHeaderFooter
            header={
              <div className="p-3">
                <p className="font-semibold text-sm">PENUGASAN</p>
              </div>
            }
          >
            <div className="flex flex-col gap-3 p-3">
              {payload?.petugas?.length
                ? payload?.petugas?.map((petugas, index) => {
                    return (
                      <div className="" key={index}>
                        <CustomSelect
                          optionValue={dataTeam}
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
                              handleClick={() => handleDeletePetugas(index)}
                            />
                          }
                          handleChange={(e) =>
                            handleChangePetugasPayload(index, {
                              pn: e.value.pn,
                              nama: e.value.name,
                            })
                          }
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
              <div className="flex justify-end">
                <div className="w-48 text-sm font-semibold">
                  <ButtonField
                    iconAfter={
                      <div className="text-atlasian-purple">
                        <IconPlus size="medium" />
                      </div>
                    }
                    text={"Tambah Petugas"}
                    textColor={"purple"}
                    handler={handleAddPetugas}
                  />
                </div>
              </div>
            </div>
          </CardContentHeaderFooter>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalEditProject;

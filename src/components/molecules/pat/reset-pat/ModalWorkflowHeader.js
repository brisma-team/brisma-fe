import {
  CardContentHeaderFooter,
  CardFormInput,
  // FormLabel,
  // PekerjaSelect,
} from "@/components/molecules/commons";
import {
  // ButtonIcon,
  CloseModal,
  // ErrorValidation,
  TextInput,
} from "@/components/atoms";
import { CardFormInputTeam } from "@/components/molecules/pat";
import Image from "next/image";
import { ImageCheck, ImageGroup } from "@/helpers/imagesUrl";
import { checkRoleIsAdmin } from "@/helpers";
// import { IconClose } from "@/components/icons";

const ModalWorkflowHeader = ({
  user,
  data,
  validationErrors,
  handleCloseModal,
  showModal,
  headerTitle,
  handleAdd,
  handleChange,
  handleDelete,
  width,
}) => {
  let isInitiator, isAdmin;
  isInitiator = user?.pn == data?.maker?.pn;
  isAdmin = checkRoleIsAdmin(user?.role_kode);
  return (
    <div className={`${width ? width : `w-[61rem]`} relative`}>
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="mx-3">
        <p className="font-bold text-xl text-brisma">{headerTitle}</p>
      </div>
      <div className="max-h-[26.5rem] overflow-y-scroll mt-2">
        <div className="flex w-full justify-center gap-4 px-3 py-1 mb-2">
          <div className="w-1/2 relative">
            <CardFormInput
              title={"P.I.C"}
              className={"text-atlasian-blue-light py-2"}
              icon={<Image src={ImageGroup} alt="" />}
            >
              <TextInput
                isDisabled={true}
                value={
                  data?.maker?.pn +
                  " - " +
                  (data?.maker?.nama || data?.maker?.name)
                }
                className={"text-black"}
              />
            </CardFormInput>
          </div>
          <div className="w-1/2">
            <CardFormInputTeam
              data={data?.ref_tim_audit_approver}
              type={"Approver"}
              handlerAddParent={handleAdd}
              handlerChangeParent={handleChange}
              handlerDeleteParent={handleDelete}
              property={"ref_tim_audit_approver"}
              iconBeside={
                <div className="my-3 ml-2 flex items-center w-5">
                  <Image alt="" src={ImageCheck} />
                </div>
              }
              childProperty={"is_signed"}
              validationErrors={validationErrors}
              withoutButtonAdd={
                data?.status_approver === "On Progress" && isAdmin
                  ? false
                  : true
              }
              isDisabled={
                data?.status_approver === "On Progress" && isAdmin
                  ? false
                  : true
              }
              isButtonChange={
                data?.status_approver === "On Approver" &&
                isInitiator &&
                "Ganti"
              }
            />
          </div>
        </div>

        <div className="p-1">
          <CardContentHeaderFooter className={"px-5 py-5 mb-10"}>
            <p className="text-sm font-semibold text-atlasian-green">
              Sesuaikan Inisiator
            </p>
            {/* <div className="-mx-1 mt-4 flex gap-4 text-atlasian-blue-baby mb-5 h-20">
                <FormLabel
                  title={"Inisiator Awal"}
                  form={
                    <PekerjaSelect
                      isDisabled={true}
                      selectedValue={
                        data?.initiator_from?.pn
                          ? {
                              label:
                                data?.initiator_from?.pn +
                                " - " +
                                data?.initiator_from?.name,
                              value: data?.initiator_from,
                            }
                          : null
                      }
                      customIcon={<ButtonIcon icon={<IconClose />} />}
                      placeholder={"Inisiator Awal"}
                    />
                  }
                />
                <FormLabel
                  title={"Inisiator Pengganti"}
                  validationError={
                    validationErrors[`initiator_to.pn`] && (
                      <ErrorValidation
                        message={validationErrors[`initiator_to.pn`]}
                      />
                    )
                  }
                  form={
                    <PekerjaSelect
                      handleChange={(e) =>
                        handleChangeInitiator("initiator_to", e)
                      }
                      isDisabled={
                        data?.status_approver === "On Progress" && isAdmin
                          ? false
                          : true
                      }
                      selectedValue={
                        data?.initiator_to?.pn
                          ? {
                              label:
                                data?.initiator_to?.pn +
                                " - " +
                                data?.initiator_to?.name,
                              value: data?.initiator_to,
                            }
                          : null
                      }
                      customIcon={
                        <ButtonIcon
                          handleClick={() =>
                            handleChangeInitiator("initiator_to", "")
                          }
                          icon={<IconClose />}
                        />
                      }
                      placeholder={"Inisiator Pengganti"}
                    />
                  }
                  // validationError={
                  //   validationErrors?.pelaksanaan_start && (
                  //     <ErrorValidation
                  //       message={validationErrors?.pelaksanaan_start}
                  //       className={"ml-1.5"}
                  //     />
                  //   )
                  // }
                />
              </div> */}
          </CardContentHeaderFooter>
        </div>
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

import {
  CardContentHeaderFooter,
  CardFormInput,
  FormLabel,
} from "@/components/molecules/commons";
import {
  CloseModal,
  DatepickerField,
  ErrorValidation,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { CardFormInputTeam } from "@/components/molecules/pat";
import Image from "next/image";
import { ImageCheck, ImageGroup } from "@/helpers/imagesUrl";
import { addDaysToDate, checkRoleIsAdmin, dateNow } from "@/helpers";

const ModalWorkflowHeader = ({
  isExtensionRequest,
  user,
  data,
  validationErrors,
  handleCloseModal,
  showModal,
  headerTitle,
  handleChangeText,
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
          <div className="w-1/2">
            <CardFormInput
              title={"P.I.C"}
              className={"text-atlasian-blue-light"}
              icon={<Image src={ImageGroup} alt="" />}
            >
              <TextInput
                isDisabled={true}
                value={data?.ref_tim_audit_maker}
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
                (data?.status_approver === "On Progress" &&
                  (isInitiator || isAdmin)) ||
                (data?.status_approver === "On Approver" && isInitiator)
                  ? false
                  : true
              }
              isDisabled={
                (data?.status_approver === "On Progress" &&
                  (isInitiator || isAdmin)) ||
                (data?.status_approver === "On Approver" && isInitiator)
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
        {isExtensionRequest ? (
          <div className="p-1">
            <CardContentHeaderFooter className={"px-5 py-2"}>
              <p className="text-sm font-semibold text-atlasian-red">
                Perpanjangan
              </p>
              <div className="-mx-1 mt-4 flex gap-4">
                <FormLabel
                  title={"Tanggal Dimulai*"}
                  form={
                    <DatepickerField
                      placeholder={"Tanggal Dimulai"}
                      format={"DD/MM/YYYY"}
                      value={data?.pelaksanaan_start || ""}
                      handleChange={(value) =>
                        handleChangeText("pelaksanaan_start", value)
                      }
                      isDisabled={data?.status_approver !== "On Progress"}
                      minDate={dateNow()}
                      maxDate={
                        addDaysToDate(data?.pelaksanaan_end, "-", 1) || null
                      }
                    />
                  }
                  validationError={
                    validationErrors?.pelaksanaan_start && (
                      <ErrorValidation
                        message={validationErrors?.pelaksanaan_start}
                        className={"ml-1.5"}
                      />
                    )
                  }
                />
                <FormLabel
                  title={"Tanggal Selesai*"}
                  form={
                    <DatepickerField
                      placeholder={"Tanggal Selesai"}
                      format={"DD/MM/YYYY"}
                      value={data?.pelaksanaan_end || ""}
                      handleChange={(value) =>
                        handleChangeText("pelaksanaan_end", value)
                      }
                      isDisabled={data?.status_approver !== "On Progress"}
                      minDate={
                        addDaysToDate(data?.pelaksanaan_start, "+", 1) ||
                        addDaysToDate(dateNow(), "+", 1) ||
                        null
                      }
                    />
                  }
                  validationError={
                    validationErrors?.pelaksanaan_end && (
                      <ErrorValidation
                        message={validationErrors?.pelaksanaan_end}
                        className={"ml-1.5"}
                      />
                    )
                  }
                />
              </div>
              <div className="-mx-1 mt-4 mb-1">
                <FormLabel
                  title={"Alasan"}
                  form={<TextAreaField isDisabled value={data?.reason} />}
                />
              </div>
            </CardContentHeaderFooter>
          </div>
        ) : (
          <div className="p-1">
            <CardContentHeaderFooter className={"px-5 py-2"}>
              <p className="text-sm font-semibold text-atlasian-red">
                Pemberhentian
              </p>
              <div className="-mx-1 mt-2 mb-1">
                <FormLabel
                  title={"Alasan"}
                  form={<TextAreaField isDisabled value={data?.reason} />}
                />
              </div>
            </CardContentHeaderFooter>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

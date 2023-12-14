import { CardFormInput } from "@/components/molecules/commons";
import { Card, CloseModal, TextInput } from "@/components/atoms";
import { CardFormInputTeam } from "@/components/molecules/pat";
import Image from "next/image";
import { ImageCheck } from "@/helpers/imagesUrl";

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
  statusApprover,
}) => {
  let isInitiator;
  isInitiator = user?.pn == data?.maker?.pn;

  return (
    <div className={`${width ? width : `w-[61rem]`} relative`}>
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="mx-3">
        <p className="font-bold text-xl text-brisma">{headerTitle}</p>
      </div>
      <div className="flex w-full justify-center gap-4 p-3">
        <div className={statusApprover === "On Progress" ? `w-1/3` : `w-1/2`}>
          <CardFormInput title={"P.I.C"} className={"text-atlasian-blue-light"}>
            <TextInput
              isDisabled={true}
              value={data?.ref_tim_audit_maker}
              className={"text-black"}
            />
          </CardFormInput>
        </div>
        <div className={statusApprover === "On Progress" ? `w-1/3` : `w-1/2`}>
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
              (data?.status_approver === "On Progress" && isInitiator) ||
              (data?.status_approver === "On Approver" && isInitiator)
                ? false
                : true
            }
            isDisabled={
              (data?.status_approver === "On Progress" && isInitiator) ||
              (data?.status_approver === "On Approver" && isInitiator)
                ? false
                : true
            }
            isButtonChange={
              data?.status_approver === "On Approver" && isInitiator && "Ganti"
            }
          />
        </div>
        {statusApprover === "On Progress" ? (
          <div className="w-1/3">
            <Card>
              <div className="px-4">
                <p className="text-xl font-semibold text-atlasian-yellow">
                  Perhatian
                </p>
                <p className="text-sm">
                  Anda dapat SUBMIT Kuesioner tanpa harus mengisi approval ini.
                </p>
                <p className="text-sm">
                  Approval diisi jika{" "}
                  <span className="font-bold">dirasa perlu</span> untuk
                  persetujuan dalam penyerahan jawaban dari responden.
                </p>
              </div>
            </Card>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

import { CardFormInput } from "@/components/molecules/commons";
import { CloseModal, TextInput } from "@/components/atoms";
import { CardFormInputTeam } from "@/components/molecules/pat";
import Image from "next/image";
import { ImageCheck, ImageGroup } from "@/helpers/imagesUrl";
import { checkRoleIsAdmin } from "@/helpers";

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
  isScrollHeader,
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
      <div
        className={`mt-2 ${
          isScrollHeader && "max-h-[26.5rem] overflow-y-scroll"
        }`}
      >
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
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

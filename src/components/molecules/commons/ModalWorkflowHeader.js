import { CardFormInput } from "@/components/molecules/commons";
import { CloseModal, TextInput } from "@/components/atoms";
import { CardFormInputTeam } from "@/components/molecules/pat";
import Image from "next/image";
import { ImageCheck, ImageGroup } from "@/helpers/imagesUrl";
import { checkRoleIsAdmin } from "@/helpers";
import { useEffect, useState } from "react";

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
  withSigner,
}) => {
  const [optionSigners, setOptionSigners] = useState([]);
  let isInitiator, isAdmin, isApprover;
  isInitiator = user?.pn == data?.maker?.pn;
  isAdmin = checkRoleIsAdmin(user?.role_kode);
  isApprover = user?.pn == data?.on_approver?.pn;

  useEffect(() => {
    if (data?.ref_tim_audit_approver?.length && withSigner) {
      const mappingSigners = data?.ref_tim_audit_approver?.map((v) => {
        const { pn, nama } = v;
        return { label: `${v.pn} - ${v.nama}`, value: { pn, name: nama } };
      });
      setOptionSigners(mappingSigners);
    } else {
      setOptionSigners([]);
    }
  }, [data]);

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
          <div className={withSigner ? `w-1/3` : `w-1/2`}>
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
          <div className={withSigner ? `w-1/3` : `w-1/2`}>
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
          {withSigner ? (
            <div className="w-1/3">
              <CardFormInputTeam
                data={data?.ref_tim_audit_signer}
                type={"Signer"}
                handlerAddParent={handleAdd}
                handlerChangeParent={handleChange}
                handlerDeleteParent={handleDelete}
                property={"ref_tim_audit_signer"}
                optionValue={optionSigners}
                validationErrors={validationErrors}
                withoutButtonAdd={
                  data?.status_approver === "On Progress" && isInitiator
                    ? false
                    : true
                }
                isDisabled={
                  (data?.status_approver === "On Progress" && isInitiator) ||
                  (data?.status_approver === "On Approver" && isApprover)
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

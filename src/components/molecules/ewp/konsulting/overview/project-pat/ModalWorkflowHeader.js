import { CardFormInput } from "@/components/molecules/commons";
import { CloseModal, TextInput } from "@/components/atoms";
import Image from "next/image";
import { ImageCheck } from "@/helpers/imagesUrl";

const ModalWorkflowHeader = ({
  data,
  handleCloseModal,
  showModal,
  headerTitle,
}) => {
  return (
    <div className="w-[62rem] relative`">
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
              icon={<Image src={ImageCheck} alt="" />}
            >
              <TextInput
                isDisabled={true}
                value={
                  data?.pn_kta_requester + " - " + data?.nama_kta_requester
                }
                className={"text-black"}
              />
            </CardFormInput>
          </div>
          <div className="w-1/2">
            <CardFormInput
              title={"Approver"}
              className={"text-atlasian-red py-2"}
              icon={<Image src={ImageCheck} alt="" />}
            >
              <TextInput
                isDisabled={true}
                value={data?.pn_approver + " - " + data?.nama_approver}
                className={"text-black"}
              />
            </CardFormInput>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

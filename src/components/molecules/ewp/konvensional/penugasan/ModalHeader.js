import { CloseModal } from "@/components/atoms";

const ModalHeader = ({ showModal, headerText, title, handleCloseModal }) => {
  return (
    <div className="w-[31rem] relative">
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      <div className="w-full mt-1.5 text-base font-semibold text-atlasian-blue-light">
        {title}
      </div>
    </div>
  );
};

export default ModalHeader;

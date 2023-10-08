import { CloseModal } from "@/components/atoms";

const ModalHeader = ({ headerText, handleCloseModal, showModal }) => {
  return (
    <div className="relative" style={{ width: "31rem" }}>
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="text-3xl font-semibold ml-2">{headerText}</div>
    </div>
  );
};

export default ModalHeader;

import { CloseModal } from "@/components/atoms";

const ModalWorkflowHeader = ({
  handleCloseModal,
  showModal,
  headerTitle,
  width,
}) => {
  return (
    <div className={`${width ? width : `w-[61rem]`} relative`}>
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="mx-3">
        <p className="font-bold text-xl text-brisma">{headerTitle}</p>
      </div>
    </div>
  );
};

export default ModalWorkflowHeader;

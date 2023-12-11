import { CloseModal } from "@/components/atoms";

const ModalHeader = ({
  showModal,
  headerText,
  handleCloseModal,
  title,
  titleClassName,
}) => {
  return (
    <div style={{ width: "31rem" }} className="relative">
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      {title && <div className={`w-full -mt-4 ${titleClassName}`}>{title}</div>}
    </div>
  );
};

export default ModalHeader;

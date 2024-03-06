import { CloseModal } from "@/components/atoms";

const ModalHeader = ({
  showModal,
  headerText,
  handleCloseModal,
  title,
  titleClassName,
  width,
}) => {
  return (
    <div className={`relative ${width || "w-[31rem]"}`}>
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      {title && <div className={`w-full -mt-4 ${titleClassName}`}>{title}</div>}
    </div>
  );
};

export default ModalHeader;

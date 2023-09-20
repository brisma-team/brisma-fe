import { CloseModal } from "@/components/atoms";
import { useEffect } from "react";

const ModalHeader = ({
  headerText,
  handleCloseModal,
  title,
  titleClassName,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      return handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div style={{ width: "31rem" }} className="relative">
      <CloseModal handleCloseModal={handleCloseModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      {title && <div className={`w-full -mt-4 ${titleClassName}`}>{title}</div>}
    </div>
  );
};

export default ModalHeader;

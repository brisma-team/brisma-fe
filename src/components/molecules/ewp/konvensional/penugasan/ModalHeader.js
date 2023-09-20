import { DivButton } from "@/components/atoms";
import Image from "next/image";
import { ImageClose } from "@/helpers/imagesUrl";
import { useEffect } from "react";

const ModalHeader = ({
  headerText,
  title,
  handleCloseModal,
  handleKeyDown,
}) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div style={{ width: "31rem" }}>
      <div className="w-full flex justify-end -mt-1">
        <DivButton handleClick={handleCloseModal} handleKeyDown={handleKeyDown}>
          <Image src={ImageClose} alt="chat" />
        </DivButton>
      </div>
      <div className="text-3xl font-semibold">{headerText}</div>
      <div className="w-full -mt-4">{title}</div>
    </div>
  );
};

export default ModalHeader;

import Image from "next/image";
import DivButton from "./DivButton";
import { ImageClose } from "@/helpers/imagesUrl";
import { useEffect } from "react";

const CloseModal = ({ handleCloseModal, showModal }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && showModal) {
      return handleCloseModal();
    }
  };

  return (
    <div className="absolute w-full flex justify-end -mt-1">
      <DivButton handleClick={handleCloseModal} handleKeyDown={handleKeyDown}>
        <Image src={ImageClose} alt="chat" />
      </DivButton>
    </div>
  );
};

export default CloseModal;

import { ProgressTracker } from "@atlaskit/progress-tracker";
import { confirmationSwal } from "@/helpers";
import { DivButton } from "@/components/atoms";
import Image from "next/image";
import { ImageClose } from "@/helpers/imagesUrl";
import { useEffect } from "react";

const ModalHeader = ({ headerText, progressItems, handleCloseModal }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    handleCloseModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      return closeModal();
    }
  };

  return (
    <div className="text-center" style={{ width: "31rem" }}>
      <div className="w-full flex justify-end -mt-1">
        <DivButton handleClick={closeModal}>
          <Image src={ImageClose} alt="chat" />
        </DivButton>
      </div>
      <div className="text-3xl font-semibold">{headerText}</div>
      <div className="w-full -mt-4">
        <ProgressTracker items={progressItems} />
      </div>
    </div>
  );
};

export default ModalHeader;

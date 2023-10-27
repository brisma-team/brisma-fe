import { useState } from "react";
import Modal from "./Modal";
import UploadButton from "./UploadButton";
import ButtonIcon from "./ButtonIcon";
import { IconAttachment } from "../icons";
import CloseModal from "./CloseModal";
import Link from "next/link";

const AttachmentModal = ({ file, handleClick, handleUpload }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ButtonIcon
        color={"purple"}
        icon={<IconAttachment />}
        handleClick={() => (setShowModal(true), handleClick())}
      />
      <Modal showModal={showModal} positionCenter>
        <div className="w-[37.5rem] relative">
          <CloseModal handleCloseModal={handleCloseModal} />
          <div className="flex gap-3 items-center">
            <UploadButton
              handleUpload={handleUpload}
              text="Upload"
              className="rounded w-28 h-8 bg-atlasian-blue-light text-white flex justify-center items-center"
            />
            {file && (
              <Link
                target="_blank"
                href={file}
                className="text-base font-normal"
              >
                {file}
              </Link>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AttachmentModal;

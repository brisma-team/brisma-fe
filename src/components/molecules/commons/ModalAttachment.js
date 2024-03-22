import Link from "next/link";
import { ModalScroll, CloseModal, UploadButton } from "@/components/atoms";
import { useEffect } from "react";

const ModalAttachment = ({
  data,
  showModal,
  isEdit,
  handleCloseModal,
  handleUpload,
}) => {
  useEffect(() => {
    console.log("isEdit => ", isEdit);
  }, [isEdit]);

  return (
    <ModalScroll showModal={showModal} positionCenter>
      <div className="w-[37.5rem] relative">
        <CloseModal showModal={showModal} handleCloseModal={handleCloseModal} />
        <div className="flex gap-3 items-center">
          {isEdit && (
            <UploadButton
              handleUpload={handleUpload}
              text="Upload"
              className="rounded w-28 h-8 bg-atlasian-blue-light text-white flex justify-center items-center"
            />
          )}
          {data && (
            <Link target="_blank" href={data} className="text-base font-normal">
              {data}
            </Link>
          )}
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAttachment;

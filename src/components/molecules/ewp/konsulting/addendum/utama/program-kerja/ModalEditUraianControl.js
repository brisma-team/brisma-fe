import { ButtonField, ModalScroll } from "@/components/atoms";
import {
  AttachmentClipping,
  ImageClipping,
  ModalHeader,
} from "@/components/molecules/commons";
import { useEffect, useState } from "react";
import { loadingSwal, usePostFileData } from "@/helpers";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const ModalEditUraianControl = ({
  data,
  showModal,
  handleCloseModal,
  handleSubmit,
}) => {
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [content, setContent] = useState("");
  const [typeUpload, setTypeUpload] = useState("");

  useEffect(() => {
    setContent(data || "");
  }, [data]);

  const closeModal = () => {
    handleCloseModal();
  };

  const handleUploadFile = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const handleClickUploadAttachment = () => {
    setTypeUpload("attachment");
  };

  const handleClickUploadImage = () => {
    setTypeUpload("image");
  };

  const handleSave = () => {
    handleSubmit(content);
    setContent("");
    setTypeUpload("");
    setImageClipList([]);
    setAttachmentClipList([]);
  };

  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          headerText={"Ubah Uraian Control"}
          handleCloseModal={closeModal}
        />
      }
      positionCenter
    >
      <div className="w-[70rem]">
        <div className="my-4 flex gap-6">
          <div className="w-64 flex flex-col gap-4">
            <ImageClipping
              data={imageClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadImage}
              // isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
            />
            <AttachmentClipping
              data={attachmentClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadAttachment}
              // isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
            />
          </div>
          <div>
            <div className="ckeditor-latar-belakang-mapa-ewp">
              <Editor
                contentData={content}
                disabled={false}
                ready={true}
                onChange={(value) => setContent(value)}
              />
            </div>

            {/* {(isInitiator || isAuditor) && !isCloseSubmodule ? ( */}
            <div className="mt-3 flex justify-end">
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField text={"Simpan"} handler={handleSave} />
              </div>
            </div>
            {/* ) : (
            ""
          )} */}
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalEditUraianControl;

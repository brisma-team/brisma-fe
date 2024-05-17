import { ButtonField } from "@/components/atoms";
import {
  ImageClipping,
  AttachmentClipping,
} from "@/components/molecules/commons";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const UraianRencanaPerbaikan = ({
  content,
  dataImageClipList,
  dataAttachmentClipList,
  handleChangeContent,
  handleUploadFile,
  handleClickUploadImage,
  handleClickUploadAttachment,
  handleSubmit,
}) => {
  return (
    <div className="my-4 flex gap-6">
      {/* {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress && ( */}
      <div className="w-64 flex flex-col gap-4">
        <ImageClipping
          data={dataImageClipList}
          handleChange={handleUploadFile}
          handleClick={handleClickUploadImage}
          // isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
        />
        <AttachmentClipping
          data={dataAttachmentClipList}
          handleChange={handleUploadFile}
          handleClick={handleClickUploadAttachment}
          // isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
        />
      </div>
      {/* )} */}

      <div>
        {/* {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress ? ( */}
        <div className="ckeditor-latar-belakang-mapa-ewp">
          <Editor
            contentData={content}
            ready={true}
            onChange={(value) => handleChangeContent(value)}
          />
        </div>
        {/* ) : (
            <ContentView dataDoc={content} />
          )} */}

        {/* {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress ? ( */}
        <div className="mt-3 flex gap-3 justify-end">
          <div className="w-[7.75rem] bg-atlasian-green rounded">
            <ButtonField text={"Simpan"} handler={handleSubmit} />
          </div>
        </div>
        {/* ) : (
            ""
          )} */}
      </div>
    </div>
  );
};

export default UraianRencanaPerbaikan;

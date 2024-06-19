import { ButtonField } from "@/components/atoms";
import {
  ImageClipping,
  AttachmentClipping,
  ContentView,
} from "@/components/molecules/commons";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const ContentCKEditor = ({
  isDisabled,
  dataContent,
  dataAttachmentList,
  dataImageClipList,
  handleUploadFile,
  handleClickUploadImage,
  handleClickUploadAttachment,
  handleChangeContent,
  handleSubmit,
}) => {
  return (
    <div className="my-4 flex gap-6">
      {!isDisabled ? (
        <div className="w-64 flex flex-col gap-4">
          <ImageClipping
            data={dataImageClipList}
            handleChange={handleUploadFile}
            handleClick={handleClickUploadImage}
            isHideButton={isDisabled}
          />
          <AttachmentClipping
            data={dataAttachmentList}
            handleChange={handleUploadFile}
            handleClick={handleClickUploadAttachment}
            isHideButton={isDisabled}
          />
        </div>
      ) : (
        ""
      )}
      <div>
        {!isDisabled ? (
          <div className="ckeditor-latar-belakang-mapa-ewp">
            <Editor
              contentData={dataContent}
              ready={true}
              onChange={handleChangeContent}
            />
          </div>
        ) : (
          <ContentView dataDoc={dataContent} />
        )}

        {!isDisabled ? (
          <div className="mt-3 flex justify-end">
            <div className="w-[7.75rem] bg-atlasian-green rounded">
              <ButtonField text={"Simpan"} handler={handleSubmit} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContentCKEditor;

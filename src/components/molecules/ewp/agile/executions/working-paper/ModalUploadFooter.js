import { ButtonField, UploadButton } from "@/components/atoms";

const ModalUploadFooter = ({ handleUpload, handleSave, withoutButton }) => {
  return !withoutButton ? (
    <div className="w-full flex justify-end gap-3 -my-1">
      <UploadButton
        handleUpload={handleUpload}
        text="Upload"
        className="rounded w-28 h-8 bg-atlasian-blue-light text-white flex justify-center items-center"
      />
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text={"Simpan"} handler={handleSave} />
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalUploadFooter;

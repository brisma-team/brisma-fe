const UploadButton = ({ text, fileAccept, handleUpload }) => {
  return (
    <>
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 font-semibold py-2 px-5 rounded-md border-[1.95px] active:bg-neutral-200"
      >
        {text}
      </label>
      <input
        id="fileInput"
        type="file"
        accept={fileAccept}
        className="hidden"
        onChange={handleUpload}
      />
    </>
  );
};
export default UploadButton;

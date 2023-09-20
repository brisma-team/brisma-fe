const UploadButton = ({ text, fileAccept, handleUpload, className }) => {
  return (
    <>
      <label
        htmlFor="fileInput"
        className={`cursor-pointer ${
          className
            ? className
            : `bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 py-2 px-5 rounded-md border-[1.95px] font-semibold`
        }`}
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

const UploadButtonAttachment = ({
  text,
  fileAccept,
  handleChange,
  handleClick,
  className,
}) => {
  return (
    <>
      <label
        htmlFor="fileInput"
        role="button"
        className={`cursor-pointer ${
          className
            ? className
            : `bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 py-2 px-5 rounded-md border-[1.95px] font-semibold`
        }`}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleClick();
          }
        }}
        tabIndex={0}
      >
        {text}
      </label>
      <input
        id="fileInput"
        type="file"
        accept={fileAccept && fileAccept}
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
};
export default UploadButtonAttachment;

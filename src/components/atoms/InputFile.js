const InputFile = (fileAccept, handleUpload) => {
  return (
    <input
      className="relative block w-full min-w-0 flex-auto rounded border-2 border-[#DFE1E6] bg-clip-padding py-[0.05rem] text-sm text-slate-500 font-normal transition duration-300 ease-in-out file:-mx-2 file:-my-[0.2rem] file:overflow-hidden file:rounded-none file:border-2 file:border-solid file:border-inherit file:bg-neutral-800 file:px-1 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-slate-300 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
      accept={fileAccept}
      type="file"
      id="formFile"
      onChange={handleUpload}
    />
  );
};
export default InputFile;

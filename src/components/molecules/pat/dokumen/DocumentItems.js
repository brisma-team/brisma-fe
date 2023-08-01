const DocumentItems = ({ no, title, count }) => {
  return (
    <div className="text-sm py-1 flex justify-between">
      <div className="w-full flex">
        <div>{no}.</div>
        <div className="ml-2">{title}</div>
      </div>
      <div
        className={`w-5 h-[1.12rem] font-bold text-white flex justify-center items-center pb-0.5 ${
          count && `bg-atlasian-red`
        } rounded-full`}
        style={{ fontSize: "0.65rem" }}
      >
        {count && count}
      </div>
    </div>
  );
};

export default DocumentItems;

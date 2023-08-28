const CardTypeCount = ({ title, total, percent, width, style }) => {
  return (
    <div
      className={`rounded-xl border-2 border-atlasian-gray-light p-1 ${
        style && style
      } ${width ? width : `w-48`}`}
    >
      <div className="w-full flex justify-between px-2 text-sm">
        <p className="font-semibold">{title}</p>
        <div className="w-16 flex justify-between">
          <div className="rounded bg-atlasian-gray-light w-5 items-center justify-center flex">
            {total}
          </div>
          <div className="rounded bg-atlasian-gray-light w-10 items-center justify-center flex">
            {percent} %
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTypeCount;

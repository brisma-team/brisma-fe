const CardTypeCount = ({ title, total, percent, width, style }) => {
  return (
    <div
      className={`rounded-xl border-2 border-atlasian-gray-light flex items-center p-1 ${
        style && style
      } ${width ? width : `w-48`}`}
    >
      <div className="w-full flex justify-between px-2 text-sm">
        <p className="font-semibold">{title}</p>
        <div className="flex justify-between gap-1.5">
          <div className="rounded bg-atlasian-gray-light items-center justify-center flex px-1.5">
            {total}
          </div>
          <div className="rounded bg-atlasian-gray-light items-center justify-center flex px-1.5">
            {percent} %
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTypeCount;

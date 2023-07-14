const CardTypeCount = ({ title, total, percent, width }) => {
  return (
    <div
      className={`rounded-xl border-2 border-atlasian-blue-baby p-2 ${
        width ? width : `w-48`
      }`}
    >
      <div className="w-full flex justify-between px-2 text-sm">
        <p className="font-semibold">{title}</p>
        <div className="w-16 flex justify-between">
          <div className="rounded bg-atlasian-blue-baby w-5 items-center justify-center flex">
            {total}
          </div>
          <div className="rounded bg-atlasian-blue-baby w-10 items-center justify-center flex">
            {percent} %
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTypeCount;

import Link from "next/link";

const DocumentItems = ({ no, title, count, handleClick, activeIndex }) => {
  return (
    <Link
      className={`text-sm py-1 flex justify-between no-underline hover:no-underline text-brisma hover:text-brisma ${
        activeIndex === no && `bg-atlasian-red`
      }`}
      href={"#"}
      onClick={handleClick}
    >
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
    </Link>
  );
};

export default DocumentItems;

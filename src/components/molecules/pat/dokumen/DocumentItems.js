import { DivButton } from "@/components/atoms";

const DocumentItems = ({ no, title, count, handleClick, activeIndex }) => {
  return (
    <DivButton
      className={`text-sm py-1 flex justify-between ${
        activeIndex === no
          ? `bg-atlasian-blue-light rounded text-white hover:text-white font-semibold`
          : `text-brisma hover:text-brisma`
      }`}
      handleClick={handleClick}
    >
      <div className="w-full flex ml-1.5">
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
    </DivButton>
  );
};

export default DocumentItems;

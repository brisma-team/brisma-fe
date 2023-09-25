import { Badge, DivButton } from "@/components/atoms";

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
      <div className="w-full flex px-1.5">
        <div>{no}.</div>
        <div className="ml-2">{title}</div>
      </div>
      {count ? (
        <div>
          <Badge appearance={"important"} text={count} />
        </div>
      ) : (
        ""
      )}
    </DivButton>
  );
};

export default DocumentItems;

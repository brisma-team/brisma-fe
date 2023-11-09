import { Badge, DivButton } from "@/components/atoms";

const NavigationDocument = ({ no, title, count, handleClick, activeIndex }) => {
  return (
    <DivButton
      className={`text-sm py-1 px-1.5 flex justify-between ${
        activeIndex === no
          ? `bg-atlasian-blue-light rounded text-white hover:text-white font-semibold`
          : `text-brisma hover:text-brisma`
      }`}
      handleClick={handleClick}
    >
      <div className="w-full flex">
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

export default NavigationDocument;

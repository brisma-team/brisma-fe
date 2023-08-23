import { ButtonField } from "@/components/atoms";

const CardHeaderContent = ({
  headerTitle,
  description,
  buttonText,
  handleClick,
  width,
}) => {
  return (
    <div
      className={`rounded-xl overflow-hidden border-[#00000033] shadow flex-rows justify-center ${
        width && width
      }`}
    >
      <div className="bg-gray-100 py-3 text-center">
        <h3 className="text-brisma font-semibold">{headerTitle}</h3>
      </div>
      <div className="bg-white p-5">
        <div className="w-full text-center text-base">{description}</div>
        <div className="w-full flex justify-center mt-5">
          <div className="bg-atlasian-blue-light w-28 rounded">
            <ButtonField text={buttonText} handler={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeaderContent;

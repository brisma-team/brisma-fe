import { DivButton } from "@/components/atoms";

const CardApprovalInfo = ({ handleClick, isDisabled, children }) => {
  return (
    <DivButton
      handleClick={handleClick}
      isDisabled={isDisabled}
      className="no-underline hover:no-underline border-2 border-gray-200 rounded-xl bg-white py-2 w-56 h-fit hover:bg-gray-100"
    >
      <div className="w-full px-3">{children}</div>
    </DivButton>
  );
};

export default CardApprovalInfo;

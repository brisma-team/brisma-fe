import { ProgressTracker } from "@atlaskit/progress-tracker";
import { CloseModal } from "@/components/atoms";

const ModalHeader = ({ headerText, progressItems, handleCloseModal }) => {
  return (
    <div className="text-center relative" style={{ width: "31rem" }}>
      <CloseModal handleCloseModal={handleCloseModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      <div className="w-full -mt-4">
        <ProgressTracker items={progressItems} />
      </div>
    </div>
  );
};

export default ModalHeader;

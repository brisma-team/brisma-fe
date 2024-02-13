import { ProgressTracker } from "@atlaskit/progress-tracker";
import { CloseModal } from "@/components/atoms";

const ModalHeader = ({
  showModal,
  headerText,
  progressItems,
  handleCloseModal,
}) => {
  return (
    <div className="w-[31rem] text-center relative">
      <CloseModal showModal={showModal} handleCloseModal={handleCloseModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      <div className="w-full -mt-4">
        <ProgressTracker items={progressItems} />
      </div>
    </div>
  );
};

export default ModalHeader;

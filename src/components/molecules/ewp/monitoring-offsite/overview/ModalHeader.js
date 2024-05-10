import { ProgressTracker } from "@atlaskit/progress-tracker";
import { CloseModal } from "@/components/atoms";

const ModalHeader = ({
  showModal,
  headerText,
  progressItems,
  handleCloseModal,
  width
}) => {
  return (
    <div className={`relative ${width ? `w-[${width}]` : "w-[31rem]"}`}>
      <CloseModal showModal={showModal} handleCloseModal={handleCloseModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      <div className="w-full -mt-4">
        <ProgressTracker items={progressItems} />
      </div>
    </div>
  );
};

export default ModalHeader;

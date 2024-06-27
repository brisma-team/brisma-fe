import { ProgressTracker } from "@atlaskit/progress-tracker";
import { CloseModal } from "@/components/atoms";
const ModalHeader = ({
  showModal,
  headerText,
  progressItems,
  handleCloseModal,
  currentModalStage,
}) => {
  return (
    <div className="w-[31rem] relative">
      <CloseModal showModal={showModal} handleCloseModal={handleCloseModal} />
      <div className="text-3xl font-semibold mb-1">{headerText}</div>
      {currentModalStage === 1 ? (
        <p className="-mt-0.5 text-atlasian-blue-light text-base font-bold">
          Electronic Working Paper Non-Audit Monitoring Offsite
        </p>
      ) : (
        <div className="w-full -mt-4 progress-tracker-custom-create-project-consulting">
          <ProgressTracker items={progressItems} />
        </div>
      )}
    </div>
  );
};

export default ModalHeader;

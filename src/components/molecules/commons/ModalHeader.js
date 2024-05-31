import { CloseModal } from "@/components/atoms";
import { ProgressTracker } from "@atlaskit/progress-tracker";

const ModalHeader = ({
  showModal,
  headerText,
  handleCloseModal,
  title,
  titleClassName,
  width,
  progressItems,
}) => {
  return (
    <div className={`relative ${width || "w-[31rem]"}`}>
      <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
      <div className="text-3xl font-semibold">{headerText}</div>
      {title && <div className={`w-full -mt-4 ${titleClassName}`}>{title}</div>}
      {progressItems ? (
        <div className="w-full -mt-4 progress-tracker-custom-create-project-consulting">
          <ProgressTracker items={progressItems} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ModalHeader;

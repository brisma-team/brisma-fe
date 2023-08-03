const { ProgressTracker } = require("@atlaskit/progress-tracker");

const ModalHeader = ({ headerText, progressItems }) => {
  return (
    <div className="text-center" style={{ width: "31rem" }}>
      <p className="text-3xl font-semibold">{headerText}</p>
      <div className="w-full -mt-4">
        <ProgressTracker items={progressItems} />
      </div>
    </div>
  );
};

export default ModalHeader;

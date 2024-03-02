import { DivButton } from "@/components/atoms";

const Navigation = ({
  currentStage,
  setCurrentStage,
  stageNumber,
  stageTitle,
}) => {
  const active = `atlasian-blue-light`;
  return (
    <div
      className={`${
        currentStage === stageNumber && `border-${active} border-b-4`
      }`}
    >
      <DivButton
        handleClick={() => setCurrentStage(stageNumber)}
        className={`no-underline hover:no-underline rounded-lg ${
          currentStage === stageNumber
            ? `text-${active}`
            : `text-black hover:text-black`
        }`}
      >
        {stageTitle}
      </DivButton>
    </div>
  );
};

const CardBodyNavigation = ({ currentStage, setCurrentStage, stage }) => {
  return (
    <div className="w-full border-b-2 border-[#DFE1E6] font-bold text-base text-center flex">
      {stage.map((v, i) => {
        return (
          <div className="w-1/2 flex justify-center" key={i}>
            <Navigation
              currentStage={currentStage}
              setCurrentStage={setCurrentStage}
              stageNumber={v.stageNumber}
              stageTitle={v.stageTitle}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardBodyNavigation;

import { useState, useEffect } from "react";
import { CardBodyNavigation } from "@/components/molecules/commons";
import { SubModalWorkUnit } from "./content";

const ModalBodyActivityObject = ({ setCurrentModalStage, isDisabled }) => {
  useEffect(() => {
    setCurrentModalStage(2);
  }, []);
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <div className="-mx-4 w-[65rem]">
      <CardBodyNavigation
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        stage={[{ stageNumber: 1, stageTitle: "Unit Kerja" }]}
      />
      {currentStage === 1 && <SubModalWorkUnit isDisabled={isDisabled} />}
    </div>
  );
};

export default ModalBodyActivityObject;
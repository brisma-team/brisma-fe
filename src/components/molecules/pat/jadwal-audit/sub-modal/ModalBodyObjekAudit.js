import { useState, useEffect } from "react";
import { CardBodyNavigation } from "@/components/molecules/commons";
import { SubModalEChannel, SubModalUnitKerja } from "./content";

const ModalBodyObjekAudit = ({ setCurrentModalStage }) => {
  useEffect(() => {
    setCurrentModalStage(2);
  }, []);
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <div className="-mx-4 w-[65rem]">
      <CardBodyNavigation
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        stage={[
          { stageNumber: 1, stageTitle: "Unit Kerja" },
          { stageNumber: 2, stageTitle: "E-Channel" },
        ]}
      />
      {currentStage === 1 && <SubModalUnitKerja />}
      {currentStage === 2 && <SubModalEChannel />}
    </div>
  );
};

export default ModalBodyObjekAudit;

import { useState, useEffect } from "react";
import { CardBodyNavigation } from "@/components/molecules/commons";
import { SubModalActivityExpense, SubModalTravelExpense } from "./content";

const ModalBodyBudget = ({ setCurrentModalStage, typeModal }) => {
  useEffect(() => {
    setCurrentModalStage(3);
  }, []);
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <div className="-mx-4 w-[60.5rem]">
      <CardBodyNavigation
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        stage={[
          { stageNumber: 1, stageTitle: "Biaya Perjalanan Dinas" },
          { stageNumber: 2, stageTitle: "Biaya Selama Kegiatan" },
        ]}
      />
      {currentStage === 1 && <SubModalTravelExpense typeModal={typeModal} />}
      {currentStage === 2 && <SubModalActivityExpense typeModal={typeModal} />}
    </div>
  );
};

export default ModalBodyBudget;
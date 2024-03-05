import { useState, useEffect } from "react";
import { CardBodyNavigation } from "@/components/molecules/commons";
import { SubModalActivityExpense, SubModalTravelExpense } from "./content";
import { ModalFooter } from "@/components/molecules/pat";

const ModalBodyBudget = ({ setCurrentModalStage, typeModal, isDisabledButtonSave, currentModalStage, handleSubmit, handleNextStage }) => {
  useEffect(() => {
    setCurrentModalStage(3);
  }, []);
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <div className="">
      <CardBodyNavigation
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        stage={[
          { stageNumber: 1, stageTitle: "Biaya Perjalanan Dinas" },
          { stageNumber: 2, stageTitle: "Biaya Selama Kegiatan" },
        ]}
      />
      <div className="border-2 rounded-md my-6">
        {currentStage === 1 && <SubModalTravelExpense typeModal={typeModal} />}
        {currentStage === 2 && <SubModalActivityExpense typeModal={typeModal} />}
      </div>
      <div className="mt-3">
				<ModalFooter
					isDisabled={isDisabledButtonSave}
					currentModalStage={currentModalStage}
					handleSubmit={handleSubmit}
					handleNextStage={handleNextStage}
				/>
			</div>
    </div>
  );
};

export default ModalBodyBudget;

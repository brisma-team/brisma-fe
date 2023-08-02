import { useState, useEffect } from "react";
import { CardBodyNavigation } from "@/components/molecules/commons";
import {
  SubModalBiayaPerjalananDinas,
  SubModalBiayaSelamaKegiatan,
} from "./content";

const ModalBodyAnggaran = ({ setCurrentModalStage, typeModal }) => {
  useEffect(() => {
    setCurrentModalStage(3);
  }, []);
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <div className="-mx-4 w-[60rem]">
      <CardBodyNavigation
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        stage={[
          { stageNumber: 1, stageTitle: "Biaya Perjalanan Dinas" },
          { stageNumber: 2, stageTitle: "Biaya Selama Kegiatan" },
        ]}
      />
      {currentStage === 1 && (
        <SubModalBiayaPerjalananDinas typeModal={typeModal} />
      )}
      {currentStage === 2 && (
        <SubModalBiayaSelamaKegiatan typeModal={typeModal} />
      )}
    </div>
  );
};

export default ModalBodyAnggaran;

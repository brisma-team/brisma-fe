import { useState, useEffect } from "react";
import { CardBodyNavigation } from "@/components/molecules/commons";
import { SubModalEChannel, SubModalUnitKerja } from "./content";
import { ModalFooter } from "@/components/molecules/pat";

const ModalBodyObjekAudit = ({
	setCurrentModalStage,
	isDisabledButtonSave,
	currentModalStage,
	handleSubmit,
	handleNextStage,
}) => {
	useEffect(() => {
		setCurrentModalStage(2);
	}, []);
	const [currentStage, setCurrentStage] = useState(1);

	return (
		<div className="">
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
			<div className="mt-3 px-3">
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

export default ModalBodyObjekAudit;

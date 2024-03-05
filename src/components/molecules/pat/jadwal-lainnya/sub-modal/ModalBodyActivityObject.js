import { useState, useEffect } from "react";
import { CardBodyNavigation } from "@/components/molecules/commons";
import { SubModalWorkUnit } from "./content";
import { ModalFooter } from "@/components/molecules/pat";

const ModalBodyActivityObject = ({
	setCurrentModalStage,
	isDisabled,
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
		<div className="-mx-4 w-[65rem]">
			<CardBodyNavigation
				currentStage={currentStage}
				setCurrentStage={setCurrentStage}
				stage={[{ stageNumber: 1, stageTitle: "Unit Kerja" }]}
			/>
			{currentStage === 1 && <SubModalWorkUnit isDisabled={isDisabled} />}
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

export default ModalBodyActivityObject;

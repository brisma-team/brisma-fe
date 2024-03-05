import { ProgressTracker } from "@atlaskit/progress-tracker";
import { CloseModal } from "@/components/atoms";

const ModalHeader = ({
	headerText,
	progressItems,
	handleCloseModal,
	showModal,
	width,
}) => {
	return (
		<div className={`relative ${width ? `w-[${width}]` : "w-[31rem]"}`}>
			<CloseModal
				handleCloseModal={handleCloseModal}
				showModal={showModal}
			/>
			<div className="text-center text-3xl font-semibold">{headerText}</div>
			<div className="ml-0 -mt-4">
				<ProgressTracker
          className="w-full ml-0"
					items={progressItems}
					sx={{ maxWidth: "63rem" }}
				/>
			</div>
		</div>
	);
};

export default ModalHeader;

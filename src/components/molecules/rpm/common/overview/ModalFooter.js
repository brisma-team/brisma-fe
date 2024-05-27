import { ButtonField, ErrorValidation } from "@/components/atoms";

const ModalFooter = ({
  currentModalStage,
  maxStage,
  isDisabled,
  validation,
  handleSubmit,
  handlePrevStage,
  handleNextStage,
}) => {
  return (
    <div className="mt-2">
      <div className="w-full flex justify-end items-center gap-3 -my-1">
        {currentModalStage === maxStage && (
          <div className="rounded w-28 bg-atlasian-blue-light flex items-center">
            <ButtonField
              text={"Kembali"}
              handler={handlePrevStage}
              name={"prevButton"}
            />
          </div>
        )}
        {currentModalStage === maxStage ? (
          <div className="rounded w-28 bg-atlasian-green flex items-center">
            <ButtonField
              text={"Buat R.P.M"}
              handler={handleSubmit}
              name={"saveButton"}
            />
          </div>
        ) : (
          currentModalStage === 1 && (
            <div
              className={`rounded w-28 ${
                isDisabled ? "bg-atlasian-gray-light" : "bg-atlasian-green"
              } flex items-center`}
            >
              <ButtonField
                disabled={isDisabled}
                text={"Lanjut"}
                handler={handleNextStage}
                name={"nextButton"}
              />
            </div>
          )
        )}
      </div>
      {currentModalStage === maxStage && validation?.pn_approver && (
        <div className="mt-2.5">
          <ErrorValidation
            message={validation?.pn_approver}
            className={"ml-1"}
          />
        </div>
      )}
    </div>
  );
};

export default ModalFooter;

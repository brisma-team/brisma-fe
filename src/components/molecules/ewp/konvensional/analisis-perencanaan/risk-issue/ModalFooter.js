import { ButtonField } from "@/components/atoms";
const ModalFooter = ({
  currentModalStage,
  maxStage,
  handleSubmit,
  handleNextStage,
  isDisabled,
}) => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      {currentModalStage > 1 && (
        <div className="rounded w-28 bg-atlasian-yellow">
          <ButtonField
            text={"Template"}
            disabled={isDisabled}
            type={"submit"}
            name={"nextButton"}
          />
        </div>
      )}
      {currentModalStage < maxStage && (
        <div className="rounded w-28 bg-atlasian-blue-light">
          <ButtonField
            text={"Lanjut"}
            handler={handleNextStage}
            type={"submit"}
            name={"nextButton"}
          />
        </div>
      )}
      {currentModalStage > 1 && (
        <div className="rounded w-28 bg-atlasian-green">
          <ButtonField
            text={"Simpan"}
            handler={handleSubmit}
            type={"submit"}
            name={"saveButton"}
          />
        </div>
      )}
    </div>
  );
};

export default ModalFooter;

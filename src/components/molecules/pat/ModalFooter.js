import { ButtonField } from "@/components/atoms";
const ModalFooter = ({
  currentModalStage,
  handleSubmit,
  handleNextStage,
  isDisabled,
}) => {
  return (
    <form
      className="w-full flex justify-end gap-3 -my-1"
      onSubmit={handleSubmit}
    >
      {currentModalStage < 3 && (
        <div className="rounded w-28 bg-atlasian-blue-light">
          <ButtonField
            text={"Lanjut"}
            disabled={isDisabled}
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
    </form>
  );
};

export default ModalFooter;

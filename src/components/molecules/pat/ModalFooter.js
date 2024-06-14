import { ButtonField } from "@/components/atoms";
const ModalFooter = ({
  currentModalStage,
  handleSubmit,
  handleNextStage,
  handlePrevStage,
  isDisabled,
}) => {
  return (
    <form
      className="w-full flex justify-end gap-3 -my-1"
      onSubmit={handleSubmit}
    >
      {currentModalStage > 1 && (
        <div className="rounded w-28 bg-atlasian-blue-light flex items-center">
          <ButtonField
            text={"Kembali"}
            handler={handlePrevStage}
            name={"prevButton"}
          />
        </div>
      )}
      {currentModalStage < 3 && (
        <div className={`rounded w-28 bg-atlasian-blue-light`}>
          <ButtonField
            text={"Lanjut"}
            handler={handleNextStage}
            type={"submit"}
            name={"nextButton"}
          />
        </div>
      )}
      {currentModalStage > 1 && (
        <div
          className={`rounded w-28 ${
            isDisabled ? "bg-atlasian-gray-light" : "bg-atlasian-green"
          }`}
        >
          <ButtonField
            text={"Simpan"}
            disabled={isDisabled}
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

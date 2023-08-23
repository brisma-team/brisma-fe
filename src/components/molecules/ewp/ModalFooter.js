import { ButtonField } from "@/components/atoms";
const ModalFooter = ({
  currentModalStage,
  handleSubmit,
  handlePrevStage,
  handleNextStage,
  maxStage,
  isDisabled,
}) => {
  return (
    <form
      className="w-full flex justify-end gap-3 -my-1"
      onSubmit={handleSubmit}
    >
      {currentModalStage > 1 && (
        <div className="rounded w-28 bg-atlasian-blue-light">
          <ButtonField
            text={"Kembali"}
            disabled={isDisabled}
            handler={handlePrevStage}
            name={"prevButton"}
          />
        </div>
      )}
      {currentModalStage === maxStage ? (
        <div className="rounded w-28 bg-atlasian-green">
          <ButtonField
            text={"Buat E.W.P"}
            handler={handleSubmit}
            type={"submit"}
            name={"saveButton"}
          />
        </div>
      ) : (
        currentModalStage > 1 && (
          <div className="rounded w-28 bg-atlasian-green">
            <ButtonField
              text={"Lanjut"}
              handler={handleNextStage}
              type={"submit"}
              name={"nextButton"}
            />
          </div>
        )
      )}
    </form>
  );
};

export default ModalFooter;

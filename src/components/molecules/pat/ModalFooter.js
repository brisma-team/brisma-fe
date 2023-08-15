const { ButtonField } = require("@/components/atoms");

const ModalFooter = ({ handleSubmit, handleNextStage, isDisabled }) => {
  return (
    <form
      className="w-full flex justify-end gap-3 -my-1"
      onSubmit={handleSubmit}
    >
      <div className="rounded w-28 bg-atlasian-blue-light">
        <ButtonField
          text={"Lanjut"}
          disabled={isDisabled}
          handler={handleNextStage}
          type={"submit"}
          name={"nextButton"}
        />
      </div>
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField
          text={"Simpan"}
          handler={handleSubmit}
          type={"submit"}
          name={"saveButton"}
        />
      </div>
    </form>
  );
};

export default ModalFooter;

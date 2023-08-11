const { ButtonField } = require("@/components/atoms");

const ModalFooter = ({ handleSubmit, handleNextStage, isDisabled }) => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <form
        className="rounded w-28 bg-atlasian-blue-light"
        onSubmit={handleSubmit}
      >
        <ButtonField
          text={"Lanjut"}
          disabled={isDisabled}
          handler={handleNextStage}
          type={"submit"}
        />
      </form>
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text={"Simpan"} handler={handleSubmit} />
      </div>
    </div>
  );
};

export default ModalFooter;

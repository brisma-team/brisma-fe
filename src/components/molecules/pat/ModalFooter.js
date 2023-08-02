const { ButtonField } = require("@/components/atoms");

const ModalFooter = ({ handleSubmit }) => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <div className="rounded w-28 bg-atlasian-blue-light">
        <ButtonField text={"Lanjut"} />
      </div>
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text={"Simpan"} handler={handleSubmit} />
      </div>
    </div>
  );
};

export default ModalFooter;

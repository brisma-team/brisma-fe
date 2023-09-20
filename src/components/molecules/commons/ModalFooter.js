import { ButtonField } from "@/components/atoms";
const ModalFooter = ({ handleSubmit }) => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField
          text={"Simpan"}
          handler={handleSubmit}
          type={"submit"}
          name={"saveButton"}
        />
      </div>
    </div>
  );
};

export default ModalFooter;

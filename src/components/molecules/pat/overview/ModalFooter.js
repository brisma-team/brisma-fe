import { ButtonField } from "@/components/atoms";
const ModalFooter = ({ handleSubmit, handleCloseModal }) => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <div className="rounded flex w-28 gap-6 bg-blue-600">
        <ButtonField
          text={"Batal"}
          handler={handleCloseModal}
          type={"submit"}
          name={"saveButton"}
        />
      </div>
      <div className="rounded flex w-28 gap-6 bg-atlasian-green">
        <ButtonField
          text={"Buat P.A.T"}
          handler={handleSubmit}
          type={"submit"}
          name={"saveButton"}
          />
      </div>
    </div>
  );
};

export default ModalFooter;

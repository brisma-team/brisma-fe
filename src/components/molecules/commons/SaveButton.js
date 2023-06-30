import { EditorDoneIcon } from "@/components/icons";
import { ButtonField } from "@/components/atoms";

const SaveButton = () => {
  return (
    <div className="bg-atlasian-blue-light">
      <ButtonField icon={<EditorDoneIcon />} text={"Simpan"} />
    </div>
  );
};

export default SaveButton;

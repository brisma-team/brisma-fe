import { ButtonField } from "@/components/atoms";
import { IconEditorAdd } from "@/components/icons";

const CreateButton = ({
  href = "#",
  text = "Tambah",
  icon = <IconEditorAdd primaryColor="#fff" />,
}) => {
  return (
    <div className="bg-atlasian-red hover:bg-red-700 focus:bg-red-700 rounded-lg h-10 items-center flex font-medium">
      <ButtonField url={href} icon={icon} text={text} />
    </div>
  );
};

export default CreateButton;

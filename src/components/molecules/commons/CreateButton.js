import { ButtonField } from "@/components/atoms";
import { EditorAddIcon } from "@/components/icons";

const CreateButton = ({
  href = "#",
  text = "Tambah",
  icon = <EditorAddIcon primaryColor="#fff" />,
}) => {
  return (
    <div className="bg-atlasian-red hover:bg-red-700 focus:bg-red-700 rounded-lg h-10 items-center flex font-medium">
      <ButtonField url={href} icon={icon} text={text} />
    </div>
  );
};

export default CreateButton;

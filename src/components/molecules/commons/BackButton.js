import { ButtonField } from "@/components/atoms";
import { IconArrowLeft } from "@/components/icons";

const BackButton = ({ href }) => {
  return (
    <div className="bg-slate-100 hover:bg-slate-200 rounded">
      <ButtonField url={href} icon={<IconArrowLeft />} text={"Back"} />
    </div>
  );
};

export default BackButton;

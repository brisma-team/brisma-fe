import { ButtonField } from "@/components/atoms";
import { ArrowLeftIcon } from "@/components/icons";

const BackButton = ({ href }) => {
  return (
    <div className="bg-slate-100 hover:bg-slate-200 rounded">
      <ButtonField url={href} icon={<ArrowLeftIcon />} text={"Back"} />
    </div>
  );
};

export default BackButton;

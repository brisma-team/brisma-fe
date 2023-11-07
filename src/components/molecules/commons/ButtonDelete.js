import { IconCross } from "@/components/icons";

const ButtonDelete = () => {
  return (
    <div className="rounded-full border border-atlasian-red w-5 h-5 flex items-center justify-center p-1 text-atlasian-red">
      <IconCross size="small" />
    </div>
  );
};

export default ButtonDelete;

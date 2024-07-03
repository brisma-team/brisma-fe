import { IconCross } from "@/components/icons";

const ButtonDelete = () => {
  return (
    <div className="rounded-full border border-atlasian-red flex items-center justify-center !p-0.5 text-atlasian-red">
      <IconCross size="small" />
    </div>
  );
};

export default ButtonDelete;

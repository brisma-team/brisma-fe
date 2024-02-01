import LinkIcon from "./LinkIcon";
import { IconArrowLeft } from "../icons";

const ButtonIconBack = ({ backUrl }) => {
  return (
    <LinkIcon
      href={backUrl}
      icon={
        <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-6 h-6 flex items-center justify-center">
          <IconArrowLeft size="medium" />
        </div>
      }
    />
  );
};

export default ButtonIconBack;

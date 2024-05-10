import { ButtonIcon, CustomTooltip } from "@/components/atoms";
import { IconInfo } from "@/components/icons";

const PopupProject = ({ text }) => {
  return (
    <CustomTooltip
      content={
        <div className="p-2 w-[22rem] text-center">
          <p className="text-xl text-atlasian-yellow font-bold">PERHATIAN</p>
          <p className="text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, cum!. <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas atque nihil, delectus ducimus temporibus.
          </p>
        </div>
      }
    >
      <ButtonIcon isDisabled color={"blue"} icon={<IconInfo />} />
    </CustomTooltip>
  );
};

export default PopupProject;

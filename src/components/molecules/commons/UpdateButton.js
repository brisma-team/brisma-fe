import { IconEdit } from "@/components/icons";

import { ButtonField } from "@/components/atoms";

const UpdateButton = ({ href }) => {
  return (
    // <TooltipField text="Update">
    <div className="bg-atlasian-yellow hover:bg-yellow-400 rounded-lg h-10 items-center flex font-medium">
      <ButtonField
        icon={<IconEdit primaryColor="#fff" />}
        url={href}
        text={"Update"}
        shouldFitContainer
      />
    </div>
    // </TooltipField>
  );
};

export default UpdateButton;

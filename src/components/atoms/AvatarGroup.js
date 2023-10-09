import Avatar from "@atlaskit/avatar";
import Tooltip from "@atlaskit/tooltip";

const AvatarGroup = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-1 my-2">
      {data.map((v, i) => (
        <Tooltip content={v?.nama} key={i}>
          <Avatar
            size="small"
            appearance="circle"
            borderColor={v?.borderColor}
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default AvatarGroup;

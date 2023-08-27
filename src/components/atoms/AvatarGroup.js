import Avatar from "@atlaskit/avatar";

const AvatarGroup = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-1 my-2">
      {data.map((v, i) => (
        <div key={i}>
          <Avatar
            size="small"
            appearance="circle"
            borderColor={v?.borderColor}
            name={v?.nama}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;

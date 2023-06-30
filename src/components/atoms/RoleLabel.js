const RoleLabel = ({ text }) => {
  return (
    <div
      className="bg-orange-coral"
      style={{
        padding: "3px",
        paddingRight: "6px",
        paddingLeft: "6px",
        borderRadius: "3px",
      }}
    >
      <p className="text-base text-white">{text}</p>
    </div>
  );
};

export default RoleLabel;

const ButtonIcon = ({ color, icon, handleClick }) => {
  let iconColor;
  switch (color) {
    case "red":
      iconColor = "text-atlasian-red";
      break;
    case "yellow":
      iconColor = "text-atlasian-yellow";
      break;
    case "blue":
      iconColor = "text-atlasian-blue-light";
      break;
    case "purple":
      iconColor = "text-atlasian-purple";
      break;
    default:
      iconColor = "text-black";
  }

  return (
    <span
      role="button"
      tabIndex={0}
      className={`${iconColor}`}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "Space") {
          return;
        }
      }}
    >
      {icon}
    </span>
  );
};

export default ButtonIcon;
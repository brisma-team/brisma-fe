const ButtonIcon = ({
  color,
  icon,
  handleClick,
  className,
  props,
  handleMouseEnter,
  handleMouseLeave,
}) => {
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
    case "gray":
      iconColor = "text-atlasian-gray-dark";
      break;
    default:
      iconColor = "text-black";
  }

  return (
    <div
      {...props}
      role="button"
      tabIndex={0}
      className={`${className} ${iconColor}`}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "Space") {
          return;
        }
      }}
      onMouseEnter={handleMouseEnter && handleMouseEnter}
      onMouseLeave={handleMouseLeave && handleMouseLeave}
    >
      {icon}
    </div>
  );
};

export default ButtonIcon;

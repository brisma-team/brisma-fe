import Button from "@atlaskit/button";

const ButtonField = ({
  url,
  icon,
  text,
  handler,
  iconAfter,
  textColor,
  disabled,
  type,
  name,
  style,
  className,
  isCentered = true,
}) => {
  let txtColor;
  switch (textColor) {
    case "red":
      txtColor = "text-atlasian-red";
      break;
    case "yellow":
      txtColor = "text-atlasian-yellow";
      break;
    case "blue":
      txtColor = "text-atlasian-blue-light";
      break;
    case "purple":
      txtColor = "text-atlasian-purple";
      break;
    default:
      txtColor = "text-brisma";
      break;
  }

  return (
    <Button
      className={className}
      href={url && url}
      iconBefore={icon}
      iconAfter={iconAfter}
      shouldFitContainer
      onClick={handler}
      isDisabled={disabled}
      type={type}
      name={name && name}
    >
      <p
        className={`${textColor ? txtColor : `text-white`} flex items-center ${
          isCentered ? "justify-center" : ""
        } font-semibold ${style && style}`}
      >
        {text && text}
      </p>
    </Button>
  );
};

export default ButtonField;

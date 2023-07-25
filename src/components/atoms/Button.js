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
    case "brisma":
      txtColor = "text-brisma";
      break;
  }

  return (
    <Button
      href={url && url}
      iconBefore={icon}
      shouldFitContainer
      onClick={handler}
      isDisabled={disabled}
      type={type}
    >
      <p
        className={`${
          textColor ? txtColor : `text-white`
        } flex items-center justify-center`}
      >
        {text && text}
      </p>
    </Button>
  );
};

export default ButtonField;

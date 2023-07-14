import Button from "@atlaskit/button";

const ButtonField = ({
  url,
  icon,
  text,
  handler,
  iconAfter,
  textColor,
  disabled,
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
      href={url ? url : "#"}
      iconBefore={icon}
      iconAfter={iconAfter}
      shouldFitContainer
      onClick={handler}
      isDisabled={disabled}
    >
      <p
        className={`${
          textColor ? txtColor : `text-white`
        } flex items-center justify-center`}
      >
        {text ? text : "No Text"}
      </p>
    </Button>
  );
};

export default ButtonField;

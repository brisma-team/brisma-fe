import Button from "@atlaskit/button";

<<<<<<< Updated upstream
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

=======
const ButtonField = ({ url, icon, text, handler }) => {
>>>>>>> Stashed changes
  return (
    <Button
      href={url ? url : "#"}
      iconBefore={icon}
      iconAfter={iconAfter}
      shouldFitContainer
      onClick={handler}
<<<<<<< Updated upstream
      isDisabled={disabled}
    >
      <p
        className={`${
          textColor ? txtColor : `text-white`
        } flex items-center justify-center`}
      >
        {text ? text : "No Text"}
      </p>
=======
    >
      <p className="text-white flex items-center">{text ? text : "No Text"}</p>
>>>>>>> Stashed changes
    </Button>
  );
};

export default ButtonField;

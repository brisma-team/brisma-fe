import Button from "@atlaskit/button";

const ButtonField = ({ url, icon, text, handler }) => {
  return (
    <Button
      href={url ? url : "#"}
      iconBefore={icon}
      shouldFitContainer
      onClick={handler}
    >
      <p className="text-white flex items-center justify-center">
        {text ? text : "No Text"}
      </p>
    </Button>
  );
};

export default ButtonField;

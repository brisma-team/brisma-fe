import { Checkbox } from "@atlaskit/checkbox";

const CheckboxField = ({
  isChecked,
  handleChange,
  label,
  className,
  isDisabled,
}) => {
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleChange}
      label={label}
      className={className}
      isDisabled={isDisabled}
    />
  );
};

export default CheckboxField;

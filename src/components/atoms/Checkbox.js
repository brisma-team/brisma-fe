import { Checkbox } from "@atlaskit/checkbox";

const CheckboxField = ({ isChecked, handleChange, label, className }) => {
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleChange}
      label={label}
      className={className}
    />
  );
};

export default CheckboxField;

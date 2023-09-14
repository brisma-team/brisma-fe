import { Checkbox } from "@atlaskit/checkbox";

const CheckboxField = ({ isChecked, handleChange, label }) => {
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleChange}
      label={label}
      name="checkbox-default"
      testId="cb-default"
    />
  );
};

export default CheckboxField;

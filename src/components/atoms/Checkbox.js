import { Checkbox } from "@atlaskit/checkbox";

const CheckboxField = ({ value, label }) => {
  return (
    <Checkbox
      value={value}
      label={label}
      onChange={(e) => console.log(e)}
      name="checkbox-default"
      testId="cb-default"
    />
  );
};

export default CheckboxField;

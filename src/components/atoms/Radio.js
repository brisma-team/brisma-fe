import { Radio } from "@atlaskit/radio";

const RadioField = ({ value, label, isChecked, handleChange }) => {
  return (
    <Radio
      value={value}
      label={label}
      isChecked={isChecked}
      onChange={handleChange}
    />
  );
};

export default RadioField;

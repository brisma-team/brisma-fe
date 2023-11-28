import { Radio } from "@atlaskit/radio";

const RadioField = ({ value, label, isChecked, handleChange, isDisabled }) => {
  return (
    <Radio
      value={value}
      label={label}
      isChecked={isChecked}
      onChange={handleChange}
      isDisabled={isDisabled}
    />
  );
};

export default RadioField;

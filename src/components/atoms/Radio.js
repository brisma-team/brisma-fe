import { Radio } from "@atlaskit/radio";

const RadioField = ({ value, label, isChecked }) => {
  return <Radio value={value} label={label} isChecked={isChecked} />;
};

export default RadioField;

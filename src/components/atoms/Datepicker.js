import { DatePicker } from "@atlaskit/datetime-picker";

const DatepickerField = ({
  format,
  placeholder,
  handleChange,
  value,
  isDisabled,
}) => {
  return (
    <DatePicker
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      dateFormat={format}
      isDisabled={isDisabled}
    />
  );
};

export default DatepickerField;

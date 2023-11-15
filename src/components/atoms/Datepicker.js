import { DatePicker } from "@atlaskit/datetime-picker";

const DatepickerField = ({
  format,
  placeholder,
  handleChange,
  value,
  isDisabled,
  pastDate,
}) => {
  return (
    <DatePicker
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      dateFormat={format}
      isDisabled={isDisabled}
      minDate={pastDate}
    />
  );
};

export default DatepickerField;

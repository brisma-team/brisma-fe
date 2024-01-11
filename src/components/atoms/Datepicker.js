import { DatePicker } from "@atlaskit/datetime-picker";

const DatepickerField = ({
  format,
  placeholder,
  handleChange,
  value,
  isDisabled,
  minDate,
  maxDate,
}) => {
  return (
    <DatePicker
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      dateFormat={format}
      isDisabled={isDisabled}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export default DatepickerField;

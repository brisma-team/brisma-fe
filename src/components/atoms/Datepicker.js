import { DatePicker } from "@atlaskit/datetime-picker";
import { useEffect } from "react";

const DatepickerField = ({
  format,
  placeholder,
  handleChange,
  value,
  isDisabled,
  minDate,
  maxDate,
}) => {
  useEffect(() => {
    console.log(`minDate => ${minDate}, maxDate => ${maxDate}`);
  }, [minDate, maxDate]);
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

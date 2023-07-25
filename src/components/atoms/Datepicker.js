import { useState } from "react";
import DatePicker from "react-datepicker";

const DatepickerField = ({ format, placeholder }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <DatePicker
      selected={selectedYear}
      onChange={(value) => setSelectedYear(value)}
      className="w-full border-[#DFE1E6] bg-[#F5F6F8] rounded shadow-md text-sm font-medium text-[#091E42]"
      placeholderText={placeholder}
      dateFormat={format}
      showYearPicker
    />
  );
};

export default DatepickerField;

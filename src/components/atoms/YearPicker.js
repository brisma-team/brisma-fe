import Select from "./Select";

const YearPicker = ({
  value,
  handleChange,
  isDisabled,
  placeholder,
  positionAbsolute,
}) => {
  const currentYear = new Date().getFullYear();
  const yearList = [];
  for (let i = 0; i <= 10; i++) {
    const year = currentYear + i;
    yearList.push({ label: year, value: year });
  }
  return (
    <Select
      value={value}
      onChange={handleChange}
      optionValue={yearList}
      isSearchable={false}
      placeholder={placeholder}
      positionAbsolute={positionAbsolute}
      isDisabled={isDisabled}
    />
  );
};

export default YearPicker;

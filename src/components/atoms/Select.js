import SelectInput from "@atlaskit/select";

const Select = ({
  placeholder,
  optionValue,
  isSearchable,
  style,
  onChange,
  value,
}) => {
  return (
    <SelectInput
      onChange={onChange}
      options={optionValue}
      isSearchable={isSearchable}
      placeholder={placeholder}
      className={style}
      value={value && value}
    />
  );
};

export default Select;

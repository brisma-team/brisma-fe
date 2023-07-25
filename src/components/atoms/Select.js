import SelectInput from "@atlaskit/select";

const Select = ({
  placeholder,
  optionValue,
  isSearchable,
  style,
  onChange,
}) => {
  return (
    <SelectInput
      onChange={onChange}
      options={optionValue}
      isSearchable={isSearchable}
      placeholder={placeholder}
      className={style}
    />
  );
};

export default Select;

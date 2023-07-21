import SelectInput from "@atlaskit/select";

const Select = ({ placeholder, optionValue, isSearchable, style }) => {
  return (
    <SelectInput
      options={optionValue}
      isSearchable={isSearchable}
      placeholder={placeholder}
      className={style}
    />
  );
};

export default Select;

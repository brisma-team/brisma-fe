import SelectInput from "@atlaskit/select";

const Select = ({
  placeholder,
  optionValue,
  isSearchable,
  isMulti,
  style,
  onChange,
  value,
  isDisabled,
  handleMenuOpen,
  handleMenuClose,
}) => {
  return (
    <SelectInput
      onChange={onChange}
      options={optionValue}
      isSearchable={isSearchable}
      isMulti={isMulti}
      placeholder={placeholder}
      className={style}
      value={value && value}
      isDisabled={isDisabled}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
    />
  );
};

export default Select;

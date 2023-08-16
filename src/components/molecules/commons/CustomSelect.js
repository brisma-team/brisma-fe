import React from "react";
import Select, { components } from "@atlaskit/select";

const CustomSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  optionValue,
  isDisabled,
}) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon && customIcon}
      </components.DropdownIndicator>
    );
  };
  return (
    <Select
      {...fieldsProps}
      placeholder={placeholder}
      options={optionValue}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
      isDisabled={isDisabled}
    />
  );
};

export default CustomSelect;

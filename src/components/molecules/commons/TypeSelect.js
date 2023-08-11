import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useTipe } from "@/data/reference";

const TypeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const { tipe } = useTipe("list");

  useEffect(() => {
    const mapping = tipe?.data?.map((v) => {
      return { label: v.nama, value: v.kode };
    });
    setOptions(mapping);
  }, [tipe]);

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
      options={options}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default TypeSelect;

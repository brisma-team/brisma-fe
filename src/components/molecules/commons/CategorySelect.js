import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useJenis } from "@/data/reference";

const CategorySelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const { jenis } = useJenis("list");

  useEffect(() => {
    const mapping = jenis?.data?.map((v) => {
      return { label: v.nama, value: v.kode };
    });
    setOptions(mapping);
  }, [jenis]);

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

export default CategorySelect;

import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useMetode } from "@/data/reference";

const MetodeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const { metode } = useMetode("list");

  useEffect(() => {
    const mapping = metode?.data?.map((v) => {
      return { label: v.nama, value: v.kode };
    });
    setOptions(mapping);
  }, [metode]);

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

export default MetodeSelect;

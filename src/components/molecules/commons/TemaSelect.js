import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useTema } from "@/data/reference";

const TemaSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const { tema } = useTema("list");

  useEffect(() => {
    const mapping = tema?.data?.map((v) => {
      return { label: v.nama, value: v.kode };
    });
    setOptions(mapping);
  }, [tema]);

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

export default TemaSelect;

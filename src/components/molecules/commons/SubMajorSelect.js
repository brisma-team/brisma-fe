import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useSubMajor } from "@/data/reference";

const SubMajorSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);

  const { subMajor } = useSubMajor();
  useEffect(() => {
    const mapping = subMajor?.data?.map((v) => {
      return {
        label: v.kode,
        value: v,
      };
    });
    setOptions(mapping);
  }, [subMajor]);

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

export default SubMajorSelect;

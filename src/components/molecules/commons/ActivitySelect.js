import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useActivity } from "@/data/reference";

const ActivitySelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [optionValue, setOptionValue] = useState([]);

  const { activity } = useActivity();
  useEffect(() => {
    const mapping = activity?.data?.map((v) => {
      return {
        label: v.nama,
        value: v.kode,
      };
    });
    setOptionValue(mapping);
  }, [activity]);

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
    />
  );
};

export default ActivitySelect;

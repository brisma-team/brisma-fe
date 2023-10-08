import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useTeknikSampling } from "@/data/reference";

const TeknikSamplingSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const { teknikSampling } = useTeknikSampling("all");

  useEffect(() => {
    const mapping = teknikSampling?.data?.map((v) => {
      return { label: v.name, value: v.kode };
    });
    setOptions(mapping);
  }, [teknikSampling]);

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

export default TeknikSamplingSelect;

import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useRiskIssue } from "@/data/reference";

const RiskIssueSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  kode,
}) => {
  const [options, setOptions] = useState([]);

  const { riskIssue } = useRiskIssue(kode);
  useEffect(() => {
    const mapping = riskIssue?.data?.map((v) => {
      return {
        label: v.kode,
        value: v,
      };
    });
    setOptions(mapping);
  }, [riskIssue]);

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

export default RiskIssueSelect;

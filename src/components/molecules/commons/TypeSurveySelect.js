import React, { useState } from "react";
import Select, { components } from "@atlaskit/select";

const TypeSurveySelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
}) => {
  const [options, setOptions] = useState([
    { label: "CSS", value: { kode: "CSS", nama: "CSS" } },
    { label: "Lingkungan", value: { kode: "AL", nama: "Lingkungan" } },
    { label: "Peer Review", value: { kode: "PR", nama: "Peer Review" } },
    { label: "SBP", value: { kode: "SBP", nama: "SBP" } },
  ]);

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
      isDisabled={isDisabled}
    />
  );
};

export default TypeSurveySelect;

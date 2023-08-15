import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useTypeTeam } from "@/data/reference";

const TypeTeamSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
}) => {
  const [options, setOptions] = useState([]);
  const { typeTeam } = useTypeTeam("all");

  useEffect(() => {
    const mapping = typeTeam?.data?.map((row) => {
      return {
        label: `${row?.nama}`,
        value: row,
      };
    });
    setOptions(mapping);
  }, [typeTeam]);

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

export default TypeTeamSelect;

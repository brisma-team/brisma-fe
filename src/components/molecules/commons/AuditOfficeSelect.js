import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import useUka from "@/data/useUka";

const AuditOfficeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const { uka } = useUka();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (uka) {
      const mappedUka = uka.data.data.map((row) => {
        return {
          label: row.name,
          value: row.kode,
        };
      });

      setOptions(mappedUka);
    }
  }, [uka]);

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

export default AuditOfficeSelect;

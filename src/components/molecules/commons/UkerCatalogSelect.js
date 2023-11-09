import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import useUka from "@/data/useUka";
import { Skeleton } from "@atlaskit/navigation";

const UkerCatalogSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const { uka, ukaIsLoading } = useUka();

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

  if (ukaIsLoading) {
    return <Skeleton />;
  }

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

export default UkerCatalogSelect;

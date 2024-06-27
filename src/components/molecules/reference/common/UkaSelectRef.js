import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import useUkaList from "@/data/dashboard/useUkaList";

const UkaSelectRef = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  positionAbsolute,
  width,
}) => {
  const [optionValue, setOptionValue] = useState([]);

  const { uka } = useUkaList();
  useEffect(() => {
    const mapping = uka?.uka?.map((v) => {
      return {
        label: v.kode + " - " + v.name,
        value: v.kode,
      };
    });
    setOptionValue(mapping);
  }, [uka]);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon ? customIcon : null}
      </components.DropdownIndicator>
    );
  };
  return (
    <div
      className={`${positionAbsolute ? `z-50 absolute` : ``} ${
        width ? width : ""
      }`}
    >
      <Select
        {...fieldsProps}
        placeholder={placeholder}
        options={optionValue}
        onChange={handleChange}
        isSearchable={isSearchable}
        value={selectedValue}
        components={customIcon && { DropdownIndicator }}
      />
    </div>
  );
};

export default UkaSelectRef;

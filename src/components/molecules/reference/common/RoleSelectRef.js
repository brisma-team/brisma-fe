import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import useRoleList from "@/data/dashboard/useRoleList";

const RoleSelectRef = ({
  handleChange,
  isSearchable,
  isMulti,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  positionAbsolute,
  width,
}) => {
  const [optionValue, setOptionValue] = useState([]);

  const { role } = useRoleList();
  useEffect(() => {
    const mapping = role?.userRole?.map((v) => {
      return {
        label: v.kode + " - " + v.name,
        value: v.kode,
      };
    });
    setOptionValue(mapping);
  }, [role]);

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
        isMulti={isMulti}
        value={selectedValue}
        components={customIcon && { DropdownIndicator }}
      />
    </div>
  );
};

export default RoleSelectRef;

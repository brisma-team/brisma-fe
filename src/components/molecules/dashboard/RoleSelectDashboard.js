import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import useRoleList from "@/data/dashboard/useRoleList";

const RoleSelectDashboard = ({
  handleChange,
  isSearchable,
  isMulti,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  width,
}) => {
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon && customIcon}
      </components.DropdownIndicator>
    );
  };
  return (
    <div className={`${open ? "z-50 absolute" : ""} ${width && width}`}>
      <Select
        {...fieldsProps}
        placeholder={placeholder}
        options={optionValue}
        onChange={handleChange}
        isSearchable={isSearchable}
        isMulti={isMulti}
        value={selectedValue}
        components={customIcon && { DropdownIndicator }}
        onMenuOpen={handleOpen}
        onMenuClose={handleClose}
      />
    </div>
  );
};

export default RoleSelectDashboard;

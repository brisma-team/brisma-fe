import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import useUkaList from "@/data/dashboard/useUkaList";

const UkaSelectDashboard = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  width,
}) => {
  const [open, setOpen] = useState(false);
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
    <div className={`${open ? "z-60 absolute" : ""} ${width && width}`}>
      <Select
        {...fieldsProps}
        placeholder={placeholder}
        options={optionValue}
        onChange={handleChange}
        isSearchable={isSearchable}
        value={selectedValue}
        components={customIcon && { DropdownIndicator }}
        onMenuOpen={handleOpen}
        onMenuClose={handleClose}
      />
    </div>
  );
};

export default UkaSelectDashboard;

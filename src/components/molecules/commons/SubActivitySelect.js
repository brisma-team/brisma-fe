import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useSubActivity } from "@/data/reference";

const SubActivitySelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  activityId,
  width,
}) => {
  const [open, setOpen] = useState(false);
  const [optionValue, setOptionValue] = useState([]);

  const { subActivity } = useSubActivity(activityId);
  useEffect(() => {
    const mapping = subActivity?.data?.map((v) => {
      return {
        label: v.nama,
        value: v.kode,
      };
    });
    setOptionValue(mapping);
  }, [subActivity]);

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
        value={selectedValue}
        components={customIcon && { DropdownIndicator }}
        onMenuOpen={handleOpen}
        onMenuClose={handleClose}
      />
    </div>
  );
};

export default SubActivitySelect;

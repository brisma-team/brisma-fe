import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useUkerType } from "@/data/reference";

const UkerTypeSelect = ({
  width,
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  customIcon,
  fieldsProps,
  isDisabled,
  positionAbsolute,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const { ukerType } = useUkerType("list");

  useEffect(() => {
    const mapping = ukerType?.data?.map((v) => {
      return { label: v.name, value: v.kode };
    });
    setOptions(mapping);
  }, [ukerType]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const findUkerType = (kode) => {
    const find = ukerType?.data?.find((v) => v.kode == kode);
    return { label: find?.name, value: find?.kode };
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon && customIcon}
      </components.DropdownIndicator>
    );
  };

  return (
    <div
      className={`${positionAbsolute && open ? `z-50 absolute` : ``} ${
        width && width
      }`}
    >
      <Select
        {...fieldsProps}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
        isSearchable={isSearchable}
        value={selectedValue ? findUkerType(selectedValue) : null}
        components={customIcon && { DropdownIndicator }}
        isDisabled={isDisabled}
        onMenuOpen={handleOpen}
        onMenuClose={handleClose}
      />
    </div>
  );
};

export default UkerTypeSelect;

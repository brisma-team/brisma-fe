import React, { useEffect, useState } from "react";
import Select from "@atlaskit/select";
import { useUkerType } from "@/data/reference";

const UkerTypeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  isDisabled,
  handleMenuOpen,
  handleMenuClose,
}) => {
  const [options, setOptions] = useState([]);
  const { ukerType } = useUkerType("list");

  useEffect(() => {
    const mapping = ukerType?.data?.map((v) => {
      return { label: v.name, value: v.kode };
    });
    setOptions(mapping);

    console.log("mapping => ", mapping);
  }, [ukerType]);

  const findUkerType = (kode) => {
    const find = ukerType?.data?.find((v) => v.kode == kode);
    return { label: find?.name, value: find?.kode };
  };

  return (
    <Select
      {...fieldsProps}
      placeholder={placeholder}
      options={options}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue !== "" ? findUkerType(selectedValue) : ""}
      isDisabled={isDisabled}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
    />
  );
};

export default UkerTypeSelect;

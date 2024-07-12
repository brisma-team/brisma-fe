import React, { useEffect, useState } from "react";
// import _ from "lodash";
import Select, { components } from "@atlaskit/select";
import { useUkaType } from "@/data/reference";

const UkaTypeSelect = ({
  handleChange,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
  className,
}) => {
  const [options, setOptions] = useState([]);
  const { ukaType } = useUkaType();
  useEffect(() => {
    const mappedBranch = ukaType?.data?.map((row) => {
      return {
        ...row,
        label: `${row?.kode} - ${row?.name}`,
        value: { kode: row?.kode, name: row?.name },
      };
    });
    setOptions(mappedBranch);
  }, [ukaType]);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon ? customIcon : null}
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      {...fieldsProps}
      placeholder={placeholder}
      options={options}
      onChange={handleChange}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
      isDisabled={isDisabled}
      className={className}
    />
  );
};

export default UkaTypeSelect;

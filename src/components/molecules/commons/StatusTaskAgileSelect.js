import React from "react";
import CustomSelect from "./CustomSelect";

const StatusTaskAgileSelect = ({
  handleChange,
  placeholder,
  selectedValue,
  isDisabled,
  optionValue,
  customIcon,
}) => {
  return (
    <CustomSelect
      optionValue={
        optionValue || [
          {
            label: "Draft",
            value: "Draft",
          },
          {
            label: "On Progress",
            value: "On Progress",
          },
          { label: "Completed", value: "Completed" },
          { label: "Impended", value: "Impended" },
          { label: "Canceled", value: "Canceled" },
        ]
      }
      customIcon={customIcon ? customIcon : null}
      selectedValue={selectedValue}
      placeholder={placeholder}
      handleChange={handleChange}
      isSearchable={false}
      isDisabled={isDisabled}
    />
  );
};

export default StatusTaskAgileSelect;

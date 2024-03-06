import React from "react";
import CustomSelect from "./CustomSelect";
import { ButtonIcon } from "@/components/atoms";
import { IconClose } from "@/components/icons";

const StatusApprovalSelect = ({
  handleChange,
  handleReset,
  placeholder,
  selectedValue,
  isDisabled,
  optionValue,
}) => {
  return (
    <CustomSelect
      optionValue={
        optionValue || [
          {
            label: "On Progress",
            value: { kode: "On Progress", name: "On Progress" },
          },
          {
            label: "On Approver",
            value: { kode: "On Approver", name: "On Approver" },
          },
          { label: "Final", value: { kode: "Final", name: "Final" } },
        ]
      }
      customIcon={<ButtonIcon handleClick={handleReset} icon={<IconClose />} />}
      selectedValue={selectedValue}
      placeholder={placeholder}
      handleChange={handleChange}
      isSearchable={false}
      isDisabled={isDisabled}
    />
  );
};

export default StatusApprovalSelect;

import React from "react";
import CustomSelect from "./CustomSelect";

const EffectivenessTaskSelect = ({
  handleChange,
  placeholder,
  selectedValue,
  isDisabled,
  customIcon,
}) => {
  return (
    <CustomSelect
      optionValue={[
        {
          label: "Efektif",
          value: "Efektif",
        },
        {
          label: "Tidak Efektif",
          value: "Tidak Efektif",
        },
        { label: "Tidak Diuji", value: "Diuji" },
      ]}
      customIcon={customIcon ? customIcon : null}
      selectedValue={selectedValue}
      placeholder={placeholder}
      handleChange={handleChange}
      isSearchable={false}
      isDisabled={isDisabled}
    />
  );
};

export default EffectivenessTaskSelect;

import React from "react";
import CustomSelect from "./CustomSelect";
import { ButtonIcon } from "@/components/atoms";
import { IconClose } from "@/components/icons";

const HasilEvaluasiSelect = ({
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
            label: "Tidak Memadai",
            value: { kode: "Tidak Memadai", name: "Tidak Memadai" },
          },
          {
            label: "Dalam Pemantauan",
            value: { kode: "Dalam Pemantauan", name: "Dalam Pemantauan" },
          },
          { label: "Memadai", value: { kode: "Memadai", name: "Memadai" } },
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

export default HasilEvaluasiSelect;

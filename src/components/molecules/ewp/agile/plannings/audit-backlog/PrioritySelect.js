import { CustomSelect } from "@/components/molecules/commons";
import { ButtonIcon } from "@/components/atoms";
import { IconClose } from "@/components/icons";

const PrioritySelect = ({
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
            label: "Low",
            value: { kode: "1", nama: "Low" },
          },
          {
            label: "Normal",
            value: { kode: "2", nama: "Normal" },
          },
          {
            label: "High",
            value: { kode: "3", nama: "High" },
          },
          { label: "Urgent", value: { kode: "4", nama: "Urgent" } },
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

export default PrioritySelect;

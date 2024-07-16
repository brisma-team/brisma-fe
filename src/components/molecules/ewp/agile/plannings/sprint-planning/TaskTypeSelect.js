import { CustomSelect } from "@/components/molecules/commons";
import { ButtonIcon } from "@/components/atoms";
import { IconClose } from "@/components/icons";

const TaskTypeSelect = ({
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
            label: "Operating Effectiveness",
            value: { kode: "1", nama: "Operating effectiveness" },
          },
          {
            label: "Design Effectiveness",
            value: { kode: "2", nama: "Design effectiveness" },
          },
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

export default TaskTypeSelect;

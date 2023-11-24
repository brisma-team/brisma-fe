import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useQuestionType } from "@/data/reference";

const QuestionTypeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
}) => {
  const [options, setOptions] = useState([]);
  const { questionType } = useQuestionType();

  useEffect(() => {
    const mapping = questionType?.data?.map((row) => {
      return {
        label: `${row?.nama}`,
        value: { kode: row.kode, name: row.nama },
      };
    });
    setOptions(mapping);
  }, [questionType]);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon && customIcon}
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      {...fieldsProps}
      placeholder={placeholder}
      options={options}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
      isDisabled={isDisabled}
    />
  );
};

export default QuestionTypeSelect;

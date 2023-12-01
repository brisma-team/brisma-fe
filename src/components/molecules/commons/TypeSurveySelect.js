import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useSurveyType } from "@/data/reference";

const TypeSurveySelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
}) => {
  const [options, setOptions] = useState([]);

  const { surveyType } = useSurveyType();

  useEffect(() => {
    const mapping = surveyType?.data?.map((survey) => {
      return {
        label: survey.nama,
        value: { survey },
      };
    });

    setOptions(mapping);
  }, [surveyType]);

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

export default TypeSurveySelect;

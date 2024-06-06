import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useRecommendationType } from "@/data/reference";

const RecommendationTypeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
}) => {
  const [options, setOptions] = useState([]);
  const { recommendationType } = useRecommendationType();

  useEffect(() => {
    if (recommendationType?.data?.length) {
      const mapping = recommendationType?.data?.map((data) => {
        return { label: data?.nama?.toUpperCase(), value: data };
      });
      setOptions(mapping);
    } else {
      setOptions([]);
    }
  }, [recommendationType]);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon && selectedValue ? customIcon : null}
      </components.DropdownIndicator>
    );
  };
  return (
    <Select
      {...fieldsProps}
      isDisabled={isDisabled}
      placeholder={placeholder}
      options={options}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default RecommendationTypeSelect;

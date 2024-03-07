import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useDocumentType } from "@/data/ewp/konsulting/dokumen";

const DocumentTypeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [optionValue, setOptionValue] = useState([]);

  const { documentType } = useDocumentType();
  useEffect(() => {
    if (documentType?.data?.length) {
      const mapping = documentType?.data?.map((v) => {
        return {
          label: v?.part,
          value: {
            kode: v?.id,
            name: v?.part,
          },
        };
      });
      setOptionValue(mapping);
    } else {
      setOptionValue([]);
    }
  }, [documentType]);

  useEffect(() => {
    console.log("optionValue => ", optionValue);
  }, [optionValue]);

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
      options={optionValue}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default DocumentTypeSelect;

import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useRisk } from "@/data/reference";
import _ from "lodash";

const RiskSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);

  const { risk, riskMutate } = useRisk("all", { keyword });

  useEffect(() => {
    if (risk?.data?.length) {
      const mapping = risk?.data?.map((v) => {
        const { kode, nama } = v;
        return {
          label: v.nama,
          value: { kode, nama },
        };
      });
      setOptions(mapping);
    } else {
      setOptions([]);
    }
    setSearch(false);
  }, [risk, search]);

  useEffect(() => {
    if (value.length > 2) {
      const handleSearch = () => {
        setKeyword(value);
        setSearch(true);
        riskMutate();
      };
      const debouncedSearch = _.debounce(handleSearch, 400);
      debouncedSearch();
      return () => {
        debouncedSearch.cancel();
      };
    } else {
      setOptions([]);
    }
  }, [value]);

  function handleInputChange(e) {
    if (e.length > 2) {
      setValue(e);
    } else {
      setOptions([]);
    }
  }

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
      onInputChange={handleInputChange}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default RiskSelect;

import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useRisk } from "@/data/reference";
import _ from "lodash";

const RiskSelect = ({
  handleChange,
  isSearchable,
  isDisabled,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { risk, riskMutate, riskIsLoading } = useRisk("all", { keyword });

  useEffect(() => {
    if (risk?.data?.length) {
      const mapping = risk?.data?.map((v) => {
        const { kode, abbr, nama } = v;
        return {
          label: `${v?.abbr} - ${v?.nama}`,
          value: { kode, abbr, nama },
        };
      });
      setOptions(mapping);
    } else {
      setOptions([]);
    }
    setSearch(false);
  }, [risk, search]);

  useEffect(() => {
    if (value.length > 1) {
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

  useEffect(() => {
    setIsLoading(riskIsLoading);
  }, [riskIsLoading]);

  function handleInputChange(e) {
    if (e.length > 1) {
      setValue(e);
    } else {
      setOptions([]);
    }
  }

  const DropdownIndicator = (props) => {
    return !isLoading ? (
      <components.DropdownIndicator {...props}>
        {customIcon && customIcon}
      </components.DropdownIndicator>
    ) : (
      ""
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
      isDisabled={isDisabled}
      isLoading={isLoading}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default RiskSelect;

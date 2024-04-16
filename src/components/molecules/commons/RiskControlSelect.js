import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useRiskControl } from "@/data/reference";
import _ from "lodash";

const RiskControlSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { riskControl, riskControlMutate, riskControlIsLoading } =
    useRiskControl("all", {
      search: keyword,
    });

  useEffect(() => {
    if (riskControl?.data?.length) {
      const mapping = riskControl?.data?.map((v) => {
        const { kode, nama, abbr } = v;
        return {
          label: `${abbr} - ${nama}`,
          value: { kode, nama, abbr },
        };
      });
      setOptions(mapping);
    } else {
      setOptions([]);
    }
    setSearch(false);
  }, [riskControl, search]);

  useEffect(() => {
    setIsLoading(riskControlIsLoading);
  }, [riskControlIsLoading]);

  useEffect(() => {
    if (value.length > 1) {
      const handleSearch = () => {
        setKeyword(value);
        setSearch(true);
        riskControlMutate();
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
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
      isLoading={isLoading}
      isDisabled={isDisabled}
    />
  );
};

export default RiskControlSelect;

import useOrgeh from "@/data/useOrgeh";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Select, { components } from "@atlaskit/select";

const OrgehSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  customIcon,
  fieldsProps,
  isDisabled,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const { orgeh, orgehMutate } = useOrgeh(keyword);

  useEffect(() => {
    if (search) {
      const mappedOrgeh = orgeh?.data?.map((row) => {
        return {
          ...row,
          label: `${row?.child} - ${row?.my_name}`,
          value: { orgeh_kode: row?.child, orgeh_name: row?.my_name },
        };
      });
      setOptions(mappedOrgeh);
    }
  }, [orgeh, search]);

  useEffect(() => {
    if (value.length > 2) {
      const handleSearch = () => {
        setSearch(true);
        setKeyword(value);
        orgehMutate;
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
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      onInputChange={handleInputChange}
      components={customIcon && { DropdownIndicator }}
      isDisabled={isDisabled}
    />
  );
};

export default OrgehSelect;

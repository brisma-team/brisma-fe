import useBranch from "@/data/useBranch";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Select, { components } from "@atlaskit/select";

const BranchSelect = ({
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
  const { branch, branchMutate } = useBranch(keyword);

  useEffect(() => {
    if (search) {
      const mappedBranch = branch?.data?.map((row) => {
        return {
          ...row,
          label: `${row?.branch} - ${row?.brdesc}`,
          value: { branch_name: row?.brdesc, branch_kode: row?.branch },
        };
      });
      setOptions(mappedBranch);
    }
  }, [branch, search]);

  useEffect(() => {
    if (value.length > 2) {
      const handleSearch = () => {
        setSearch(true);
        setKeyword(value);
        branchMutate;
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
    />
  );
};

export default BranchSelect;

import useBranch from "@/data/useBranch";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { ReactSelect } from "@/components/atoms";

const BranchSelect = ({
  control,
  handleChange,
  handleClick,
  isSearchable,
  placeholder,
  selectedValue,
  customIcon,
  fieldsProps,
  ref,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const { branch, branchMutate } = useBranch(keyword);

  useEffect(() => {
    const mappedBranch = branch?.data?.map((row) => {
      return {
        ...row,
        label: `${row?.branch} - ${row?.brdesc}`,
        value: { branch_name: row?.brdesc, branch_kode: row?.branch },
      };
    });
    setOptions(mappedBranch);
  }, [branch]);

  useEffect(() => {
    if (value > 2) {
      const handleSearch = () => {
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

  return (
    <ReactSelect
      control={control}
      options={options}
      handleChange={handleChange}
      handleInputChange={handleInputChange}
      handleClick={handleClick}
      isSearchable={isSearchable}
      placeholder={placeholder}
      value={selectedValue}
      customIcon={customIcon}
      fieldsProps={fieldsProps}
      ref={ref}
    />
  );
};

export default BranchSelect;

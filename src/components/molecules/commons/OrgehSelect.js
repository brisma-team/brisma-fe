import useOrgeh from "@/data/useOrgeh";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { ReactSelect } from "@/components/atoms";

const OrgehSelect = ({
  control,
  handleChange,
  handleClick,
  isSearchable,
  placeholder,
  selectedValue,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const { orgeh, orgehMutate } = useOrgeh(keyword);

  useEffect(() => {
    const mappedOrgeh = orgeh?.data?.map((row) => {
      return {
        ...row,
        label: `${row?.child} - ${row?.my_name}`,
        value: { orgeh_kode: row?.child, orgeh_name: row?.my_name },
      };
    });
    setOptions(mappedOrgeh);
  }, [orgeh]);

  useEffect(() => {
    if (value > 2) {
      const handleSearch = () => {
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
    />
  );
};

export default OrgehSelect;

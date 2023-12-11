// import usePekerja from "@/data/usePekerja";
import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import Select, { components } from "@atlaskit/select";
import { useOmniSearch } from "@/data/catalog";
import shortenWord from "@/helpers/shortenWord";

const OmniSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
  className,
  type = "pat",
  year = "2023",
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const { omni, omniMutate } = useOmniSearch(type, year, keyword);

  useEffect(() => {
    if (search && omni !== undefined) {
      console.log(omni);
      const mappedOmni = omni?.data?.list.map((row) => {
        return {
          label:
            row?.project_source +
            "/" +
            row?.project_year +
            " - " +
            shortenWord(row?.project_name, 0, 35),
          value: {
            id: row?.project_id,
            name: row?.project_name,
            source: row?.project_source,
          },
        };
      });
      setOptions(mappedOmni);
    }
  }, [omni, search]);

  useEffect(() => {
    setSearch(false);
    setKeyword("");
  }, [type]);

  useEffect(() => {
    if (value.length > 2) {
      const handleSearch = () => {
        setSearch(true);
        setKeyword(value);
        omniMutate;
      };
      const debouncedSearch = _.debounce(handleSearch, 500);
      debouncedSearch();
      return () => {
        debouncedSearch.cancel();
      };
    } else {
      setOptions([]);
    }
  }, [value]);

  const handleInputChange = useCallback(
    (e) => {
      if (e.length > 2) {
        setValue(e);
      } else {
        setOptions([]);
      }
    },
    [search]
  );

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
      className={className}
    />
  );
};

export default OmniSelect;

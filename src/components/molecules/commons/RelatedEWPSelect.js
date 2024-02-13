import React, { useEffect, useState } from "react";
import _ from "lodash";
import Select, { components } from "@atlaskit/select";
import { useRelatedEWP } from "@/data/ewp/konsulting/overview";

const RelatedEWPSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
  isDisabled,
  className,
  positionAbsolute,
  width,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const { relatedEWP, relatedEWPMutate } = useRelatedEWP(keyword);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (search) {
      const mappedRelatedEWP = relatedEWP?.data?.map((row) => {
        return {
          label: `${row?.project_id} - ${row?.project_name}`,
          value: row,
        };
      });
      setOptions(mappedRelatedEWP);
    }
  }, [relatedEWP, search]);

  useEffect(() => {
    if (value.length > 2) {
      const handleSearch = () => {
        setSearch(true);
        setKeyword(value);
        relatedEWPMutate();
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customIcon && customIcon}
      </components.DropdownIndicator>
    );
  };

  return (
    <div
      className={`${positionAbsolute && open ? `z-50 absolute` : ``} ${
        width && width
      }`}
    >
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
        onMenuOpen={positionAbsolute && handleOpen}
        onMenuClose={positionAbsolute && handleClose}
      />
    </div>
  );
};

export default RelatedEWPSelect;

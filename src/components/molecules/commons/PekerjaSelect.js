import usePekerja from "@/data/usePekerja";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Select, { components } from "@atlaskit/select";

const PekerjaSelect = ({
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
  const { pekerja, pekerjaMutate } = usePekerja(keyword, "skai");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (search) {
      const mappedPekerja = pekerja?.data?.map((row) => {
        return {
          label: `${row?.pn} - ${row?.name}`,
          value: { pn: row?.pn, name: row?.name, jabatan: row?.jabatan },
        };
      });
      setOptions(mappedPekerja);
    }
  }, [pekerja, search]);

  useEffect(() => {
    if (value.length > 2) {
      const handleSearch = () => {
        setSearch(true);
        setKeyword(value);
        pekerjaMutate;
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

export default PekerjaSelect;

import usePekerja from "@/data/usePekerja";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { ReactSelect } from "@/components/atoms";

const PekerjaSelect = ({
  control,
  handleChange,
  handleClick,
  isSearchable,
  placeholder,
  selectedValue,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [params, setParams] = useState("");
  const { pekerja, pekerjaMutate } = usePekerja(params, "skai");

  useEffect(() => {
    const mappedPekerja = pekerja?.data?.map((row) => {
      return {
        ...row,
        label: `${row?.pn} - ${row?.name}`,
        value: { pn: row?.pn, name: row?.name, jabatan: row?.jabatan },
      };
    });
    setOptions(mappedPekerja);
  }, [pekerja]);

  useEffect(() => {
    if (value > 2) {
      const handleSearch = () => {
        setParams(value);
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

export default PekerjaSelect;

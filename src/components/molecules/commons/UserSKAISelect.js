import usePekerja from "@/data/usePekerja";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import _ from "lodash";

const UserSKAISelect = ({ control, change }) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [params, setParams] = useState("");
  const { pekerja, pekerjaMutate } = usePekerja(params);

  useEffect(() => {
    const mappedPekerja = pekerja?.data?.map((row) => {
      return {
        ...row,
        label: `${row?.pn} - ${row.name}`,
        value: row?.pn,
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
    <Controller
      control={control}
      name="pn"
      render={({ field: { onChange, onBlur, value } }) => (
        <Select
          options={options}
          onChange={(e) => {
            onChange(e);
            change(e);
          }}
          onBlur={onBlur}
          value={value}
          onInputChange={(e) => handleInputChange(e)}
          isClearable
        />
      )}
    />
  );
};

export default UserSKAISelect;

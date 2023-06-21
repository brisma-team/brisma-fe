import usePekerja from "@/data/usePekerja";
import { setSelectedUser } from "@/slices/userSKAISlice";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function PekerjaSelect({ control, type }) {
  const dispatch = useDispatch();

  const [pn, setPN] = useState();
  const [options, setOptions] = useState([]);

  const { pekerja } = usePekerja(pn);

  useEffect(() => {
    if (pekerja) {
      const mappedPekerja = pekerja.data.map((row) => {
        return {
          ...row,
          label: row.pn,
          value: row.pn,
        };
      });

      setOptions(mappedPekerja);
    }
  }, [pekerja]);

  function handleInputChange(e) {
    let newPN;

    if (e.length > 0) {
      newPN = e;
    } else {
      newPN = undefined;
    }

    setPN(newPN);
  }

  function handleChange(e) {
    dispatch(setSelectedUser(e));
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
            handleChange(e);
          }}
          onBlur={onBlur}
          value={value}
          onInputChange={(e) => handleInputChange(e)}
          isDisabled={type === "update" ? true : false}
          isClearable
        />
      )}
    />
  );
}

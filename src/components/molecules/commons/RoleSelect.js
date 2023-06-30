import useRole from "@/data/useRole";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

const RoleSelect = ({ control }) => {
  const { role, roleIsLoading } = useRole();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (role) {
      const mappedRoles = role.data.map((row) => {
        return {
          label: row.name,
          value: row.kode,
        };
      });

      setOptions(mappedRoles);
    }
  }, [role]);

  if (roleIsLoading) {
    return <Skeleton />;
  }

  if (role) {
    return (
      <Controller
        control={control}
        name="role_kode"
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            options={options}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            isMulti
            isClearable
          />
        )}
      />
    );
  }
};

export default RoleSelect;

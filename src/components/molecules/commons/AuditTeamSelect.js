import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useAuditTeam } from "@/data/pat";
import { useRouter } from "next/router";

const AuditTeamSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  customIcon,
  fieldsProps,
}) => {
  const { id } = useRouter().query;
  const [options, setOptions] = useState([]);
  const { auditTeam } = useAuditTeam("list", { id });

  useEffect(() => {
    const mappingAuditTeam = auditTeam?.data?.map((v) => ({
      label: v.name,
      value: v.id,
    }));
    setOptions(mappingAuditTeam);
  }, [auditTeam]);

  const findAuditTeam = (id) => {
    const find = auditTeam?.data?.find((v) => v.id == id);
    return { label: find?.name, value: find?.id };
  };

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
      value={selectedValue !== "" ? findAuditTeam(selectedValue) : ""}
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default AuditTeamSelect;

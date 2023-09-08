import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

const { Select } = require("@/components/atoms");

const SelectAuditTeamEWP = ({ selectedValue, handleChange, placeholder }) => {
  const { id } = useRouter().query;
  const { mapaEWP } = useMapaEWP("tim_audit", { id });
  const [options, setOptions] = useState([]);

  const arrUser = [];
  const groups = ["ma", "kta", "ata"];
  useEffect(() => {
    groups.forEach((group) => {
      if (mapaEWP?.data?.tim_audit) {
        const users = mapaEWP?.data?.tim_audit[group].map((member) => ({
          label: member.nama,
          value: member.pn,
        }));
        arrUser.push(users);
      }
    });
    setOptions(arrUser.flat());
  }, [mapaEWP]);

  return (
    <Select
      optionValue={options}
      value={selectedValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default SelectAuditTeamEWP;

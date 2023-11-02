import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Select from "@atlaskit/select";

const SelectAuditTeamEWP = ({
  selectedValue,
  handleChange,
  placeholder,
  width,
}) => {
  const { id } = useRouter().query;
  const { mapaEWP } = useMapaEWP("tim_audit", { id });
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const arrUser = [];
  const groups = ["ata"];
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${open ? "z-50 absolute" : ""} ${width && width}`}>
      <Select
        options={options}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        onMenuOpen={handleOpen}
        onMenuClose={handleClose}
      />
    </div>
  );
};

export default SelectAuditTeamEWP;

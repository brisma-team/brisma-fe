import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useLingkupKKPT } from "@/data/ewp/konsulting";

const LingkupSelectKKPT = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  selectedEWP,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);

  const { lingkupKKPTData } = useLingkupKKPT(selectedEWP);

  useEffect(() => {
    if (lingkupKKPTData?.data?.length) {
      const mapping = lingkupKKPTData?.data?.map((v) => {
        const { id, judul_lingkup_pemeriksaan } = v;
        return {
          label: judul_lingkup_pemeriksaan,
          value: {
            lingkup_pemeriksaan_id: id,
            lingkup_pemeriksaan_name: judul_lingkup_pemeriksaan,
          },
        };
      });
      setOptions(mapping);
    } else {
      setOptions([]);
    }
  }, [lingkupKKPTData]);

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
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default LingkupSelectKKPT;

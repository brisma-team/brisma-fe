import React, { useEffect, useState } from "react";
import Select, { components } from "@atlaskit/select";
import { useRiskKKPT } from "@/data/ewp/konsulting";

const RiskSelectKKPT = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  selectedLingkupId,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);

  const { riskKKPTData } = useRiskKKPT(selectedLingkupId);

  useEffect(() => {
    if (riskKKPTData?.data?.length) {
      const mapping = riskKKPTData?.data?.map((v) => {
        const { mtd_risk_issue } = v;
        return {
          label: mtd_risk_issue?.abbr + " - " + mtd_risk_issue?.nama,
          value: {
            kode: mtd_risk_issue?.kode,
            abbr: mtd_risk_issue?.abbr,
            nama: mtd_risk_issue?.nama,
          },
        };
      });
      setOptions(mapping);
    } else {
      setOptions([]);
    }
  }, [riskKKPTData]);

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

export default RiskSelectKKPT;

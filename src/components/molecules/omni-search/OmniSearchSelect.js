import React, { useEffect, useState } from "react";
import Select from "@atlaskit/select";
import { useOmniSearch } from "@/data/catalog";
import { Skeleton } from "@atlaskit/navigation";

const OmniSearchSelect = ({
  params,
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const [options, setOptions] = useState([]);
  const { omni, omniIsLoading } = useOmniSearch(
    params.type,
    params.year,
    selectedValue
  );

  useEffect(() => {
    if (omni) {
      const mappedOmni = omni.data.ewp_list.map((row) => {
        return {
          label: row.ProjectID + "-" + row.ProjectName,
          value: row.ProjectID,
        };
      });

      setOptions(mappedOmni);
    }
  }, [omni]);

  if (omniIsLoading) {
    return <Skeleton />;
  }

  //   const DropdownIndicator = (props) => {
  //     return (
  //       <components.DropdownIndicator {...props}>
  //         {customIcon && customIcon}
  //       </components.DropdownIndicator>
  //     );
  //   };
  return (
    <Select
      {...fieldsProps}
      placeholder={placeholder}
      options={options}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={
        customIcon
        // && { DropdownIndicator }
      }
    />
  );
};

export default OmniSearchSelect;

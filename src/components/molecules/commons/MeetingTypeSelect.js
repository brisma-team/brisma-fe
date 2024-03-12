import Select, { components } from "@atlaskit/select";

const MeetingTypeSelect = ({
  handleChange,
  isSearchable,
  placeholder,
  selectedValue,
  fieldsProps,
  customIcon,
}) => {
  const optionValues = [
    { label: "Online", value: { kode: "1", nama: "Online" } },
    { label: "Onsite", value: { kode: "2", nama: "Onsite" } },
  ];

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
      options={optionValues}
      onChange={handleChange}
      isSearchable={isSearchable}
      value={selectedValue}
      components={customIcon && { DropdownIndicator }}
    />
  );
};

export default MeetingTypeSelect;

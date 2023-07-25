import Select from "@atlaskit/select";

const SelectSortFilter = ({ optionValue, change }) => {
  return (
    <div className="flex items-center px-2">
      <div className="text-sm">URUTKAN</div>
      <Select
        className="ml-2"
        options={optionValue}
        isSearchable={false}
        onChange={change}
      />
    </div>
  );
};

export default SelectSortFilter;

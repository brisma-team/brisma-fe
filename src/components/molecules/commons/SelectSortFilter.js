import Select from "@atlaskit/select";

const SelectSortFilter = ({ optionValue }) => {
  return (
    <div className="flex items-center px-2">
      <div className="text-sm">URUTKAN</div>
      <Select className="ml-2" options={optionValue} isSearchable={false} />
    </div>
  );
};

export default SelectSortFilter;

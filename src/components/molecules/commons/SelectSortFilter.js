import Select from "@atlaskit/select";

const SelectSortFilter = ({ optionValue }) => {
  return (
    <div className="w-full flex justify-end items-end p-2">
      <div className="flex items-center">
        <div className="text-sm">URUTKAN</div>
        <Select className="ml-2" options={optionValue} isSearchable={false} />
      </div>
    </div>
  );
};

export default SelectSortFilter;

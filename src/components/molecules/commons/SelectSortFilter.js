import Select from "@atlaskit/select";

const SelectSortFilter = ({ change }) => {
  return (
    <div className="flex items-center">
      <div className="text-sm">URUTKAN</div>
      <Select
        className="ml-2"
        options={[
          { label: "Awal", value: "ASC" },
          { label: "Akhir", value: "DESC" },
        ]}
        isSearchable={false}
        onChange={change}
      />
    </div>
  );
};

export default SelectSortFilter;

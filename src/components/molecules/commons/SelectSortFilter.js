import Select from "@atlaskit/select";

const SelectSortFilter = ({ change, options }) => {
  return (
    <div className="flex items-center gap-3">
      <p className="font-bold">URUTKAN</p>
      <Select
        className="w-32"
        options={[
          { label: "Awal - Akhir", value: "ASC" },
          { label: "Akhir - Awal", value: "DESC" },
        ]}
        isSearchable={false}
        onChange={(e) => change("sort_by", e.value)}
        placeholder={"Urutkan"}
      />
    </div>
  );
};

export default SelectSortFilter;

import Select from "@atlaskit/select";

const SelectSortFilter = ({ change, options }) => {
  return (
    <div className="flex items-center gap-3">
      {options && <Select
        className="w-32"
        options={
          options?.length
            ? options.map((v) => ({ label: v.toString(), value: v }))
            : [
                { label: "3", value: 3 },
                { label: "10", value: 10 },
                { label: "25", value: 25 },
                { label: "50", value: 50 },
                { label: "100", value: 100 },
              ]
        }
        isSearchable={false}
        onChange={(e) => change("limit", e.value)}
        placeholder={"Limit"}
      />}
      <Select
        className="w-32"
        options={[
          { label: "Awal", value: "ASC" },
          { label: "Akhir", value: "DESC" },
        ]}
        isSearchable={false}
        onChange={(e) => change("sort_by", e.value)}
        placeholder={"Urutkan"}
      />
    </div>
  );
};
export default SelectSortFilter;

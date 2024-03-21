import { CustomCheckbox } from "@/components/atoms";

const RowTableRelatedProjectNonPAT = ({
  idx,
  data,
  totalData,
  handleClick,
  value,
}) => {
  let borderBottom = "";
  if (idx < totalData) borderBottom = "border-b-2";

  return (
    <div className="flex font-semibold hover:bg-gray-100">
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[7%] flex items-center text-justify px-2 py-3`}
      >
        <div className="-mt-2 w-full flex justify-center">
          {handleClick && (
            <CustomCheckbox
              value={data?.project_terkait?.find(
                (v) => v?.ref_ewp_id == value?.id
              )}
              handleChange={(e) => handleClick(e.target.checked, value?.id)}
            />
          )}
        </div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[40%] flex items-center text-justify px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.project_name}</div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[25%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.project_id?.toUpperCase()}</div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.ref_tipe?.nama}</div>
      </div>
      <div
        className={`${borderBottom} border-[#DFE1E6] w-[14%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.ref_jenis?.nama}</div>
      </div>
    </div>
  );
};

export default RowTableRelatedProjectNonPAT;

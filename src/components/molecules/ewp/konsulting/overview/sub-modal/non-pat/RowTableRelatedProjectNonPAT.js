import { ButtonIcon } from "@/components/atoms";
import { ButtonDelete } from "@/components/molecules/commons";

const RowTableRelatedProjectNonPAT = ({
  idx,
  data,
  totalData,
  handleClickDelete,
}) => {
  let borderBottom = "";
  if (idx < totalData) borderBottom = "border-b-2";

  return (
    <div className="flex font-semibold hover:bg-gray-100">
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[10%] flex items-center text-justify px-2 py-3`}
      >
        <div className="-mt-2 w-full flex justify-center">
          <ButtonIcon
            icon={<ButtonDelete />}
            handleClick={() => handleClickDelete(idx)}
          />
        </div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[45%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{data?.project_id?.toUpperCase()}</div>
      </div>
      <div
        className={`${borderBottom} border-[#DFE1E6] w-[45%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{data?.project_name}</div>
      </div>
    </div>
  );
};

export default RowTableRelatedProjectNonPAT;

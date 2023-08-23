import { DivButton, RadioField } from "@/components/atoms";

const RowTable = ({
  idx,
  totalData,
  handleClick,
  value,
  isDisabled,
  selectedValue,
}) => {
  let borderBottom = "";
  if (idx < totalData) borderBottom = "border-b-2";

  return (
    <DivButton
      className="flex font-semibold"
      handleClick={() => handleClick(value)}
    >
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[5%] flex items-center text-justify px-2 py-3`}
      >
        <div className="-mt-2 ml-2 w-full">
          <RadioField isChecked={selectedValue === value?.id} />
        </div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[30%] flex items-center text-justify px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.name_kegiatan_audit}</div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[17%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.tim_audit?.nama_tim}</div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[12%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.ref_tipe?.nama}</div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[12%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.ref_jenis?.nama}</div>
      </div>
      <div
        className={`${borderBottom} border-r-2 border-[#DFE1E6] w-[12%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">{value?.ref_tema?.nama}</div>
      </div>
      <div
        className={`${borderBottom} border-[#DFE1E6] w-[12%] flex items-center px-2 py-3`}
      >
        <div className="-mt-2 w-full">
          {value?.audited ? "Sudah di-Audit" : "Belum di-Audit"}
        </div>
      </div>
    </DivButton>
  );
};

export default RowTable;

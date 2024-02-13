import { DivButton, RadioField, TooltipField } from "@/components/atoms";
import shortenWord from "@/helpers/shortenWord";

const RowTable = ({ idx, totalData, handleClick, value, selectedValue }) => {
  let borderBottom = "";
  if (idx < totalData) borderBottom = "border-b-2";

  const templateTooltip = (auditTeam) => {
    return (
      <div className="mt-3">
        <p className="text-atlasian-red">Penanggung Jawab :</p>
        {auditTeam?.map((v, i) => {
          return <div key={i}>{v.pn + " - " + v.nama}</div>;
        })}
      </div>
    );
  };

  const listPic = (value) => {
    if (value?.length) {
      const mapping = value.map((v) => v.nama);
      return shortenWord(mapping.join(", "), 0, 20);
    } else {
      return "";
    }
  };

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
        className={`${borderBottom} border-r-2 border-[#00000] w-[17%] flex items-center px-2 py-3 b`}
      >
        <TooltipField
          textButton={listPic(value?.ref_penanggung_jawabs)}
          content={templateTooltip(value?.ref_penanggung_jawabs)}
        />
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
        <div
          className={`-mt-2 w-full ${
            value?.audited ? `text-atlasian-green` : `text-atlasian-red`
          }`}
        >
          {value?.audited ? "Sudah di-Audit" : "Belum di-Audit"}
        </div>
      </div>
    </DivButton>
  );
};

export default RowTable;

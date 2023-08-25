import { DivButton, RadioField, TooltipField } from "@/components/atoms";

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

  const templateTooltip = (auditTeam) => {
    return (
      <div>
        <div className="flex gap-3">
          <div>
            <p className="text-atlasian-blue-light">Manajer Audit</p>
            {auditTeam?.ma?.map((v, i) => {
              return <div key={i}>{v.pn_ma + " - " + v.nama_ma}</div>;
            })}
          </div>
          <div>
            <p className="text-atlasian-red">Ketua Tim Audit</p>
            {auditTeam?.kta?.map((v, i) => {
              return <div key={i}>{v.pn_kta + " - " + v.nama_kta}</div>;
            })}
          </div>
        </div>
        <div className="mt-3">
          <p className="text-atlasian-green">Anggota Tim Audit :</p>
          {auditTeam?.ata?.map((v, i) => {
            return <div key={i}>{v.pn_ata + " - " + v.nama_ata}</div>;
          })}
        </div>
      </div>
    );
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
          textButton={value?.tim_audit?.nama_tim}
          content={templateTooltip(value?.tim_audit)}
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

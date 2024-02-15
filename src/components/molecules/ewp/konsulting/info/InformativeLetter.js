import { convertDate } from "@/helpers";
import RowTable from "./RowTable";

const InformativeLetter = ({ data }) => {
  return (
    <div className="w-full">
      <p className="text-base font-bold mb-2 ml-2">Informasi Surat</p>
      <div className="w-full border-l-2 border-r-2 border-t-2 border-atlasian-gray-light">
        <RowTable label="No Surat" value={data?.no_surat || "2023006012"} />
        <RowTable label="Perihal" value={data?.perihal || "Undangan"} />
        <RowTable
          label="Tanggal Surat"
          value={convertDate(
            data?.tanggal_surat.split(" ")[0] || "02-20-2023",
            "/",
            "d"
          )}
        />
        <RowTable
          label="Nama Lampiran Surat"
          value={
            data?.nama_file_surat || "Surat Ijin Pelaksanaan Audit 2023006012"
          }
        />
      </div>
    </div>
  );
};

export default InformativeLetter;

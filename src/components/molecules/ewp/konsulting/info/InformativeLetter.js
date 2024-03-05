import { convertDate } from "@/helpers";
import RowTable from "./RowTable";

const InformativeLetter = ({ data }) => {
  return (
    <div className="w-full">
      <p className="text-base font-bold mb-2 ml-2">Informasi Surat</p>
      <div className="w-full border-l-2 border-r-2 border-t-2 border-atlasian-gray-light">
        <RowTable label="No Surat" value={data?.no_surat} />
        <RowTable label="Perihal Surat" value={data?.perihal} />
        <RowTable
          label="Tanggal Surat"
          value={convertDate(data?.tanggal_surat, "/", "d")}
        />
        <RowTable label="Lampiran" value={data?.nama_file_surat} />
      </div>
    </div>
  );
};

export default InformativeLetter;

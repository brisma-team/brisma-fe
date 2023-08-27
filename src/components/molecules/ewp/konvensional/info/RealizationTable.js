import { convertDate } from "@/helpers";

const RealizationTable = ({ data }) => {
  const center = `flex items-center`;

  const dataTable = [
    {
      label: "Penyusunan M.A.P.A",
      start: data?.penyusunan_mapa_real_start,
      end: data?.penyusunan_mapa_real_end,
    },
    {
      label: "Entrance Meeting",
      start: data?.entrance_meeting_real_start,
      end: data?.entrance_meeting_real_end,
    },
    {
      label: "Pelaksanaan Audit",
      start: data?.pelaksanaan_audit_real_start,
      end: data?.pelaksanaan_audit_real_end,
    },
    {
      label: "Exit Meeting",
      start: data?.exit_meeting_real_start,
      end: data?.exit_meeting_real_end,
    },
    {
      label: "Penyusunan LHA",
      start: data?.Penyusunan_LHA_real_start,
      end: data?.Penyusunan_LHA_real_end,
    },
    {
      label: "Wrap-up Meeting",
      start: data?.Wrapup_Meeting_real_start,
      end: data?.Wrapup_Meeting_real_end,
    },
  ];

  return (
    <>
      <p className="text-base font-bold mb-2 ml-2">Realisasi</p>
      <div className="w-full border-l-2 border-r-2 border-t-2 border-atlasian-gray-light">
        <div className="flex">
          <div
            className={`border-r-2 border-b-2 border-atlasian-gray-light w-1/3 ${center} text-justify p-2 text-base font-semibold`}
          >
            Keterangan
          </div>
          <div
            className={`border-r-2 border-b-2 border-atlasian-gray-light w-1/3 ${center} text-justify p-2 text-base font-semibold`}
          >
            Tanggal Dimulai
          </div>
          <div
            className={`border-b-2 border-atlasian-gray-light w-1/3 ${center} p-2 text-base font-semibold`}
          >
            Tanggal Berakhir
          </div>
        </div>
        {dataTable.map((v, i) => {
          return (
            <div key={i} className="flex">
              <div
                className={`border-r-2 border-b-2 border-atlasian-gray-light w-1/3 ${center} p-2 text-base`}
              >
                {v.label}
              </div>
              <div
                className={`border-r-2 border-b-2 border-atlasian-gray-light w-1/3 ${center} p-2 text-base`}
              >
                {v.start ? convertDate(v.start, "/", "d") : ""}
              </div>
              <div
                className={`border-b-2 border-atlasian-gray-light w-1/3 ${center} p-2 text-base`}
              >
                {v.end ? convertDate(v.end, "/", "d") : ""}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RealizationTable;

import { convertDate } from "@/helpers";

const RowTable = ({ label, value, start, end }) => {
  const center = `flex items-center`;
  if (label === "Periode Ruang Lingkup") {
    return (
      <div className="flex">
        <div className="border-r-2 border-b-2 border-atlasian-gray-light w-2/5 flex flex-wrap items-center text-justify p-2 font-semibold">
          {label}
        </div>
        <div className="border-b-2 border-atlasian-gray-light w-3/5 flex">
          <div className={`w-5/12 border-r-2 px-2 ${center}`}>
            {convertDate(start, "/", "d")}
          </div>
          <div className={`w-2/12 border-r-2 px-2 ${center} justify-center`}>
            s/d
          </div>
          <div className={`w-5/12 px-2 ${center}`}>
            {convertDate(end, "/", "d")}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <div
          className={`border-r-2 border-b-2 border-atlasian-gray-light ${center} w-2/5 flex-wrap text-justify p-2 font-semibold`}
        >
          {label}
        </div>
        <div
          className={`border-b-2 border-atlasian-gray-light w-3/5 ${center} flex-wrap p-2`}
        >
          <div>
            {Array.isArray(value)
              ? value.map((v, i) => {
                  return <p key={i}>{v.nama}</p>;
                })
              : value}
          </div>
        </div>
      </div>
    );
  }
};

export default RowTable;

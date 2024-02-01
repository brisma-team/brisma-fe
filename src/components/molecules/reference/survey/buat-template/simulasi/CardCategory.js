import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { decimalToPercentage } from "@/helpers";

const CardCategory = ({ data }) => {
  return (
    <div className="w-full">
      <div
        className="w-full h-full rounded flex flex-col items-center"
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
        }}
      >
        <div className="w-full h-full border-b-2 border-neutral-200 p-2 flex justify-between items-center">
          <p className="text-base font-bold">Kategori {data.idx}</p>
        </div>
        {/* #EAFFE2 */}
        <div
          className={`w-full min-h-[5rem] border-b-2 border-neutral-200 px-2 py-1 ${
            data?.is_completed && `bg-[#EAFFE2]`
          }`}
        >
          <p className="text-base font-semibold">{data.name}</p>
        </div>
        <div className="w-full h-full p-2 flex justify-between items-center">
          <div className="font-bold text-base text-atlasian-green">
            Bobot:{" "}
            {decimalToPercentage(
              data.total_pertanyaan / data.total_pertanyaan_all_kategori
            )}
          </div>
          <div className="font-bold text-base text-atlasian-yellow">
            Pertanyaan: {data.total_pertanyaan.toString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;

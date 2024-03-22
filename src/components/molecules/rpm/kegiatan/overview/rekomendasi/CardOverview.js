import { DivButton } from "@/components/atoms";
import { convertDate } from "@/helpers";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { useRouter } from "next/router";

const CardBody = ({ title, value, textColor, className }) => {
  return (
    <div className={`text-base flex w-full border-b`}>
      <div className="w-1/2 font-semibold border-r px-2 text-xs py-1 h-full flex items-center">
        {title}
      </div>
      <div
        className={`w-1/2 ${
          className || "font-medium"
        } text-xs px-2 py-1 ${textColor}`}
      >
        {value}
      </div>
    </div>
  );
};

const CardOverview = ({ data, withoutHover }) => {
  const router = useRouter();

  return (
    <DivButton
      className={`${
        !withoutHover &&
        `hover:bg-gray-100 hover:rounded-[10px] hover:no-underline`
      }`}
      handleClick={(e) => (e.stopPropagation(), router.push(data?.href))}
    >
      <div
        className={`w-full rounded flex flex-col items-center h-full border-2 bg-white hover:bg-slate-50 ${
          data?.need_approval && `border-atlasian-yellow`
        } relative`}
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          className={`w-full px-4 pb-4 ${
            data?.need_approval && `opacity-20`
          } rounded-md`}
        >
          <div className="flex justify-between mb-2">
            <div
              className={`${
                data?.tipe?.toLowerCase() == "incomplete"
                  ? "bg-cardColor-turquoise"
                  : data?.tipe?.toLowerCase() == "on progress"
                  ? "bg-cardColor-orange"
                  : "bg-cardColor-green-dark"
              } text-base font-semibold rounded-tl-lg text-brisma -ml-[18px] -mt-0.5 min-w-[10rem] px-2 h-9 flex items-center justify-center`}
            >
              <p className="text-white">{data?.tipe?.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2 hover:bg-slate-50">
            <div className="flex flex-col gap-3 min-h-[5rem] max-h-[10rem] overflow-y-scroll border p-2">
              <p className="text-sm font-semibold -mb-1">Rekomendasi</p>
              <div className="flex w-full max-h-24 overflow-y-scroll">
                <p>{data?.rekomendasi ? data?.rekomendasi : "-"}</p>
              </div>
            </div>
            <div className="border-x border-t">
              <CardBody
                title={"Deadline"}
                value={convertDate(data?.deadline, "/", "d")}
              />
              <CardBody title={"Lingkup"} value={data?.lingkup || "-"} />
              <CardBody title={"Risk Issue"} value={data?.risk || "-"} />
              <CardBody title={"Control"} value={data?.control || "-"} />
            </div>
          </div>
        </div>
      </div>
    </DivButton>
  );
};

export default CardOverview;

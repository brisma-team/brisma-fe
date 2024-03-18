import { DivButton } from "@/components/atoms";
import { DropdownCard } from "@/components/molecules/commons";
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

const CardOverview = ({ data, withoutButton, withoutHover }) => {
  const router = useRouter();
  const listDropdown = [{ label: "Approval", action: "#" }];
  const colorLabel = {
    // consulting: "bg-cardColor-turquoise",
    consulting: "bg-cardColor-orange",
  };

  return (
    <DivButton
      className={`${
        !withoutHover &&
        `hover:bg-gray-100 hover:rounded-[10px] hover:no-underline`
      }`}
      handleClick={(e) => (
        e.stopPropagation(), router.push(`overview/${data?.id}/info`)
      )}
    >
      <div
        className={`w-full rounded flex flex-col items-center h-full border-2 ${
          data?.need_approval && `border-atlasian-yellow`
        } relative`}
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {data?.need_approval && (
          <div className="absolute whitespace-normal flex justify-center items-center h-full w-full">
            <p className="font-bold text-xl text-atlasian-yellow">
              Menunggu Approval K.T.A
            </p>
          </div>
        )}
        <div
          className={`w-full px-4 pb-4 ${data?.need_approval && `opacity-20`}`}
        >
          <div className="flex justify-between mb-2">
            <div
              className={`${
                colorLabel[data?.tipe?.toLowerCase()] ||
                "bg-cardColor-blue-gray"
              } text-base font-semibold rounded-tl-lg text-brisma -ml-[18px] -mt-0.5 min-w-[10rem] px-2 h-9 flex items-center justify-center`}
            >
              <p className="text-white">{data?.tipe?.toUpperCase()}</p>
            </div>
            {!withoutButton && (
              <div className="flex items-center justify-end w-20 gap-1 pt-2">
                <DropdownCard actions={listDropdown} />
              </div>
            )}
          </div>
          {/* <div className="text-lg font-bold text-atlasian-blue-dark">
            {data?.project_code?.toUpperCase()}
          </div>
          <div className="text-base font-bold text-atlasian-blue-dark">
            {data?.project_name}
          </div> */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex flex-col gap-3 min-h-[5rem] max-h-[10rem] overflow-y-scroll border p-2">
              <p className="text-sm font-semibold -mb-1">Rekomendasi</p>
              <div className="flex w-full max-h-24 overflow-y-scroll">
                <p>
                  lorem ipsum dolor sit amet lorem ipsum dolor sit lorem ipsum
                  dolor sit amet lorem ipsum dolor sitlorem ipsum dolor sit amet
                  lorem ipsum dolor sitlorem ipsum dolor sit amet lorem ipsum
                  dolor sit
                </p>
              </div>
            </div>
            <div className="border-x border-t">
              <CardBody title={"P.I.C"} value={data?.maker} />
              <CardBody
                title={"Deadline"}
                value={convertDate(data?.created_at, "-", "d")}
              />
              <CardBody title={"Risk Issue"} value={"Kode Risk Issue"} />
              <CardBody title={"Control"} value={"Kode Control"} />
            </div>
          </div>
        </div>
      </div>
    </DivButton>
  );
};

export default CardOverview;

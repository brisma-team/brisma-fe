import { DivButton } from "@/components/atoms";
import { DropdownCard } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

const CardTeam = ({ title, value, titleColor }) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={`text-xs ${titleColor} font-semibold`}>{title}</div>
      {value?.length
        ? value?.map((v, i) => (
            <div key={i} className="text-xs">{`${v?.pn} - ${v?.nama}`}</div>
          ))
        : ""}
    </div>
  );
};

const CardBody = ({
  title,
  value,
  textColor,
  className,
  widthTitle,
  widthValue,
}) => {
  return (
    <div className={`text-base flex w-full border-b`}>
      <div
        className={`${
          widthTitle || "w-1/2"
        } font-semibold px-2 text-xs py-1 h-full flex items-center`}
      >
        {title}
      </div>
      <div
        className={`${widthValue || "w-1/2"} ${
          className || "font-medium"
        } border-l text-xs px-2 py-1 ${textColor}`}
      >
        {value}
      </div>
    </div>
  );
};

const CardOverview = ({
  data,
  withoutButton,
  withoutHover,
  handleClickCarding,
  handleClickUrl,
}) => {
  const listDropdown = [{ label: "Approval", action: "#" }];
  const colorLabel = {
    online: "bg-cardColor-blue-dark",
    onsite: "bg-cardColor-green",
  };

  return (
    <DivButton
      className={`${
        !withoutHover &&
        `hover:bg-gray-100 hover:rounded-[10px] hover:no-underline`
      }`}
      handleClick={(e) => handleClickCarding(e, data?.id)}
    >
      <div
        className={`w-full rounded flex flex-col items-center h-full border-2 relative`}
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className={`w-full px-4 pb-4`}>
          <div className="flex justify-between mb-2">
            <div
              className={`${
                colorLabel[data?.metode_meeting?.nama?.toLowerCase()] ||
                "bg-cardColor-blue-gray"
              } text-base font-semibold rounded-tl-lg text-brisma -ml-[18px] -mt-0.5 min-w-[10rem] px-2 h-9 flex items-center justify-center`}
            >
              <p className="text-white">
                {data?.metode_meeting?.nama?.toUpperCase()}
              </p>
            </div>
            {!withoutButton && (
              <div className="flex items-center justify-end w-20 gap-1 pt-2">
                <DropdownCard actions={listDropdown} />
              </div>
            )}
          </div>
          <div className="text-lg font-bold text-atlasian-blue-dark">
            {data?.judul_meeting}
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="border-x border-t">
              <CardBody
                title={"Maker"}
                value={
                  data?.create_by?.pn
                    ? `${data?.create_by?.pn} - ${data?.create_by?.nama}`
                    : "-"
                }
              />
              <CardBody
                title={"Tanggal Inisiasi"}
                value={convertDate(data?.createdAt, "/", "d")}
              />
              <CardBody
                title={"Periode Meeting"}
                value={`${convertDate(
                  data?.periode_start,
                  "/",
                  "d"
                )} - ${convertDate(data?.periode_end, "/", "d")}`}
              />
            </div>
            <div className="flex flex-col gap-3 min-h-[5rem] max-h-[10rem] overflow-y-scroll border p-2">
              <div className="flex w-full">
                <div className="w-1/2">
                  <CardTeam
                    title={"PIC"}
                    value={data?.pic_meeting}
                    titleColor={"text-atlasian-blue-light"}
                  />
                </div>
                <div className="w-1/2">
                  <CardTeam
                    title={"Pembicara"}
                    value={data?.pembicara_meeting}
                    titleColor={"text-atlasian-red"}
                  />
                </div>
              </div>
            </div>
            <div className="max-h-[10rem] overflow-y-scroll border p-2">
              <p className="text-sm font-semibold -mb-1">Deskripsi Meeting</p>
              <p>{data?.desc}</p>
            </div>
            <div className="border-x border-t">
              <CardBody
                title={"Link Meeting"}
                value={
                  data?.link_meeting ? (
                    <DivButton
                      className={"underline text-[#0C66E4]"}
                      handleClick={(e) => handleClickUrl(e, data?.link_meeting)}
                    >
                      {data?.link_meeting}
                    </DivButton>
                  ) : (
                    "-"
                  )
                }
                textColor={"text-[#0C66E4]"}
                widthTitle={"w-1/3"}
                widthValue={"w-2/3"}
              />
            </div>
          </div>
        </div>
      </div>
    </DivButton>
  );
};

export default CardOverview;

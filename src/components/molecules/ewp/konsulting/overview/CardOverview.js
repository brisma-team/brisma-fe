import { DivButton } from "@/components/atoms";
import { DropdownCard } from "@/components/molecules/commons";
import ProgressBar from "@atlaskit/progress-bar";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { useRouter } from "next/router";

const CardBody = ({ title, value, textColor, className }) => {
  return Array.isArray(value) ? (
    <div className={`mt-4 leading-normal text-base ${className}`}>
      <div className={`${textColor} font-semibold`}>{title}</div>
      {title === "Anggota Tim Audit" ? (
        <div className="grid grid-cols-2 gap-2">
          {value?.map((v, i) => {
            return <div key={i}>{v.nama}</div>;
          })}
        </div>
      ) : (
        value.map((v, i) => {
          return <div key={i}>{v.nama}</div>;
        })
      )}
    </div>
  ) : (
    <div className={`mt-2.5 leading-normal text-base flex w-full`}>
      <div className="w-1/2 font-semibold">{title}</div>
      <div className={`w-1/2 font-medium ${textColor}`}>{value}</div>
    </div>
  );
};

const CardOverview = ({ data, withoutButton, withoutHover }) => {
  const router = useRouter();

  const listDropdown = [{ label: "Approval", action: "#" }];

  return (
    <DivButton
      className={`${
        !withoutHover &&
        `hover:bg-gray-100 hover:rounded-[10px] hover:no-underline`
      }`}
      handleClick={(e) => (e.stopPropagation(), router.push(data?.id))}
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
              className={`text-base font-semibold rounded-tl-lg text-brisma bg-blue-300 -ml-4 px-5 h-9 flex items-center justify-center`}
            >
              <p>{data?.jenis}</p>
            </div>
            {!withoutButton && (
              <div className="flex items-center justify-end w-20 gap-1 pt-2">
                <DropdownCard actions={listDropdown} />
              </div>
            )}
          </div>
          <div className="text-lg font-bold text-atlasian-blue-dark">
            {data?.project_code?.toUpperCase()}
          </div>
          <div className="text-base font-bold text-atlasian-blue-dark">
            {data?.project_name}
          </div>
          <div className="text-sm font-semibold">{data?.period}</div>
          <div className="flex flex-row justify-between leading-3 mt-2 items-center">
            <ProgressBar appearance="success" value={data?.progress} />
            <div className="flex justify-end font-medium text-sm ml-3">
              {data?.percent}
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <CardBody
                title={"Manajer Audit"}
                value={data?.ma}
                textColor={"text-atlasian-blue-light"}
              />
            </div>
            <div className="w-1/2">
              <CardBody
                title={"Ketua Tim Audit"}
                value={data?.kta}
                textColor={"text-atlasian-red"}
              />
            </div>
          </div>
          <CardBody
            title={"Anggota Tim Audit"}
            value={data?.ata}
            textColor={"text-atlasian-green"}
          />
          <CardBody
            title={"Status Dokumen"}
            value={data?.document_status?.toUpperCase()}
            textColor={
              data?.document_status === "Pengerjaan"
                ? "text-atlasian-blue-light"
                : data?.document_status === "On Approve"
                ? "text-atlasian-yellow"
                : "text-atlasian-red"
            }
          />
          <CardBody
            title={"Status Persetujuan"}
            value={data?.approval_status}
            textColor={
              data?.approval_status === "Approved"
                ? "text-atlasian-green"
                : "text-atlasian-yellow"
            }
          />
          <CardBody
            title={"Addendum"}
            value={`Ke-${data?.addendum}`}
            textColor={
              data?.addendum
                ? "text-atlasian-yellow"
                : "text-atlasian-gray-dark"
            }
          />
        </div>
      </div>
    </DivButton>
  );
};

export default CardOverview;

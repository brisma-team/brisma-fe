import { DivButton } from "@/components/atoms";
import { DropdownCard } from "@/components/molecules/commons";
import ProgressBar from "@atlaskit/progress-bar";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { useRouter } from "next/router";

const CardBody = ({ title, value, textColor, className }) => {
  switch (title) {
    case "Manajer Audit":
      textColor = "text-atlasian-blue-light";
      break;
    case "Ketua Tim Audit":
      textColor = "text-atlasian-red";
      break;
    case "Anggota Tim Audit":
      textColor = "text-atlasian-green";
      break;
    default:
      textColor = "text-atlasian-yellow";
      break;
  }

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
    <div className={`mt-4 leading-normal text-base flex w-full`}>
      <div className="w-1/2">{title}</div>
      <div className={`w-1/2 ${textColor}`}>{value}</div>
    </div>
  );
};

const CardOverview = ({ data, withoutButton, withoutHover }) => {
  const router = useRouter();
  const {
    jenis,
    projectId,
    projectName,
    period,
    progress,
    percent,
    ma,
    kta,
    ata,
    documentStatus,
    approvalStatus,
    addendum,
    href,
    needApproval,
  } = data;

  // const listDropdown = [
  //   { label: "Approval", action: async () => handleApproval(id) },
  // ];

  const listDropdown = [
    { label: "Change Initiator", action: "#" },
    { label: "Reset Approval PAT RAO", action: "#" },
    { label: "Reset Approval PAT HOA", action: "#" },
    { label: "Riwayat Dokumen", action: "#" },
    { label: "Hapus Project", action: "#" },
  ];

  return (
    <DivButton
      className={`${
        !withoutHover &&
        `hover:bg-gray-100 hover:rounded-[10px] hover:no-underline`
      }`}
      handleClick={(e) => (e.stopPropagation(), router.push(href))}
    >
      <div
        className={`w-full rounded flex flex-col items-center h-full border-2 ${
          needApproval && `border-atlasian-yellow`
        } relative`}
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {needApproval && (
          <div className="absolute whitespace-normal flex justify-center items-center h-full w-full">
            <p className="font-bold text-xl text-atlasian-yellow">
              Menunggu Approval K.T.A
            </p>
          </div>
        )}
        <div className={`w-full px-4 pb-4 ${needApproval && `opacity-20`}`}>
          <div className="flex justify-between">
            <div
              className={`text-base font-semibold rounded-tl-lg text-brisma bg-blue-300 -ml-4 px-5 h-9 flex items-center justify-center`}
            >
              <p>{jenis}</p>
            </div>
            {!withoutButton && (
              <div className="flex items-center justify-end w-20 gap-1 pt-2">
                <DropdownCard actions={listDropdown} />
              </div>
            )}
          </div>
          <div className="text-lg font-bold text-atlasian-blue-dark">
            {projectId?.toUpperCase()}
          </div>
          <div className="text-base font-bold text-atlasian-blue-dark">
            {projectName}
          </div>
          <div className="text-sm font-semibold">{period}</div>
          <div className="flex flex-row justify-between leading-3 mt-2 items-center">
            <ProgressBar appearance="success" value={progress} />
            <div className="flex justify-end font-medium text-sm ml-3">
              {percent}
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <CardBody title={"Manajer Audit"} value={ma} />
            </div>
            <div className="w-1/2">
              <CardBody title={"Ketua Tim Audit"} value={kta} />
            </div>
          </div>
          <CardBody title={"Anggota Tim Audit"} value={ata} />
          <CardBody
            title={"Status Dokumen"}
            value={documentStatus?.toUpperCase()}
          />
          <CardBody title={"Status Persetujuan"} value={approvalStatus} />
          <CardBody title={"Addendum"} value={addendum} />
        </div>
      </div>
    </DivButton>
  );
};

export default CardOverview;

import { ButtonIcon, Card } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";
import Link from "next/link";
import ProgressBar from "@atlaskit/progress-bar";

const CardBody = ({ title, value, textColor, className }) => {
  console.log("text => ", value);
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

const CardOverview = ({ data }) => {
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
  } = data;

  return (
    <Link
      className="m-2 hover:bg-gray-100 hover:rounded-[10px] hover:no-underline w-[21.875rem]"
      href={href}
    >
      <Card>
        <div className="w-full px-4 pb-2">
          <div className="flex justify-between">
            <div
              className={`text-base font-semibold rounded-tl-lg text-brisma bg-blue-300 -ml-4 -mt-2 px-5 h-9 flex items-center justify-center`}
            >
              <p>{jenis}</p>
            </div>
            <div className="flex w-24 gap-2">
              <ButtonIcon color={"blue"} icon={<IconInfo size="medium" />} />
              <ButtonIcon color={"yellow"} icon={<IconEdit size="medium" />} />
              <ButtonIcon color={"red"} icon={<IconTrash size="medium" />} />
            </div>
          </div>
          <div className="text-lg font-bold text-atlasian-blue-dark">
            {projectId}
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
          <div className="flex w-full gap-4">
            <CardBody title={"Manajer Audit"} value={ma} />
            <CardBody title={"Ketua Tim Audit"} value={kta} />
          </div>
          <CardBody title={"Anggota Tim Audit"} value={ata} />
          <CardBody
            title={"Status Dokumen"}
            value={documentStatus?.toUpperCase()}
          />
          <CardBody title={"Status Persetujuan"} value={approvalStatus} />
          <CardBody title={"Addendum"} value={addendum} />
        </div>
      </Card>
    </Link>
  );
};

export default CardOverview;

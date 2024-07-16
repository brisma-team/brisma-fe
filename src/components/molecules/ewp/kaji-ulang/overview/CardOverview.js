import { DivButton } from "@/components/atoms";
import { DropdownCard } from "@/components/molecules/commons";
import { capitalizeEveryWord, checkRoleIsAdmin, convertDate } from "@/helpers";
import ProgressBar from "@atlaskit/progress-bar";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { useRouter } from "next/router";

import { IconPerson, IconTrash, IconLink } from "@/components/icons";

const helpMeFindTitle = (text) => {
  switch (text.toLowerCase()) {
    case "init project":
      return "init project";
    case "final":
      return "final";
    default:
      return text;
  }
};
const CardTeam = ({ title, value, titleColor }) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={`text-xs ${titleColor} font-semibold`}>{title}</div>
      {value?.length
        ? value?.map((v, i) => (
            <div key={i} className="text-xs">{`${v?.pn} - ${v?.nama}`}</div>
          ))
        : "-"}
    </div>
  );
};

const CardBody = ({ title, value, textColor, className }) => {
  return (
    <div className={`text-base flex w-full border-b`}>
      <div className="w-1/2 font-semibold px-2 text-xs py-1 h-full flex items-center">
        {title || "-"}
      </div>
      <div
        className={`w-1/2 border-l ${
          className || "font-medium"
        } text-xs px-2 py-1 ${textColor}`}
      >
        {value || "-"}
      </div>
    </div>
  );
};

const CardOverview = ({
  data,
  withoutButton,
  withoutHover,
  handleCloseProject,
  handleCopyProject,
  handleChangeInitiator,
  user,
}) => {
  const router = useRouter();
  const listDropdown = [
    {
      label: (
        <div className="flex gap-">
          <IconPerson size="medium" />
          <p className="my-auto">Change Initiator</p>
        </div>
      ),
      action: handleChangeInitiator,
      isDisabled: !checkRoleIsAdmin(user?.role_kode),
    },
    {
      label: (
        <div className="flex gap-1">
          <IconTrash size="medium" />
          <p className="my-auto">Delete Project</p>
        </div>
      ),
      action: handleCloseProject,
      isDisabled: Boolean(
        user?.pn !=
          data?.auditor?.filter((item) => item.is_initiator === true)[0]?.pn
      ),
    },
    {
      label: (
        <div className="flex gap-1">
          <IconLink size="medium" />
          <p className="my-auto">Link Project</p>
        </div>
      ),
      action: handleCopyProject,
      isDisabled: false,
    },
  ];
  const colorLabel = {
    consulting: "bg-cardColor-turquoise",
  };

  return (
    <DivButton
      className={`bg-white ${
        !withoutHover &&
        `hover:bg-gray-100 hover:rounded-[10px] hover:no-underline ${
          data?.need_approval ? "cursor-not-allowed" : ""
        }`
      }`}
      handleClick={(e) => {
        e.stopPropagation();
        if (!data?.need_approval) router.push(`konsulting/${data?.id}/info`);
      }}
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
          <div className="text-lg font-bold text-atlasian-blue-dark">
            {data?.project_code?.toUpperCase()}
          </div>
          <div className="text-base font-bold text-atlasian-blue-dark min-h-[3rem]">
            {data?.project_name || "-"}
          </div>
          <div className="flex flex-row justify-between leading-3 mt-2 items-center">
            <ProgressBar appearance="success" value={data?.progress} />
            <div className="flex justify-end font-medium text-sm ml-3">
              {data?.percent || "0%"}
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="border-x border-t">
              <CardBody title={"Maker"} value={data?.maker} />
              <CardBody
                title={"Tanggal Inisiasi"}
                value={convertDate(data?.created_at, "-", "d")}
              />
              <CardBody title={"Durasi Proyek"} value={data?.period} />
              <CardBody
                title={"Jenis Proyek"}
                value={capitalizeEveryWord(data?.jenis)}
                className={"font-semibold"}
              />
            </div>
            <div className="flex flex-col gap-3 min-h-[5rem] max-h-[10rem] overflow-y-scroll border p-2">
              <p className="text-sm font-semibold -mb-1">Tim Pelaksanaan</p>
              <div className="flex w-full">
                <div className="w-1/2">
                  <CardTeam
                    title={"Auditor"}
                    value={data?.auditor}
                    titleColor={"text-atlasian-blue-light"}
                  />
                </div>
                <div className="w-1/2">
                  <CardTeam
                    title={"Auditee"}
                    value={data?.auditee}
                    titleColor={"text-atlasian-red"}
                  />
                </div>
              </div>
              <CardTeam
                title={"Anggota Tim Audit"}
                value={data?.ata}
                titleColor={"text-atlasian-green"}
              />
            </div>
            <div className="border-x border-t">
              <CardBody
                title={"Project Status"}
                value={capitalizeEveryWord(data?.approval_status)}
                textColor={
                  data?.approval_status === "On Progress"
                    ? "text-atlasian-blue-light"
                    : data?.approval_status === "On Approval"
                    ? "text-atlasian-yellow"
                    : data?.approval_status === "Final"
                    ? "text-atlasian-green"
                    : ""
                }
              />
              <CardBody
                title={"Document Status"}
                value={capitalizeEveryWord(
                  helpMeFindTitle(data?.document_status)
                )}
                textColor={"text-atlasian-yellow"}
              />
              <CardBody
                title={"Addendum"}
                value={data?.addendum ? `Ke-${data?.addendum}` : "No Addendum"}
                textColor={
                  data?.addendum ? "text-atlasian-yellow" : "text-brisma"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </DivButton>
  );
};

export default CardOverview;

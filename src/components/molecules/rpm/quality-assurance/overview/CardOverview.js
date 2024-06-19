import { DivButton } from "@/components/atoms";
import { IconFile, IconTrash } from "@/components/icons";
import { DropdownCard } from "@/components/molecules/commons";
import {
  CardBodyOverview,
  CardTeamOverview,
} from "@/components/molecules/ewp/common/overview";
import { capitalizeEveryWord, convertDate } from "@/helpers";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { useRouter } from "next/router";

const CardOverview = ({
  data,
  pathName,
  withoutButton,
  withoutHover,
  handleClickDisableProject,
  handleCloseProject,
}) => {
  const router = useRouter();
  const listDropdown = [
    {
      label: (
        <div className="flex gap-1">
          <IconTrash size="medium" />
          <p className="my-auto">Disable Project</p>
        </div>
      ),
      action: () => handleClickDisableProject(data?.id),
      isDisabled: false,
    },
    {
      label: (
        <div className="flex gap-1">
          <IconFile size="medium" />
          <p className="my-auto">Close Project</p>
        </div>
      ),
      action: () => handleCloseProject(data?.id),
      isDisabled: Boolean(
        parseInt(data?.action_plan_memadai) !==
          parseInt(data?.total_action_plan)
      ),
    },
  ];
  const colorLabel = {
    consulting: "bg-cardColor-turquoise",
  };

  return (
    <DivButton
      className={`bg-white ${
        !withoutHover &&
        `hover:bg-gray-100 hover:rounded-[10px] hover:no-underline`
      }`}
      handleClick={(e) => (
        e.stopPropagation(), router.push(`${pathName}/${data?.id}/overview`)
      )}
    >
      <div
        className="w-full rounded flex flex-col items-center h-full border-2 relative"
        style={{
          color: token("color.text", N800),
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="w-full px-4 pb-4">
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
          <div className="text-base font-bold text-atlasian-blue-dark">
            {data?.project_name}
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="border-x border-t">
              <CardBodyOverview
                title={"Maker"}
                value={`${data?.create_by?.pn} - ${data?.create_by?.nama}`}
              />
              <CardBodyOverview
                title={"Tanggal Inisiasi"}
                value={convertDate(data?.createdAt, "/", "d")}
              />
              <CardBodyOverview
                title={"P.I.C Submitter"}
                value={
                  data?.pic_submitter?.pn
                    ? `${data?.pic_submitter?.pn} - ${data?.pic_submitter?.nama}`
                    : "-"
                }
              />
              <CardBodyOverview
                title={"P.I.C Evaluator"}
                value={
                  data?.pic_evaluator?.pn
                    ? `${data?.pic_evaluator?.pn} - ${data?.pic_evaluator?.nama}`
                    : "-"
                }
              />
              <CardBodyOverview
                title={"P.I.C Negotiator"}
                value={
                  data?.pic_negotiator?.pn
                    ? `${data?.pic_negotiator?.pn} - ${data?.pic_negotiator?.nama}`
                    : "-"
                }
              />
            </div>
            <div className="flex flex-col gap-3 min-h-[5rem] max-h-[10rem] overflow-y-scroll border p-2">
              <p className="text-sm font-semibold -mb-1">Tim Pelaksanaan</p>
              <div className="flex w-full">
                <div className="w-1/2">
                  <CardTeamOverview
                    title={"Submitters"}
                    value={data?.submitter}
                    titleColor={"text-atlasian-blue-light"}
                  />
                </div>
                <div className="w-1/2">
                  <CardTeamOverview
                    title={"Evaluators"}
                    value={data?.evaluator}
                    titleColor={"text-atlasian-red"}
                  />
                </div>
              </div>
            </div>
            <div className="border-x border-t">
              <CardBodyOverview
                title={"Project Status"}
                value={capitalizeEveryWord(data?.status_approval)}
                textColor={
                  data?.status_approval === "On Progress"
                    ? "text-atlasian-blue-light"
                    : data?.status_approval === "On Approval"
                    ? "text-atlasian-yellow"
                    : data?.status_approval === "Final"
                    ? "text-atlasian-green"
                    : ""
                }
              />
              <CardBodyOverview
                title={"Total Action Plan"}
                value={data?.total_action_plan || 0}
              />
              <CardBodyOverview
                title={"Action Plan Memadai"}
                value={data?.action_plan_memadai || 0}
              />
            </div>
          </div>
        </div>
      </div>
    </DivButton>
  );
};

export default CardOverview;

import { Card, DivButton } from "@/components/atoms";
import ProgressBar from "@atlaskit/progress-bar";
import { useRouter } from "next/router";
import { DropdownCard } from "@/components/molecules/commons";
import { IconCross, IconPerson } from "@/components/icons";

const CardBody = ({ title, value }) => {
  return (
    <div className="flex flex-row border">
      <div className="w-2/4 border-r p-1 flex flex-row">
        <div className="text-xs font-medium ml-1">{title}</div>
      </div>
      <div
        className={`text-xs w-2/4 flex p-1 font-medium ${
          title !== "Periode" && "text-atlasian-blue-light"
        }`}
      >
        {value}
      </div>
    </div>
  );
};

const CardOverview = ({
  id,
  title,
  year,
  progress,
  percent,
  documentStatus,
  apporovalStatus,
  addendum,
  href,
  handleReset,
  handleApproval,
  tipe_overview,
  withoutLabel,
}) => {
  const router = useRouter();
  const listDropdown = [
    {
      label: (
        <div className="flex gap-">
          <IconCross size="medium" />
          <span className="my-auto ml-0.5">Request Reset</span>
        </div>
      ),
      action: () => handleReset(id),
      // isDisabled: true,
    },
    {
      label: (
        <div className="flex gap-">
          <IconPerson size="medium" />
          <span className="my-auto ml-0.5">Approval</span>
        </div>
      ),
      action: () => handleApproval(id),
      // isDisabled: true,
    },
    // {
    //   label: (
    //     <div className="flex gap-1">
    //       <IconTrash size="medium" />
    //       <span className="my-auto">Delete Project</span>
    //     </div>
    //   ),
    //   action: () => handleCloseProject(data?.id),
    //   isDisabled: !(
    //     checkRoleIsAdmin(user?.role_kode) || data?.initiator?.pn === user?.pn
    //   ),
    // },
    // {
    //   label: (
    //     <div className="flex gap-1">
    //       <IconLink size="medium" />
    //       <span className="my-auto">Link Project</span>
    //     </div>
    //   ),
    //   action: () => handleCopyProject(data?.id),
    // },
  ];

  const handleClickCard = () => {
    router.push(href);
  };

  return (
    <DivButton
      handleClick={handleClickCard}
      className="m-2 hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
    >
      <Card>
        <div className="w-full px-4 pb-2">
          <div className="flex flex-row justify-between">
            {!withoutLabel && (
              <div
                className={`text-base font-semibold rounded-tl-lg text-white ${
                  tipe_overview === "Head Office Audit"
                    ? "bg-blue-500"
                    : "bg-cyan-500"
                } -ml-4 -mt-2 px-5 h-9 flex items-center justify-center`}
              >
                <p>{title}</p>
              </div>
            )}
            {/* <div className="w-7">
              <DropdownIcon actions={listDropdown} color={"blue"} />
            </div> */}
            <div className="mt-1.5">
              <DropdownCard actions={listDropdown} />
            </div>
          </div>
          <div className="text-base mt-4 font-bold text-atlasian-blue-dark">
            {title}
          </div>
          <div className="flex flex-row justify-between leading-3 mt-4 items-center">
            <ProgressBar appearance="success" value={progress} />
            <div className="flex justify-end font-medium text-sm ml-3 text-blue-500">
              {percent}
            </div>
          </div>
          <div className="leading-3 my-3">
            <CardBody title={"Periode"} value={year} />
            <CardBody title={"Document Status"} value={documentStatus} />
            <CardBody title={"Approval Status"} value={apporovalStatus} />
            <CardBody title={"Addendum"} value={addendum} />
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOverview;

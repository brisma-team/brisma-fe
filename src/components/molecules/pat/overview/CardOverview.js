import { Card, DivButton } from "@/components/atoms";
import { IconSuccess } from "@/components/icons";
import ProgressBar from "@atlaskit/progress-bar";
import { useRouter } from "next/router";
import { DropdownCard } from "../../commons";

const CardBody = ({ title, value, icon }) => {
  return (
    <div className="flex flex-row my-2">
      <div className="w-2/4 flex flex-row">
        <div className="text-atlasian-blue-light">{icon}</div>
        <div className="text-xs font-medium ml-1">{title}</div>
      </div>
      <div className="text-xs w-2/4 justify-end flex font-medium text-atlasian-blue-light">
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
  handleApproval,
}) => {
  const router = useRouter();

  const listDropdown = [
    { label: "Approval", action: async () => handleApproval(id) },
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
            <div className="text-base font-bold text-atlasian-blue-dark">
              {title}
            </div>
            <div className="w-7">
              <DropdownCard actions={listDropdown} />
            </div>
          </div>
          <div className="text-sm font-bold">{year}</div>
          <div className="flex flex-row justify-between leading-3 mt-2 items-center">
            <ProgressBar appearance="success" value={progress} />
            <div className="flex justify-end font-medium text-sm ml-3">
              {percent}
            </div>
          </div>
          <div className="leading-3">
            <CardBody
              title={"Document Status"}
              value={documentStatus}
              icon={<IconSuccess size="small" />}
            />
            <CardBody
              title={"Approval Status"}
              value={apporovalStatus}
              icon={<IconSuccess size="small" />}
            />
            <CardBody
              title={"Addendum"}
              value={addendum}
              icon={<IconSuccess size="small" />}
            />
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOverview;

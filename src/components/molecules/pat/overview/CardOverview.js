import { ButtonIcon, Card } from "@/components/atoms";
import { IconEdit, IconSuccess } from "@/components/icons";
import Link from "next/link";
import ProgressBar from "@atlaskit/progress-bar";

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
  title,
  year,
  progress,
  percent,
  documentStatus,
  apporovalStatus,
  addendum,
  href,
}) => {
  return (
    <Link
      className="m-2 hover:bg-gray-100 hover:rounded-[10px] hover:no-underline w-[21.875rem] h-[10.5rem]"
      href={href}
    >
      <Card>
        <div className="w-full px-4 pb-2">
          <div className="flex flex-row justify-between">
            <div className="text-base font-bold text-atlasian-blue-dark">
              {title}
            </div>
            <ButtonIcon
              color={"yellow"}
              icon={<IconEdit size="medium" />}
              handleClick={() => console.log("TEST")}
            />
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
    </Link>
  );
};

export default CardOverview;

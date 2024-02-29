import { Card, DivButton } from "@/components/atoms";
import ProgressBar from "@atlaskit/progress-bar";
import { useRouter } from "next/router";
import { DropdownIcon } from "../../commons";

const CardBody = ({ title, value }) => {
  return (
    <div className="flex flex-row border">
      <div className="w-2/4 border-r p-1 flex flex-row">
        <div className="text-xs font-medium ml-1">{title}</div>
      </div>
      <div className={`text-xs w-2/4 flex p-1 font-medium ${title !== "Periode" && "text-atlasian-blue-light"}`}>
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
  tipe_overview,
  withoutLabel
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
            <div className="w-7">
              <DropdownIcon actions={listDropdown} color={"blue"} />
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
            <CardBody
              title={"Periode"}
              value={year}
            />
            <CardBody
              title={"Document Status"}
              value={documentStatus}
            />
            <CardBody
              title={"Approval Status"}
              value={apporovalStatus}
            />
            <CardBody
              title={"Addendum"}
              value={addendum}
            />
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOverview;

import { Card, DivButton } from "@/components/atoms";
import { convertToRupiah } from "@/helpers";
import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";
import { DropdownIcon } from "../commons";
import ProgressBar from "@atlaskit/progress-bar";

const CardActivitySchedule = ({
  jadwal_sbp_id,
  type,
  title,
  maker,
  audit_period,
  budget,
  pic,
  desc,
  handleClickInfo,
  handleClickUpdate,
  handleClickDelete,
  progress,
  percent,
  surveyTerkait
}) => {
  const projectItems = [
    {
      title: "Maker",
      description: maker
    },
    {
      title: "Tanggal Inisiasi",
      description: "-"
    },
    {
      title: "Durasi Proyek",
      description: audit_period
    },
    {
      title: "Jenis Proyek",
      description: "-"
    }
  ]
  const documentItems = [
    {
      title: "Survey Terkait",
      description: "-"
    },
    {
      title: "Project Status",
      description: "-"
    },
    {
      title: "Document Status",
      description: "-"
    },
    {
      title: "Document Status",
      description: `Rp. ${convertToRupiah(budget)}`
    }
  ]
  return (
		<DivButton
			className="hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
			handleClick={() => console.log("test")}
		>
			<Card>
				<div className="w-full px-5 py-3">
					<div className="flex mb-2 justify-between items-end -ml-5 -mt-5">
						<div
							className={`text-base font-semibold rounded-tl-lg text-white ${
								type?.toLowerCase() === "konsulting"
									? "bg-cyan-500"
									: type?.toLowerCase() === "review"
									? "bg-orange-300 "
									: "bg-sky-500"
							} px-5 h-9 flex items-center justify-center`}
						>
							<p>{type}</p>
						</div>
						<div className="flex justify-between -mb-1.5">
							<DropdownIcon color={"blue"} />
						</div>
					</div>
					<div className="flex flex-col justify-between my-3">
						<div className="text-2xl font-bold text-atlasian-blue-dark">
							{title}
						</div>
						<div className="text-xl font-bold text-neutral-900">
							{desc}
						</div>
					</div>
					<div className="flex flex-row justify-between leading-3 my-3 items-center">
						<ProgressBar appearance="success" value={100} />
						<div className="flex justify-end font-medium text-sm ml-3 text-blue-500">
							100%
						</div>
					</div>
					<div className="leading-3">
						<TableTree>
							<Rows
								items={projectItems}
								render={({ title, description }) => (
									<div className="border">
										<Row itemId={title}>
											<Cell
												width="50%"
												className="font-bold border-r"
											>
												{title}
											</Cell>
											<Cell width="50%">
												{description}
											</Cell>
										</Row>
									</div>
								)}
							/>
						</TableTree>
						<div className="w-full h-[10rem] border-2 my-3 p-3 overflow-y-scroll">
							<p className="font-semibold text-lg">Pelaksana</p>
							<p className="text-blue-600 font-semibold">
								Tim Audit
							</p>
							<p className="">Tim Auditor HO BRI 2</p>
						</div>
						<TableTree>
							<Rows
								items={documentItems}
								render={({ title, description }) => (
									<div className="border">
										<Row itemId={title}>
											<Cell
												width="50%"
												className="font-bold border-r"
											>
												{title}
											</Cell>
											<Cell
												width="50%"
												className={`${
													description.toLowerCase() ===
														"on progress" &&
													title === "Project Status"
														? "text-blue-500"
														: "text-orange-300"
												}`}
											>
												{description}
											</Cell>
										</Row>
									</div>
								)}
							/>
						</TableTree>
					</div>
				</div>
			</Card>
		</DivButton>
  );
};

export default CardActivitySchedule;

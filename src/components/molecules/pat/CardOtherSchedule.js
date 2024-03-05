import { Card, DivButton } from "@/components/atoms";
import { convertToRupiah } from "@/helpers";
import { DropdownIcon } from "../commons";
import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";

const CardOtherSchedule = ({
  kegiatan_lain_id,
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
}) => {
  const items = [
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
      description: "-"
    },
    {
      title: "Rentang Waktu",
      description: audit_period
    },
    {
      title: "Jenis Proyek",
      description: "-"
    },
    {
      title: "Tema Proyek",
      description: "-"
    },
    {
      title: "Anggaran",
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
					<div className="flex mb-4 justify-between items-end -ml-5 -mt-5">
						<div
							className={`text-base font-semibold rounded-tl-lg 
              ${type?.toLowerCase() === "individual"
									? "bg-blue-300 text-brisma"
									: "bg-[#989898] text-white"
							} px-5 h-9 flex items-center justify-center`}
						>
							<p>{type}</p>
						</div>
						<div className="flex justify-between -mb-1.5">
							<DropdownIcon color={"blue"} />
						</div>
					</div>
					<div className="flex flex-row justify-between mb-3">
						<div className="text-xl font-bold text-atlasian-blue-dark">
							{title}
						</div>
					</div>
					<div className="leading-3">
						<TableTree>
							<Rows
								items={items}
								render={({ title, description }) => (
									<div className="border">
										<Row itemId={title}>
											<Cell width="50%" className="font-bold border-r">{title}</Cell>
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
              <p className="text-blue-600 font-semibold">Tim Audit</p>
              <p className="">Tim Auditor HO BRI 2</p>
            </div>
            <div className="w-full h-[10rem] border-2 my-3 p-3 overflow-y-scroll">
              <p className="font-semibold text-lg">Deskripsi</p>
              <p className="leading-5">Figma ipsum component variant main layer. Arrow clip variant line union. Figma pixel plugin reesizing vector reesizing link line fill strikethrough. Content group shadow horizontal image line. Horizontal object auto rectangle component layer.</p>
            </div>
					</div>
				</div>
			</Card>
		</DivButton>
  );
};

export default CardOtherSchedule;

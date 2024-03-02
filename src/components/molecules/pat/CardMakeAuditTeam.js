import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconTrash } from "@/components/icons";
import TableTree, { Row, Rows, Cell } from "@atlaskit/table-tree";

const CardBody = ({ title, text, width, paddingLeft }) => {
	let textColor;
	switch (title) {
		case "Maker":
			textColor = "text-atlasian-purple";
			break;
		case "Manajer Audit":
			textColor = "text-atlasian-blue-light";
			break;
		case "Ketua Tim Audit":
			textColor = "text-atlasian-red";
			break;
		case "Anggota Tim Audit":
			textColor = "text-atlasian-green";
			break;
		case "Uker Binaan":
			textColor = "text-atlasian-green";
			break;
		default:
			textColor = "text-[#172B4D]";
			break;
	}

	return (
		<div
			className={`mt-4 leading-normal ${width} ${paddingLeft}`}
		>
			<div
				className={`${textColor} font-bold ${
					title === "Tanggal Buat" && "invisible"
				}`}
			>
				{title.toUpperCase()}
			</div>
			{title === "Anggota Tim Audit" || title === "Uker Binaan" ? (
				<div>
					{text?.map((v, i) => {
						return (
							<div
								key={i}
							>
								<div>{v.name}</div>
								<div key={i}>
									{v?.uker?.map((x, idx) => {
										return (
											<div
												key={idx}
												className=""
											>{`${x.orgeh_kode}`}</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			) : Array.isArray(text) ? (
				text.map((v, i) => {
					return (
						<div key={i} className={``}>
							{v}
						</div>
					);
				})
			) : (
				<div className={`${title === "Tanggal Buat" && "font-bold"}`}>
					{text}
				</div>
			)}
		</div>
	);
};

const CardMakeAuditTeam = ({
	header_title,
	maker,
	created_at,
	manajer_audit,
	ketua_tim_audit,
	anggota_tim_audit,
	tipe_tim,
	button,
	withoutLabel,
	handleUpdate,
	handleDelete,
}) => {
  const projectItems = [
    {
      title: "Maker",
      description: maker
    },
    {
      title: "Tanggal Inisiasi",
      description: created_at
    },
  ]

	return (
		<DivButton
			className={
				"hover:bg-gray-100 hover:rounded-[10px] hover:no-underline relative cursor-pointer"
			}
			handleClick={() => console.log("klik")}
		>
			<Card>
				<div className="w-full px-4 py-2">
					<div className="flex justify-between">
						{!withoutLabel && (
							<div
								className={`text-base font-semibold rounded-tl-lg text-white ${
									tipe_tim === "Original Team"
										? "bg-orange-300"
										: "bg-gray-400"
								} -ml-4 -mt-4 px-5 h-9 flex items-center justify-center`}
							>
								<p>{tipe_tim}</p>
							</div>
						)}
						{button && (
							<div className="flex w-14 justify-between">
								<ButtonIcon
									handleClick={handleUpdate}
									color={"yellow"}
									icon={<IconEdit size="medium" />}
								/>
								<ButtonIcon
									handleClick={handleDelete}
									color={"red"}
									icon={<IconTrash size="medium" />}
								/>
							</div>
						)}
					</div>
					<div className="text-xl my-3 font-bold text-atlasian-blue-dark">
						{header_title}
					</div>
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
					<div className="flex flex-wrap p-2 border my-3 rounded-md max-h-[10rem] overflow-y-scroll">
            <p className="w-full font-semibold text-lg">Pelaksana</p>
						<CardBody
							title={"Manajer Audit"}
							text={manajer_audit?.map((v) => {
								return v.nama_ma;
							})}
							width={"w-3/5"}
						/>
						<CardBody
							title={"Ketua Tim Audit"}
							text={ketua_tim_audit?.map((v) => {
								return v.nama_kta;
							})}
							width={"w-2/5"}
						/>
						<CardBody
							title={"Anggota Tim Audit"}
							text={anggota_tim_audit?.map((v) => {
								return {
									name: v?.nama_ata,
								};
							})}
							width={"w-3/5"}
						/>
						<CardBody
							title={"Uker Binaan"}
							text={anggota_tim_audit?.map((v) => {
								return {
									uker: v?.ref_ata_ukers,
								};
							})}
							width={"w-2/5"}
						/>
					</div>
				</div>
			</Card>
		</DivButton>
	);
};

export default CardMakeAuditTeam;

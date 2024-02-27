import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconTrash } from "@/components/icons";

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
			className={`mt-4 leading-normal text-base ${width} ${paddingLeft}`}
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

const CardAuditTeam = ({
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
					<div className="text-xl font-bold text-atlasian-blue-dark">
						{header_title}
					</div>
					<div className="flex flex-wrap">
						<CardBody
							title={"Maker"}
							text={maker}
							width={"w-3/5"}
						/>
						<CardBody
							title={"Tanggal Buat"}
							text={created_at}
							width={"w-2/5"}
							paddingLeft={"pl-2"}
						/>
						<CardBody
							title={"Manajer Audit"}
							text={manajer_audit?.map((v) => {
								return v.nama_ma;
							})}
							width={"w-full"}
						/>
						<CardBody
							title={"Ketua Tim Audit"}
							text={ketua_tim_audit?.map((v) => {
								return v.nama_kta;
							})}
							width={"w-full"}
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
							paddingLeft={"pl-2"}
						/>
					</div>
				</div>
			</Card>
		</DivButton>
	);
};

export default CardAuditTeam;

import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconInfo, IconSuccess, IconTrash } from "@/components/icons";
import ProgressBar from "@atlaskit/progress-bar";
import { useRouter } from "next/router";
import DropdownCard from "./DropdownCard";

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

const CardSuratOverview = ({ data, ewp_id }) => {
	const router = useRouter();

	const {
		id,
		jenis_template_kode,
		jenis_surat_name,
		type,
		perihal,
		create_by,
		year,
		progress,
		percent,
		documentStatus,
		apporovalStatus,
		href,
	} = data;
	const handleClickCard = () => {
		router.push(href);
	};
	const handleClickUpdate = () => {
		router.push(
			`/ewp/projects/konvensional/${ewp_id}/surat-dio/${id}/informasi-surat`
		);
	};

	return (
		<div
			// onClick={handleClickCard}
			className="hover:bg-gray-100 hover:rounded-[10px] hover:no-underline m-2"
		>
			<Card>
				<div className="w-full">
					<div className="flex flex-row justify-between items-end">
						<div
							className={`text-base font-semibold rounded-tl-lg text-brisma -mt-2 ${
								type === "On Progress" ? "bg-blue-300" : "bg-[#F4E3A4]"
							} px-8 h-8 flex items-center justify-center`}
						>
							<p className="font-bold">
								{type === "On Progress" ? "DRAFT" : type === "On Approver" ? "APPROVAL" : "DIO"}
							</p>
						</div>
						<div className="flex gap-2 justify-between px-2">
							<ButtonIcon
								color={"blue"}
								icon={<IconInfo size="small" />}
								// handleClick={handleClickInfo}
							/>
							{data.status_persetujuan == "On Progress" && (
								<ButtonIcon
									color={"yellow"}
									icon={<IconEdit size="small" />}
									handleClick={(e) => handleClickUpdate(e)}
								/>
							)}
							{data.status_persetujuan == "On Progress" && (
								<ButtonIcon
									color={"red"}
									icon={<IconTrash size="small" />}
									// handleClick={(e) => handleClickDelete(e, jadwal_id)}
								/>
							)}
						</div>
					</div>
					<div className="px-4" role="button" onClick={handleClickCard}>
						<div className="flex flex-row ">
							<div className="text-base font-bold text-atlasian-blue-dark mt-4">
								{jenis_template_kode}
							</div>
						</div>
						<div className="text-sm font-bold">{perihal}</div>
						<div className="flex text-xs gap-1">
							Dibuat Oleh <p className="text-xs font-bold">{create_by.fullName}</p>
						</div>
						<div className="mt-6">
							<div className="text-xs text-primary">
								Jenis Surat <p className="text-sm text-gray font-bold">{jenis_surat_name}</p>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default CardSuratOverview;

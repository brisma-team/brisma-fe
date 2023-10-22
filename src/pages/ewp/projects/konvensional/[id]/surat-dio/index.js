import {
	Breadcrumbs,
	ButtonField,
	Card,
	CardLanding,
	PageTitle,
	Pagination,
	Spinner,
} from "@/components/atoms";
import {
	ProjectDetail,
	InformativeLetter,
	RealizationTable,
} from "@/components/molecules/ewp/konvensional/info";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { convertDate, errorSwalTimeout } from "@/helpers";
import SuratLayoutEWP from "@/layouts/ewp/SuratLayoutEWP";
import { useRouter } from "next/router";
import Button from "@atlaskit/button";
import { useEffect, useRef, useState } from "react";
import useOverviewSurat from "@/data/ewp/konvensional/useOverviewSurat";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import CardSuratOverview from "@/components/molecules/ewp/konvensional/surat-dio/CardSuratOverview";
import Drawer from "@atlaskit/drawer";
import SuratDrawer from "@/components/molecules/ewp/konvensional/surat-dio/SuratDrawer";

const convertProgressAndPercent = (status) => {
	let progress, percent;
	switch (status) {
		case "On Progress":
			progress = 0.3;
			percent = "30%";
			break;
		case "On Approver":
			progress = 0.6;
			percent = "60%";
			break;
		case "Final":
			progress = 1;
			percent = "100%";
			break;
	}
	return { progress, percent };
};

const index = () => {
	const { id } = useRouter().query;
	const { ref } = useRef();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	console.log("is OPEN DRAWE ", isDrawerOpen);
	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	const [showFilter, setShowFilter] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [sortBy, setSortBy] = useState("ASC");
	const [filter, setFilter] = useState({
		name: "",
		is_audited: false,
		ref_metode: "",
		ref_tipe: "",
		ref_jenis: "",
		ref_tema: "",
	});
	const [params, setParams] = useState({
		name: "",
		is_audited: false,
		ref_metode: "",
		ref_tipe: "",
		ref_jenis: "",
		ref_tema: "",
	});
	const [data, setData] = useState([]);

	const [isError, setIsError] = useState(false);
	const { auditorEWP, auditorEWPError } = useAuditorEWP({ id });
	const { suratEWP, suratEWPError, suratEWPMutate } = useOverviewSurat(id);

	useEffect(() => {
		if (suratEWP) {
			const mapping = suratEWP.data.map((v) => {
				return {
					...v,
					title: v.jenis_template_name,
					type: v.status_persetujuan,
					apporovalStatus: v.status_approver,
					documentStatus: v.status_persetujuan,
					progress: convertProgressAndPercent(v?.status_persetujuan).progress,
					percent: convertProgressAndPercent(v?.status_persetujuan).percent,
					createdAt: `${convertDate(v?.createdAt, "-", "d")}`,
					href: `/ewp/projects/konvensional/${id}/surat-dio/${v.id}/dokumen`,
				};
			});
			setData(mapping);
			setTotalPages(suratEWP?.page?.totalPage);
		}
	}, [suratEWP]);

	console.log(data);
	// useEffect(() => {
	//   if (auditorEWPError) {
	//     setIsError(true);
	//   }
	// }, [auditorEWPError]);

	// if (isError) {
	//   errorSwalTimeout(auditorEWPError, "/ewp/projects/konvensional");
	// }

	const breadcrumbs = [
		{ name: "Menu", path: "/dashboard" },
		{ name: "EWP", path: "/ewp" },
		{
			name: `${auditorEWP?.data?.project_info?.project_id}`,
			path: `/ewp/projects/konvensional/${id}/info`,
		},
		{
			name: `Surat Dio`,
			path: `/ewp/projects/konvensional/${id}/surat-dio`,
		},
	];

	return (
		<SuratLayoutEWP
			menu={[
				{ name: "Overview", href: `/surat-dio` },
				// { name: "Approval", href: `/surat-dio/${}/approval` },
			]}
		>
			<div className="pr-24">
				<Breadcrumbs data={breadcrumbs} />
				{/* End Breadcrumbs */}
				<div className="flex justify-between items-center mb-6">
					<PageTitle text={"Surat Overview"} />
				</div>
				<div className="flex justify-between items-end">
					{/* Start Filter */}
					<div className="flex justify-between items-center gap-2">
						<div className="w-36">
							<Button
								appearance="primary"
								onClick={() => setShowFilter(!showFilter)}
								shouldFitContainer
							>
								{showFilter ? `Tutup Filter` : `Tampilkan Filter`}
							</Button>
						</div>
						<div className="w-36 rounded bg-atlasian-purple">
							<ButtonField handler={openDrawer} text={"Buat Surat"} />
						</div>
					</div>
					<div className="relative">
						<SuratDrawer
							ewp_id={id}
							isOpen={isDrawerOpen}
							closeDrawer={closeDrawer}
							onClickOutside={closeDrawer}
							isHovered={isHovered}
							setIsHovered={setIsHovered}
							width="96"
						/>
					</div>
				</div>
				{/* <div className="relative">
					<CardFilterProjectOverview
						showFilter={showFilter}
						filter={filter}
						setFilter={setFilter}
					/>
				</div> */}
				<div className="w-full min-h-[7rem] flex items-end justify-end">
					<SelectSortFilter />
				</div>
				{/* Start Content */}

				<div className="grid grid-cols-3 gap-3 my-4 overflow-hidden -ml-2">
					{suratEWPError ? (
						<div className="w-full flex my-4 justify-center items-center">
							<DataNotFound />
						</div>
					) : data?.length ? (
						data.map((v, i) => {
							return <CardSuratOverview ewp_id={id} key={i} data={v} callbackRef={ref} />;
						})
					) : (
						<div className="w-full flex my-4 justify-center items-center">
							<DataNotFound />
						</div>
					)}
				</div>

				<Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
				{/* End Content */}
			</div>
		</SuratLayoutEWP>
	);
};

export default index;

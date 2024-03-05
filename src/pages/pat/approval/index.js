import React, { useEffect, useState } from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import useApproval from "@/data/pat/approval/useApproval";
import { Breadcrumbs, ButtonField } from "@/components/atoms";
import {
	TableHistoryPAT,
	TableApprovalQueuePAT,
} from "@/components/molecules/pat/approval";
import _ from "lodash";
import useApprovalHistory from "@/data/pat/approval/useApprovalHistory";
import {
	CardApprovalList,
	PrevNextNavigation,
} from "@/components/molecules/commons";
import { useRouter } from "next/router";
import { useApprovalPat, useProjectOverview } from "@/data/pat";
import { CardFilterProjectOverview } from "@/components/molecules/pat/overview";

const breadcrumbs = [
	{ name: "Menu", path: "/dashboard" },
	{ name: "PAT", path: "/pat" },
	{ name: "Overview", path: "/pat/approval" },
];

const convertProgressAndPercent = (approvers, status_approver, status_pat) => {
	let progress, percent;
	switch (status_pat) {
		case "Final":
			progress = 1;
			percent = "100%";
			break;
		case "On Approver":
			progress = 0.6;
			percent = "66%";
			break;
		case "On Progress":
			progress = 0.3;
			percent = "33%";
			break;
		default:
			progress = 0;
			percent = "0%";
			break;
	}

	return { progress, percent };
};

const index = () => {
	const router = useRouter();
	const [queue, setQueue] = useState([]);
	const [totalApproved, setTotalApproved] = useState({});
	const [history, setHistory] = useState([]);
	const { approvalList } = useApproval();
	const { approvalHistory } = useApprovalHistory();

	const [totalData, setTotalData] = useState(0);
	const [openFilter, setOpenFilter] = useState(false);
	const [data, setData] = useState([]);
	const [params, setParams] = useState({
		project_name: "",
		status_approver: "",
		status_pat: "",
		year: "",
		sort_by: "ASC",
		limit: 4,
		page: 1,
	});
	const [filter, setFilter] = useState({
		project_name: "",
		status_approver: "",
		status_pat: "",
		year: "",
		sort_by: "ASC",
		limit: 8,
		page: 1,
	});

	const { projectOverview, projectOverviewMutate, projectOverviewError } =
		useProjectOverview(params);
	const { approvalPat } = useApprovalPat();

	useEffect(() => {
		setFilter((prevFilter) => {
			return {
				...prevFilter,
				page: 1,
			};
		});
	}, [filter.limit]);

	useEffect(() => {
		const handleSearch = () => {
			setParams(filter);
			projectOverviewMutate;
		};
		const debouncedSearch = _.debounce(handleSearch, 800);
		debouncedSearch();
		return () => {
			debouncedSearch.cancel();
		};
	}, [filter]);

	useEffect(() => {
		if (projectOverview) {
			const mapping = projectOverview.data.map((v) => {
				return {
					id: v.id,
					title: v.pat_name,
					year: v.tahun,
					progress: convertProgressAndPercent(
						v?.approvers,
						v?.status_approver,
						v?.status_pat
					).progress,
					percent: convertProgressAndPercent(
						v?.approvers,
						v?.status_approver,
						v?.status_pat
					).percent,
					documentStatus: v?.status_pat,
					apporovalStatus: v?.status_approver
						? `On ${v?.status_approver?.pn}`
						: `-`,
					addendum: v?.riwayat_adendum.toString(),
					href: `/pat/projects/${v.id}`,
				};
			});
			setData(mapping);
			setTotalData(projectOverview?.pagination?.totalData);
		} else {
			setData([]);
			setTotalData(0);
		}
	}, [projectOverview, params]);

	useEffect(() => {
		if (approvalList) {
			setQueue(approvalList?.data?.body);
			setTotalApproved(approvalList?.data?.header);
		} else {
			setQueue([]);
			setTotalApproved([]);
		}

		if (approvalHistory) {
			setHistory(approvalHistory?.data?.logPAT?.data);
		} else {
			setHistory([]);
		}
	}, [approvalList, approvalHistory]);

	useEffect(() => {
		console.log("history => ", history);
	}, [history]);

	const handleClickActionOnTableApprovalQueue = (pat_id) => {
		router.push(`projects/${pat_id}/dokumen?is_approval=true`);
	};

	return (
		<PatOverviewLayout title={"Riwayat Approval"} data={approvalPat?.data?.header}>
			<div className="pr-24">
				{/* Start Breadcrumbs */}
				<Breadcrumbs data={breadcrumbs} />
				{/* End Breadcrumbs */}
				<div className="flex justify-between items-center mb-6 w-[1025px]">
					<div className="">
						<div className="text-3xl font-bold">
							Approval Overview
						</div>
					</div>
					<PrevNextNavigation />
				</div>

				{/* Start Filter */}
				<div className="w-36 rounded bg-atlasian-blue-light">
					<ButtonField
						handler={() => setOpenFilter(!openFilter)}
						text={openFilter ? `Tutup Filter` : `Tampilkan Filter`}
					/>
				</div>

				<div className="flex mb-6 justify-between">
					<CardFilterProjectOverview
						openFilter={openFilter}
						filter={filter}
						setFilter={setFilter}
					/>
				</div>
        {/* End Filter */}
        
				<div className="flex mb-6">
					<div className="flex-initial w-[850px]">
						<div className="mb-5">
							<TableApprovalQueuePAT
								data={queue}
								handleClickAction={
									handleClickActionOnTableApprovalQueue
								}
							/>
						</div>
						<div>
							<TableHistoryPAT data={history} />
						</div>
					</div>
					<div className="flex-initial w-[260px] px-16">
						<div>
							<CardApprovalList data={totalApproved} />
						</div>
					</div>
				</div>
			</div>
		</PatOverviewLayout>
	);
};

export default index;

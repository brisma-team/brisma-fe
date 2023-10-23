import {
	Breadcrumbs,
	ButtonField,
	Card,
	DivButton,
	PageTitle,
} from "@/components/atoms";
import {
	PrevNextNavigation,
	ApprovalItems,
} from "@/components/molecules/commons";
import { ModalWorkflowEWP } from "@/components/molecules/ewp/konvensional/common";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuditorEWP, useWorkflowDetailEWP } from "@/data/ewp/konvensional";
import { useSelector, useDispatch } from "react-redux";
import {
	resetValidationErrorsWorkflow,
	setValidationErrorsWorkflow,
	setWorkflowData,
	resetWorkflowData,
} from "@/slices/ewp/konvensional/surat/documentSuratEWPSlice";
import _ from "lodash";
import {
	confirmationSwal,
	convertDate,
	setErrorValidation,
	usePostData,
	useUpdateData,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import SuratLayoutEWP from "@/layouts/ewp/SuratLayoutEWP";
import useDetailSurat from "@/data/ewp/konvensional/surat-dio/useDetailSurat";

const index = () => {
	const { id, surat_id } = useRouter().query;
	const router = useRouter();
	const baseUrl = `/ewp/projects/konvensional/${id}/surat-dio/${surat_id}`;
	const dispatch = useDispatch();

	const { auditorEWP } = useAuditorEWP({ id });
	const { suratDio } = useDetailSurat(surat_id);
	const [suratData, setSuratData] = useState({});
	useEffect(() => {
		if (suratDio) {
			setSuratData(suratDio?.data);
		}
	}, [suratDio]);
	console.log(suratData);

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
		{
			name: `Preview Surat`,
			path: `/ewp/projects/konvensional/${id}/surat-dio/${surat_id}dokumen`,
		},
	];

	const ref = useRef(null);
	const [showModalApproval, setShowModalApproval] = useState(false);
	const [historyWorkflow, setHistoryWorkflow] = useState([]);

	const workflowData = useSelector(
		(state) => state.documentSuratEWP.workflowData
	);
	const validationErrorsWorkflow = useSelector(
		(state) => state.documentSuratEWP.validationErrorsWorkflow
	);
	const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
		"surat_dio",
		{ id: surat_id }
	);

	// [ END ]

	// [START] Hook ini berfungsi untuk menyimpan data workflow untuk Modal Workflow yang akan
	// digunakan sebagai payload dan juga data yang akan ditampilkan saat Modal muncul
	useEffect(() => {
		const workflowInfo = workflowDetailEWP?.data?.info;
		const maker = workflowDetailEWP?.data?.initiator;
		const approvers = workflowDetailEWP?.data?.approver;
		const signers = workflowDetailEWP?.data?.signer;

		const newWorkflowData = {
			...workflowData,
			status_approver: workflowInfo?.status_persetujuan,
			on_approver: workflowInfo?.status_approver,
		};

		newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.fullName}`;
		newWorkflowData.maker = maker;

		if (approvers?.length) {
			const mappingApprovers = _.map(approvers, ({ pn, nama, is_signed }) => ({
				pn,
				nama,
				is_signed,
			}));
			newWorkflowData.ref_tim_audit_approver = mappingApprovers;
		}

		if (signers?.length) {
			const mappingSigners = _.map(signers, ({ nama, pn }) => ({ nama, pn }));
			newWorkflowData.ref_tim_audit_signer = mappingSigners;
		}

		if (workflowDetailEWP?.data?.log?.length) {
			const mapping = workflowDetailEWP?.data?.log?.map((v) => {
				return {
					"P.I.C": v?.from?.pn + " - " + v?.from?.nama,
					Alasan: v?.note,
					Status:
						v?.is_signed === true ? "Approved" : v?.is_signed === false ? "Rejected" : "",
					Tanggal: convertDate(v?.createdAt, "-", "d"),
				};
			});
			setHistoryWorkflow(mapping);
		}

		dispatch(setWorkflowData(newWorkflowData));
	}, [workflowDetailEWP]);
	// [ END ]

	// [ START ] function untuk Modal Workflow
	const handleAdd = (property) => {
		const newData = [...workflowData[property]];
		newData.push({
			pn: "",
			nama: "",
			is_signed: false,
		});
		dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
	};

	const handleDelete = (property, idx) => {
		const newData = [...workflowData[property]];
		newData.splice(idx, 1);
		dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
	};

	const handleChangeText = (property, value) => {
		dispatch(
			setWorkflowData({
				...workflowData,
				[property]: value,
			})
		);
	};

	const handleChangeSelect = (property, index, e) => {
		const newData = [...workflowData[property]];
		const updated = { ...newData[index] };
		updated["pn"] = e?.value?.pn;
		updated["nama"] = e?.value?.name;
		newData[index] = updated;
		dispatch(
			setWorkflowData({
				...workflowData,
				[property]: newData,
			})
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const schemaMapping = {
			schema: workflowSchema,
			resetErrors: resetValidationErrorsWorkflow,
			setErrors: setValidationErrorsWorkflow,
		};
		const validate = setErrorValidation(workflowData, dispatch, schemaMapping);

		if (validate) {
			const actionType = e.target.offsetParent.name;
			const data = {
				sub_modul: "surat_dio",
				sub_modul_id: surat_id,
			};

			const signedCount = workflowData?.ref_tim_audit_approver?.filter(
				(item) => item.is_signed
			).length;

			switch (actionType) {
				case "change":
					data.approvers = workflowData.ref_tim_audit_approver;
					data.signers = workflowData.ref_tim_audit_signer;
					break;
				case "create":
					data.approvers = workflowData.ref_tim_audit_approver;
					data.signers = workflowData.ref_tim_audit_signer;
					break;
				case "reject":
					data.note = workflowData.note;
					break;
				case "approve":
					if (signedCount < 2) {
						data.data = "<p>pirli test</p>";
					}
					data.note = workflowData.note;
					break;
			}

			if (actionType === "reset") {
				const confirm = await confirmationSwal(
					"Terkait dengan workflow ini, apakah Anda yakin ingin melakukan pengaturan ulang?"
				);
				if (!confirm.value) {
					return;
				}
			}

			if (actionType === "change") {
				const response = await useUpdateData(
					`${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/change`,
					data
				);
				if (!response.isDismissed) return;
			} else {
				await usePostData(
					`${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/${actionType}`,
					data
				);
			}

			workflowDetailEWPMutate();
			dispatch(resetWorkflowData());
			setShowModalApproval(false);
		}
		workflowDetailEWPMutate();
	};
	// [ END ]

	return (
		<SuratLayoutEWP
			menu={[
				{ name: "Overview", href: `/surat-dio` },
				{ name: "Approval", href: `/surat-dio/${surat_id}/dokumen` },
			]}
		>
			<Breadcrumbs data={breadcrumbs} />
			<div className="flex justify-between items-center mb-6">
				<PageTitle text={"Preview Dokumen"} />
				<PrevNextNavigation baseUrl={baseUrl} prevUrl={"/"} />
			</div>
			{/* Start Content */}
			<div className="flex w-full gap-6">
				<div className="w-64">
					<div>
						<Card>
							<div className="px-3 py-1 w-full">
								<div className="text-xl">Lampiran</div>
								<div className="pl-2 mt-2 text-atlasian-blue-light">
									{suratData?.lampiran_file && (
										<div>
											{suratData?.lampiran_file.map((file) => (
												<p>
													<a href={`${file?.url}`} blank>
														{file?.name}
													</a>
												</p>
											))}
										</div>
									)}
								</div>
							</div>
						</Card>
					</div>
				</div>
				<div>
					<div className="mb-2">
						<Card>
							<div className="my-2">
								<div className="flex justify-between gap-x-16">
									<div>
										<p className="font-bold">Kode Surat</p>
										<p>{suratData?.kode_surat || ""}</p>
									</div>
									<div>
										<p className="font-bold">Nomor Surat DIO</p>
										<p>{suratData?.return_nomor_surat || ""}</p>
									</div>
									<div>
										<p className="font-bold">Tingkat Kepentingan</p>
										<p>{suratData?.tingkat_kepentingan_name || ""}</p>
									</div>
									<div>
										<p className="font-bold">Tingkat Kerahasiaan</p>
										<p>{suratData?.tingkat_kerahasiaan_name || ""}</p>
									</div>
									<div>
										<p className="font-bold">SLA (Hari)</p>
										<p>{suratData?.sla || ""}</p>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<Card>
						<div className="overflow-y-scroll mt-10 parent max-h-[30rem]">
							<div className={`page-container-a4 shrink-0`}>
								<div className="px-2 h-full w-full relative page-content-a4">
									<div className="flex justify-between"></div>
									<div
										className="mt-4"
										dangerouslySetInnerHTML={{ __html: `${suratData?.content || ""}` }}
									/>
								</div>
							</div>
						</div>
					</Card>
				</div>
				<div>
					<DivButton
						handleClick={() => setShowModalApproval(true)}
						className="no-underline hover:no-underline w-56 mb-4"
					>
						<div>
							<Card>
								<div className="w-full">
									<div className="px-3">
										<p className="text-brisma font-bold text-xl">Approval Surat</p>
										<ApprovalItems title={"P.I.C"} text={workflowData?.maker?.fullName} />
										<ApprovalItems
											title={"Approver"}
											text={workflowData?.ref_tim_audit_approver}
											data={workflowData}
										/>
										<ApprovalItems title={"Signer"} text={workflowData?.ref_tim_audit_signer} />
									</div>
								</div>
							</Card>
						</div>
					</DivButton>
					<div className="mb-4">
						<Card>
							<div className="w-full h-auto">
								<div className="px-3 mb-8">
									<p className="text-brisma font-bold text-xl">Riwayat</p>
								</div>
								<div className="px-3 flex flex-col justify-normal mb-4">
									<span>
										<p className="text-brisma font-bold text-sm">Disunting 05/06/2023</p>
									</span>
									<span>
										<p className="text-brisma text-sm">00999002</p>
									</span>
									<span>
										<p className="text-brisma text-sm">Dandy</p>
									</span>
								</div>
								<div className="px-3 flex flex-col justify-normal mb-4">
									<span>
										<p className="text-brisma font-bold text-sm">Disunting 05/06/2023</p>
									</span>
									<span>
										<p className="text-brisma text-sm">00999002</p>
									</span>
									<span>
										<p className="text-brisma text-sm">Dandy</p>
									</span>
								</div>
							</div>
						</Card>
					</div>
					<div>
						<Card>
							<div className="w-full h-auto">
								<div className="px-3 mb-4">
									<p className="text-brisma font-bold text-xl">Tindakan</p>
								</div>
								<div className="px-3 flex justify-center items-center mb-4">
									<div className="w-[8.75rem] h-10 bg-atlasian-yellow rounded flex items-center">
										<ButtonField
											text={"Edit"}
											handler={() => {
												return router.push(`${baseUrl}/konten-surat`);
											}}
										/>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<ModalWorkflowEWP
						workflowData={workflowData}
						historyWorkflow={historyWorkflow}
						validationErrors={validationErrorsWorkflow}
						setShowModal={setShowModalApproval}
						showModal={showModalApproval}
						headerTitle={"Approval Surat DIO"}
						handleChange={handleChangeText}
						handleChangeSelect={handleChangeSelect}
						handleDelete={handleDelete}
						handleAdd={handleAdd}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
			{/* End Content */}
		</SuratLayoutEWP>
	);
};

export default index;

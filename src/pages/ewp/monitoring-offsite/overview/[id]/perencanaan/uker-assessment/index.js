import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
	setObjData,
	setObjPayload,
	setValidationErrors,
	resetObjData,
	resetObjPayload,
	resetValidationErrors,
} from "@/slices/ewp/monitoring-offsite/perencanaan/ukerAssessmentEWPMonoffSlice";
import { useSelector } from "react-redux";
import {
	confirmationSwal,
	fetchApi,
	loadingSwal,
	setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import {
	UkerTable,
	ModalAddUker,
} from "@/components/molecules/ewp/monitoring-offsite/perencanaan/uker-assessment";
import { useUkerAssessment } from "@/data/ewp/monitoring-offsite/perencanaan/uker-assessment";
import ukerAssessmentEWPMonoffSchema from "@/helpers/schemas/ewp/monitoring-offsite/perencanaan/ukerAssessmentEWPMonoffSchema";

const routes = [
	{
		name: "Tim",
		slug: "tim",
	},
	{
		name: "UKER Assessment",
		slug: "uker-assessment",
	},
];

const index = () => {
	const dispatch = useDispatch();
	const { id } = useRouter().query;
	const baseUrl = `/ewp/monitoring-offsite/overview/${id}`;
	const pathName = `${baseUrl}/perencanaan`;

	const [breadcrumbs, setBreadcrumbs] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [typeModal, setTypeModal] = useState("");
	const [selectedId, setSelectedId] = useState("");

	const data = useSelector((state) => state.ukerAssessmentEWPMonoff.objData);
	const payload = useSelector(
		(state) => state.ukerAssessmentEWPMonoff.objPayload
	);
	const validation = useSelector(
		(state) => state.ukerAssessmentEWPMonoff.validationErrors
	);

	const { projectDetail } = useProjectDetail({ id });
	const { userAssessment, userAssessmentMutate } = useUkerAssessment({ id });

	useEffect(() => {
		setBreadcrumbs([
			{ name: "Menu", path: "/dashboard" },
			{ name: "EWP", path: "/ewp" },
			{ name: "Overview", path: "/ewp/monitoring-offsite/overview" },
			{
				name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Perencanaan Kegiatan`,
				path: pathName,
			},
			{
				name: `UKER Assessment`,
				path: `${baseUrl}/perencanaan/uker-assessment`,
			},
		]);
	}, [projectDetail]);

	useEffect(() => {
		if (userAssessment?.data?.length) {
			const mappingUkerAssessment = userAssessment?.data?.map((v) => {
				return _.pick(v, [
					"id",
					"tipe_uker",
					"ref_auditee_branch_name",
					"ref_auditee_branch_kode",
					"ref_auditee_orgeh_name",
					"ref_auditee_orgeh_kode",
				]);
			});
			dispatch(setObjData(mappingUkerAssessment));
		} else {
			dispatch(resetObjData());
		}
		console.log(userAssessment);
	}, [userAssessment]);

	// [ START ] handler for modal
	const handleCloseModal = async () => {
		const confirm = await confirmationSwal(
			"Apakah Anda ingin menutup modal ini?"
		);

		if (!confirm.value) {
			return;
		}

		setShowModal(false);
		setTypeModal("");
		setSelectedId("");
		dispatch(resetObjPayload());
		dispatch(resetValidationErrors());
	};

	const handleChangeText = (property, value) => {
		const updatedData = {
			...payload,
			[property]: value,
		};
		dispatch(setObjPayload(updatedData));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const schemaMapping = {
			schema: ukerAssessmentEWPMonoffSchema,
			resetErrors: resetValidationErrors,
			setErrors: setValidationErrors,
		};
		const validate = setErrorValidation(payload, dispatch, schemaMapping);

		if (validate) {
			loadingSwal();
			if (typeModal === "update") {
				await fetchApi(
					"PATCH",
					`${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/mapa/uker_info/${selectedId}`,
					payload
				);
			} else {
				await fetchApi(
					"POST",
					`${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/mapa/uker_info/${selectedId}`,
					payload
				);
			}

			userAssessmentMutate();
			setShowModal(false);
			setTypeModal("");
			setSelectedId("");
			dispatch(resetObjPayload());
			loadingSwal("close");
		}
	};
	// [ END ] handler for modal

	// [ START ] handler for table
	const handleClickAddTable = () => {
		setShowModal(true);
	};

	const handleClickUpdateTable = async (id) => {
		setSelectedId(id);
		setTypeModal("update");
		setShowModal(true);
	};

	const handleClickDeleteTable = async (id) => {
		const confirm = await confirmationSwal("Menghapus Uker.");

		if (!confirm.value) {
			return;
		}
		loadingSwal();
		await fetchApi(
			"DELETE",
			`${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/mapa/uker_info/${id}`,
			{ id }
		);
		userAssessmentMutate();
		loadingSwal("close");
	};
	// [ END ] handler for table

	return (
		<LandingLayoutEWPMonOff>
			{/* Start Breadcrumbs */}
			<Breadcrumbs data={breadcrumbs} />
			{/* End Breadcrumbs */}
			<div className="flex justify-between items-center mb-6">
				<PageTitle text="UKER Assessment" />
				<PrevNextNavigation
					baseUrl={pathName}
					routes={routes}
					marginLeft={"-60px"}
				/>
			</div>
			{/* Start Content */}
			<div className="w-full">
				<Card>
					<div className="px-6 pt-2 pb-4 w-full">
						<p className="ml-2 font-bold text-base">
							UKER Assessment
						</p>
						<div className="my-2 " />
						<UkerTable
							data={data}
							setShowModal={setShowModal}
							handleClickAddMatrix={handleClickAddTable}
							handleClickUpdate={handleClickUpdateTable}
							handleClickDelete={handleClickDeleteTable}
						/>
					</div>
				</Card>
			</div>
			<ModalAddUker
				data={payload}
				showModal={showModal}
				validation={validation}
				handleChangeText={handleChangeText}
				handleCloseModal={handleCloseModal}
				handleSubmit={handleSubmit}
			/>
			{/* End Content */}
		</LandingLayoutEWPMonOff>
	);
};

export default index;

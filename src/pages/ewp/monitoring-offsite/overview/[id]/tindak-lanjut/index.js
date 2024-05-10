import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
	setObjData,
	setValidationErrors,
	resetObjData,
	resetValidationErrors,
} from "@/slices/ewp/monitoring-offsite/tindak-lanjut/tindakLanjutEWPMonoffSlice";
import { useSelector } from "react-redux";
import { useTindakLanjut } from "@/data/ewp/monitoring-offsite/tindak-lanjut";
import {
	CardDescription,
	CardTeam,
} from "@/components/molecules/ewp/monitoring-offsite/tindak-lanjut";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import _ from "lodash";
import tindakLanjutEWPMonoffSchema from "@/helpers/schemas/ewp/monitoring-offsite/tindak-lanjut/tindakLanjutEWPMonoffSchema";

const routes = [
	{
		name: "Reporting",
		slug: "reporting",
	},
	{
		name: "Tim & Timeplan",
		slug: "tim-timeplan",
	},
	{ name: "Anggaran", slug: "anggaran" },
	{ name: "Program Kerja", slug: "program-kerja" },
	{ name: "Dokumen", slug: "dokumen" },
];

const index = () => {
	const dispatch = useDispatch();
	const { id } = useRouter().query;
	const baseUrl = `/ewp/monitoring-offsite/overview/${id}`;
	const pathName = `${baseUrl}/perencanaan`;

	const [breadcrumbs, setBreadcrumbs] = useState([]);

	const payload = useSelector((state) => state.tindakLanjutEWPMonoff.objData);
	const validation = useSelector(
		(state) => state.tindakLanjutEWPMonoff.validationErrors
	);

	const { projectDetail } = useProjectDetail({ id });
	const { tindakLanjut, tindakLanjutMutate, tindakLanjutError } =
		useTindakLanjut({
			id,
		});

	useEffect(() => {
		setBreadcrumbs([
			{ name: "Menu", path: "/dashboard" },
			{ name: "EWP", path: "/ewp" },
			{ name: "Overview", path: "/ewp/monitoring-offsite/overview" },
			{
				name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / tindak-lanjut`,
				path: `/ewp/monitoring-offsite/overview/${id}/tindak-lanjut`,
			},
		]);
	}, [projectDetail]);

	useEffect(() => {
		console.log(tindakLanjut);
		if (!tindakLanjutError) {
			const mappingAuditor = tindakLanjut?.data?.tim_audit?.auditor
				?.length
				? tindakLanjut?.data?.tim_audit?.auditor?.map((v) => {
						const { pn, nama, is_initiator } = v;
						return {
							pn,
							nama,
							is_initiator,
						};
				  })
				: [];

			const mappingDesc = tindakLanjut?.data?.tim_audit?.desc?.length
				? tindakLanjut?.data?.tim_audit?.desc?.map((v) => {
						const { deskripsi } = v;
						return {
							deskripsi,
						};
				  })
				: [];

			dispatch(
				setObjData({
					auditor: mappingAuditor,
					desc: mappingDesc,
				})
			);
		} else {
			dispatch(resetObjData());
		}
	}, [tindakLanjut, projectDetail]);

	const handleAddObjectInsideArray = (property) => {
		const newTimAudit = [...payload[property]];
		newTimAudit.push({ pn: "", nama: "", is_initiator: false });
		dispatch(setObjData({ ...payload, [property]: newTimAudit }));
	};

	const handleDeleteObjectInsideArray = (index, property) => {
		const newData = [...payload[property]];
		newData.splice(index, 1);
		dispatch(setObjData({ ...payload, [property]: newData }));
	};

	const handleChangeSelectValueObjectInsideArray = (
		property,
		index,
		value
	) => {
		const newData = [...payload[property]];
		const updated = {
			...newData[index],
			pn: value?.pn,
			nama: value?.name,
		};
		newData[index] = updated;
		dispatch(
			setObjData({
				...payload,
				[property]: newData,
			})
		);
	};

	const handleChangeTextValueObjectInsideArray = (
		property,
		propertyObj,
		index,
		value
	) => {
		const newData = [];
		const updated = {
			...newData[index],
			[propertyObj]: value,
		};
		newData[index] = updated;
		dispatch(
			setObjData({
				...payload,
				[property]: newData,
			})
		);
	};

	console.log(payload);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const schemaMapping = {
			schema: tindakLanjutEWPMonoffSchema,
			resetErrors: resetValidationErrors,
			setErrors: setValidationErrors,
		};
		const validate = setErrorValidation(payload, dispatch, schemaMapping);

		if (validate) {
			loadingSwal();
			await fetchApi(
				"POST",
				`${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/tindaklanjut/content/${id}`,
				{ tim_audit: _.omit(payload, ["initiator"]) }
			);
			tindakLanjutMutate();
			loadingSwal("close");
		}
	};

	return (
		<LandingLayoutEWPMonOff>
			{/* Start Breadcrumbs */}
			<Breadcrumbs data={breadcrumbs} />
			{/* End Breadcrumbs */}
			<div className="flex justify-between items-center mb-7">
				<PageTitle text="Tindak Lanjut" />
				<PrevNextNavigation
					baseUrl={pathName}
					routes={routes}
					prevUrl={"/sumber-informasi"}
					nextUrl={"/anggaran"}
					marginLeft={"-60px"}
				/>
			</div>
			{/* Start Content */}
			<Card>
				<div className="p-5 grid grid-cols-3 gap-3 w-full h-full">
					<CardTeam
						data={payload}
						validation={validation}
						property={"auditor"}
						title={"P.I.C Tindak Lanjut"}
						textColorTitle={"text-atlasian-red"}
						handleAdd={handleAddObjectInsideArray}
						handleDelete={handleDeleteObjectInsideArray}
						handleChangeSelect={
							handleChangeSelectValueObjectInsideArray
						}
					/>
				</div>
				<div className="px-5 pb-5 w-full">
					<CardDescription
						data={payload}
						validation={validation}
						property={"desc"}
						title={"Deskripsi Tindak Lanjut"}
						textColorTitle={"text-atlasian-green"}
						handleAdd={handleAddObjectInsideArray}
						handleDelete={handleDeleteObjectInsideArray}
						handleChangeSelect={
							handleChangeSelectValueObjectInsideArray
						}
						handleChangeText={
							handleChangeTextValueObjectInsideArray
						}
						withMandays
						withDescription
					/>
				</div>
			</Card>
			<div className="mt-3 flex justify-end">
				<div className="w-36 bg-atlasian-green rounded">
					<ButtonField text={"Simpan"} handler={handleSubmit} />
				</div>
			</div>
			{/* End Content */}
		</LandingLayoutEWPMonOff>
	);
};

export default index;

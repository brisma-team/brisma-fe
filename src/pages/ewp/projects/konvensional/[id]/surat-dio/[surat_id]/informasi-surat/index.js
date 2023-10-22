"use client";
import React from "react";
import {
	Breadcrumbs,
	ButtonField,
	PageTitle,
	TextInput,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import {
	loadingSwal,
	errorSwal,
	errorSwalTimeout,
	successSwal,
	withTokenConfig,
} from "@/helpers";
import SuratLayoutEWP from "@/layouts/ewp/SuratLayoutEWP";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
	BranchSelect,
	CardFormInput,
	CardWithHeaderLine,
	PrevNextNavigation,
} from "@/components/molecules/commons";
import useDetailSurat from "@/data/ewp/konvensional/surat-dio/useDetailSurat";
import { useForm } from "react-hook-form";
import { setSuratData } from "@/slices/ewp/konvensional/surat/suratEWPSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import InformasiSurat from "@/components/molecules/ewp/konvensional/surat-dio/InformasiSurat";
import PenerimaSurat from "@/components/molecules/ewp/konvensional/surat-dio/PenerimaSurat";
import Tindasan from "@/components/molecules/ewp/konvensional/surat-dio/Tindasan";
import PNPenerima from "@/components/molecules/ewp/konvensional/surat-dio/PNPenerima";
import Lampiran from "@/components/molecules/ewp/konvensional/surat-dio/Lampiran";
// Import yupResolver and any other dependencies needed

const routes = [
	{
		name: "Informasi Surat",
		slug: "informasi-surat",
	},
	{
		name: "Konten Surat",
		slug: "konten-surat",
	},
];

const Index = () => {
	const dispatch = useDispatch();
	const { id, surat_id } = useRouter().query;

	const baseUrl = `/ewp/projects/konvensional/${id}/surat-dio/${surat_id}`;
	const [data, setData] = useState({});

	const [isError, setIsError] = useState(false);
	const { suratDio, suratDioError, suratDioMutate } = useDetailSurat(surat_id);
	const suratDetail = useSelector((state) => state.suratEWP.suratData);
	console.log("state surat detail", suratDetail);

	useEffect(() => {
		dispatch(setSuratData(suratDio?.data));
	}, [suratDio]);

	// Handle form submission
	async function handleSubmit(e) {
		e.preventDefault();
		const buttonName = e.target.offsetParent.name;
		if (buttonName === "save") {
			try {
				let url = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/surat_dio/update/${surat_id}`;
				const result = await axios.patch(url, suratDetail, withTokenConfig());

				if (result.data.statusCode !== 200) {
					errorSwal(result.data);
				} else {
					successSwal(result.data.message);
				}
				suratDioMutate();
			} catch (error) {
				loadingSwal("close");
				errorSwal(error);
			}
		}
	}

	const { auditorEWP, auditorEWPError } = useAuditorEWP({ id });
	useEffect(() => {
		if (auditorEWPError) {
			setIsError(true);
		}
	}, [auditorEWPError]);

	if (isError) {
		errorSwalTimeout(auditorEWPError, "/ewp/projects/konvensional");
	}

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
			name: `Informasi Surat`,
			path: `/ewp/projects/konvensional/${id}/surat-dio/${surat_id}/informasi-surat`,
		},
	];

	return (
		<SuratLayoutEWP
			menu={[
				{ name: "Informasi Surat", href: `/surat-dio/${surat_id}/informasi-surat` },
				{ name: "Konten", href: `/surat-dio/${surat_id}/konten-surat` },
			]}
		>
			<div className="pr-24">
				<Breadcrumbs data={breadcrumbs} />
				<div className="flex justify-between items-center mb-6">
					<PageTitle text={"Informasi Surat"} />
					<PrevNextNavigation
						baseUrl={baseUrl}
						routes={routes}
						nextUrl={"/konten-surat"}
						marginLeft={"-60px"}
					/>
				</div>
				<div className="w-full flex gap-2 mb-2">
					<div className="w-3/5">
						<InformasiSurat></InformasiSurat>
					</div>
					<div className="w-2/5">
						<CardWithHeaderLine title={"Penerima Surat"}>
							<div className="mb-4">
								<PenerimaSurat></PenerimaSurat>
							</div>
							<PNPenerima></PNPenerima>
						</CardWithHeaderLine>
					</div>
				</div>
				<div className="w-full flex gap-2">
					<div className="w-3/5">
						<CardWithHeaderLine title={"Lampiran"}>
							<Lampiran></Lampiran>
						</CardWithHeaderLine>
					</div>
					<div className="w-2/5">
						<CardWithHeaderLine title={"Tindasan"}>
							<Tindasan></Tindasan>
						</CardWithHeaderLine>
					</div>
				</div>
				<form className="w-full flex justify-end mt-4" onSubmit={handleSubmit}>
					<div className="w-28 h-8 bg-atlasian-green rounded">
						<ButtonField
							text={"Simpan"}
							type={"submit"}
							name={"save"}
							handler={handleSubmit}
						/>
					</div>
				</form>
			</div>
		</SuratLayoutEWP>
	);
};

export default Index;

import React, { useState, useEffect } from "react";
import {
	Breadcrumbs,
	ButtonField,
	Card,
	PageTitle,
	UploadButton,
} from "@/components/atoms";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
	PopupKlipping,
	PrevNextNavigation,
} from "@/components/molecules/commons";
import { useRouter } from "next/router";
import {
	copyToClipboard,
	errorSwal,
	loadingSwal,
	successSwal,
	usePostData,
	usePostFileData,
	withTokenConfig,
} from "@/helpers";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import SuratLayoutEWP from "@/layouts/ewp/SuratLayoutEWP";
import useDetailSurat from "@/data/ewp/konvensional/surat-dio/useDetailSurat";
import axios from "axios";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
	ssr: false,
});

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

const index = () => {
	const router = useRouter();
	const { id, surat_id } = useRouter().query;
	const baseUrl = `/ewp/projects/konvensional/${id}/surat-dio/${surat_id}`;
	const [data, setData] = useState({
		content: "",
	});
	const [imageClipList, setImageClipList] = useState([]);

	const { auditorEWP } = useAuditorEWP({ id });
	const { suratDio } = useDetailSurat(surat_id);
	console.log(suratDio);
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
			name: `Konten Surat`,
			path: `/ewp/projects/konvensional/${id}/surat-dio/${surat_id}/konten-surat`,
		},
	];

	useEffect(() => {
		setData({
			content: suratDio?.data?.content ? suratDio?.data?.content : "",
		});
	}, [suratDio]);

	const handlePost = async () => {
		let url = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/surat_dio/update/${surat_id}`;
		const result = await axios.patch(url, data, withTokenConfig());
		if (result.data.statusCode !== 200) {
			errorSwal(result.data);
		}
		successSwal(result.data.message);
	};

	const handleUpload = async (e) => {
		loadingSwal();
		if (e.target.files) {
			const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

			const response = await usePostFileData(url, {
				file: e.target.files[0],
				modul: "ewp",
			});

			setImageClipList((prev) => [
				...prev,
				{ url: response.url[0], name: e.target.files[0].name },
			]);
		}

		loadingSwal("close");
	};

	return (
		<SuratLayoutEWP
			menu={[
				{ name: "Informasi Surat", href: `/surat-dio/${surat_id}/informasi-surat` },
				{ name: "Konten", href: `/surat-dio/${surat_id}/konten-surat` },
			]}
		>
			{/* Start Breadcrumbs */}
			<Breadcrumbs data={breadcrumbs} />
			{/* End Breadcrumbs */}
			<div className="flex justify-between items-center mb-6">
				<PageTitle text={"Konten Surat"} />
				<PrevNextNavigation
					baseUrl={baseUrl}
					routes={routes}
					prevUrl={"/informasi-surat"}
					marginLeft={"-60px"}
				/>
			</div>
			{/* Start Content */}
			<div className="my-4 flex">
				<div className="w-64 mr-6">
					<div>
						<Card>
							<div className="w-full px-4 -ml-1">
								<div className="flex justify-between">
									<p className="text-xl font-semibold">Kliping Gambar</p>
									<PopupKlipping />
								</div>
								{/* Start Kliping Gambar */}
								<div
									className="grid grid-cols-2 -mx-1 mt-2 overflow-scroll overflow-x-hidden"
									style={{ maxHeight: "37rem" }}
								>
									{imageClipList.length
										? imageClipList?.map((v, i) => {
												return (
													<button
														key={i}
														className="m-2 border-2 shadow-sm rounded-lg p-3"
														style={{ width: "6.25rem", height: "6.25rem" }}
														onClick={() => copyToClipboard(v?.url)}
													>
														<Image src={v?.url} alt={v?.name} width={200} height={200} />
													</button>
												);
										  })
										: ""}
								</div>
								<div className="mt-4 py-2 bg-none w-full justify-start">
									<UploadButton
										text={"Tambah Kliping +"}
										fileAccept={"image/png, image/gif, image/jpeg"}
										handleUpload={handleUpload}
										className={"text-atlasian-purple text-sm"}
									/>
								</div>
								{/* End Kliping Gambar */}
							</div>
						</Card>
					</div>
				</div>
				<div>
					<div className="ckeditor-sumber-informasi-mapa-ewp overflow-x-hidden">
						<Editor
							contentData={data.content}
							disabled={false}
							ready={true}
							onChange={(value) => setData({ content: value })}
						/>
					</div>
					<div className="flex gap-2 justify-end mt-3">
						<div className="w-[7.75rem] h-10 bg-atlasian-blue-light rounded flex items-center">
							<ButtonField
								text={"Preview"}
								handler={() => {
									return router.push(`${baseUrl}/dokumen`);
								}}
							/>
						</div>
						<div className="w-[7.75rem] h-10 bg-atlasian-green rounded flex items-center">
							<ButtonField text={"Simpan"} handler={handlePost} />
						</div>
					</div>
				</div>
			</div>
			{/* End Content */}
		</SuratLayoutEWP>
	);
};

export default index;

import { ButtonIcon, DivButton, Select } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CustomSelect from "@/components/molecules/commons/CustomSelect";
import useJenisSurat from "@/data/ewp/konvensional/surat-dio/useJenisSurat";
import {
	confirmationSwal,
	errorSwal,
	loadingSwal,
	successSwal,
	withTokenConfig,
} from "@/helpers";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const SuratDrawer = ({
	isOpen,
	closeDrawer,
	onClickOutside,
	isHovered,
	setIsHovered,
	ewp_id,
}) => {
	const router = useRouter();
	const [optionJenisSurat, setOptionJenisSurat] = useState([]);
	const [showTemplate, setShowTemplate] = useState([]);
	const [selectedJenisSurat, setSelectedJenisSurat] = useState({});
	const [templateDetail, setTemplateDetail] = useState({});

	const { jenisSurat, jenisSuratError, jenisSuratMutate } = useJenisSurat();

	const handleClickCard = async (template) => {
		const confirm = await confirmationSwal(
			"Apakah Anda yakin untuk Menambahkan Surat?"
		);

		if (!confirm.value) {
			return;
		}

		loadingSwal();

		console.log("clicked card", template);
		let data = {
			ewp_id: ewp_id,
			jenis_surat_kode: template.mtd_jenis_surat_kode,
			jenis_surat_name: template.mtd_jenis_surat_name,
			jenis_template_kode: template.kode,
			jenis_template_name: template.nama,
		};
		let url = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/surat_dio/create`;
		const result = await axios.post(url, data, withTokenConfig());
		if (result.data.statusCode !== 200) {
			errorSwal(result.data);
		}
		successSwal(result.data.message);
		router.push(
			`/ewp/projects/konvensional/${ewp_id}/surat-dio/${result.data.data.id}/informasi-surat`
		);
	};

	useEffect(() => {
		if (jenisSurat) {
			const mapping = jenisSurat.data.map((e) => {
				return {
					label: e.nama,
					value: e.kode,
				};
			});
			setOptionJenisSurat(mapping);
		}
	}, [jenisSurat]);

	const handleChangeJenisSurat = async (e) => {
		setSelectedJenisSurat(e);
		let url = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_surat/all/${e.value}`;
		console.log(withTokenConfig());
		const result = await axios.get(url, withTokenConfig());
		if (result.data.statusCode !== 200) {
			errorSwal(result.data);
		}
		setShowTemplate(result.data.data);
	};

	console.log(showTemplate, "TEMPLATE");

	const ref = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				onClickOutside();
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [onClickOutside]);

	// Handle mouse enter to show/hide the left div
	const handleMouseEnter = (template) => {
		setIsHovered(true);
		setTemplateDetail(template);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setTemplateDetail({});
	};

	console.log("HOVER", isHovered, templateDetail);

	return (
		<div
			ref={ref}
			className={`fixed right-0 top-0 h-full overflow-hidden transition-transform transform ${
				isOpen ? "translate-x-0" : "translate-x-full"
			} z-10`}
		>
			<div
				className={`relative top-0 flex rounded-lg text-left transition-transform sm:my-8 sm:align-middle  w-[1000px] h-full ${
					isOpen ? "transform translate-x-0" : "transform translate-x-full"
				}`}
				aria-hidden="true"
			>
				<div className="absolute right-0 h-full w-[450px] bg-white shadow-xl px-4">
					<div className="flex justify-end pt-10">
						<ButtonIcon
							icon={<IconClose size="10"></IconClose>}
							handleClick={closeDrawer}
						></ButtonIcon>
					</div>
					<div className="w-48 mb-4">
						<p className="text-xl text-atlasian-dark font-bold mb-2">
							Pilih Jenis Template
						</p>
						<CustomSelect
							placeholder="Pilih Jenis Surat"
							isSearchable={false}
							optionValue={optionJenisSurat}
							handleChange={handleChangeJenisSurat}
							selectedValue={selectedJenisSurat}
						/>
					</div>
					<hr />
					<p className="text-xs mb-4">
						Menampilkan {showTemplate ? showTemplate.length : "0"} template surat
					</p>
					<div className="relative">
						{showTemplate &&
							showTemplate.map((template) => (
								<DivButton
									handleClick={() => handleClickCard(template)}
									className="p-3 hover:bg-gray-200 hover:rounded-[10px] hover:no-underline "
									onMouseEnter={() => handleMouseEnter(template)}
									onMouseLeave={() => handleMouseLeave(template)}
								>
									<div className="mb-2">
										<p className="text-xl text-atlasian-blue-light -mb-2">{template.kode}</p>
										<p className="text-sm">{template.perihal}</p>
									</div>
								</DivButton>
							))}
					</div>
				</div>
				{isHovered && (
					<div className="relative -right-5 h-[180mm] z-50 top-20 w-[500px] ">
						<div className="h-full w-full absolute bg-white shadow-xl rounded-xl p-4">
							<p className="text-atlasian-blue-light mb-2 text-sm p-2">
								Surat {templateDetail?.kode}
							</p>
							<hr></hr>
							<div
								className="mt-4 p-2 text-xs"
								dangerouslySetInnerHTML={{
									__html: `${templateDetail.content ? templateDetail.content : ""}`,
								}}
							></div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SuratDrawer;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuratData } from "@/slices/ewp/konvensional/surat/suratEWPSlice";
import { TextInput } from "flowbite-react";
import { CardWithHeaderLine } from "@/components/molecules/commons";

const InformasiSurat = () => {
	const dispatch = useDispatch();
	const suratDetail = useSelector((state) => state.suratEWP.suratData);

	// Create a function to update the Redux state with the changed value
	const handleChange = (property, value) => {
		const updateData = {
			...suratDetail,
			[property]: value,
		};
		dispatch(setSuratData(updateData));
	};

	return (
		<CardWithHeaderLine title={"Informasi Surat"}>
			<div className="mb-2">
				<p className="text-sm text-brisma mb-2 font-medium">Kepada Yth</p>
				<TextInput
					onChange={(e) => handleChange("yth", e.target.value)}
					value={suratDetail?.yth || ""} // Populate the field with data
				/>
			</div>
			<div className="mb-2">
				<p className="text-sm text-brisma mb-2 font-medium">Perihal</p>
				<TextInput
					onChange={(e) => handleChange("perihal", e.target.value)} // Fix property name to "perihal"
					value={suratDetail?.perihal || ""} // Populate the field with data
				/>
			</div>
			<div className="flex mb-2 gap-8">
				<div className="w-1/2">
					<p className="text-sm text-brisma mb-2 font-medium">Jenis Template</p>
					<TextInput value={suratDetail?.jenis_template_name || ""} disabled />
				</div>
				<div className="w-1/2">
					<p className="text-sm text-brisma mb-2 font-medium">Jenis Surat</p>
					<TextInput value={suratDetail?.jenis_surat_name || ""} disabled />
				</div>
			</div>
			<div className="flex mb-2 gap-8">
				<div className="w-1/2">
					<p className="text-sm text-brisma mb-2 font-medium">Tingkat kepentingan</p>
					<TextInput value={suratDetail?.tingkat_kepentingan_name || ""} disabled />
				</div>
				<div className="w-1/2">
					<p className="text-sm text-brisma mb-2 font-medium">Tingkat Kerahasiaan</p>
					<TextInput value={suratDetail?.tingkat_kerahasiaan_name || ""} disabled />
				</div>
			</div>
			<div className="flex mb-2 gap-8">
				<div className="w-1/2">
					<p className="text-sm text-brisma mb-2 font-medium">Kode Surat</p>
					<TextInput
						onChange={(e) => handleChange("kode_surat", e.target.value)}
						value={suratDetail?.kode_surat || ""} // Populate the field with data
					/>
				</div>
				<div className="w-1/2">
					<p className="text-sm text-brisma mb-2 font-medium">SLA (Hari)</p>
					<TextInput
						type="number"
						onChange={(e) => handleChange("sla", e.target.value)} // Fix property name to "sla"
						value={suratDetail?.sla || ""} // Populate the field with data
					/>
				</div>
			</div>
		</CardWithHeaderLine>
	);
};

export default InformasiSurat;

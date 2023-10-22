import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuratData } from "@/slices/ewp/konvensional/surat/suratEWPSlice";
import { TextInput } from "flowbite-react";
import {
	BranchSelect,
	CardFormInput,
	CardWithHeaderLine,
	OrgehSelect,
} from "@/components/molecules/commons";
import { ButtonIcon, UploadButton } from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import Link from "next/link";
import PNPenerima from "./PNPenerima";
import { loadingSwal, usePostFileData } from "@/helpers";

const Lampiran = () => {
	const dispatch = useDispatch();
	const suratDetail = useSelector((state) => state.suratEWP.suratData);
	const [uploadIndex, setUploadIndex] = useState(0);

	const handleAdd = (property) => {
		console.log(property);
		let newUkaPenerima;
		if (suratDetail[property]) {
			// Check if the property exists and is an array
			newUkaPenerima = [...suratDetail[property]]; // Create a copy of the array
		} else {
			newUkaPenerima = [];
		}
		// const newUkaPenerima = suratDetail[property];

		newUkaPenerima.push({
			url: "",
			name: "",
		});

		console.log("add", newUkaPenerima);
		const updatedData = {
			...suratDetail,
			[property]: newUkaPenerima,
		};
		dispatch(setSuratData(updatedData));
	};

	const handleUpload = async (e) => {
		loadingSwal();
		if (e.target.files?.length) {
			const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

			const response = await usePostFileData(url, {
				file: e.target.files[0],
				modul: "ewp",
			});

			const lampiran = [...suratDetail.lampiran_file];
			const updatedLampiran = { ...lampiran[uploadIndex] };
			updatedLampiran["url"] = response.url[0];
			updatedLampiran["name"] = e.target.files[0].name;
			lampiran[uploadIndex] = updatedLampiran;
			const updatedData = {
				...suratDetail,
				lampiran_file: lampiran,
			};
			dispatch(setSuratData(updatedData));
		}
		loadingSwal("close");
	};

	const handleDeleteLampiran = (idx) => {
		const newData = [...suratDetail.lampiran_file];
		newData.splice(idx, 1);
		const updatedData = {
			...suratDetail,
			lampiran_file: newData,
		};
		dispatch(setSuratData(updatedData));
	};

	return (
		<CardFormInput
			title={"Lampiran"}
			buttonText="Uker"
			buttonBottom={true}
			className={"text-brisma"}
			handleClickButtonBottom={() => handleAdd("lampiran_file")}
		>
			<div className="w-full -mb-2">
				{suratDetail?.lampiran_file?.map((x, index) => {
					return (
						<div key={index} className="flex gap-3 mb-2">
							<div className="flex gap-3 w-full">
								<div className="w-full">
									<TextInput disabled={true} value={x.name || ""}></TextInput>
								</div>
							</div>
							<div className="flex items-center justify-center gap-2 bg-atlasian-blue-light px-8 rounded-lg">
								{/* <UploadButton
									text={"Upload"}
									handleUpload={(e, i) => handleUpload(e, i, index)}
									className={"text-white text-sm"}
								/> */}
								<>
									<label
										htmlFor="fileInput"
										className={`cursor-pointer text-white text-sm `}
										onClick={() => setUploadIndex(index)}
									>
										Upload
									</label>
									<input id="fileInput" type="file" className="hidden" onChange={handleUpload} />
								</>
								{/* <Link
									className="no-underline hover:no-underline w-7 h-7 flex items-center justify-center rounded-full border border-atlasian-red text-atlasian-red hover:text-atlasian-red"
									href={"#"}
									onClick={(e) => handleUpload(e, index)}
								>
									<IconClose />
								</Link> */}
							</div>
							<div className="flex items-center justify-center">
								<Link
									className="no-underline hover:no-underline w-7 h-7 flex items-center justify-center rounded-full border border-atlasian-red text-atlasian-red hover:text-atlasian-red"
									href={"#"}
									onClick={() => handleDeleteLampiran(index)}
								>
									<IconClose />
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</CardFormInput>
	);
};

export default Lampiran;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuratData } from "@/slices/ewp/konvensional/surat/suratEWPSlice";
import { TextInput } from "flowbite-react";
import {
	BranchSelect,
	CardFormInput,
	CardWithHeaderLine,
	OrgehSelect,
	PekerjaSelect,
} from "@/components/molecules/commons";
import { ButtonIcon } from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import Link from "next/link";

const PNPenerima = () => {
	const dispatch = useDispatch();
	const suratDetail = useSelector((state) => state.suratEWP.suratData);

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
			pn: "",
			name: "",
		});

		const updatedData = {
			...suratDetail,
			[property]: newUkaPenerima,
		};
		dispatch(setSuratData(updatedData));
	};
	const handleChangePN = (value, idx) => {
		const PNPenerimaData = [...suratDetail.pn_penerima];
		const updatePN = { ...PNPenerimaData[idx] };
		updatePN["pn"] = value.pn;
		updatePN["name"] = value.name;
		PNPenerimaData[idx] = updatePN;
		const updatedData = {
			...suratDetail,
			pn_penerima: PNPenerimaData,
		};
		dispatch(setSuratData(updatedData));
	};

	const handleDeletePN = (idx) => {
		const newData = [...suratDetail.pn_penerima];
		newData.splice(idx, 1);
		const updatedData = {
			...suratDetail,
			pn_penerima: newData,
		};
		dispatch(setSuratData(updatedData));
	};

	return (
		<CardFormInput
			title={"PN Penerima"}
			buttonText="PN"
			buttonBottom={true}
			className={"text-atlasian-blue-light"}
			handleClickButtonBottom={() => handleAdd("pn_penerima")}
		>
			<div className="w-full -mb-2">
				{suratDetail?.pn_penerima?.map((x, idx) => {
					return (
						<div key={idx} className="flex gap-3 mb-2">
							<div className="flex gap-3 w-full">
								<div className="w-full">
									<PekerjaSelect
										handleChange={(e) => handleChangePN(e.value, idx)}
										selectedValue={{
											label: `${x.pn} - ${x.name}`,
											value: { x },
										}}
									/>
								</div>
							</div>
							<div className="flex items-center justify-center gap-2">
								<Link
									className="no-underline hover:no-underline w-7 h-7 flex items-center justify-center rounded-full border border-atlasian-red text-atlasian-red hover:text-atlasian-red"
									href={"#"}
									onClick={() => handleDeletePN(idx)}
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

export default PNPenerima;

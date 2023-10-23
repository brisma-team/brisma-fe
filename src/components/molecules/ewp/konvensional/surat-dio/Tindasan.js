import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuratData } from "@/slices/ewp/konvensional/surat/suratEWPSlice";
import { TextInput } from "flowbite-react";
import {
	BranchSelect,
	CardFormInput,
	CardWithHeaderLine,
	OrgehSelect,
} from "@/components/molecules/commons";
import { ButtonIcon } from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import Link from "next/link";

const Tindasan = () => {
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
			ref_auditee_branch_kode: "",
			ref_auditee_branch_name: "",
			ref_auditee_orgeh_kode: "",
			ref_auditee_orgeh_name: "",
		});

		console.log("add", newUkaPenerima);
		const updatedData = {
			...suratDetail,
			[property]: newUkaPenerima,
		};
		dispatch(setSuratData(updatedData));
	};
	const handleChangeOrgehBranch = (value, idx, type) => {
		const ukerData = [...suratDetail.tindasan];
		const updatedUker = { ...ukerData[idx] };
		switch (type) {
			case "orgeh":
				updatedUker["ref_auditee_orgeh_kode"] = value.orgeh_kode;
				updatedUker["ref_auditee_orgeh_name"] = value.orgeh_name;
				break;
			case "branch":
				updatedUker["ref_auditee_branch_kode"] = value.branch_kode;
				updatedUker["ref_auditee_branch_name"] = value.branch_name;
				break;
		}
		ukerData[idx] = updatedUker;
		const updatedData = {
			...suratDetail,
			tindasan: ukerData,
		};
		dispatch(setSuratData(updatedData));
	};

	const handleDeleteUker = (idx) => {
		const newData = [...ukerAssessmentData];
		newData.splice(idx, 1);
		dispatch(setUkerAssessmentData(newData));
	};

	// Create a function to update the Redux state with the changed value
	const handleChange = (property, value) => {
		const updateData = {
			...suratDetail,
			[property]: value,
		};
		dispatch(setSuratData(updateData));
	};

	return (
		<CardFormInput
			title={"UKER/BRANCH Tindasan"}
			buttonText="Uker"
			buttonBottom={true}
			className={"text-amber-400"}
			handleClickButtonBottom={() => handleAdd("tindasan")}
		>
			<div className="w-full -mb-2">
				{suratDetail?.tindasan?.map((x, idx) => {
					return (
						<div key={idx} className="flex gap-3 mb-2">
							<div className="flex gap-3 w-full">
								<div className="w-1/2">
									<OrgehSelect
										handleChange={(e) => handleChangeOrgehBranch(e.value, idx, "orgeh")}
										selectedValue={{
											label: x.ref_auditee_orgeh_name,
											value: {
												orgeh_kode: x.ref_auditee_orgeh_kode,
												orgeh_name: x.ref_auditee_orgeh_name,
											},
										}}
										// isDisabled={isDisabled}
									/>
								</div>
								<div className="w-1/2">
									<BranchSelect
										handleChange={(e) => handleChangeOrgehBranch(e.value, idx, "branch")}
										selectedValue={{
											label: x.ref_auditee_branch_name,
											value: {
												branch_kode: x.ref_auditee_branch_kode,
												branch_name: x.ref_auditee_branch_name,
											},
										}}
										// isDisabled={isDisabled}
									/>
									{/* {validationErrors[
										`ref_tim_audit_ata[${i}].uker_binaans[${idx}].branch_kode`
									] && (
										<ErrorValidation
											message={
												validationErrors[`ref_tim_audit_ata[${i}].uker_binaans[${idx}].branch_kode`]
											}
										/>
									)} */}
								</div>
							</div>
							<div className="flex items-center justify-center gap-2">
								<Link
									className="no-underline hover:no-underline w-7 h-7 flex items-center justify-center rounded-full border border-atlasian-red text-atlasian-red hover:text-atlasian-red"
									href={"#"}
									// onClick={() => handlerAddChild(i)}
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

export default Tindasan;

import RoleSelect from "../RoleSelect";
import UkaSelect from "../UkaSelect";
import errorSwal from "@/helpers/errorSwal";
import withTokenConfig from "@/helpers/withTokenConfig";
import PekerjaSelect from "../PekerjaSelect";
import loadingSwal from "@/helpers/loadingSwal";
import confirmationSwal from "@/helpers/confirmationSwal";
import successSwal from "@/helpers/successSwal";
import useUserSKAIDetail from "@/data/useUserSKAIDetail";
import useRole from "@/data/useRole";
import useUka from "@/data/useUka";

import React, { useEffect } from "react";
import { Card, Label, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";

const schema = yup.object().shape({
	pn: yup
		.object()
		.transform((value) => (value === "" ? undefined : value))
		.required("Silakan isi nomor PN user."),
	role_kode: yup.array().min(1, "Silakan pilih minimal 1 role."),
	uka_kode: yup
		.object()
		.transform((value) => (value === "" ? undefined : value))
		.required("Silakan pilih UKA."),
});

export default function Form({ type, pn }) {
	const { userSKAIDetail } = useUserSKAIDetail(pn);
	const { role } = useRole();
	const { uka } = useUka();

	const {
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		control,
	} = useForm({
		defaultValues: {
			pn: "",
			role_kode: [],
			uka_kode: "",
		},
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (userSKAIDetail) {
			switch (type) {
				case "update":
					setValue("pn", {
						label: userSKAIDetail.data.pn,
						value: userSKAIDetail.data.pn,
					});
			}
		}
	}, [userSKAIDetail]);

	useEffect(() => {
		if (userSKAIDetail && role) {
			switch (type) {
				case "update":
					const selectedRole = [];

					for (
						let x = 0;
						x < userSKAIDetail.data.role_kode.length;
						x++
					) {
						for (let y = 0; y < role.data.length; y++) {
							if (
								userSKAIDetail.data.role_kode[x] ===
								role.data[y].kode
							) {
								selectedRole.push(role.data[y]);
							}
						}
					}
					const mappedSelectedRole = selectedRole.map((row) => {
						return {
							label: row.name,
							value: row.kode,
						};
					});

					setValue("role_kode", mappedSelectedRole);
			}
		}
	}, [userSKAIDetail, role]);

	useEffect(() => {
		if (userSKAIDetail && uka) {
			switch (type) {
				case "update":
					const selectedUka = uka.data.data.filter((row) => {
						return row.kode === userSKAIDetail.data.uka_kode;
					});

					setValue("uka_kode", {
						label: selectedUka[0].name,
						value: selectedUka[0].kode,
					});
			}
		}
	}, [userSKAIDetail, uka]);

	async function onSubmit(data) {
		const confirm = await confirmationSwal(
			"Apakah anda yakin untuk membuat data ini?"
		);

		if (!confirm.value) {
			return;
		}

		loadingSwal();

		const url = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai/${type}`;
		const mappedData = {
			pn: data.pn.value,
			role_kode: data.role_kode.map((row) => {
				return row.value;
			}),
			uka_kode: data.uka_kode.value,
		};

		try {
			let request;

			switch (type) {
				case "create":
					request = axios.post(url, mappedData, withTokenConfig());
					break;
				default:
					request = axios.patch(url, mappedData, withTokenConfig());
			}

			const result = await request;

			loadingSwal("close");

			await successSwal(result.data.message);

			switch (type) {
				case "create":
					reset();
			}
		} catch (error) {
			loadingSwal("close");

			errorSwal(error);
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex">
					<div className="w-1/6">
						<Label htmlFor="pn" value="PN" />
					</div>
					<div className="flex-1">
						<PekerjaSelect control={control} type={type} />
						<small className="text-red-500">
							{errors.pn?.message}
						</small>
					</div>
				</div>
				<div className="flex">
					<div className="w-1/6">
						<Label htmlFor="role_kode" value="Role Kode" />
					</div>
					<div className="flex-1">
						<RoleSelect control={control} />
						<small className="text-red-500">
							{errors.role_kode?.message}
						</small>
					</div>
				</div>
				<div className="flex">
					<div className="w-1/6">
						<Label htmlFor="uka_kode" value="UKA Kode" />
					</div>
					<div className="flex-1">
						<UkaSelect control={control} />
						<small className="text-red-500">
							{errors.uka_kode?.message}
						</small>
					</div>
				</div>
				<div className="flex justify-end gap-x-4">
					<div className="w-1/6">
						<Link href="/users">
							<Button color="gray">
								<ArrowUturnLeftIcon className="w-6 h-6" />
								<span className="ml-2">Back</span>
							</Button>
						</Link>
					</div>
					<div className="w-1/6">
						<Button type="submit">
							<CheckIcon className="w-6 h-6" />
							<span className="ml-2">Save</span>
						</Button>
					</div>
				</div>
			</form>
		</Card>
	);
}

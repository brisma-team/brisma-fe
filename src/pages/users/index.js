import Main from "@/layouts/Main";
import useUserSKAI from "@/data/useUserSKAI";
import errorSwal from "@/helpers/errorSwal";
import withTokenConfig from "@/helpers/withTokenConfig";
import CustomDataTable from "@/components/CustomDataTable";
import loadingSwal from "@/helpers/loadingSwal";
import confirmationSwal from "@/helpers/confirmationSwal";
import successSwal from "@/helpers/successSwal";

import React from "react";
import { Button, Tooltip } from "flowbite-react";
import {
	PencilSquareIcon,
	TrashIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";

const breadcrumb = [
	{
		label: "Users",
		current: true,
	},
];

export default function index() {
	const { userSKAI, userSKAIMutate, userSKAIIsLoading } = useUserSKAI();

	const columns = [
		{
			name: "Action",
			cell: (row) => (
				<div className="flex gap-x-2">
					<Link href={`/users/update/${row.pn}`}>
						<Tooltip content="Update">
							<Button color="warning">
								<PencilSquareIcon className="w-6 h-6" />
							</Button>
						</Tooltip>
					</Link>
					<Tooltip content="Delete">
						<Button
							color="failure"
							onClick={() => handleDeleteClick(row.pn)}>
							<TrashIcon className="w-6 h-6" />
						</Button>
					</Tooltip>
				</div>
			),
			minWidth: "10rem",
		},
		{
			name: "PN",
			selector: (row) => row.pn,
		},
		{
			name: "Nama",
			selector: (row) => row.name,
		},
		{
			name: "UKA",
			selector: (row) => row.name_uka,
		},
		{
			name: "Role",
			cell: (row) => (
				<div className="flex gap-2">
					{row.role.map((role, i) => (
						<Button key={i}>{role.name_role}</Button>
					))}
				</div>
			),
			minWidth: "15rem",
		},
	];

	async function handleDeleteClick(pn) {
		const confirm = await confirmationSwal(
			"Apakah Anda yakin untuk mengahapus data ini?"
		);

		if (!confirm.value) {
			return;
		}

		loadingSwal();

		const url = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai/delete/${pn}`;

		try {
			const result = await axios.delete(url, withTokenConfig());

			loadingSwal("close");

			await successSwal(result.data.message);

			userSKAIMutate();
		} catch (error) {
			loadingSwal("close");

			errorSwal(error);
		}
	}

	return (
		<Main breadcrumb={breadcrumb}>
			<div className="flex justify-between items-center mb-4">
				<div className="flex-1">
					<h1 className="text-2xl font-bold">Users</h1>
				</div>
				<div className="w-2/12">
					<Link href="/users/create">
						<Button color="success">
							<PlusIcon className="w-6 h-6" />
							<span className="ml-2">Create</span>
						</Button>
					</Link>
				</div>
			</div>
			<CustomDataTable
				columns={columns}
				data={userSKAI?.data.data}
				isLoading={userSKAIIsLoading}
			/>
		</Main>
	);
}

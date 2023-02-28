import Main from "@/layouts/Main";

import React from "react";
import DataTable from "react-data-table-component";
import { Button, Tooltip } from "flowbite-react";
import {
	PencilSquareIcon,
	TrashIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Swal from "sweetalert2";

const data = [
	{
		id: 1,
		fullname: "asdasdasd",
		pn: "asdasdasd",
		email: "asdasdasd",
		phone: "asdasdasd",
	},
];

const breadcrumb = [
	{
		label: "Users",
		current: true,
	},
];

export default function index() {
	const columns = [
		{
			name: "Action",
			cell: (row) => (
				<div className="flex gap-x-2">
					<Link href={`/users/update/${row.id}`}>
						<Tooltip content="Update">
							<Button color="warning">
								<PencilSquareIcon className="w-6 h-6" />
							</Button>
						</Tooltip>
					</Link>
					<Tooltip content="Delete">
						<Button
							color="failure"
							onClick={() => handleDeleteClick(row.id)}>
							<TrashIcon className="w-6 h-6" />
						</Button>
					</Tooltip>
				</div>
			),
			minWidth: "10rem",
		},
		{
			name: "Full Name",
			selector: (row) => row.fullname,
		},
		{
			name: "PN",
			selector: (row) => row.pn,
		},
		{
			name: "Email",
			selector: (row) => row.email,
		},
		{
			name: "Phone",
			selector: (row) => row.phone,
		},
	];

	async function handleDeleteClick(id) {
		console.log(id);

		const confirm = await Swal.fire({
			title: "Perhatian!",
			text: "Apakah Anda yakin untuk mengahapus data ini?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
		});

		if (confirm.value) {
			await Swal.fire({
				title: "Sukses!",
				text: "Data berhasil dihapus.",
				icon: "success",
			});
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
			<DataTable columns={columns} data={data} responsive />
		</Main>
	);
}

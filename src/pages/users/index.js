import Main from "@/layouts/Main";
import useUserSKAI from "@/data/useUserSKAI";
import CustomDataTable from "@/components/CustomDataTable";
import UkaSelect from "@/components/UkaSelect";
import RoleSelect from "@/components/RoleSelect";
import DeleteButton from "@/components/DeleteButton";
import UpdateButton from "@/components/UpdateButton";
import CreateButton from "@/components/CreateButton";
import SearchButton from "@/components/SearchButton";
import { setSearchParam, setSearchParamObject } from "@/slices/userSKAISlice";

import React from "react";
import { Button, Card, TextInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const breadcrumb = [
	{
		label: "Users",
		current: true,
	},
];

export default function index() {
	const dispatch = useDispatch();

	const searchParam = useSelector((state) => state.userSKAI.searchParam);
	const searchParamObject = useSelector(
		(state) => state.userSKAI.searchParamObject
	);

	const { userSKAI, userSKAIMutate, userSKAIIsLoading } =
		useUserSKAI(searchParam);

	const columns = [
		{
			name: "Action",
			cell: (row) => (
				<div className="flex gap-x-2">
					<UpdateButton href={`/users/update/${row.pn}`} />
					<DeleteButton
						url={`${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai/delete/${row.pn}`}
						mutate={userSKAIMutate}
					/>
				</div>
			),
			minWidth: "10rem",
		},
		{
			name: "PN",
			selector: (row) => row.pn,
			sortable: true,
			sortField: "pn",
		},
		{
			name: "Nama",
			selector: (row) => row.name,
			sortable: true,
			sortField: "name",
		},
		{
			name: "UKA",
			selector: (row) => row.name_uka,
			sortable: true,
			sortField: "uka_kode",
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

	const { register, handleSubmit, control } = useForm({
		defaultValues: {
			pn: "",
			name: "",
			role_kode: [],
			uka_kode: "",
		},
	});

	function onSearchSubmit(data) {
		const param = {
			...searchParamObject,
		};

		delete param.pn;
		delete param.name;
		delete param.uka_kode;
		delete param.role_kode;

		if (data.pn.length > 0) {
			param.pn = data.pn;
		}

		if (data.name.length > 0) {
			param.name = data.name;
		}

		if (data.uka_kode !== "" && data.uka_kode !== null) {
			param.uka_kode = data.uka_kode.value;
		}

		if (data.role_kode.length > 0) {
			param.role_kode = data.role_kode[0].value;
		}

		const urlParam = new URLSearchParams(param).toString();

		dispatch(setSearchParam(urlParam));
		dispatch(setSearchParamObject(param));

		userSKAIMutate();
	}

	return (
		<Main breadcrumb={breadcrumb}>
			<div className="flex justify-between items-center mb-4">
				<div className="flex-1">
					<h1 className="text-2xl font-bold">Users</h1>
				</div>
				<div className="w-2/12">
					<CreateButton href="/users/create" />
				</div>
			</div>
			<Card className="mb-4">
				<form
					onSubmit={handleSubmit(onSearchSubmit)}
					className="space-y-4">
					<div className="flex gap-x-4">
						<div className="w-1/6">
							<Label value="PN" />
						</div>
						<div className="flex-1">
							<TextInput type="number" {...register("pn")} />
						</div>
					</div>
					<div className="flex gap-x-4">
						<div className="w-1/6">
							<Label value="Nama" />
						</div>
						<div className="flex-1">
							<TextInput type="text" {...register("name")} />
						</div>
					</div>
					<div className="flex gap-x-4">
						<div className="w-1/6">
							<Label value="Role" />
						</div>
						<div className="flex-1">
							<RoleSelect control={control} />
						</div>
					</div>
					<div className="flex gap-x-4">
						<div className="w-1/6">
							<Label value="UKA" />
						</div>
						<div className="flex-1">
							<UkaSelect control={control} />
						</div>
					</div>
					<div className="flex justify-end gap-x-4">
						<div className="w-1/4">
							<SearchButton />
						</div>
					</div>
				</form>
			</Card>
			<CustomDataTable
				columns={columns}
				data={userSKAI?.data.data}
				isLoading={userSKAIIsLoading}
				mutate={userSKAIMutate}
				stateName="userSKAI"
				setSearchParam={setSearchParam}
				setSearchParamObject={setSearchParamObject}
			/>
		</Main>
	);
}

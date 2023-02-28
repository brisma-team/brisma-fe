import Main from "@/layouts/Main";
import Form from "@/components/users/Form";

import React from "react";
import { useRouter } from "next/router";

const breadcrumb = [
	{
		label: "Users",
		current: false,
		href: "/users",
	},
	{
		label: "Update",
		current: true,
	},
];

export default function update() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Main breadcrumb={breadcrumb}>
			<h1 className="text-2xl font-bold mb-4">Update User</h1>
			<Form type="update" />
		</Main>
	);
}

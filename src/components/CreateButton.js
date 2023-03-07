import React from "react";
import Link from "next/link";
import { Button } from "flowbite-react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CreateButton({ href }) {
	return (
		<Link href={href}>
			<Button color="success">
				<PlusIcon className="w-6 h-6" />
				<span className="ml-2">Create</span>
			</Button>
		</Link>
	);
}

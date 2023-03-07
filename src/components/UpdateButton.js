import React from "react";
import Link from "next/link";
import { Tooltip, Button } from "flowbite-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function UpdateButton({ href }) {
	return (
		<Link href={href}>
			<Tooltip content="Update">
				<Button color="warning">
					<PencilSquareIcon className="w-6 h-6" />
				</Button>
			</Tooltip>
		</Link>
	);
}

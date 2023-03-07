import React from "react";
import Link from "next/link";
import { Button } from "flowbite-react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton({ href }) {
	return (
		<Link href={href}>
			<Button color="gray" className="w-full">
				<ArrowUturnLeftIcon className="w-6 h-6" />
				<span className="ml-2">Back</span>
			</Button>
		</Link>
	);
}

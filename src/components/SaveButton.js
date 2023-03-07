import React from "react";
import { Button } from "flowbite-react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function SaveButton() {
	return (
		<Button type="submit" className="w-full">
			<CheckIcon className="w-6 h-6" />
			<span className="ml-2">Save</span>
		</Button>
	);
}

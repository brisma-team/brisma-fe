import React from "react";
import { Button } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchButton() {
	return (
		<Button type="submit" className="w-full">
			<MagnifyingGlassIcon className="w-6 h-6" />
			<span className="ml-2">Cari</span>
		</Button>
	);
}

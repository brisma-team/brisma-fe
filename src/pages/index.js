import Loader from "@/components/Loader";

import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function index() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push("/login");
		}, 1000);
	}, []);

	return (
		<div className="flex w-screen h-screen items-center justify-center">
			<Loader />
		</div>
	);
}

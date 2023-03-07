import confirmationSwal from "@/helpers/confirmationSwal";
import loadingSwal from "@/helpers/loadingSwal";
import successSwal from "@/helpers/successSwal";
import errorSwal from "@/helpers/errorSwal";
import withTokenConfig from "@/helpers/withTokenConfig";

import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "flowbite-react";
import axios from "axios";

export default function DeleteButton({ url, mutate }) {
	async function handleClick(url) {
		const confirm = await confirmationSwal(
			"Apakah Anda yakin untuk mengahapus data ini?"
		);

		if (!confirm.value) {
			return;
		}

		loadingSwal();

		try {
			const result = await axios.delete(url, withTokenConfig());

			loadingSwal("close");

			await successSwal(result.data.message);

			mutate();
		} catch (error) {
			loadingSwal("close");

			errorSwal(error);
		}
	}

	return (
		<Tooltip content="Delete">
			<Button color="failure" onClick={() => handleClick(url)}>
				<TrashIcon className="w-6 h-6" />
			</Button>
		</Tooltip>
	);
}

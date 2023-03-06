import usePekerja from "@/data/usePekerja";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

export default function PekerjaSelect({ control, type }) {
	const [pn, setPN] = useState();
	const [options, setOptions] = useState([]);

	const { pekerja } = usePekerja(pn);

	useEffect(() => {
		if (pekerja) {
			const mappedPekerja = pekerja.data.map((row) => {
				return {
					label: row.pn,
					value: row.pn,
				};
			});

			setOptions(mappedPekerja);
		}
	}, [pekerja]);

	function handleInputChange(e) {
		let newPN;

		if (e.length > 0) {
			newPN = e;
		} else {
			newPN = undefined;
		}

		setPN(newPN);
	}

	return (
		<Controller
			control={control}
			name="pn"
			render={({ field: { onChange, onBlur, value } }) => (
				<Select
					options={options}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					onInputChange={(e) => handleInputChange(e)}
					// readOnly={type === "update" ? true : false}
				/>
			)}
		/>
	);
}

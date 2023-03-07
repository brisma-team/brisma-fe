import useUka from "@/data/useUka";

import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Controller } from "react-hook-form";
import Select from "react-select";

export default function UkaSelect({ control }) {
	const { uka, ukaIsLoading } = useUka();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (uka) {
			const mappedUka = uka.data.data.map((row) => {
				return {
					label: row.name,
					value: row.kode,
				};
			});

			setOptions(mappedUka);
		}
	}, [uka]);

	if (ukaIsLoading) {
		return <Skeleton />;
	}

	if (uka) {
		return (
			<Controller
				control={control}
				name="uka_kode"
				render={({ field: { onChange, onBlur, value } }) => (
					<Select
						options={options}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						isClearable
					/>
				)}
			/>
		);
	}
}

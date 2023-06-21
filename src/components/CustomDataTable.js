import React from "react";
import Loader from "./Loader";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";

export default function CustomDataTable({
	columns,
	data,
	isLoading,
	mutate,
	stateName,
	setSearchParam,
	setSearchParamObject,
}) {
	const dispatch = useDispatch();

	const searchParamObject = useSelector(
		(state) => state[stateName].searchParamObject
	);

	function handleSort(column, sortDirection) {
		if (column.sortField) {
			const param = {
				...searchParamObject,
				sort_by: column.sortField,
				sort_type: sortDirection,
			};
			const urlParam = new URLSearchParams(param).toString();

			dispatch(setSearchParam(urlParam));
			dispatch(setSearchParamObject(param));

			mutate();
		}
	}

	return (
		<DataTable
			columns={columns}
			data={data}
			responsive
			progressPending={isLoading}
			progressComponent={
				<div className="h-96 w-full flex items-center justify-center">
					<Loader />
				</div>
			}
			onSort={handleSort}
			sortServer
		/>
	);
}

import Loader from "./Loader";

import React from "react";
import DataTable from "react-data-table-component";

export default function CustomDataTable({ columns, data, isLoading }) {
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
		/>
	);
}

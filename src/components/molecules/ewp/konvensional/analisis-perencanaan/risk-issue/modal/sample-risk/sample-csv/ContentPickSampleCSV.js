import DynamicTable from "@atlaskit/dynamic-table";
import { useSelector } from "react-redux";

const ContentPickSampleCSV = ({ extendRows, handleRowClick }) => {
  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );

  return (
    <div className="px-4 py-2">
      <p>{dataTables.fileName}</p>
      <div className="my-2" />
      {dataTables.tableRows.length ? (
        <div>
          <div className="w-full p-4 overflow-y-scroll max-h-[40rem]">
            <div className="dataTables">
              {dataTables.tableColumns ? (
                <DynamicTable
                  head={dataTables.tableColumns}
                  highlightedRowIndex={dataTables.tableSelectedRows}
                  rows={extendRows(dataTables.tableRows, handleRowClick)}
                  rowsPerPage={50}
                  defaultPage={1}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContentPickSampleCSV;

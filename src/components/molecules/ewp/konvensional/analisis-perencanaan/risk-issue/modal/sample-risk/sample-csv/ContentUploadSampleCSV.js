import { Pagination } from "@/components/atoms";
import { useDispatch, useSelector } from "react-redux";
import ContentPickSampleCSV from "./ContentPickSampleCSV";
import {
  setDataTables,
  setPayloadUploadSample,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import DynamicTable from "@atlaskit/dynamic-table";

const extendRows = (rows, onClick) => {
  return rows.map((row, index) => ({
    ...row,
    onClick: (e) => onClick(e, row?.cells[0]?.content, index),
  }));
};

const ContentUploadSampleCSV = ({ isSelectedSamplePool }) => {
  const dispatch = useDispatch();
  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );
  const payloadUploadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadUploadSample
  );

  const handleRowClick = (e, key, index) => {
    const updateDataTables = [...dataTables.tableSelectedRows];
    const updatePayloadSample = [...payloadUploadSample.values];
    const existingIndex = updateDataTables.findIndex((item) => {
      return item === index;
    });

    if (existingIndex > -1) {
      updatePayloadSample.splice(existingIndex, 1);
      updateDataTables.splice(existingIndex, 1);
    } else {
      updatePayloadSample.push(key);
      updateDataTables.push(index);
    }

    dispatch(
      setDataTables({ ...dataTables, tableSelectedRows: updateDataTables })
    );
    dispatch(
      setPayloadUploadSample({
        ...payloadUploadSample,
        values: updatePayloadSample,
      })
    );
  };

  if (isSelectedSamplePool) {
    return <ContentPickSampleCSV />;
  }

  return (
    <div className="px-4 py-2">
      <p>{dataTables.fileName}</p>
      <div className="my-2" />
      {dataTables.tableRows.length ? (
        <div>
          <div className="w-full p-4 overflow-y-scroll max-h-[40rem]">
            <div className="dataTables">
              <DynamicTable
                head={dataTables.tableColumns}
                highlightedRowIndex={dataTables.tableSelectedRows}
                rows={extendRows(dataTables.tableRows, handleRowClick)}
              />
            </div>
          </div>
          <Pagination pages={1} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContentUploadSampleCSV;

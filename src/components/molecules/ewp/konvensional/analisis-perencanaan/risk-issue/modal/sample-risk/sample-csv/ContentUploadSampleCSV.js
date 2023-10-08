import { useSelector } from "react-redux";
import ContentPickSampleCSV from "./ContentPickSampleCSV";
import DynamicTable from "@atlaskit/dynamic-table";
import { TextAreaField } from "@/components/atoms";
import { useDispatch } from "react-redux";
import { setPayloadUploadSample } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";

const ContentUploadSampleCSV = ({
  currentModalStage,
  isSelectedSamplePool,
  extendRows,
  handleRowClick,
}) => {
  const dispatch = useDispatch();
  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );
  const payloadUploadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadUploadSample
  );

  const handleChange = (property, value) => {
    dispatch(
      setPayloadUploadSample({ ...payloadUploadSample, [property]: value })
    );
  };

  if (isSelectedSamplePool) {
    return <ContentPickSampleCSV />;
  }

  return (
    <div className="px-4 py-2">
      <p>{payloadUploadSample.filename}</p>
      <div className="my-2" />
      {currentModalStage === 1 ? (
        dataTables.tableRows.length ? (
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
        )
      ) : (
        currentModalStage === 2 && (
          <TextAreaField
            value={payloadUploadSample?.description}
            resize={"auto"}
            handleChange={(e) => handleChange("description", e.target.value)}
          />
        )
      )}
    </div>
  );
};

export default ContentUploadSampleCSV;

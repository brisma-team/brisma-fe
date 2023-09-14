import { CheckboxField, Pagination } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useDispatch, useSelector } from "react-redux";
import ContentPickSampleCSV from "./ContentPickSampleCSV";
import { setPayloadSample } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";

const ContentUploadSampleCSV = ({ isSelectedSamplePool }) => {
  const dispatch = useDispatch();
  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );
  const payloadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadSample
  );

  const handleChangeCheckbox = (isChecked, id) => {
    const values = [...payloadSample.values];
    if (isChecked) {
      values.push(id);
    } else {
      const index = payloadSample.values.indexOf(id);
      if (index > -1) {
        values.splice(index, 1);
      }
    }

    dispatch(setPayloadSample({ ...payloadSample, values }));
  };

  if (isSelectedSamplePool) {
    return <ContentPickSampleCSV />;
  }

  return (
    <div className="px-4 py-2">
      <p>{dataTables.fileName}</p>
      <div className="my-2" />
      {dataTables.tableValues.length ? (
        <div>
          <div className="w-full p-4 overflow-y-scroll max-h-[40rem]">
            <TableTree>
              <Headers>
                <Header className="border-x border-t rounded-ss-xl">
                  <p className="font-bold text-brisma">Aksi</p>
                </Header>
                {dataTables.tableRows.map((v, i) => {
                  return (
                    <Header
                      className={`border-t border-r ${
                        i === dataTables.tableRows.length - 1
                          ? "rounded-se-xl"
                          : ""
                      }`}
                      key={i}
                    >
                      <p className="font-bold text-brisma">{v}</p>
                    </Header>
                  );
                })}
              </Headers>
              <Rows
                items={dataTables.tableValues}
                render={(data) => (
                  <Row>
                    <Cell className="border-x">
                      <div className="flex -ml-2.5">
                        <CheckboxField
                          isChecked={payloadSample.values.includes(
                            data[dataTables.tableRows[0]]
                          )}
                          handleChange={(e) =>
                            handleChangeCheckbox(
                              e.target.checked,
                              data[dataTables.tableRows[0]]
                            )
                          }
                        />
                      </div>
                    </Cell>
                    {dataTables.tableRows.map((rowData, idx) => (
                      <Cell className="border-r" key={idx}>
                        <p className="text-xs">{data[rowData]}</p>
                      </Cell>
                    ))}
                  </Row>
                )}
              />
            </TableTree>
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

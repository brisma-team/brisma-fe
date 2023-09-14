import { CheckboxField, Pagination } from "@/components/atoms";
import { withTokenConfig } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { setDataTables } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import _ from "lodash";

const ContentPickSampleCSV = () => {
  const dispatch = useDispatch();
  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );

  const { headers } = withTokenConfig();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://139.59.104.214:9000/ewp/1694506674235-sample_terbaru.csv",
        {
          method: "GET",
          headers,
        }
      );

      const csvFile = await response.text();
      Papa.parse(csvFile, {
        header: true,
        dynamicTyping: true,
        complete: function (result) {
          const rowsArray = [];
          const dataObj = result?.data?.map((value, index) => {
            return { index, ...value };
          });

          const dataObjWithoutIndex = _.map(dataObj, (item) =>
            _.omit(item, ["index"])
          );

          dataObjWithoutIndex?.map((d) => {
            rowsArray.push(Object.keys(d));
          });

          if (result?.data) {
            dispatch(
              setDataTables({
                fileName: "test",
                tableObj: dataObj,
                tableValues: result.data,
                tableRows: rowsArray[0],
              })
            );
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-2">
      <p>{dataTables.fileName}</p>
      <div className="my-2" />
      {dataTables.tableValues.length ? (
        <div>
          <div className="w-full p-4 overflow-y-scroll max-h-[40rem]">
            <TableTree>
              <Headers>
                <Header
                  width="5rem"
                  className="border-x border-t rounded-ss-xl"
                >
                  <p className="font-bold text-brisma">Aksi</p>
                </Header>
                <Header width="5rem" className="border-t border-r">
                  <p className="font-bold text-brisma">Nama File</p>
                </Header>
                {/* {dataTables.tableRows.map((v, i) => {
                  return (
                    <Header
                      width={240}
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
                })} */}
              </Headers>
              <Rows
                items={dataTables.tableValues}
                render={(data) => (
                  <Row>
                    <Cell width="5rem" className="border-x">
                      <div className="flex gap-0.5 -ml-2.5">
                        <CheckboxField />
                      </div>
                    </Cell>
                    <Cell
                      width={240}
                      className="border-r"
                      style={{ minWidth: "15rem" }}
                    >
                      {/* <p className="text-xs">{data[rowData]}</p> */}
                    </Cell>
                    {dataTables.tableRows.map((rowData, idx) => (
                      <Cell
                        width={240}
                        className="border-r"
                        key={idx}
                        style={{ minWidth: "15rem" }}
                      >
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

export default ContentPickSampleCSV;

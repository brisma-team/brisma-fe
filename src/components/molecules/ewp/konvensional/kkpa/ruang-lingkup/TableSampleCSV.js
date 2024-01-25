import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { withTokenConfig } from "@/helpers";
import Papa from "papaparse";
import { useEffect, useState } from "react";

const TableSampleCSV = ({ title, sourceUrl, selectedValue }) => {
  const [columns, setColumns] = useState([]);
  const [dataTables, setDataTables] = useState([]);
  const { headers } = withTokenConfig();

  useEffect(() => {
    if (sourceUrl) {
      const fetchData = async () => {
        const response = await fetch(sourceUrl, {
          method: "GET",
          headers,
        });

        const csvFile = await response.text();
        Papa.parse(csvFile, {
          header: true,
          dynamicTyping: true,
          complete: function (result) {
            const arrColumns = Object.keys(result?.data[0])?.filter(
              (data) => data
            );
            const arrData = result?.data
              ?.filter((data) => data[arrColumns[0]])
              ?.map((obj) => {
                const entries = Object.entries(obj).filter(
                  ([key]) => key !== ""
                );
                return Object.fromEntries(entries);
              });

            const dataFixed = arrData?.filter((data) => {
              return selectedValue?.some(
                (val) => val.value === data[arrColumns[0]]
              );
            });

            setColumns(arrColumns);
            setDataTables(dataFixed);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error.message);
          },
        });
      };

      fetchData();
    }
  }, [sourceUrl]);

  return (
    <div className="h-fit w-52">
      <CardContentHeaderFooter
        width={"w-fit"}
        header={
          <div className="h-12 flex items-center font-medium text-xl px-2.5">
            {title}
          </div>
        }
        footer={<div className="min-h-[1.5rem]" />}
        withoutBorderTop
        withoutBorderBottom
      >
        <div className="min-w-[54.5rem] max-w-[54.5rem] overflow-x-scroll pb-3">
          {dataTables?.length > 0 ? (
            <div className="flex">
              {columns?.map((columnName, columnIndex) => {
                const isFirstColumn = columnIndex === 0;
                const isLastColumn = columnIndex === columns.length - 1;

                let cellClassName = "border-t border-r";

                if (isFirstColumn) {
                  cellClassName = "border-t border-x";
                } else if (isLastColumn) {
                  cellClassName = "border-t border-r";
                }

                return (
                  <div className={`flex-shrink-0 w-44`} key={columnIndex}>
                    <div className={`border-b px-2 py-1 ${cellClassName}`}>
                      <p className="font-medium text-sm">{columnName}</p>
                    </div>
                    {dataTables.map((row, rowIndex) => (
                      <div
                        className={`flex-shrink-0 px-2 py-1 h-fit border-b ${cellClassName}`}
                        key={`cell-${rowIndex}-${columnIndex}`}
                      >
                        <p className="font-medium text-sm">{row[columnName]}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </CardContentHeaderFooter>
    </div>
  );
};

export default TableSampleCSV;

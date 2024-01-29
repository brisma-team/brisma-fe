import { CheckboxField, DivButton } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { withTokenConfig } from "@/helpers";
import Papa from "papaparse";
import { useEffect, useState } from "react";

const TableSampleCSV = ({ title, sourceUrl, selectedValue }) => {
  const [columns, setColumns] = useState([]);
  const [dataTables, setDataTables] = useState([]);
  const { headers } = withTokenConfig();

  useEffect(() => {
    console.log("columns => ", columns);
  }, [columns]);

  useEffect(() => {
    console.log("sourceUrl => ", sourceUrl);
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
            const dummy = [
              {
                Nama: "udin",
                Nim: 191011,
                Kelas: "02TPLE022",
                Semester: 8,
                Tanggal:
                  "11 desember 2022 11 desember 2022 11 desember 2022 11 desember 2022 11 desember 2022 11 desember 2022 11 desember 2022",
                Status: "Belum Menikah",
                Alamat: "Jagabaya",
                Domisili: "Bogor",
                "": null,
              },
              {
                Nama: "nano",
                Nim: 191011,
                Kelas: "02TPLE022",
                Semester: 8,
                Tanggal: "11 januari 2022",
                Status: "Belum Menikah",
                Alamat: "Jagabaya",
                Domisili: "Jakarta",
                "": null,
              },
              {
                Nama: null,
              },
            ];
            const newMapping = dummy?.map((v) => {
              return {
                "#": "",
                ...v,
              };
            });

            const arrColumns = Object.keys(newMapping[0])?.filter(
              (data) => data
            );

            const arrData = newMapping
              ?.filter((data) => data[arrColumns[1]])
              ?.map((obj) => {
                const entries = Object.entries(obj).filter(
                  ([key]) => key !== ""
                );
                return Object.fromEntries(entries);
              });

            const dataFixed = arrData?.filter((data) => {
              return selectedValue?.some(
                (val) => val.value === data[arrColumns[1]]
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
        <div className="min-w-[54.5rem] max-w-[54.5rem] overflow-x-scroll pb-4">
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
                  <div
                    className={`flex-shrink-0 ${cellClassName} ${
                      columnName === "#" ? "w-16" : "w-44"
                    }`}
                    key={columnIndex}
                  >
                    <div
                      className={`border-b px-2 ${cellClassName} ${
                        columnName === "#"
                          ? "flex justify-center py-0.5"
                          : " py-1"
                      }`}
                    >
                      {columnName === "#" ? (
                        <CheckboxField />
                      ) : (
                        <p className="font-medium text-sm">{columnName}</p>
                      )}
                    </div>
                    {dataTables.map((row, rowIndex) => (
                      <DivButton
                        className={`flex-shrink-0 px-2 py-1 h-fit border-b ${cellClassName} h-full`}
                        key={`cell-${rowIndex}-${columnIndex}`}
                      >
                        {columnName === "#" ? (
                          <CheckboxField />
                        ) : (
                          <p className="font-medium text-sm">
                            {row[columnName]}
                          </p>
                        )}
                      </DivButton>
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

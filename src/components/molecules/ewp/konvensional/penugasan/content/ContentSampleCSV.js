import { Card } from "@/components/atoms";
import DynamicTable from "@atlaskit/dynamic-table";
import { useEffect } from "react";
import { setModalDataTables } from "@/slices/ewp/konvensional/mapa/assignmentMapaEWPSlice";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { withTokenConfig } from "@/helpers";

const ContentSampleCSV = ({ data, extendRows, handleRowClick }) => {
  const dispatch = useDispatch();

  const dataTables = useSelector(
    (state) => state.assignmentMapaEWP.modalDataTables
  );

  const { headers } = withTokenConfig();
  const importDataFromUrl = async (directory, fileName, data) => {
    try {
      const response = await fetch(directory, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Error fetching CSV: " + response.statusText);
      }

      const csvFile = await response.text();
      const result = await Papa.parse(csvFile, {
        header: true,
        dynamicTyping: true,
      });

      if (!result.data) {
        throw new Error("No data found in the CSV file");
      }

      const dataFixed = result.data
        .map((item) => {
          const matchingFilter = data.find(
            (f) => f.value === item[Object.keys(result.data[0])[0]]
          );

          if (matchingFilter) {
            const { name_auditor, id } = matchingFilter;
            return {
              Auditor: name_auditor,
              Mandays: matchingFilter?.mandays || "",
              ID: id,
              ...item,
            };
          }
        })
        .filter(Boolean);

      const arrColumns = Object.keys(dataFixed[0]);
      const mappingColumns = arrColumns.map((column) => ({ content: column }));

      const mappingRows = dataFixed.map((item) => ({
        cells: arrColumns.map((key) => ({ content: item[key] })),
      }));

      return {
        fileName,
        tableData: dataFixed,
        tableRows: mappingRows,
        tableColumns: { cells: mappingColumns },
        tableSelectedRows: [],
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const mappingData = await Promise.all(
        data.csv.map(async (v) => {
          return importDataFromUrl(v.content.directory, v.title, v.data);
        })
      );

      dispatch(setModalDataTables(mappingData));
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    console.log("dataTables => ", dataTables);
  }, [dataTables]);

  return dataTables?.length
    ? dataTables?.map((v, i) => {
        return (
          <Card key={i}>
            <div className="mb-2 w-full px-2">{v.fileName}</div>
            <div className="w-full border-b-2 border-gray-200" />
            <div className="w-full px-3 py-2 dynamic-table-custom-margin">
              <DynamicTable
                head={v.tableColumns}
                highlightedRowIndex={v.tableSelectedRows}
                rows={extendRows(v.tableRows, i, handleRowClick)}
                rowsPerPage={5}
                defaultPage={1}
              />
            </div>
          </Card>
        );
      })
    : "";
};

export default ContentSampleCSV;

import DynamicTable from "@atlaskit/dynamic-table";
import { useEffect, useState } from "react";

const ContentSampleCSV = ({ data }) => {
  const [tableRows, setTableRows] = useState([]);
  const [tableColumns, setTableColumns] = useState({});
  const [tableSelectedRows, setTableSelectedRows] = useState([]);

  useEffect(() => {
    console.log("data 123 => ", data);
  }, [data]);

  return (
    <DynamicTable
    //   head={tableRows}
    //   rows={tableColumns.slice(0, 10)}
    //   highlightedRowIndex={tableSelectedRows}
    />
  );
};

export default ContentSampleCSV;

import {
  ButtonIcon,
  Card,
  CheckboxField,
  CustomPagination,
} from "@/components/atoms";
import { useEffect, useState } from "react";
import { setPayloadSample } from "@/slices/ewp/konvensional/mapa/assignmentMapaEWPSlice";
import { IconArrowDown } from "@/components/icons";
import { useSelector, useDispatch } from "react-redux";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";

const ContentSampleFile = ({ data }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    min: 0,
    max: perPage,
  });

  const payloadSample = useSelector(
    (state) => state.assignmentMapaEWP.payloadSample
  );

  useEffect(() => {
    const mappingData = data?.file?.map((v) => {
      const { id, name_auditor, mandays, content } = v;
      return {
        auditor: name_auditor,
        mandays,
        id,
        filename: content?.filename,
        downloadUrl: content?.directory,
      };
    });

    setRows(mappingData);
    setTotalData(mappingData.length);
  }, [data]);

  // Untuk pilih sample data yang ada di DynamicTable yang mana samplenya akan di upload
  const handleRowClick = (id) => {
    const updateSelectedRows = [...selectedRows];

    const updatePayloadSample = [...payloadSample];
    const existingIndex = updateSelectedRows.findIndex((item) => {
      return item === id;
    });

    if (existingIndex > -1) {
      updatePayloadSample.splice(existingIndex, 1);
      updateSelectedRows.splice(existingIndex, 1);
    } else {
      updatePayloadSample.push({ id });
      updateSelectedRows.push(id);
    }

    setSelectedRows(updateSelectedRows);
    dispatch(setPayloadSample(updatePayloadSample));
  };

  const handleRowClickCheckbox = (value, id) => {
    const updateSelectedRows = [...selectedRows];

    const updatePayloadSample = [...payloadSample];
    const existingIndex = updateSelectedRows.findIndex((item) => {
      return item === id;
    });

    if (existingIndex > -1 && !value) {
      updatePayloadSample.splice(existingIndex, 1);
      updateSelectedRows.splice(existingIndex, 1);
    } else {
      updatePayloadSample.push({ id });
      updateSelectedRows.push(id);
    }

    setSelectedRows(updateSelectedRows);
    dispatch(setPayloadSample(updatePayloadSample));
  };

  const handleSetPagination = (min, max) => {
    setPagination({ min, max });
  };

  return (
    <Card>
      <div className="w-full px-3 py-2">
        <Table
          data={rows.slice(pagination.min, pagination.max)}
          onRowClick={(value) => handleRowClick(value.id)}
        >
          <Column key="checkColumn" width={56} fixed>
            <HeaderCell />
            <Cell>
              {(rowData) => {
                return (
                  <CheckboxField
                    handleChange={(e) =>
                      handleRowClickCheckbox(e.target.value, rowData.id)
                    }
                    isChecked={selectedRows.includes(rowData.id)}
                  />
                );
              }}
            </Cell>
          </Column>
          <Column resizable>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column resizable>
            <HeaderCell>Auditor</HeaderCell>
            <Cell dataKey="auditor" />
          </Column>
          <Column resizable>
            <HeaderCell>Mandays</HeaderCell>
            <Cell dataKey="mandays" />
          </Column>
          <Column resizable>
            <HeaderCell>Filename</HeaderCell>
            <Cell dataKey="filename" />
          </Column>
          <Column resizable>
            <HeaderCell>Download</HeaderCell>
            <Cell>
              {(rowData) => {
                return (
                  <ButtonIcon
                    handleClick={(e) => {
                      e.stopPropagation();
                    }}
                    icon={
                      <div className="rounded-full border-2 border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                        <IconArrowDown size="medium" />
                      </div>
                    }
                    className={"ml-[0.85rem] pt-1.5 w-full"}
                    color={"red"}
                    downloadUrl={rowData?.downloadUrl}
                    downloadFilename={rowData?.filename}
                  />
                );
              }}
            </Cell>
          </Column>
        </Table>
        <CustomPagination
          defaultCurrentPage={1}
          perPage={5}
          totalData={totalData}
          handleSetPagination={handleSetPagination}
          getValue={(value) => {
            setPagination({ min: value.min, max: value.max });
          }}
        />
      </div>
    </Card>
  );
};

export default ContentSampleFile;

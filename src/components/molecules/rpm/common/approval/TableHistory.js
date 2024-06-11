import { Card, CustomPagination } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useEffect, useState } from "react";
const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableHistory = ({ data }) => {
  const [rows, setRows] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState({
    min: 0,
    max: 10,
  });

  useEffect(() => {
    setRows(data);
    setTotalData(data?.length);
  }, [data]);

  const handleSetPagination = (min, max) => {
    setPagination({ min, max });
  };

  return (
    <Card>
      <div className="w-full px-4 pb-2">
        <p className="text-lg font-bold ml-2">Riwayat</p>
        <div className="py-1" />
        <TableTree>
          <Headers>
            <Header
              width="10%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">
                <p className="text-base font-bold">Tanggal</p>
              </div>
            </Header>
            <Header
              width="14%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Project ID</p>
              </div>
            </Header>
            <Header
              width="20%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Project Name</p>
              </div>
            </Header>
            <Header
              width="12%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Metode</p>
              </div>
            </Header>
            <Header
              width="12%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Tipe</p>
              </div>
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Sub-Module</p>
              </div>
            </Header>
            <Header
              width="14%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Status Approval</p>
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={rows.slice(pagination.min, pagination.max)}
              render={({
                createdAt,
                created_at,
                project_id,
                project_name,
                sub_modul,
                ref_metode,
                ref_tipe,
                status_approval,
                note,
              }) => (
                <Row>
                  <Cell width="10%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-sm">
                        {convertDate(createdAt || created_at, "-", "d")}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="14%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {project_id?.toUpperCase() || "-"}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="20%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{project_name || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="12%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{ref_metode?.nama || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="12%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{ref_tipe?.nama || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="18%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{sub_modul}</p>
                    </div>
                  </Cell>
                  <Cell width="14%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{status_approval || note}</p>
                    </div>
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
              <DataNotFound />
            </div>
          )}
        </TableTree>
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

export default TableHistory;

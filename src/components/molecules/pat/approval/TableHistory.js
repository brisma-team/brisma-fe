import { Card } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableHistoryPAT = ({ data }) => {
  return (
    <Card>
      <div className="w-full px-4 pb-2">
        <p className="text-lg font-bold ml-2">Riwayat Persetujuan</p>
        <div className="py-1" />
        <TableTree>
          <Headers>
            <Header
              width="35%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Nama Project</p>
              </div>
            </Header>
            <Header
              width="14%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Tahun</p>
              </div>
            </Header>
            <Header
              width="35%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Fase Approval</p>
              </div>
            </Header>
            <Header
              width="16%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Status</p>
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({ pat, is_approved, module }) => (
                <Row>
                  <Cell width="35%" className={customCell}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {pat?.name?.toUpperCase() || "-"}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="14%" className={customCell}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{pat?.tahun || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="35%" className={customCell}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{module || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="16%" className={customCell}>
                    <div className="custom-table-position-center">
                      <p
                        className={`text-sm ${
                          is_approved
                            ? "text-atlasian-green"
                            : "text-atlasian-red"
                        }`}
                      >
                        {is_approved ? "Approved" : "Rejected"}
                      </p>
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
      </div>
    </Card>
  );
};

export default TableHistoryPAT;

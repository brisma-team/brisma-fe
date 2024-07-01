import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const LogTable = ({ data }) => {
  return (
    <TableTree>
      <Headers>
        <Header
          width="20%"
          className="border-x border-t cell-custom-dataTables"
        >
          <div
            className={`custom-table-header justify-center text-sm font-semibold`}
          >
            Tanggal
          </div>
        </Header>
        <Header
          width="20%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            PN Nama
          </div>
        </Header>
        <Header
          width="20%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            Sub Modul
          </div>
        </Header>
        <Header
          width="40%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            Aktifitas
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({ tanggal, pnNama, subModul, aktifitas }) => (
            <Row>
              <Cell width="20%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center">
                  {tanggal || "-"}
                </div>
              </Cell>
              <Cell width="20%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {pnNama || "-"}
                </div>
              </Cell>
              <Cell width="20%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {subModul || "-"}
                </div>
              </Cell>
              <Cell width="40%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {aktifitas || "-"}
                </div>
              </Cell>
            </Row>
          )}
        />
      ) : (
        <Row>
          <Cell
            width="100%"
            className="border-x cell-custom-dataTables flex justify-center"
          >
            <div className="w-full pt-4 pb-2 text-center">
              <p>
                <b>No data available in table</b>
              </p>
            </div>
          </Cell>
        </Row>
      )}
    </TableTree>
  );
};

export default LogTable;

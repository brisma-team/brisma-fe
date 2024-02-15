import { convertDate } from "@/helpers";
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
    <>
      {/* <p className="text-base font-bold mb-2 ml-2">Realisasi</p> */}
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
        <div className="max-h-[18rem] overflow-y-scroll">
          <Rows
            items={data}
            render={({ tanggal, pnNama, subModul, aktifitas }) => (
              <Row>
                <Cell width="20%" className={`border-x ${customCell}`}>
                  <div className="custom-table-position-center">
                    {tanggal ? convertDate(tanggal) : "N/A"}
                  </div>
                </Cell>
                <Cell width="20%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {pnNama ? pnNama : "N/A"}
                  </div>
                </Cell>
                <Cell width="20%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {subModul ? subModul : "N/A"}
                  </div>
                </Cell>
                <Cell width="40%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {aktifitas ? aktifitas : "N/A"}
                  </div>
                </Cell>
              </Row>
            )}
          />
        </div>
      </TableTree>
    </>
  );
};

export default LogTable;

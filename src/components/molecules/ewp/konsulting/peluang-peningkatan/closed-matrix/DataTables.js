import Link from "next/link";
import { ButtonIcon } from "@/components/atoms";
import { RetryButton, DataNotFound } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const DataTables = ({ data, handleClickRevoke }) => {
  return (
    <TableTree>
      <Headers>
        <Header
          width="10%"
          className="border-x border-t rounded-ss-lg cell-custom-dataTables"
        >
          <div
            className={`custom-table-header justify-center text-sm font-semibold`}
          >
            AKSI
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            STATUS
          </div>
        </Header>
        <Header
          width="35%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            JUDUL MATRIX
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            TANGGAL
          </div>
        </Header>
        <Header
          width="25%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header text-sm font-semibold">
            AUDITOR
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            JUMLAH PP
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({ matrix_id, judul, tanggal, auditor, jumlah_pp }) => (
            <Row>
              <Cell width="10%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <ButtonIcon
                    icon={<RetryButton />}
                    handleClick={() => handleClickRevoke(matrix_id)}
                    color={"green"}
                  />
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <p className="text-sm text-atlasian-red font-semibold">
                    {"Closed"}
                  </p>
                </div>
              </Cell>
              <Cell width="35%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  <Link
                    target="_blank"
                    href={`#`}
                    className="text-sm underline"
                  >
                    {judul || "N/A"}
                  </Link>
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {convertDate(tanggal, "-", "d") || "N/A"}
                </div>
              </Cell>
              <Cell width="25%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {auditor?.name || "N/A"}
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {jumlah_pp || 0}
                </div>
              </Cell>
            </Row>
          )}
        />
      ) : (
        <div className="w-full border-x border-b">
          <DataNotFound />
        </div>
      )}
    </TableTree>
  );
};

export default DataTables;

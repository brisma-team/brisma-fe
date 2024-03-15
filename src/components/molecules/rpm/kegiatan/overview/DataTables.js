import Link from "next/link";
import { useRouter } from "next/router";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const DataTables = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <TableTree>
      <Headers>
        <Header
          width="7%"
          className="border-t border-l border-r rounded-ss-lg cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            STATUS
          </div>
        </Header>
        <Header
          width="12%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            JUDUL PELUANG
          </div>
        </Header>
        <Header
          width="10%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            AUDITOR
          </div>
        </Header>
        <Header width="9%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header justify-center text-sm font-semibold">
            LINGKUP
          </div>
        </Header>
        <Header width="9%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header justify-center text-sm font-semibold">
            RISK
          </div>
        </Header>
        <Header width="9%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header justify-center text-sm font-semibold">
            CONTROL
          </div>
        </Header>
        <Header
          width="11%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            Jumlah Rekomendasi
          </div>
        </Header>
        <Header
          width="11%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            Jumlah Rekomendasi Incompleted
          </div>
        </Header>
        <Header
          width="11%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            Jumlah Rekomendasi On Progress
          </div>
        </Header>
        <Header
          width="11%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            Jumlah Rekomendasi Completed
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({
            matrix_id,
            kkpt_id,
            status_persetujuan,
            judul_kkpt,
            auditor,
          }) => (
            <Row>
              <Cell width="7%" className={`border-l border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <p
                    className={`text-sm ${
                      status_persetujuan === "Final"
                        ? "text-atlasian-green"
                        : status_persetujuan === "On Approver"
                        ? "text-atlasian-blue-light"
                        : "text-atlasian-yellow"
                    } font-semibold`}
                  >
                    {status_persetujuan || "N/A"}
                  </p>
                </div>
              </Cell>
              <Cell width="12%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  <Link
                    href={`/ewp/konsulting/overview/${id}/peluang-peningkatan/${matrix_id}/overview/${kkpt_id}`}
                    className="text-sm underline"
                  >
                    {judul_kkpt || "N/A"}
                  </Link>
                </div>
              </Cell>
              <Cell width="10%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {auditor?.nama || auditor?.name || "N/A"}
                </div>
              </Cell>
              <Cell width="9%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {"N/A"}
                </div>
              </Cell>
              <Cell width="9%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {"N/A"}
                </div>
              </Cell>
              <Cell width="9%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {"N/A"}
                </div>
              </Cell>
              <Cell width="11%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {0}
                </div>
              </Cell>
              <Cell width="11%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {0}
                </div>
              </Cell>
              <Cell width="11%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {0}
                </div>
              </Cell>
              <Cell width="11%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {0}
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

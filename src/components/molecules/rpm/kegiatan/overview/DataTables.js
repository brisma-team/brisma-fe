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
          width="9%"
          className="border-t border-l border-r rounded-ss-lg cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            STATUS
          </div>
        </Header>
        <Header
          width="12%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            JUDUL PELUANG
          </div>
        </Header>
        <Header
          width="10%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            AUDITOR
          </div>
        </Header>
        <Header
          width="16%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            LINGKUP
          </div>
        </Header>
        <Header
          width="11%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            RISK
          </div>
        </Header>
        <Header
          width="10%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-xs font-semibold">
            CONTROL
          </div>
        </Header>
        <Header width="9%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header text-center text-xs font-semibold">
            Jumlah Rekomendasi
          </div>
        </Header>
        <Header width="9%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header text-center text-xs font-semibold">
            Jumlah Rekomendasi Incompleted
          </div>
        </Header>
        <Header width="9%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header text-center text-xs font-semibold">
            Jumlah Rekomendasi On Progress
          </div>
        </Header>
        <Header
          width="9%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header text-center text-xs font-semibold">
            Jumlah Rekomendasi Completed
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({
            kkpt_id,
            judul_kkpt,
            auditor,
            total_incomplete,
            total_onprogress,
            total_complete,
            total_rekomendasi,
            rpm_action_plan,
          }) => (
            <Row>
              <Cell width="9%" className={`border-l border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <p
                    className={`text-xs ${
                      total_complete == total_rekomendasi &&
                      total_rekomendasi != 0
                        ? "text-atlasian-green"
                        : "text-atlasian-yellow"
                    } font-semibold`}
                  >
                    {total_complete == total_rekomendasi &&
                    total_rekomendasi != 0
                      ? "Completed"
                      : "On Progress" || "N/A"}
                  </p>
                </div>
              </Cell>
              <Cell width="12%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  <Link
                    href={`/rpm/kegiatan/${id}/peluang-peningkatan/${kkpt_id}`}
                    className="text-xs underline"
                  >
                    {judul_kkpt || "N/A"}
                  </Link>
                </div>
              </Cell>
              <Cell width="10%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center text-xs">
                  {auditor?.pn +
                    " - " +
                    (auditor?.nama || auditor?.name || "-")}
                </div>
              </Cell>
              <Cell width="16%" className={`border-r ${customCell}`}>
                <div
                  className={`custom-table-position-center ${
                    !rpm_action_plan?.length > 0 ? "justify-center" : ""
                  }`}
                >
                  {rpm_action_plan?.length > 0 ? (
                    <p>
                      {rpm_action_plan
                        .reduce((unique, v) => {
                          const judul =
                            v?.rekomendasi_kkpt?.lingkup
                              ?.judul_lingkup_pemeriksaan;
                          if (judul && !unique.includes(judul)) {
                            unique.push(judul);
                            return unique; // Return the array as is
                          }
                          return unique; // Return the array as is
                        }, [])
                        .map((judul, index) => (
                          <li className="text-xs" key={index}>
                            {judul}
                          </li>
                        ))}
                    </p>
                  ) : (
                    "-"
                  )}
                </div>
              </Cell>
              <Cell width="11%" className={`border-r ${customCell}`}>
                <div
                  className={`custom-table-position-center overflow-x-auto ${
                    !rpm_action_plan?.length > 0 ? "justify-center" : ""
                  }`}
                >
                  {rpm_action_plan?.length > 0 ? (
                    <p>
                      {rpm_action_plan
                        .reduce((unique, v) => {
                          const abbr =
                            v?.rekomendasi_kkpt?.risk?.mtd_risk_issue?.abbr;
                          const name =
                            v?.rekomendasi_kkpt?.risk?.mtd_risk_issue?.nama;
                          const entry = { abbr, name };
                          const found = unique.some(
                            (item) => item.abbr === abbr && item.name === name
                          );
                          if (!found) {
                            unique.push(entry);
                          }
                          return unique;
                        }, [])
                        .map((item, index) => (
                          <li className="text-xs" key={index}>
                            {item.abbr + " - " + item.name}
                          </li>
                        ))}
                    </p>
                  ) : (
                    "-"
                  )}
                </div>
              </Cell>
              <Cell width="10%" className={`border-r ${customCell}`}>
                <div
                  className={`custom-table-position-center overflow-x-auto ${
                    !rpm_action_plan?.length > 0 ? "justify-center" : ""
                  }`}
                >
                  {rpm_action_plan?.length > 0 ? (
                    <p>
                      {rpm_action_plan
                        .reduce((unique, v) => {
                          const abbr =
                            v?.rekomendasi_kkpt?.control?.mtd_control?.abbr;
                          const name =
                            v?.rekomendasi_kkpt?.control?.mtd_control?.nama;
                          const entry = { abbr, name };
                          const found = unique.some(
                            (item) => item.abbr === abbr && item.name === name
                          );
                          if (!found) {
                            unique.push(entry);
                          }
                          return unique;
                        }, [])
                        .map((item, index) => (
                          <li className="text-xs" key={index}>
                            {item.abbr + " - " + item.name}
                          </li>
                        ))}
                    </p>
                  ) : (
                    "-"
                  )}
                </div>
              </Cell>
              <Cell width="9%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {total_rekomendasi}
                </div>
              </Cell>
              <Cell width="9%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {total_incomplete}
                </div>
              </Cell>
              <Cell width="9%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {total_onprogress}
                </div>
              </Cell>
              <Cell width="9%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {total_complete}
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

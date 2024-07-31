import { LozengeField } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Link from "next/link";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableWorkingPaper = ({ data, pathName }) => {
  return (
    <div className="bg-white">
      <TableTree>
        <Headers>
          <Header
            width={"24%"}
            className="border-x border-t rounded-ss-lg cell-custom-dataTables"
          >
            <div className="custom-table-header">
              <p className="text-sm font-bold">AUDITOR</p>
            </div>
          </Header>
          <Header
            width={"10%"}
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center">
              <p className="text-sm font-bold">STATUS</p>
            </div>
          </Header>
          <Header
            width={"22%"}
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header">
              <p className="text-sm font-bold">UKER</p>
            </div>
          </Header>
          <Header
            width={"22%"}
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header">
              <div>
                <div className="text-sm font-bold">STORY POINT</div>
                <div className="text-xs italic">(RISK ISSUE)</div>
              </div>
            </div>
          </Header>
          <Header
            width={"22%"}
            className="border-t border-r rounded-se-lg cell-custom-dataTables"
          >
            <div className="custom-table-header">
              <div>
                <div className="text-sm font-bold">EPIC</div>
                <div className="text-xs italic">(SUB MAJOR RISK)</div>
              </div>
            </div>
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({
              kkpa_id,
              auditor,
              status,
              uker,
              risk_issue,
              sub_major,
            }) => (
              <Row>
                <Cell width={"24%"} className={`border-x ${customCell}`}>
                  <div className="custom-table-position-center">
                    {auditor ? (
                      <Link href={`${pathName}/working-paper/${kkpa_id}`}>
                        {auditor?.pn} - {auditor?.name}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </Cell>
                <Cell width={"10%"} className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {status ? (
                      <LozengeField
                        appreance={
                          status === "On Progress"
                            ? "default"
                            : status === "On Approver"
                            ? "inprogress"
                            : "success"
                        }
                      >
                        {status}
                      </LozengeField>
                    ) : (
                      ""
                    )}
                  </div>
                </Cell>
                <Cell width={"22%"} className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {uker?.ref_auditee_orgeh_kode
                      ? `[${uker?.ref_auditee_orgeh_kode}][${uker?.ref_auditee_branch_kode}] - ${uker?.ref_auditee_branch_name}`
                      : ""}
                  </div>
                </Cell>
                <Cell width={"22%"} className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {risk_issue?.kode ? (
                      <p className="text-xs">
                        <span className="font-bold">{risk_issue?.abbr}</span> -{" "}
                        {risk_issue?.nama}
                      </p>
                    ) : (
                      "-"
                    )}
                  </div>
                </Cell>
                <Cell width={"22%"} className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {sub_major?.kode ? (
                      <p className="text-xs">
                        <span className="font-bold">{sub_major?.abbr}</span> -{" "}
                        {sub_major?.nama}
                      </p>
                    ) : (
                      "-"
                    )}
                  </div>
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b pb-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
    </div>
  );
};

export default TableWorkingPaper;

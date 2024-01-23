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

const TableOverview = ({ data, baseUrl }) => {
  return (
    <TableTree>
      <Headers>
        <Header
          width="17%"
          className="border-x border-t cell-custom-dataTables rounded-ss-xl"
        >
          <div className="custom-table-header">AUDITOR</div>
        </Header>
        <Header width="9%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header justify-center">STATUS</div>
        </Header>
        <Header width="7%" className="border-t border-r cell-custom-dataTables">
          <div className="custom-table-header justify-center">MANDAYS</div>
        </Header>
        <Header
          width="12%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header">RISK ISSUE</div>
        </Header>
        <Header
          width="12%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header">SUB-MAJOR</div>
        </Header>
        <Header
          width="10%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header">SUB-AKTIFITAS</div>
        </Header>
        <Header
          width="10%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header">AKTIFITAS</div>
        </Header>
        <Header
          width="11%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header">BRANCH</div>
        </Header>
        <Header
          width="12%"
          className="border-t border-r cell-custom-dataTables rounded-se-xl"
        >
          <div className="custom-table-header">ORGEH</div>
        </Header>
      </Headers>
      {data?.length ? (
        <div className="max-h-[31rem] overflow-y-scroll">
          <Rows
            items={data}
            render={({
              id,
              auditor,
              status,
              mandays,
              risk_issue_code,
              risk_issue_name,
              sub_major_code,
              sub_major_name,
              sub_aktivitas,
              aktivitas,
              branch_kode,
              branch_name,
              orgeh_kode,
              orgeh_name,
            }) => (
              <Row>
                <Cell width="17%" className={`border-x ${customCell}`}>
                  <Link
                    className="custom-table-position-center"
                    href={`${baseUrl}/${id}/detail`}
                  >
                    {auditor}
                  </Link>
                </Cell>
                <Cell width="9%" className={`border-r ${customCell}`}>
                  <div
                    className={`custom-table-position-center justify-center text-xs`}
                  >
                    <LozengeField
                      appreance={status === "On Approver" ? "removed" : "moved"}
                      isBold={true}
                    >
                      {status}
                    </LozengeField>
                  </div>
                </Cell>
                <Cell width="7%" className={`border-r ${customCell}`}>
                  <div
                    className={`custom-table-position-center justify-center text-xs`}
                  >
                    {mandays}
                  </div>
                </Cell>
                <Cell width="12%" className={`border-r ${customCell}`}>
                  <div className={`custom-table-position-center text-xs`}>
                    <p>
                      <span className="font-bold">{risk_issue_code}</span> -{" "}
                      <span>{risk_issue_name}</span>
                    </p>
                  </div>
                </Cell>
                <Cell width="12%" className={`border-r ${customCell}`}>
                  <div className={`custom-table-position-center text-xs`}>
                    <p>
                      <span className="font-bold">{sub_major_code}</span> -{" "}
                      <span>{sub_major_name}</span>
                    </p>
                  </div>
                </Cell>
                <Cell width="10%" className={`border-r ${customCell}`}>
                  <div className={`custom-table-position-center text-xs`}>
                    {sub_aktivitas}
                  </div>
                </Cell>
                <Cell width="10%" className={`border-r ${customCell}`}>
                  <div className={`custom-table-position-center text-xs`}>
                    {aktivitas}
                  </div>
                </Cell>
                <Cell width="11%" className={`border-r ${customCell}`}>
                  <div className={`custom-table-position-center text-xs`}>
                    {branch_kode + " - " + branch_name}
                  </div>
                </Cell>
                <Cell width="12%" className={`border-r ${customCell}`}>
                  <div className={`custom-table-position-center text-xs`}>
                    {orgeh_kode + " - " + orgeh_name}
                  </div>
                </Cell>
              </Row>
            )}
          />
        </div>
      ) : (
        <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
          <DataNotFound />
        </div>
      )}
    </TableTree>
  );
};

export default TableOverview;

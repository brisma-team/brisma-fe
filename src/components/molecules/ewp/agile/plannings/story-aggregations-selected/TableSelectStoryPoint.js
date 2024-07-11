import {
  CardContentHeaderFooter,
  DataNotFound,
} from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableSelectStoryPoint = ({ data }) => {
  return (
    <CardContentHeaderFooter
      className={"!p-4"}
      withoutBorderTop
      withoutBorderBottom
    >
      <div className="overflow-x-scroll max-w-[95rem] pb-3">
        <div className="w-[1900px] bg-white">
          <TableTree>
            <Headers>
              <Header
                width={350}
                className="border-x rounded-ss-xl cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">STORY POINT</div>
                    <div className="text-xs italic">(RISK ISSUE / CONTROL)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">EPIC</div>
                    <div className="text-xs italic">(SUB MAJOR RISK)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">MAJOR</p>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">MEGA</p>
                </div>
              </Header>
              <Header
                width={500}
                className="border-t border-r rounded-se-xl cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">RISK TYPE</p>
                </div>
              </Header>
            </Headers>
            {data?.length ? (
              <Rows
                items={data}
                render={({ risk_issue, sub_major, major, mega, risk_type }) => (
                  <Row>
                    <Cell width={350} className={`border-x ${customCell}`}>
                      {risk_issue?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{risk_issue?.abbr}</span>{" "}
                          - {risk_issue?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {sub_major?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{sub_major?.abbr}</span> -{" "}
                          {sub_major?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {major?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{major?.abbr}</span> -{" "}
                          {major?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {mega?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{mega?.abbr}</span> -{" "}
                          {mega?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={500} className={`border-r ${customCell}`}>
                      {risk_type || "-"}
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
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableSelectStoryPoint;

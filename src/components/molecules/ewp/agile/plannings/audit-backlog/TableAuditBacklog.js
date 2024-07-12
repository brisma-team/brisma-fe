import { ButtonIcon, LozengeField } from "@/components/atoms";
import {
  ButtonEdit,
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

const TableAuditBacklog = ({ data, handleClickEdit }) => {
  return (
    <CardContentHeaderFooter withoutBorderBottom className={"!p-4"}>
      <div className="overflow-x-scroll max-w-[95rem] pb-3">
        <div className="w-[3400px] bg-white">
          <TableTree>
            <Headers>
              <Header
                width={100}
                className="border-x border-t rounded-ss-lg cell-custom-dataTables"
              >
                <div className="custom-table-header justify-center">AKSI</div>
              </Header>
              <Header
                width={150}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header justify-center">
                  <p className="text-sm font-bold">STATUS</p>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">FEATURE</p>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">SPRINT NAME</p>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">ACCEPTANCE CRITERIA</div>
                    <div className="text-xs italic">(DESIGN)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">ACCEPTANCE CRITERIA</div>
                    <div className="text-xs italic">(OPERATING)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
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
                width={150}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header justify-center text-center">
                  <div>
                    <div className="text-sm font-bold">MANDAYS</div>
                    <div className="text-xs italic">(ESTIMATE EFFORT)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={200}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header justify-center">
                  <p className="text-sm font-bold">PRIORITY</p>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">DOR</div>
                    <div className="text-xs italic">(DEFINITION OF READY)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r rounded-se-lg cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">DOD</div>
                    <div className="text-xs italic">(DEFINITION OF DONE)</div>
                  </div>
                </div>
              </Header>
            </Headers>
            {data?.length ? (
              <Rows
                items={data}
                render={({
                  id,
                  status,
                  feature,
                  sprint,
                  design,
                  operating,
                  risk_issue,
                  sub_major,
                  mandays,
                  priority,
                  dor,
                  dod,
                }) => (
                  <Row>
                    <Cell width={100} className={`border-x ${customCell}`}>
                      <div className="custom-table-position-center justify-center">
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() => handleClickEdit(id)}
                        />
                      </div>
                    </Cell>
                    <Cell width={150} className={`border-r ${customCell}`}>
                      <div className="custom-table-position-center justify-center">
                        <LozengeField
                          appreance={status ? "" : "default"}
                          isBold
                        >
                          {status || "draft"}
                        </LozengeField>
                      </div>
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {feature || "-"}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {sprint?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">
                            {sprint?.kode} - {sprint?.no}
                          </span>{" "}
                          - {sprint?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {design || "-"}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {operating || "-"}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
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
                    <Cell
                      width={150}
                      className={`border-r ${customCell} text-center`}
                    >
                      {mandays ? (
                        <p className="text-xs font-bold">{mandays} Days</p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={200} className={`border-r ${customCell}`}>
                      <div className="custom-table-position-center justify-center">
                        <LozengeField
                          appreance={
                            priority === "1"
                              ? "default"
                              : priority === "2"
                              ? "success"
                              : priority === "3"
                              ? "moved"
                              : priority === "4"
                              ? "removed"
                              : ""
                          }
                          isBold
                        >
                          {status == "1"
                            ? "Low"
                            : status == "2"
                            ? "Normal"
                            : status == "3"
                            ? "High"
                            : status == "4"
                            ? "Urgent"
                            : ""}
                        </LozengeField>
                      </div>
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {dor || "-"}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {dod || "-"}
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
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableAuditBacklog;

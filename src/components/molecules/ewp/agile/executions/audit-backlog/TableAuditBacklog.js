import { CustomTooltip, LozengeField } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  DataNotFound,
} from "@/components/molecules/commons";
import shortenWord from "@/helpers/shortenWord";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Link from "next/link";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableAuditBacklog = ({ data }) => {
  return (
    <CardContentHeaderFooter withoutBorderBottom className={"!p-4"}>
      <div className="overflow-x-scroll max-w-[95rem] pb-3">
        <div className="w-[3600px] bg-white">
          <TableTree>
            <Headers>
              <Header
                width={150}
                className="border-x border-t border-r cell-custom-dataTables"
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
                  <p className="text-sm font-bold">UKER</p>
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
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">USER STORY DESCRIPTION</p>
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
                width={150}
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
                  uker,
                  design,
                  operating,
                  risk_issue,
                  sub_major,
                  user_story_desc,
                  mandays,
                  priority,
                  dor,
                  dod,
                }) => (
                  <Row>
                    <Cell width={150} className={`border-x ${customCell}`}>
                      <div className="custom-table-position-center justify-center">
                        {status ? (
                          <LozengeField
                            appreance={
                              status === "draft"
                                ? "default"
                                : status === "in progress"
                                ? "inprogress"
                                : status === "completed"
                                ? "success"
                                : status === "impended"
                                ? "moved"
                                : status === "canceled"
                                ? "removed"
                                : ""
                            }
                            isBold={status !== "draft"}
                          >
                            {status}
                          </LozengeField>
                        ) : (
                          ""
                        )}
                      </div>
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {feature || "-"}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {sprint?.no ? (
                        <Link href={`executions/${id}`}>
                          <span className="font-bold">{sprint?.no}</span> -{" "}
                          {sprint?.nama}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {uker?.length ? (
                        <CustomTooltip
                          content={
                            <ul className="list-disc w-full pl-2.5">
                              {uker?.map((uker, index) => {
                                return (
                                  <li key={index}>
                                    [{uker?.orgeh?.kode}][{uker?.branch?.kode}]
                                    - {uker?.branch?.nama}
                                  </li>
                                );
                              })}
                            </ul>
                          }
                        >
                          <p className="underline cursor-pointer">
                            {shortenWord(
                              uker?.map((item) => item?.orgeh?.kode).join(", "),
                              0,
                              27
                            )}
                          </p>
                        </CustomTooltip>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {design?.length ? (
                        <ul className="list-disc w-full pl-2.5">
                          {design?.map((task, index) => {
                            return <li key={index}>{task?.description}</li>;
                          })}
                        </ul>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {operating?.length ? (
                        <ul className="list-disc w-full pl-2.5">
                          {operating?.map((task, index) => {
                            return <li key={index}>{task?.description}</li>;
                          })}
                        </ul>
                      ) : (
                        "-"
                      )}
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
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {user_story_desc || "-"}
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
                    <Cell
                      width={150}
                      className={`border-r ${customCell} justify-center`}
                    >
                      <div className="text-center">
                        {priority !== null ? priority : "-"}
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

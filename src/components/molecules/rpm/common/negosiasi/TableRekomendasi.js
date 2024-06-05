import { ButtonIcon, Card, LozengeField } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
import Link from "next/link";
import { capitalizeEveryWord } from "@/helpers";
import {
  DataNotFound,
  DropdownCard,
  RetryButton,
} from "@/components/molecules/commons";
const positionCenter = `w-full h-full flex justify-center items-center`;

const TableRekomendasi = ({
  data,
  isPIC,
  expansionMap,
  baseUrl,
  handleToggleExpansion,
  handleClickInisiasiNegosiasi,
  handleClickCancel,
}) => {
  return (
    <Card>
      <div className="px-4 py-2 w-full flex flex-col gap-4">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="9%"
              className="border-x border-t rounded-ss-lg cell-custom-dataTables"
            >
              <div
                className={`custom-table-header justify-center text-sm font-semibold`}
              >
                AKSI
              </div>
            </Header>
            <Header
              width="36%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold">
                REKOMENDASI & ACTION PLAN
              </div>
            </Header>
            <Header
              width="15%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold justify-center">
                STATUS
              </div>
            </Header>
            <Header
              width="15%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold justify-center">
                EVALUASI
              </div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables rounded-se-lg"
            >
              <div className="custom-table-header justify-center text-sm font-semibold">
                ASSIGNE
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                id,
                nama,
                status,
                hasil_evaluasi,
                pic,
                role,
                children = [],
              }) => (
                <Row
                  itemId={id}
                  role={role}
                  items={children}
                  hasChildren={children.length > 0}
                  isExpanded={Boolean(expansionMap[`${id}-${role}`])}
                >
                  <Cell className="!hidden" />
                  <Cell
                    width="9%"
                    className="border-x cell-custom-dataTables justify-center"
                  >
                    {role === "child" && isPIC ? (
                      status === "on evaluator" ? (
                        <DropdownCard
                          actions={[
                            {
                              label: (
                                <span className="my-auto">
                                  Inisiasi Negosiasi
                                </span>
                              ),
                              action: () => handleClickInisiasiNegosiasi(id),
                            },
                          ]}
                        />
                      ) : status === "on nego" ? (
                        <ButtonIcon
                          icon={
                            <RetryButton
                              size={"large"}
                              className={"text-atlasian-red"}
                            />
                          }
                          handleClick={() => handleClickCancel(id)}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell width="36%" className="border-r cell-custom-dataTables">
                    <div className={`${positionCenter}`}>
                      {role === "parent" ? (
                        <ButtonIcon
                          handleClick={() => handleToggleExpansion(id, role)}
                          icon={
                            expansionMap[`${id}-${role}`] ? (
                              <IconChevronDown />
                            ) : (
                              <IconChevronRight />
                            )
                          }
                        />
                      ) : (
                        <div className="ml-[2.67rem]" />
                      )}
                      <div
                        className={`flex items-center w-full justify-between ml-2`}
                      >
                        {role === "parent" ? (
                          <p>
                            <span className="font-semibold">Action Plan</span> :{" "}
                            {nama}
                          </p>
                        ) : role === "child" ? (
                          <Link href={`${baseUrl}/negosiasi/${id}`}>
                            <span className="font-semibold">Action Plan</span> :{" "}
                            {nama}
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Cell>
                  <Cell
                    width="15%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {role === "child" ? (
                      <LozengeField
                        appreance={
                          status === "on evaluator"
                            ? "success"
                            : status === "on nego"
                            ? "moved"
                            : ""
                        }
                        isBold
                      >
                        <div className="py-1 flex justify-center w-24">
                          {capitalizeEveryWord(status)}
                        </div>
                      </LozengeField>
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell
                    width="15%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {role === "child" && hasil_evaluasi ? (
                      <LozengeField
                        appreance={
                          hasil_evaluasi === "Memadai"
                            ? "success"
                            : hasil_evaluasi === "Dalam Pemantauan"
                            ? "moved"
                            : hasil_evaluasi === "Tidak Memadai"
                            ? "removed"
                            : ""
                        }
                        isBold
                      >
                        <div className="py-1 flex justify-center w-32">
                          {capitalizeEveryWord(hasil_evaluasi)}
                        </div>
                      </LozengeField>
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell
                    width="25%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    <p className="text-base">
                      {pic?.pn ? `${pic?.pn} - ${pic?.nama}` : ""}
                    </p>
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <div className="w-full border-x border-b pb-3">
              <DataNotFound />
            </div>
          )}
          <div className="border-x border-b rounded-es-xl rounded-ee-xl min-h-[2.7rem]" />
        </TableTree>
      </div>
    </Card>
  );
};

export default TableRekomendasi;

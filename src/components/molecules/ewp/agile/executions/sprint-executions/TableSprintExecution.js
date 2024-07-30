import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
import {
  ButtonIcon,
  CustomTooltip,
  DivButton,
  LozengeField,
} from "@/components/atoms";
import {
  ButtonEdit,
  CardContentHeaderFooter,
  StatusTaskAgileSelect,
} from "@/components/molecules/commons";
import shortenWord from "@/helpers/shortenWord";
import Link from "next/link";
import Image from "next/image";
import { ImageBar } from "@/helpers/imagesUrl";

const positionCenter = `w-full h-full flex justify-center items-center`;

const TableSprintExecution = ({
  data,
  pathName,
  expansionMap,
  withoutButton,
  handleClickToggleExpansion,
  handleClickInitiate,
  handleClickTerminate,
  handleClickEditSprintTeam,
  handleClickWorkingPapper,
  handleChangeStatusUserStory,
}) => {
  return (
    <CardContentHeaderFooter
      withoutBorderBottom
      width={"w-[95rem]"}
      className={"!p-4"}
    >
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width={"10%"}
            className="border-t border-x rounded-ss-lg cell-custom-dataTables justify-center"
          >
            AKSI
          </Header>
          <Header
            width={"12%"}
            className="border-t border-x cell-custom-dataTables justify-center"
          >
            STATUS
          </Header>
          <Header
            width={"29%"}
            className="border-t border-x cell-custom-dataTables"
          >
            SPRINT ENTITIES
          </Header>
          <Header
            width={"17%"}
            className="border-t border-x cell-custom-dataTables"
          >
            SPRINT TEAM
          </Header>
          <Header
            width={"21%"}
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            OBJECT AUDIT (UKER/DIVISI)
          </Header>
          <Header
            width={"21%"}
            className="border-t border-r rounded-se-lg cell-custom-dataTables justify-center"
          >
            USER STORY DESCRIPTION
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({
            id,
            role,
            status,
            sprint,
            team,
            is_onprogress,
            is_open,
            is_close,
            risk_issue,
            uker,
            completion_status,
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
                width={"10%"}
                className="border-x cell-custom-dataTables justify-center"
              >
                {role === "parent" ? (
                  is_onprogress && !is_close ? (
                    <LozengeField appreance="removed" isBold>
                      <DivButton
                        className={"py-1 flex justify-center w-20"}
                        handleClick={async () => await handleClickTerminate(id)}
                        isDisabled={withoutButton}
                      >
                        Terminate
                      </DivButton>
                    </LozengeField>
                  ) : is_close ? (
                    <LozengeField appreance="success" isBold>
                      <DivButton
                        className={"py-1 flex justify-center w-20"}
                        isDisabled
                      >
                        Completed
                      </DivButton>
                    </LozengeField>
                  ) : is_open ? (
                    <LozengeField appreance="new" isBold>
                      <DivButton
                        className={"py-1 flex justify-center w-20"}
                        handleClick={async () => await handleClickInitiate(id)}
                        isDisabled={withoutButton}
                      >
                        Initiate
                      </DivButton>
                    </LozengeField>
                  ) : (
                    <LozengeField appreance="default">
                      <DivButton
                        className={"py-1 flex justify-center w-20 text-white"}
                        isDisabled
                      >
                        Waiting
                      </DivButton>
                    </LozengeField>
                  )
                ) : (
                  ""
                )}
              </Cell>
              <Cell
                width={"12%"}
                className="border-r cell-custom-dataTables cell-width-full-height-full justify-center"
              >
                <div className={`${positionCenter}`}>
                  {role === "child" ? (
                    !withoutButton ? (
                      <StatusTaskAgileSelect
                        selectedValue={
                          status ? { label: status, value: status } : null
                        }
                        handleChange={async (e) =>
                          await handleChangeStatusUserStory(id, e.value)
                        }
                      />
                    ) : (
                      <LozengeField
                        appreance={
                          status === "Draft"
                            ? "default"
                            : status === "On Progress"
                            ? "inprogress"
                            : status === "Completed"
                            ? "success"
                            : status === "Impended"
                            ? "moved"
                            : status === "Canceled"
                            ? "removed"
                            : ""
                        }
                        isBold={status !== "Draft"}
                      >
                        {status}
                      </LozengeField>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </Cell>
              <Cell
                width={"29%"}
                className="border-r cell-custom-dataTables cell-width-full-height-full px-10"
              >
                <div className={`${positionCenter}`}>
                  {role !== "child" ? (
                    <ButtonIcon
                      handleClick={() => handleClickToggleExpansion(id, role)}
                      icon={
                        expansionMap[`${id}-${role}`] ? (
                          <IconChevronDown />
                        ) : (
                          <IconChevronRight />
                        )
                      }
                      className={role === "child" ? "ml-5" : ""}
                    />
                  ) : (
                    <div className="ml-[2.67rem]" />
                  )}
                  <div
                    className={`flex items-center w-full justify-between ml-2`}
                  >
                    {role === "parent" ? (
                      <>
                        <p>
                          <span className="font-bold">
                            {sprint?.no}
                            {" - "}
                          </span>
                          {sprint?.nama}
                        </p>
                        {!withoutButton ? (
                          <ButtonIcon
                            icon={
                              <Image
                                src={ImageBar}
                                alt=""
                                width={15}
                                height={15}
                              />
                            }
                            handleClick={() => handleClickWorkingPapper(id)}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    ) : role === "child" ? (
                      <Link href={`${pathName}/story-point/${id}`}>
                        <span className="font-bold">{risk_issue?.abbr}</span>
                        {" - "}
                        {risk_issue?.nama}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Cell>
              <Cell width={"17%"} className="border-r cell-custom-dataTables">
                {role === "parent" ? (
                  <div className={`${positionCenter} gap-2`}>
                    {!withoutButton ? (
                      <ButtonIcon
                        icon={<ButtonEdit />}
                        handleClick={() => handleClickEditSprintTeam(id)}
                      />
                    ) : (
                      ""
                    )}
                    <CustomTooltip
                      content={
                        <ul className="list-disc w-full pl-2.5">
                          {team?.map((data, index) => {
                            return (
                              <li key={index}>
                                {`${data?.pic?.pn} - ${data?.pic?.name} ( ${data?.role} )`}
                              </li>
                            );
                          })}
                        </ul>
                      }
                    >
                      <p className="underline cursor-pointer">
                        {team?.length
                          ? shortenWord(
                              team?.map((data) => data?.pic?.name).join(", "),
                              0,
                              27
                            )
                          : ""}
                      </p>
                    </CustomTooltip>
                  </div>
                ) : (
                  ""
                )}
              </Cell>
              <Cell width={"21%"} className="border-r cell-custom-dataTables">
                {role === "child" ? (
                  <div className={`${positionCenter}`}>
                    <CustomTooltip
                      content={
                        <ul className="list-disc w-full pl-2.5">
                          {uker?.map((uker, index) => {
                            return (
                              <li key={index}>
                                [{uker?.orgeh?.kode}][{uker?.branch?.kode}] -{" "}
                                {uker?.branch?.nama}
                              </li>
                            );
                          })}
                        </ul>
                      }
                    >
                      <p className="underline cursor-pointer">
                        {uker?.length
                          ? shortenWord(
                              uker?.map((item) => item?.orgeh?.kode).join(", "),
                              0,
                              20
                            )
                          : ""}
                      </p>
                    </CustomTooltip>
                  </div>
                ) : (
                  ""
                )}
              </Cell>
              <Cell width={"21%"} className="border-r cell-custom-dataTables">
                {role === "child" ? (
                  <div className={`${positionCenter}`}>
                    <span>
                      {completion_status
                        ? shortenWord(completion_status, 0, 25)
                        : ""}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
    </CardContentHeaderFooter>
  );
};

export default TableSprintExecution;

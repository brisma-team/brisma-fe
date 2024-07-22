import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@/components/icons";
import {
  ButtonField,
  ButtonIcon,
  CustomTooltip,
  LozengeField,
} from "@/components/atoms";
import {
  ButtonDelete,
  ButtonEdit,
  CardContentHeaderFooter,
} from "@/components/molecules/commons";
import { ImageGroup } from "@/helpers/imagesUrl";
import Image from "next/image";
import shortenWord from "@/helpers/shortenWord";
import { capitalizeEveryWord } from "@/helpers";

const positionCenter = `w-full h-full flex justify-center items-center`;

const TableSprintPlanning = ({
  data,
  expansionMap,
  withoutButton,
  handleClickToggleExpansion,
  handleClickAddSprint,
  handleClickEditSprint,
  handleClickDeleteSprint,
  handleClickAddUserStory,
  handleClickDeleteUserStory,
  handleClickEditUkerAssessment,
  handleClickAddTask,
  handleClickEditTask,
  handleClickDeleteTask,
  handleClickEditCompletionStatusUserStory,
  handleClickEditPotentialProblemTask,
  handleClickEditCommentTask,
}) => {
  return (
    <CardContentHeaderFooter withoutBorderBottom className={"!p-4"}>
      <div className="overflow-x-scroll max-w-[95rem] pb-3">
        <div className="w-[2000px] bg-white">
          <TableTree>
            <Headers>
              <Header className="!hidden" />
              <Header
                width={100}
                className="border-t border-x rounded-ss-lg cell-custom-dataTables justify-center"
              >
                AKSI
              </Header>
              <Header
                width={150}
                className="border-t border-x cell-custom-dataTables justify-center"
              >
                STATUS
              </Header>
              <Header
                width={400}
                className="border-t border-x cell-custom-dataTables"
              >
                SPRINT ENTITIES
              </Header>
              <Header
                width={250}
                className="border-t border-r cell-custom-dataTables justify-center"
              >
                OBJECT AUDIT (UKER/DIVISI)
              </Header>
              <Header
                width={200}
                className="border-t border-r cell-custom-dataTables justify-center"
              >
                TASK TYPE
              </Header>
              <Header
                width={300}
                className="border-t border-r cell-custom-dataTables justify-center"
              >
                USER STORY DESCRIPTION
              </Header>
              <Header
                width={300}
                className="border-t border-r cell-custom-dataTables justify-center"
              >
                POTENTIAL PROBLEM
              </Header>
              <Header
                width={300}
                className="border-t border-r rounded-se-lg cell-custom-dataTables justify-center"
              >
                COMMENT
              </Header>
            </Headers>
            <Rows
              items={data}
              render={({
                id,
                sprint_index,
                user_story_index,
                task_index,
                role,
                status,
                sprint,
                risk_issue,
                description,
                uker,
                task_type,
                completion_status,
                potential_problem,
                comment,
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
                    width={100}
                    className="border-x cell-custom-dataTables justify-center"
                  >
                    {role === "parent" ? (
                      <div className="flex gap-1">
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() => handleClickEditSprint(id)}
                        />
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={() => handleClickDeleteSprint(id)}
                        />
                      </div>
                    ) : role === "parent-child" ? (
                      <ButtonIcon
                        icon={<ButtonDelete />}
                        handleClick={() => handleClickDeleteUserStory(id)}
                      />
                    ) : role === "child" ? (
                      <div className="flex gap-1">
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() => handleClickEditTask(id)}
                        />
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={() => handleClickDeleteTask(id)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell
                    width={150}
                    className="border-r cell-custom-dataTables justify-center"
                  >
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
                  </Cell>
                  <Cell
                    width={400}
                    className="border-r cell-custom-dataTables cell-width-full-height-full px-10"
                  >
                    <div className={`${positionCenter}`}>
                      {role !== "child" ? (
                        <ButtonIcon
                          handleClick={() =>
                            handleClickToggleExpansion(id, role)
                          }
                          icon={
                            expansionMap[`${id}-${role}`] ? (
                              <IconChevronDown />
                            ) : (
                              <IconChevronRight />
                            )
                          }
                          className={role === "parent-child" ? "ml-5" : ""}
                        />
                      ) : (
                        <div className="ml-[2.67rem]" />
                      )}
                      <div
                        className={`flex items-center w-full justify-between ml-2`}
                      >
                        {role === "parent" ? (
                          <p>
                            <span className="font-bold">
                              {sprint?.no}
                              {" - "}
                            </span>
                            {sprint?.nama}
                          </p>
                        ) : role === "parent-child" ? (
                          <p>
                            <span className="font-bold">
                              {risk_issue?.abbr}
                            </span>
                            {" - "}
                            {risk_issue?.nama}
                          </p>
                        ) : role === "child" ? (
                          <p>
                            <span className="">Task :</span> {description}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      {role !== "child" ? (
                        <ButtonIcon
                          icon={<Image src={ImageGroup} alt="" />}
                          handleClick={() => {
                            if (role === "parent") {
                              handleClickAddUserStory(id);
                            } else if (role === "parent-child") {
                              handleClickAddTask(id);
                            }
                          }}
                          className={"w-8 flex justify-end"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Cell>
                  <Cell width={250} className="border-r cell-custom-dataTables">
                    {role === "parent-child" ? (
                      <div className={`${positionCenter} gap-2`}>
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() => handleClickEditUkerAssessment(id)}
                        />
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
                            {uker?.length
                              ? shortenWord(
                                  uker
                                    ?.map((item) => item?.orgeh?.kode)
                                    .join(", "),
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
                  <Cell
                    width={200}
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {role === "child" ? (
                      <p>
                        {task_type?.kode
                          ? capitalizeEveryWord(task_type?.nama)
                          : ""}
                      </p>
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell width={300} className="border-r cell-custom-dataTables">
                    {role === "parent-child" ? (
                      <div className={`${positionCenter} gap-2`}>
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() =>
                            handleClickEditCompletionStatusUserStory(
                              sprint_index,
                              user_story_index
                            )
                          }
                        />
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
                  <Cell width={300} className="border-r cell-custom-dataTables">
                    {role === "child" ? (
                      <div className={`${positionCenter} gap-2`}>
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() =>
                            handleClickEditPotentialProblemTask(
                              sprint_index,
                              user_story_index,
                              task_index
                            )
                          }
                        />
                        <span>
                          {potential_problem
                            ? shortenWord(potential_problem, 0, 25)
                            : ""}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell width={300} className="border-r cell-custom-dataTables">
                    {role === "child" ? (
                      <div className={`${positionCenter} gap-2`}>
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() =>
                            handleClickEditCommentTask(
                              sprint_index,
                              user_story_index,
                              task_index
                            )
                          }
                        />
                        <span>
                          {comment ? shortenWord(comment, 0, 25) : ""}
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
        </div>
      </div>
      <div className="w-full flex justify-end min-h-[2rem]">
        {!withoutButton ? (
          <div className="w-fit p-2">
            <ButtonField
              iconAfter={
                <div className="text-atlasian-purple">
                  <IconPlus size="medium" />
                </div>
              }
              text={"Tambah Sprint"}
              textColor={"purple"}
              handler={handleClickAddSprint}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableSprintPlanning;

import {
  ButtonField,
  ButtonIcon,
  Card,
  CustomCheckbox,
  DivButton,
  LozengeField,
} from "@/components/atoms";
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
import { CustomSelect, DataNotFound } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageCheck, ImageReview } from "@/helpers/imagesUrl";

const positionCenter = `w-full h-full flex justify-center items-center`;

const TableRekomendasi = ({
  data,
  dataActionPlan,
  dataTeam,
  isPIC,
  expansionMap,
  baseUrl,
  currentContentStage,
  handleToggleExpansion,
  handleCancel,
  handleReject,
  handleSubmitPenugasan,
  handleSubmitApprove,
  handleChangePayload,
  handleClickCheckbox,
  handleClickPenugasan,
  handleClickReview,
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
              width="51%"
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
              render={({ id, nama, status, pic, role, children = [] }) => (
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
                    {role === "child" && currentContentStage ? (
                      <CustomCheckbox
                        value={dataActionPlan?.find(
                          (action_plan_id) => action_plan_id === id
                        )}
                        handleChange={(e) =>
                          handleClickCheckbox(e.target.checked, id)
                        }
                      />
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell width="51%" className="border-r cell-custom-dataTables">
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
                          <Link href={`${baseUrl}/tindak-lanjut/${id}`}>
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
                          status === "open"
                            ? "default"
                            : status === "on submitter"
                            ? "inprogress"
                            : status === "on review"
                            ? "success"
                            : status === "on evaluation"
                            ? "moved"
                            : ""
                        }
                        isBold={status !== "open"}
                      >
                        <div
                          className={`py-1 flex justify-center w-24 ${
                            status === "open" ? "text-white" : ""
                          }`}
                        >
                          {capitalizeEveryWord(status)}
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
        {isPIC ? (
          <div className="w-full flex items-center gap-3">
            <div className="w-full flex justify-between">
              <div className="w-full flex items-center">
                <p className="text-atlasian-blue-light text-sm font-bold">
                  {currentContentStage === 1
                    ? "Mode Penugasan"
                    : currentContentStage === 2
                    ? "Mode Review Approval"
                    : ""}
                </p>
              </div>
              {currentContentStage === 1 ? (
                <div className="w-64">
                  <CustomSelect
                    optionValue={dataTeam}
                    handleChange={(e) => handleChangePayload("pic", e.value)}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-3 h-fit">
              {currentContentStage === 1 ? (
                <>
                  <div className="rounded w-28 bg-atlasian-gray-dark">
                    <ButtonField text="Batal" handler={handleCancel} />
                  </div>
                  <div className="rounded w-28 bg-atlasian-green">
                    <ButtonField
                      text="Simpan"
                      handler={handleSubmitPenugasan}
                    />
                  </div>
                </>
              ) : currentContentStage === 2 ? (
                <>
                  <div className="rounded w-28 bg-atlasian-gray-dark">
                    <ButtonField text="Batal" handler={handleCancel} />
                  </div>
                  <div className="rounded w-28 bg-atlasian-red">
                    <ButtonField text="Reject" handler={handleReject} />
                  </div>
                  <div className="rounded w-28 bg-atlasian-green">
                    <ButtonField text="Approve" handler={handleSubmitApprove} />
                  </div>
                </>
              ) : (
                <>
                  <DivButton
                    handleClick={handleClickPenugasan}
                    className="w-32 h-10 rounded border border-gray-300 flex gap-2 justify-center items-center hover:bg-gray-100"
                  >
                    <Image alt="" src={ImageCheck} width={18} height={18} />
                    <div className="font-semibold text-sm">Penugasan</div>
                  </DivButton>
                  <DivButton
                    handleClick={handleClickReview}
                    className="w-32 h-10 rounded border border-gray-300 flex gap-2 justify-center items-center hover:bg-gray-100"
                  >
                    <Image alt="" src={ImageReview} width={18} height={18} />
                    <div className="font-semibold text-sm">Review</div>
                  </DivButton>
                </>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};

export default TableRekomendasi;

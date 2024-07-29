import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ButtonField, CustomCheckbox, LozengeField } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  CustomSelect,
} from "@/components/molecules/commons";
import { capitalizeEveryWord, convertDate } from "@/helpers";

const TableTask = ({
  data,
  dataUserStory,
  dataTeam,
  payload,
  withoutButton,
  handleClickCheckbox,
  handleChangePayload,
  handleSubmitPenugasan,
}) => {
  return (
    <CardContentHeaderFooter
      width={"w-[95rem]"}
      header={
        <div className="h-12 flex justify-between items-center px-3">
          <div className="font-semibold text-base">Task (User Acceptances)</div>
          <div className="font-semibold text-base text-atlasian-red">
            Waktu Pengerjaan :{" "}
            {dataUserStory?.sprint?.start_date
              ? convertDate(dataUserStory?.sprint?.start_date, "-", "d")
              : ""}{" "}
            s/d{" "}
            {dataUserStory?.sprint?.end_date
              ? convertDate(dataUserStory?.sprint?.end_date, "-", "d")
              : ""}
          </div>
        </div>
      }
      footer={
        <div className="w-full flex items-center justify-end gap-3 p-3">
          <div className="w-80">
            <CustomSelect
              selectedValue={
                payload?.pic?.pn
                  ? {
                      label: `${payload?.pic?.pn} - ${payload?.pic?.name}`,
                      value: payload?.pic,
                    }
                  : null
              }
              optionValue={dataTeam}
              handleChange={(e) => handleChangePayload("pic", e.value)}
            />
          </div>
          <div className="rounded w-28 bg-atlasian-green">
            <ButtonField text="Simpan" handler={handleSubmitPenugasan} />
          </div>
        </div>
      }
    >
      <div className="p-4">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="6%"
              className="border-x border-t rounded-ss-lg cell-custom-dataTables"
            >
              <div
                className={`custom-table-header justify-center text-sm font-semibold`}
              >
                AKSI
              </div>
            </Header>
            <Header
              width={"10%"}
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              STATUS
            </Header>
            <Header
              width={"28%"}
              className="border-t border-r cell-custom-dataTables"
            >
              TASK DESCRIPTIONS
            </Header>
            <Header
              width={"13%"}
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              TASK TYPE
            </Header>
            <Header
              width={"23%"}
              className="border-t border-r cell-custom-dataTables"
            >
              ASSIGNE
            </Header>
            <Header
              width={"20%"}
              className="border-t border-r rounded-se-lg cell-custom-dataTables"
            >
              COMMENT
            </Header>
          </Headers>
          <Rows
            items={data}
            render={({ id, status, description, task_type, pic, comment }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell
                  width="6%"
                  className="border-x cell-custom-dataTables justify-center"
                >
                  {!withoutButton ? (
                    <CustomCheckbox
                      value={payload?.task?.find((task_id) => task_id === id)}
                      handleChange={(e) =>
                        handleClickCheckbox(e.target.checked, id)
                      }
                    />
                  ) : (
                    ""
                  )}
                </Cell>
                <Cell
                  width={"10%"}
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
                <Cell width={"28%"} className="border-r cell-custom-dataTables">
                  {description || ""}
                </Cell>
                <Cell
                  width={"13%"}
                  className="border-r cell-custom-dataTables justify-center"
                >
                  <p>
                    {task_type?.kode
                      ? capitalizeEveryWord(task_type?.nama)
                      : ""}
                  </p>
                </Cell>
                <Cell
                  width={"23%"}
                  className="border-r cell-custom-dataTables cell-width-full-height-full px-10"
                >
                  {pic?.pn ? `${pic?.pn} - ${pic?.name}` : ""}
                </Cell>
                <Cell width={"20%"} className="border-r cell-custom-dataTables">
                  {comment}
                </Cell>
              </Row>
            )}
          />
        </TableTree>
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableTask;

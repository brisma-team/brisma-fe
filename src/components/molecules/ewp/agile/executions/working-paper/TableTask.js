import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ButtonIcon, LozengeField } from "@/components/atoms";
import {
  ButtonEdit,
  CardContentHeaderFooter,
  EffectivenessTaskSelect,
  StatusTaskAgileSelect,
} from "@/components/molecules/commons";
import { convertDate } from "@/helpers";

const positionCenter = `w-full h-full flex justify-center items-center`;

const TableTask = ({
  data,
  dataDeadline,
  withoutAction,
  handleClickEditEvaluasi,
  handleChangeStatusTask,
  handleChangeEffectivenessTask,
}) => {
  return (
    <CardContentHeaderFooter
      header={
        <div className="h-12 flex justify-between items-center px-3">
          <div className="font-semibold text-base">Task (User Acceptances)</div>
          <div className="font-semibold text-base text-atlasian-red">
            Waktu Pengerjaan :{" "}
            {dataDeadline.start_date
              ? convertDate(dataDeadline.start_date, "-", "d")
              : ""}{" "}
            s/d{" "}
            {dataDeadline.end_date
              ? convertDate(dataDeadline.end_date, "-", "d")
              : ""}
          </div>
        </div>
      }
    >
      <div className="p-4">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width={"26%"}
              className="border-x border-t rounded-ss-lg cell-custom-dataTables"
            >
              TASK DESCRIPTIONS
            </Header>
            <Header
              width={"12%"}
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              STATUS
            </Header>
            <Header
              width={"16%"}
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              EFEKTIVITAS
            </Header>
            <Header
              width={"23%"}
              className="border-t border-r cell-custom-dataTables"
            >
              ASSIGNE
            </Header>
            <Header
              width={"23%"}
              className="border-t border-r rounded-se-lg cell-custom-dataTables"
            >
              EVALUASI
            </Header>
          </Headers>
          <Rows
            items={data}
            render={({
              index,
              id,
              description,
              pic,
              status_penyelesaian,
              hasil_pengujian,
              result,
            }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell width={"26%"} className="border-x cell-custom-dataTables">
                  <p>{description || ""}</p>
                </Cell>
                <Cell
                  width={"12%"}
                  className="border-x cell-custom-dataTables cell-width-full-height-full justify-center"
                >
                  {!withoutAction ? (
                    <StatusTaskAgileSelect
                      selectedValue={
                        status_penyelesaian
                          ? {
                              label: status_penyelesaian,
                              value: status_penyelesaian,
                            }
                          : null
                      }
                      handleChange={async (e) =>
                        await handleChangeStatusTask(id, e.value)
                      }
                    />
                  ) : (
                    <div className={`${positionCenter} `}>
                      <LozengeField
                        appreance={
                          status_penyelesaian === "Draft"
                            ? "default"
                            : status_penyelesaian === "On Progress"
                            ? "inprogress"
                            : status_penyelesaian === "Completed"
                            ? "success"
                            : status_penyelesaian === "Impended"
                            ? "moved"
                            : status_penyelesaian === "Canceled"
                            ? "removed"
                            : ""
                        }
                        isBold={status_penyelesaian !== "Draft"}
                      >
                        {status_penyelesaian}
                      </LozengeField>
                    </div>
                  )}
                </Cell>
                <Cell
                  width={"16%"}
                  className="border-r cell-custom-dataTables cell-width-full-height-full justify-center"
                >
                  {!withoutAction ? (
                    <EffectivenessTaskSelect
                      selectedValue={
                        hasil_pengujian
                          ? {
                              label: hasil_pengujian,
                              value: hasil_pengujian,
                            }
                          : null
                      }
                      handleChange={async (e) =>
                        await handleChangeEffectivenessTask(id, e.value)
                      }
                    />
                  ) : (
                    <p>{hasil_pengujian}</p>
                  )}
                </Cell>
                <Cell
                  width={"23%"}
                  className="border-r cell-custom-dataTables px-10"
                >
                  {pic?.pn ? `${pic?.pn} - ${pic?.name}` : ""}
                </Cell>
                <Cell width={"23%"} className="border-r cell-custom-dataTables">
                  <div className={`${positionCenter} gap-2`}>
                    {!withoutAction ? (
                      <ButtonIcon
                        icon={<ButtonEdit />}
                        handleClick={() => handleClickEditEvaluasi(index)}
                      />
                    ) : (
                      ""
                    )}
                    <span>{result}</span>
                  </div>
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

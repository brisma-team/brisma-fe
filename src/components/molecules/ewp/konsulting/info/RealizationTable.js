import Link from "next/link";
import { DivButton, LozengeField } from "@/components/atoms";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const RealizationTable = ({ data, handleClickInitiate }) => {
  return (
    <>
      <p className="text-base font-bold mb-2 ml-2">Realisasi</p>
      <TableTree>
        <Headers>
          <Header
            width="15%"
            className="border-x border-t cell-custom-dataTables"
          >
            <div
              className={`custom-table-header justify-center text-sm font-semibold`}
            >
              Aksi
            </div>
          </Header>
          <Header
            width="15%"
            className="border-x border-t cell-custom-dataTables"
          >
            <div
              className={`custom-table-header justify-center text-sm font-semibold`}
            >
              Status
            </div>
          </Header>
          <Header
            width="28%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              Keterangan
            </div>
          </Header>
          <Header
            width="14%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center text-sm font-semibold">
              Tanggal Dimulai
            </div>
          </Header>
          <Header
            width="14%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center text-sm font-semibold">
              Tanggal Selesai
            </div>
          </Header>
          <Header
            width="28%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">Log</div>
          </Header>
        </Headers>
        <div className="max-h-[18rem] overflow-y-scroll">
          <Rows
            items={data}
            render={({
              is_open,
              is_close,
              is_onprogress,
              status_code,
              label,
              start_date,
              end_date,
              url,
              log,
            }) => (
              <Row>
                <Cell width="15%" className={`border-x ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {is_onprogress && !is_close ? (
                      <LozengeField appreance="removed" isBold>
                        <DivButton
                          className={"py-1 flex justify-center w-20"}
                          handleClick={() =>
                            handleClickInitiate(status_code, "close")
                          }
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
                          handleClick={() =>
                            handleClickInitiate(status_code, "start")
                          }
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
                    )}
                  </div>
                </Cell>
                <Cell width="15%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {is_close ? (
                      <p className="font-semibold text-sm text-atlasian-blue-light">
                        Final
                      </p>
                    ) : is_onprogress ? (
                      <p className="font-semibold text-sm text-atlasian-purple">
                        On Progress
                      </p>
                    ) : (
                      <p className="font-semibold text-sm text-brisma">-</p>
                    )}
                  </div>
                </Cell>
                <Cell width="28%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {start_date !== null ? (
                      <Link href={url} className="text-sm underline">
                        {label}
                      </Link>
                    ) : (
                      <p>{label}</p>
                    )}
                  </div>
                </Cell>
                <Cell width="14%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {start_date ? convertDate(start_date, "/", "d") : "-"}
                  </div>
                </Cell>
                <Cell width="14%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {end_date ? convertDate(end_date, "/", "d") : "-"}
                  </div>
                </Cell>
                <Cell width="28%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">{log}</div>
                </Cell>
              </Row>
            )}
          />
        </div>
      </TableTree>
    </>
  );
};

export default RealizationTable;

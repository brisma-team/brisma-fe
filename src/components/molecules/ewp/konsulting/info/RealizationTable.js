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

const RealizationTable = ({ data, currentStatusCode, handleClickInitiate }) => {
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
              Status Aksi
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
            <div className="custom-table-header text-sm font-semibold">
              Tanggal Dimulai
            </div>
          </Header>
          <Header
            width="14%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
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
              status_code,
              label,
              start_date,
              end_date,
              log,
            }) => (
              <Row>
                <Cell width="15%" className={`border-x ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {is_close ? (
                      <LozengeField appreance="success" isBold={true}>
                        <DivButton
                          className={"py-1 flex justify-center w-16"}
                          isDisabled={true}
                        >
                          Selesai
                        </DivButton>
                      </LozengeField>
                    ) : is_open && !is_close ? (
                      <LozengeField appreance="removed" isBold={true}>
                        <DivButton
                          className={"py-1 flex justify-center w-16"}
                          handleClick={() =>
                            handleClickInitiate(status_code, "close")
                          }
                        >
                          Akhiri
                        </DivButton>
                      </LozengeField>
                    ) : !is_open && currentStatusCode === status_code - 1 ? (
                      <LozengeField appreance="inprogress" isBold={true}>
                        <DivButton
                          className={"py-1 flex justify-center w-16"}
                          handleClick={() =>
                            handleClickInitiate(status_code, "start")
                          }
                        >
                          Mulai
                        </DivButton>
                      </LozengeField>
                    ) : (
                      <LozengeField appreance="default">
                        <DivButton
                          className={"py-1 flex justify-center w-16 text-white"}
                          isDisabled={true}
                        >
                          Mulai
                        </DivButton>
                      </LozengeField>
                    )}
                  </div>
                </Cell>
                <Cell width="28%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">{label}</div>
                </Cell>
                <Cell width="14%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {start_date ? convertDate(start_date, "/", "d") : ""}
                  </div>
                </Cell>
                <Cell width="14%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">
                    {end_date ? convertDate(end_date, "/", "d") : ""}
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

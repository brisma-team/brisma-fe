import Link from "next/link";
import { LozengeField } from "@/components/atoms";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const RealizationTable = ({ data }) => {
  return (
    <>
      <p className="text-base font-bold mb-2 ml-2">Project Flow</p>
      <TableTree>
        <Headers>
          <Header
            width="20%"
            className="border-x border-t cell-custom-dataTables"
          >
            <div
              className={`custom-table-header justify-center text-sm font-semibold`}
            >
              Status
            </div>
          </Header>
          <Header
            width="40%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header text-sm font-semibold">
              Keterangan
            </div>
          </Header>
          <Header
            width="20%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center text-sm font-semibold">
              Tanggal Dimulai
            </div>
          </Header>
          <Header
            width="20%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center text-sm font-semibold">
              Tanggal Selesai
            </div>
          </Header>
        </Headers>
        <div className="max-h-[18rem] overflow-y-scroll">
          <Rows
            items={data}
            render={({
              is_open,
              is_close,
              is_onprogress,
              label,
              start_date,
              end_date,
              url,
            }) => (
              <Row>
                <Cell width="20%" className={`border-x ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {is_onprogress && !is_close ? (
                      <LozengeField appreance="removed" isBold>
                        <div className="py-1 flex justify-center w-20">
                          Terminate
                        </div>
                      </LozengeField>
                    ) : is_close ? (
                      <LozengeField appreance="success" isBold>
                        <div className="py-1 flex justify-center w-20">
                          Completed
                        </div>
                      </LozengeField>
                    ) : is_open ? (
                      <LozengeField appreance="new" isBold>
                        <div className="py-1 flex justify-center w-20">
                          Initiate
                        </div>
                      </LozengeField>
                    ) : (
                      <LozengeField appreance="default">
                        <div className="py-1 flex justify-center w-20 text-white">
                          Waiting
                        </div>
                      </LozengeField>
                    )}
                  </div>
                </Cell>
                <Cell width="40%" className={`border-r ${customCell}`}>
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
                <Cell width="20%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {start_date ? convertDate(start_date, "/", "d") : "-"}
                  </div>
                </Cell>
                <Cell width="20%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {end_date ? convertDate(end_date, "/", "d") : "-"}
                  </div>
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

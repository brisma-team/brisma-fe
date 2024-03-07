import Link from "next/link";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import {
  DataNotFound,
  ButtonEdit,
  ButtonDelete,
} from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const DataTables = ({
  selectedId,
  data,
  handleClickEdit,
  handleClickDelete,
  handleClickAddMatrix,
}) => {
  return (
    <TableTree>
      <Headers>
        <Header
          width="10%"
          className="border-x border-t rounded-ss-lg cell-custom-dataTables"
        >
          <div
            className={`custom-table-header justify-center text-sm font-semibold`}
          >
            AKSI
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            STATUS
          </div>
        </Header>
        <Header
          width="35%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            JUDUL MATRIX
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            TANGGAL
          </div>
        </Header>
        <Header
          width="25%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header text-sm font-semibold">
            AUDITOR
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            JUMLAH PP
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({
            matrix_id,
            status_persetujuan,
            judul,
            tanggal,
            auditor,
            jumlah_pp,
          }) => (
            <Row>
              <Cell width="10%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center justify-center gap-1">
                  <ButtonIcon
                    icon={<ButtonEdit />}
                    handleClick={() => handleClickEdit(matrix_id)}
                    color={"yellow"}
                  />
                  <ButtonIcon
                    icon={<ButtonDelete />}
                    handleClick={() => handleClickDelete(matrix_id)}
                  />
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <p
                    className={`text-sm ${
                      status_persetujuan === "Final"
                        ? "text-atlasian-green"
                        : status_persetujuan === "On Approver"
                        ? "text-atlasian-blue-light"
                        : "text-atlasian-yellow"
                    } font-semibold`}
                  >
                    {status_persetujuan}
                  </p>
                </div>
              </Cell>
              <Cell width="35%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  <Link
                    target="_blank"
                    href={`/ewp/konsulting/overview/${selectedId}/peluang-peningkatan/matrix/${matrix_id}`}
                    className="text-sm underline"
                  >
                    {judul || "N/A"}
                  </Link>
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {convertDate(tanggal, "-", "d") || "N/A"}
                </div>
              </Cell>
              <Cell width="25%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {auditor?.nama || "N/A"}
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {jumlah_pp || 0}
                </div>
              </Cell>
            </Row>
          )}
        />
      ) : (
        <div className="w-full border-x border-b">
          <DataNotFound />
        </div>
      )}
      <div className="flex justify-end w-full border-x border-b rounded-es-xl rounded-ee-xl">
        <div className="w-48 text-sm font-semibold p-2 my-1">
          <ButtonField
            iconAfter={
              <div className="text-atlasian-purple">
                <IconPlus size="medium" />
              </div>
            }
            text={"Tambah MATRIX"}
            textColor={"purple"}
            handler={handleClickAddMatrix}
          />
        </div>
      </div>
    </TableTree>
  );
};

export default DataTables;

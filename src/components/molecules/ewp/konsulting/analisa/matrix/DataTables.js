import { ButtonField, ButtonIcon } from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import {
  ButtonDelete,
  ButtonEdit,
  DataNotFound,
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
          width="45%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            JUDUL MATRIX PELUANG
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
          width="30%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header text-sm font-semibold">
            AUDITOR
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({ matrix_id, judul, tanggal, auditor }) => (
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
              <Cell width="45%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">{judul}</div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {convertDate(tanggal, "-", "d")}
                </div>
              </Cell>
              <Cell width="30%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {auditor?.name}
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

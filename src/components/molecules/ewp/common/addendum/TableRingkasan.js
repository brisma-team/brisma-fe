import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import { ButtonDelete, ButtonEdit } from "@/components/molecules/commons";
import { IconFile } from "@/components/icons";

const TableRingkasan = ({
  data,
  section,
  handleClickEdit,
  handleClickDelete,
  handleClickView,
  handleClickReset,
  handleClickSave,
  withButtonDelete,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="dataTables-custom bg-white">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="10%"
              className="border-t border-x cell-custom-dataTables rounded-ss-lg flex justify-center"
            >
              Aksi
            </Header>
            <Header
              width="18%"
              className="border-t border-x cell-custom-dataTables"
            >
              Section
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              Keterangan
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              Sebelum
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              Sesudah
            </Header>
            <Header
              width="18%"
              className="border-t border-r rounded-se-lg cell-custom-dataTables"
            >
              Alasan
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                id,
                part,
                keterangan,
                note_sebelum,
                note_sesudah,
                alasan,
              }) => (
                <Row>
                  <Cell className="!hidden" />
                  <Cell
                    width="10%"
                    className="border-x cell-custom-dataTables flex justify-center"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <ButtonIcon
                        icon={<ButtonEdit />}
                        handleClick={() => handleClickEdit(id)}
                        color={"yellow"}
                      />
                      {withButtonDelete ? (
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={async () => handleClickDelete(id)}
                        />
                      ) : (
                        ""
                      )}
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border border-atlasian-dark w-5 h-5 flex items-center justify-center p-1 text-atlasian-dark">
                            <IconFile size="small" />
                          </div>
                        }
                        handleClick={() => handleClickView(id)}
                      />
                    </div>
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {section[part] || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {keterangan || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {note_sebelum || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {note_sesudah || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {alasan || "-"}
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <Row>
              <Cell
                width="100%"
                className="border-x cell-custom-dataTables flex justify-center"
              >
                <div className="w-full pt-4 pb-2 text-center">
                  <p>
                    <b>No data available in table</b>
                  </p>
                </div>
              </Cell>
            </Row>
          )}
        </TableTree>
      </div>
      <div className="w-full flex justify-end gap-3 -my-1">
        <div className="w-[7.75rem] bg-atlasian-red rounded">
          <ButtonField text={"Reset"} handler={handleClickReset} />
        </div>
        <div className="rounded w-28 bg-atlasian-green">
          <ButtonField text={"Simpan"} handler={handleClickSave} />
        </div>
      </div>
    </div>
  );
};

export default TableRingkasan;

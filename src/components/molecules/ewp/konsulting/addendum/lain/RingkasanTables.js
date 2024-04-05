import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ButtonIcon } from "@/components/atoms";
import { ButtonEdit, ButtonDelete } from "@/components/molecules/commons";
import { IconFile } from "@/components/icons";

const RingkasanTables = ({
  data,
  handleClickDelete,
  handleClickUpdate,
  handleClickView,
  //   withoutButtonAction,
}) => {
  const section = {
    sumber_informasi: "Sumber Informasi",
    anggaran: "Anggaran",
  };
  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="10%"
            className="border-t border-x cell-custom-dataTables flex justify-center"
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
            className="border-t border-r cell-custom-dataTables"
          >
            Alasan
          </Header>
        </Headers>
        {data !== undefined && data !== null && data.length > 0 ? (
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
                  {/* {!withoutButtonAction ? ( */}
                  <div className="flex justify-center items-center gap-1">
                    <ButtonIcon
                      icon={<ButtonEdit />}
                      handleClick={() => handleClickUpdate(id)}
                      color={"yellow"}
                    />
                    <ButtonIcon
                      icon={<ButtonDelete />}
                      handleClick={() => handleClickDelete(id)}
                    />
                    <ButtonIcon
                      icon={
                        <div className="rounded-full border border-atlasian-dark w-5 h-5 flex items-center justify-center p-1 text-atlasian-dark">
                          <IconFile size="small" />
                        </div>
                      }
                      handleClick={() => handleClickView(id)}
                    />
                  </div>
                  {/* ) : (
                  ""
                )} */}
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
  );
};

export default RingkasanTables;

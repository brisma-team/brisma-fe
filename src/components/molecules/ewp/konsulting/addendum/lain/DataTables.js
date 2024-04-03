import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ButtonIcon } from "@/components/atoms";
import { ButtonEdit, ButtonDelete } from "@/components/molecules/commons";

const DataTables = ({
  data,
  handleClickDelete,
  handleClickUpdate,
  //   handleClickView,
  //   withoutButtonAction,
}) => {
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
        <Rows
          items={data}
          render={({ id, section, keterangan, sebelum, sesudah, alasan }) => (
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
                </div>
                {/* ) : (
                  ""
                )} */}
              </Cell>
              <Cell width="18%" className="border-r cell-custom-dataTables">
                {section}
              </Cell>
              <Cell width="18%" className="border-r cell-custom-dataTables">
                {keterangan}
              </Cell>
              <Cell width="18%" className="border-r cell-custom-dataTables">
                {sebelum}
              </Cell>
              <Cell width="18%" className="border-r cell-custom-dataTables">
                {sesudah}
              </Cell>
              <Cell width="18%" className="border-r cell-custom-dataTables">
                {alasan}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
    </div>
  );
};

export default DataTables;

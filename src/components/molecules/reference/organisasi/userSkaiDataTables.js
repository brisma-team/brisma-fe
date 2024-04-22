import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconPlus } from "@/components/icons";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import { ButtonEdit, ButtonDelete } from "@/components/molecules/commons";

const UserSkaiDataTables = ({
  data,
  handleClickAdd,
  handleClickDelete,
  handleClickUpdate,
  withoutButtonAction = false,
}) => {
  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="8%"
            className="border-t border-x cell-custom-dataTables flex justify-center"
          >
            Aksi
          </Header>
          <Header
            width="15%"
            className="border-t border-x cell-custom-dataTables justify-center"
          >
            Personal Number
          </Header>
          <Header
            width="27%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Name
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Unit Kantor Audit
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Role
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({ id, pn, name, kode_uka, name_uka, role }) => (
            <Row>
              <Cell className="!hidden" />
              <Cell
                width="8%"
                className="border-x cell-custom-dataTables flex justify-center"
              >
                {!withoutButtonAction ? (
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
                ) : (
                  ""
                )}
              </Cell>
              <Cell
                width="15%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {pn}
              </Cell>
              <Cell width="27%" className="border-r cell-custom-dataTables">
                {name}
              </Cell>
              <Cell
                width="25%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {kode_uka + " - " + name_uka}
              </Cell>
              <Cell width="25%" className="border-r cell-custom-dataTables">
                <div className="flex gap-2">
                  {role.map((role, i) => (
                    <li key={i}>{role.name_role}</li>
                  ))}
                </div>
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      <div className="w-full border rounded-ee-lg rounded-es-lg min-h-[1.3rem]">
        {!withoutButtonAction ? (
          <div className="w-52 p-2 ">
            <ButtonField
              iconAfter={
                <div className="text-atlasian-purple">
                  <IconPlus size="medium" />
                </div>
              }
              text={"Tambah Pengguna"}
              textColor={"purple"}
              handler={handleClickAdd}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserSkaiDataTables;

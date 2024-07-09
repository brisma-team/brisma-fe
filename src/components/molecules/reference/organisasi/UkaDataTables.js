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

const UkaDataTables = ({
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
            Kode UKA
          </Header>
          <Header
            width="27%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Nama UKA
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Branch
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Orgeh
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({ kode, name, branch, branch_name, orgeh, orgeh_name }) => (
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
                      handleClick={() => handleClickUpdate(kode)}
                      // isDisabled={true}
                      color={"yellow"}
                    />
                    <ButtonIcon
                      icon={<ButtonDelete />}
                      handleClick={() => handleClickDelete(kode)}
                      // isDisabled={true}
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
                {kode}
              </Cell>
              <Cell width="27%" className="border-r cell-custom-dataTables">
                {name}
              </Cell>
              <Cell
                width="25%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {branch + " - " + branch_name}
              </Cell>
              <Cell width="25%" className="border-r cell-custom-dataTables">
                <div className="flex gap-2">{orgeh + " - " + orgeh_name}</div>
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
              text={"Tambah UKA"}
              textColor={"purple"}
              handler={handleClickAdd}
              // disabled={true}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UkaDataTables;
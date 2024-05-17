import { ButtonIcon } from "@/components/atoms";
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

const TableActionPlan = ({ data, handleClickDelete, handleClickEdit }) => {
  return (
    <div className="dataTables-custom bg-white">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="10%"
            className="border-t border-x cell-custom-dataTables flex justify-center rounded-ss-lg"
          >
            AKSI
          </Header>
          <Header
            width="20%"
            className="border-t border-x cell-custom-dataTables"
          >
            DEADLINE
          </Header>
          <Header
            width="70%"
            className="border-t border-r cell-custom-dataTables rounded-se-lg"
          >
            ACTION PLAN
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({ id, batas_waktu, desc }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell
                  width="10%"
                  className="border-x cell-custom-dataTables flex justify-center"
                >
                  <div className="flex gap-1.5">
                    <ButtonIcon
                      icon={<ButtonDelete />}
                      handleClick={async () => handleClickDelete(id)}
                    />
                    <ButtonIcon
                      icon={<ButtonEdit />}
                      handleClick={async () => handleClickEdit(id)}
                    />
                  </div>
                </Cell>
                <Cell width="20%" className="border-r cell-custom-dataTables">
                  {convertDate(batas_waktu, "/", "d")}
                </Cell>
                <Cell width="70%" className="border-r cell-custom-dataTables">
                  {desc}
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b py-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
    </div>
  );
};

export default TableActionPlan;

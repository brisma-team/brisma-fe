import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { convertDate } from "@/helpers";
import { ButtonIcon } from "@/components/atoms";
import { ButtonDelete, DataNotFound } from "@/components/molecules/commons";

const DataTables = ({ data, handleClickDelete }) => {
  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="8%"
            className="border-t border-x cell-custom-dataTables flex justify-center rounded-ss-lg"
          >
            <p className="font-semibold text-brisma text-sm">Aksi</p>
          </Header>
          <Header
            width="17%"
            className="border-t border-x cell-custom-dataTables"
          >
            <p className="font-semibold text-brisma text-sm">Deadline</p>
          </Header>
          <Header
            width="75%"
            className="border-t border-r cell-custom-dataTables rounded-se-lg"
          >
            <p className="font-semibold text-brisma text-sm">
              Uraian Rekomendasi
            </p>
          </Header>
        </Headers>
        {data?.length ? (
          <div className="max-h-[18rem] overflow-y-scroll">
            <Rows
              items={data}
              render={({ id, deadline, desc }) => (
                <Row>
                  <Cell className="!hidden" />
                  <Cell
                    width="8%"
                    className="border-x cell-custom-dataTables flex justify-center"
                  >
                    <div className="flex justify-center items-center gap-1">
                      <ButtonIcon
                        icon={<ButtonDelete />}
                        handleClick={async () => await handleClickDelete(id)}
                      />
                    </div>
                  </Cell>
                  <Cell width="17%" className="border-r cell-custom-dataTables">
                    {convertDate(deadline, "-", "d")}
                  </Cell>
                  <Cell width="75%" className="border-r cell-custom-dataTables">
                    {desc}
                  </Cell>
                </Row>
              )}
            />
          </div>
        ) : (
          <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl py-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
    </div>
  );
};

export default DataTables;

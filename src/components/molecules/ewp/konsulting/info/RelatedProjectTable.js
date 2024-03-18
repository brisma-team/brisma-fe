import { ButtonField, ButtonIcon } from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import { ButtonDelete, DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const RelatedProjectTable = ({
  data,
  handleClickDelete,
  handleAddRelatedProject,
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
            JUDUL PROYEK TERKAIT
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            PROJECT ID
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">TIPE</div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header text-sm font-semibold">JENIS</div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({ matrix_id, judul, project_id, tipe, jenis }) => (
            <Row>
              <Cell width="10%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center">
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
                <div className="custom-table-position-center">
                  {project_id?.toUpperCase()}
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">{tipe}</div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">{jenis}</div>
              </Cell>
            </Row>
          )}
        />
      ) : (
        <div className="w-full border-x border-b pb-3">
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
            text={"Proyek Terkait"}
            textColor={"purple"}
            handler={handleAddRelatedProject}
          />
        </div>
      </div>
    </TableTree>
  );
};

export default RelatedProjectTable;

import { ButtonIcon, CheckboxField } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconEdit } from "@/components/icons";
import { DataNotFound } from "@/components/molecules/commons";

const TableSampleFile = ({ data, handleChangeCheckbox, handleEditSample }) => {
  const customHeader = `w-full h-full flex items-center text-brisma font-bold`;
  const customCell = `cell-width-full-height-full cell-custom-dataTables`;
  const positionCenter = `w-full h-full flex items-center`;

  return (
    <div className="w-full overflow-y-scroll max-h-[40rem]">
      <TableTree>
        <Headers>
          <Header width="13%" className="border-x border-t rounded-ss-xl">
            <div className={`${customHeader} justify-center text-center`}>
              Aksi
            </div>
          </Header>
          <Header
            width="45%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className={customHeader}>Nama File Sample</div>
          </Header>
          <Header width="42%" className="border-t border-r rounded-se-xl">
            <div className={`${customHeader} justify-center text-center`}>
              Deskripsi
            </div>
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({ id, filename, description }) => (
              <Row>
                <Cell width="13%" className={`border-x ${customCell}`}>
                  <div className={`${positionCenter} justify-center gap-0.5`}>
                    <CheckboxField
                      handleChange={(e) =>
                        handleChangeCheckbox(e.target.checked, id)
                      }
                    />
                    <ButtonIcon
                      icon={<IconEdit size="medium" />}
                      handleClick={async () => await handleEditSample(id)}
                      color="yellow"
                    />
                  </div>
                </Cell>
                <Cell width="45%" className={`border-r ${customCell}`}>
                  <div className={`${positionCenter} text-xs`}>{filename}</div>
                </Cell>
                <Cell width="42%" className={`border-r ${customCell}`}>
                  <div className={`${positionCenter} text-xs`}>
                    {description}
                  </div>
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
    </div>
  );
};

export default TableSampleFile;

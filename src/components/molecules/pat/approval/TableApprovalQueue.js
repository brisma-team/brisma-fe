import { ButtonIcon, Card } from "@/components/atoms";
import { IconArrowRight } from "@/components/icons";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableApprovalQueuePAT = ({ data, handleClickAction }) => {
  return (
    <Card>
      <div className="w-full px-4 pb-2">
        <p className="text-lg font-bold ml-2">WAITING FOR APPROVAL</p>
        <div className="py-1" />
        <TableTree>
          <Headers>
            <Header
              width="10%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">
                <p className="text-base font-bold">AKSI</p>
              </div>
            </Header>
            <Header
              width="38%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">NAMA PROYEK</p>
              </div>
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">TAHUN</p>
              </div>
            </Header>
            <Header
              width="34%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">DOCUMENT STATUS</p>
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({ pat_id, project_name, tahun, module }) => (
                <Row>
                  <Cell width="10%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border-2 border-atlasian-blue-light flex justify-center items-center w-6 h-6">
                            <IconArrowRight />
                          </div>
                        }
                        handleClick={() => handleClickAction(pat_id)}
                        color={"blue"}
                      />
                    </div>
                  </Cell>
                  <Cell width="38%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {project_name?.toUpperCase() || "-"}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="18%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{tahun || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="34%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{module}</p>
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
    </Card>
  );
};

export default TableApprovalQueuePAT;

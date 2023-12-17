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

const TableApprovalQueue = ({ data, handleClickAction }) => {
  return (
    <Card>
      <div className="w-full px-4 pb-2">
        <p className="text-lg font-bold ml-2">Antrian Persetujuan</p>
        <div className="py-1" />
        <TableTree>
          <Headers>
            <Header
              width="9%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">
                <p className="text-base font-bold">Aksi</p>
              </div>
            </Header>
            <Header
              width="27%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Project ID</p>
              </div>
            </Header>
            <Header
              width="28%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Jenis Survei</p>
              </div>
            </Header>

            <Header
              width="36%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Fase Approval</p>
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                survey_id,
                pn,
                project_survey_id,
                jenis_survey_name,
                fase_approval,
              }) => (
                <Row>
                  <Cell width="9%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border-2 border-atlasian-blue-light flex justify-center items-center w-6 h-6">
                            <IconArrowRight />
                          </div>
                        }
                        handleClick={() => handleClickAction(survey_id, pn)}
                        color={"blue"}
                      />
                    </div>
                  </Cell>
                  <Cell width="27%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {project_survey_id?.toUpperCase()}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="28%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{jenis_survey_name}</p>
                    </div>
                  </Cell>
                  <Cell width="36%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{fase_approval}</p>
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

export default TableApprovalQueue;

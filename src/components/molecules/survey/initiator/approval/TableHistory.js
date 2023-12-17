import { Card } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableHistory = ({ data }) => {
  return (
    <Card>
      <div className="w-full px-4 pb-2">
        <p className="text-lg font-bold ml-2">Riwayat</p>
        <div className="py-1" />
        <TableTree>
          <Headers>
            <Header
              width="14%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">
                <p className="text-base font-bold">Tanggal</p>
              </div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Project ID</p>
              </div>
            </Header>
            <Header
              width="25%"
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
                <p className="text-base font-bold">Status Approval</p>
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                tanggal,
                project_survey_id,
                jenis_survey_name,
                status_approval,
              }) => (
                <Row>
                  <Cell width="14%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-sm">
                        {convertDate(tanggal, "-", "d")}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {project_survey_id?.toUpperCase()}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{jenis_survey_name}</p>
                    </div>
                  </Cell>
                  <Cell width="36%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{status_approval}</p>
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

export default TableHistory;

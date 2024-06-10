import { Card } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { DataNotFound } from "@/components/molecules/commons";
import Link from "next/link";

const TableObjectOverview = ({ data, pathName }) => {
  return (
    <Card>
      <div className="px-4 py-2 w-full">
        <div className="bg-white">
          <TableTree>
            <Headers>
              <Header
                width="30%"
                className="border-x border-t rounded-ss-lg cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold">
                  OBJECT
                </div>
              </Header>
              <Header
                width="17%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold justify-center">
                  SURVEY TERKAIT
                </div>
              </Header>
              <Header
                width="17%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold justify-center">
                  UKER
                </div>
              </Header>
              <Header
                width="12%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold justify-center">
                  REKOMENDASI
                </div>
              </Header>
              <Header
                width="12%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold justify-center">
                  ACTION PLAN
                </div>
              </Header>
              <Header
                width="12%"
                className="border-t border-r cell-custom-dataTables rounded-se-lg"
              >
                <div className="custom-table-header justify-center text-sm font-semibold">
                  MEMADAI
                </div>
              </Header>
            </Headers>
            {data?.length ? (
              <Rows
                items={data}
                render={({
                  kkpt_id,
                  project_id,
                  project_name,
                  branch,
                  orgeh,
                  survey_id,
                  total_rekomendasi,
                  total_action_plan,
                  total_memadai,
                }) => (
                  <Row>
                    <Cell
                      width="30%"
                      className="border-x cell-custom-dataTables"
                    >
                      <Link
                        className="text-base"
                        href={`${pathName}/${kkpt_id}`}
                      >
                        {`[${
                          project_id?.toUpperCase() || ""
                        }] - ${project_name}`}
                      </Link>
                    </Cell>
                    <Cell
                      width="17%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      <p className="text-base">{survey_id?.toUpperCase()}</p>
                    </Cell>
                    <Cell
                      width="17%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      <p className="text-base">{`[${orgeh?.kode}][${
                        branch?.kode
                      }] - ${branch?.name?.toUpperCase()}`}</p>
                    </Cell>
                    <Cell
                      width="12%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      {total_rekomendasi}
                    </Cell>

                    <Cell
                      width="12%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      {total_action_plan}
                    </Cell>

                    <Cell
                      width="12%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      {total_memadai}
                    </Cell>
                  </Row>
                )}
              />
            ) : (
              <div className="w-full border-x border-b pb-3">
                <DataNotFound />
              </div>
            )}
            <div className="border-x border-b rounded-es-xl rounded-ee-xl min-h-[2.7rem]" />
          </TableTree>
        </div>
      </div>
    </Card>
  );
};

export default TableObjectOverview;

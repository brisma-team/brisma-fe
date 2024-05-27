import { CustomPagination, RadioField } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  DataNotFound,
} from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const TableProjectListEWP = ({
  data,
  totalData,
  filter,
  payload,
  handleChangeFilter,
  handleChangePayload,
}) => {
  return (
    <CardContentHeaderFooter
      footer={
        <div className="flex justify-center -mt-2.5 mb-4">
          <CustomPagination
            perPage={filter.limit}
            handleSetPagination={(start, end, pageNow) =>
              handleChangeFilter("page", pageNow)
            }
            defaultCurrentPage={filter.page}
            totalData={totalData}
          />
        </div>
      }
    >
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
              width="30%"
              className="border-t border-x cell-custom-dataTables"
            >
              JUDUL PROYEK TERKAIT
            </Header>
            <Header
              width="20%"
              className="border-t border-r cell-custom-dataTables"
            >
              PROJECT ID
            </Header>
            <Header
              width="20%"
              className="border-t border-r cell-custom-dataTables"
            >
              TIPE
            </Header>
            <Header
              width="20%"
              className="border-t border-r cell-custom-dataTables rounded-se-lg"
            >
              JENIS
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                ewp_id,
                project_id,
                project_name,
                ref_tipe,
                ref_jenis,
              }) => (
                <Row>
                  <Cell className="!hidden" />
                  <Cell
                    width="10%"
                    className="border-x cell-custom-dataTables flex justify-center"
                  >
                    <div className="custom-table-position-center justify-center">
                      <RadioField
                        isChecked={payload?.ewp_id === ewp_id}
                        handleChange={() =>
                          handleChangePayload("ewp_id", ewp_id)
                        }
                      />
                    </div>
                  </Cell>
                  <Cell width="30%" className="border-r cell-custom-dataTables">
                    {project_name}
                  </Cell>
                  <Cell width="20%" className="border-r cell-custom-dataTables">
                    {project_id?.toUpperCase() || ""}
                  </Cell>
                  <Cell width="20%" className="border-r cell-custom-dataTables">
                    {ref_tipe?.nama || ""}
                  </Cell>
                  <Cell width="20%" className="border-r cell-custom-dataTables">
                    {ref_jenis?.nama || ""}
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
    </CardContentHeaderFooter>
  );
};

export default TableProjectListEWP;

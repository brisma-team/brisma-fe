import { ButtonIcon, Card, CustomPagination } from "@/components/atoms";
import { IconArrowRight } from "@/components/icons";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useEffect, useState } from "react";
const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableApprovalQueue = ({ data, handleClickAction }) => {
  const [rows, setRows] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState({
    min: 0,
    max: 10,
  });

  useEffect(() => {
    setRows(data);
    setTotalData(data?.length);
  }, [data]);

  const handleSetPagination = (min, max) => {
    setPagination({ min, max });
  };

  return (
    <Card>
      <div className="w-full px-4 pb-2">
        <p className="text-lg font-bold ml-2">Antrian Persetujuan</p>
        <div className="py-1" />
        <TableTree>
          <Headers>
            <Header
              width="7%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">
                <p className="text-base font-bold">Aksi</p>
              </div>
            </Header>
            <Header
              width="14%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Project ID</p>
              </div>
            </Header>
            <Header
              width="15%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Project Name</p>
              </div>
            </Header>
            <Header
              width="8%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Metode</p>
              </div>
            </Header>
            <Header
              width="11%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Tipe</p>
              </div>
            </Header>
            <Header
              width="17%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <p className="text-base font-bold">Initiator</p>
              </div>
            </Header>
            <Header
              width="13%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Fase Approval</p>
              </div>
            </Header>
            <Header
              width="15%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>
                <p className="text-base font-bold">Waktu Pengajuan</p>
              </div>
            </Header>
          </Headers>
          {rows?.length ? (
            <Rows
              items={rows.slice(pagination.min, pagination.max)}
              render={({
                ewp_id,
                sub_modul_id,
                sub_modul,
                create_by,
                project_id,
                project_name,
                matrix_id,
                ref_metode,
                ref_tipe,
                fase_approval,
                pn_kta_requester,
                nama_kta_requester,
                created_at,
              }) => (
                <Row>
                  <Cell width="7%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border-2 border-atlasian-blue-light flex justify-center items-center w-6 h-6">
                            <IconArrowRight />
                          </div>
                        }
                        handleClick={() =>
                          handleClickAction({
                            sub_modul,
                            sub_modul_id,
                            fase_approval,
                            ref_tipe,
                            ewp_id,
                            matrix_id,
                          })
                        }
                        color={"blue"}
                      />
                    </div>
                  </Cell>
                  <Cell width="14%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {project_id?.toUpperCase() || "-"}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="15%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{project_name || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="8%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{ref_metode?.nama || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="11%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{ref_tipe?.nama || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="17%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {(create_by?.pn || pn_kta_requester) +
                          " - " +
                          (create_by?.nama || nama_kta_requester)}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="13%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">{fase_approval}</p>
                    </div>
                  </Cell>
                  <Cell width="15%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-sm">
                        {new Date(created_at).toLocaleDateString("id-ID") +
                          " " +
                          new Date(created_at).toLocaleTimeString()}
                      </p>
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
        <CustomPagination
          defaultCurrentPage={1}
          perPage={5}
          totalData={totalData}
          handleSetPagination={handleSetPagination}
          getValue={(value) => {
            setPagination({ min: value.min, max: value.max });
          }}
        />
      </div>
    </Card>
  );
};

export default TableApprovalQueue;

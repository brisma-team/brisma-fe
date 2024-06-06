import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { DataNotFound } from "../../commons";
import { LozengeField } from "@/components/atoms";
import { convertDate } from "@/helpers";

const TableCatatanNegosiasi = ({ data }) => {
  return (
    <TableTree>
      <Headers>
        <Header className="!hidden" />
        <Header
          width="15%"
          className="border-x border-t rounded-ss-lg cell-custom-dataTables"
        >
          <div
            className={`custom-table-header justify-center text-sm font-semibold`}
          >
            TANGGAL KEJADIAN
          </div>
        </Header>
        <Header
          width="40%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            ACTION PLAN
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold justify-center">
            DEADLINE
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold justify-center">
            EVALUASI
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            NEGOSIASI
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({
            tipe_rekomendasi,
            action_plan,
            tanggal_kejadian,
            deadline,
            hasil_evaluasi,
            negosiasi,
          }) => (
            <Row>
              <Cell className="!hidden" />
              <Cell
                width="15%"
                className="border-x cell-custom-dataTables justify-center"
              >
                {tanggal_kejadian
                  ? convertDate(tanggal_kejadian, "/", "d")
                  : ""}
              </Cell>
              <Cell width="40%" className="border-r cell-custom-dataTables">
                <p>
                  <span className="font-semibold">
                    Rekomendasi - {tipe_rekomendasi?.name}
                  </span>{" "}
                  : {tipe_rekomendasi?.description || ""}
                </p>
                <p>
                  <span className="font-semibold">Action Plan</span> :{" "}
                  {action_plan || ""}
                </p>
              </Cell>
              <Cell width="15%" className="border-r cell-custom-dataTables">
                {deadline ? convertDate(deadline, "/", "d") : "-"}
              </Cell>
              <Cell width="15%" className="border-r cell-custom-dataTables">
                {hasil_evaluasi ? (
                  <LozengeField
                    appreance={
                      hasil_evaluasi === "Memadai"
                        ? "success"
                        : hasil_evaluasi === "Dalam Pemantauan"
                        ? "moved"
                        : hasil_evaluasi === "Tidak Memadai"
                        ? "removed"
                        : ""
                    }
                    isBold
                  >
                    <div className="py-1 flex justify-center w-32">
                      {hasil_evaluasi}
                    </div>
                  </LozengeField>
                ) : (
                  ""
                )}
              </Cell>
              <Cell width="15%" className="border-r cell-custom-dataTables">
                {negosiasi || "-"}
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
  );
};

export default TableCatatanNegosiasi;

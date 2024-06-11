import { LozengeField, ModalScroll } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import { capitalizeEveryWord, convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const ModalSummaryDetail = ({ showModal, data, handleCloseModal }) => {
  return (
    <ModalScroll showModal={showModal}>
      <div className="w-[45rem] flex flex-col gap-3">
        <TableTree>
          <Headers>
            <Header
              width="15%"
              className="border-t border-x cell-custom-dataTables rounded-ss-lg"
            >
              <div className="custom-table-header text-sm font-semibold">
                TANGGAL KEJADIAN
              </div>
            </Header>
            <Header
              width="40%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold justify-center">
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
                tanggal_kejadian,
                action_plan,
                deadline,
                hasil_evaluasi,
                negosiasi,
              }) => (
                <Row>
                  <Cell
                    width="15%"
                    className="border-x cell-custom-dataTables justify-center"
                  >
                    {tanggal_kejadian
                      ? convertDate(tanggal_kejadian, "/", "d")
                      : ""}
                  </Cell>
                  <Cell
                    width="40%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    <span className="font-semibold">Action Plan</span> :{" "}
                    {action_plan}
                  </Cell>
                  <Cell
                    width="15%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {deadline ? convertDate(deadline, "/", "d") : ""}
                  </Cell>
                  <Cell
                    width="15%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    <LozengeField
                      appreance={
                        hasil_evaluasi === "Dalam Pemantauan"
                          ? "moved"
                          : hasil_evaluasi === "Tidak Memadai"
                          ? "removed"
                          : ""
                      }
                      isBold
                    >
                      <div className="py-1 flex justify-center w-32">
                        {capitalizeEveryWord(hasil_evaluasi)}
                      </div>
                    </LozengeField>
                  </Cell>
                  <Cell
                    width="25%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {negosiasi}
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
    </ModalScroll>
  );
};

export default ModalSummaryDetail;

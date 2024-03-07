import {
  CardContentHeaderFooter,
  DataNotFound,
} from "@/components/molecules/commons";
import { ButtonField, CustomCheckbox } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableRekomendasi = ({
  data,
  isDisabled,
  selectedRekomendasi,
  handleClickSave,
  // handleClickSelectedAll,
  // handleChangeChecbox,
}) => {
  return (
    <CardContentHeaderFooter
      header={
        <div className="px-4 py-2 flex items-center">
          <p className="font-semibold text-base">Rekomendasi Hasil Analisa</p>
        </div>
      }
      footer={
        <div
          className={`py-3 px-4 flex items-center justify-end ${
            isDisabled && "min-h-[2.5rem]"
          }`}
        >
          <div className="w-36 text-sm font-semibold rounded bg-atlasian-green">
            {!isDisabled ? (
              <ButtonField text={"Simpan"} handler={handleClickSave} />
            ) : (
              ""
            )}
          </div>
        </div>
      }
    >
      <div className="p-4">
        <TableTree>
          <Headers>
            <Header
              width="10%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">Terpilih</div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">Deadline</div>
            </Header>
            <Header
              width="40%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header justify-center`}>
                Rekomendasi
              </div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header justify-center`}>
                Control
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                // index,
                pn_responden,
                // nama_responden
              }) => (
                <Row>
                  <Cell width="10%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <CustomCheckbox
                        value={selectedRekomendasi?.find(
                          (responden) =>
                            responden?.pn_responden === pn_responden
                        )}
                        // handleChange={(e) =>
                        //   handleChangeChecbox(e.target.checked, {
                        //     pn_responden,
                        //     nama_responden,
                        //   })
                        // }
                        isDisabled={isDisabled}
                      />
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{"DD/MM/YY"}</p>
                    </div>
                  </Cell>
                  <Cell width="40%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center relative">
                      <p className="text-xs">{"N/A"}</p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{"N/A"}</p>
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
    </CardContentHeaderFooter>
  );
};

export default TableRekomendasi;

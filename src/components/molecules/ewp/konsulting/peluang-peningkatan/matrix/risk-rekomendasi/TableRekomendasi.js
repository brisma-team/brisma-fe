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
import { convertDate } from "@/helpers";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableRekomendasi = ({
  data,
  isDisabled,
  selectedRekomendasi,
  handleClickSave,
  // handleClickSelectedAll,
  handleChangeCheckbox,
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
                id,
                rekomendasi_name,
                deadline,
                control_abbr,
                control_name,
                // is_edit,
                // is_new,
              }) => (
                <Row>
                  <Cell width="10%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <CustomCheckbox
                        value={selectedRekomendasi?.find(
                          (data) => data?.id === id
                        )}
                        handleChange={(e) => {
                          handleChangeCheckbox(e.target.checked, {
                            id,
                            rekomendasi_name,
                            deadline,
                          });
                        }}
                        isDisabled={isDisabled}
                      />
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">
                        {convertDate(deadline, "/", "d")}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="40%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center relative">
                      <p className="text-xs">{rekomendasi_name || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">
                        {control_abbr + " - " + control_name}
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
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableRekomendasi;

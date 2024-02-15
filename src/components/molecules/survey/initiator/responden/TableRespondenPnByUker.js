import {
  CardContentHeaderFooter,
  DataNotFound,
} from "@/components/molecules/commons";
import { ButtonField, CheckboxField, CustomCheckbox } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableRespondenPnByUker = ({
  data,
  isDisabled,
  selectedResponden,
  selectedUkerId,
  isDisabledButtonSave,
  handleClickSave,
  handleClickSelectedAll,
  handleChangeChecbox,
}) => {
  return (
    <CardContentHeaderFooter
      header={
        <div className="px-4 py-2 flex items-center">
          <p className="font-semibold text-base">Daftar PN Responden</p>
        </div>
      }
      footer={
        <div
          className={`py-3 px-4 flex items-center justify-end ${
            isDisabled && "min-h-[2.5rem]"
          }`}
        >
          <div
            className={`w-36 text-sm font-semibold rounded ${
              !selectedUkerId || isDisabledButtonSave
                ? `bg-atlasian-gray-light`
                : `bg-atlasian-green`
            }`}
          >
            {!isDisabled ? (
              <ButtonField
                text={"Simpan"}
                handler={handleClickSave}
                disabled={!selectedUkerId || isDisabledButtonSave}
              />
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
              width="9%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">
                <CheckboxField
                  handleChange={(e) => handleClickSelectedAll(e)}
                  isDisabled={isDisabled}
                />
              </div>
            </Header>
            <Header
              width="6%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">No.</div>
            </Header>
            <Header
              width="31%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>PN Responden</div>
            </Header>
            <Header
              width="54%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>Nama Responden</div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({ index, pn_responden, nama_responden }) => (
                <Row>
                  <Cell width="9%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <CustomCheckbox
                        value={selectedResponden?.find(
                          (responden) =>
                            responden?.pn_responden === pn_responden
                        )}
                        handleChange={(e) =>
                          handleChangeChecbox(e.target.checked, {
                            pn_responden,
                            nama_responden,
                          })
                        }
                        isDisabled={isDisabled}
                      />
                    </div>
                  </Cell>
                  <Cell width="6%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{index + 1}</p>
                    </div>
                  </Cell>
                  <Cell width="31%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center relative">
                      <p className="text-xs">{pn_responden}</p>
                    </div>
                  </Cell>
                  <Cell width="54%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">{nama_responden}</p>
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

export default TableRespondenPnByUker;

import {
  ButtonDelete,
  CardContentHeaderFooter,
  DataNotFound,
  // RiskIssueSelect,
  RiskSelect,
  // OrgehSelect,
} from "@/components/molecules/commons";
import {
  ButtonField,
  ButtonIcon,
  RadioField,
  // TextAreaField,
} from "@/components/atoms";
import { IconPlus } from "@/components/icons";
// import { ImageCircleCheckGreen } from "@/helpers/imagesUrl";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
// import Image from "next/image";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableRiskIssue = ({
  data,
  isDisabled,
  newUker,
  selectedUkerId,
  handleClickAddRow,
  // handleClickSave,
  handleClickDelete,
  handleChangeUker,
  // handleChangeTextUker,
  handleSelectedUker,
}) => {
  const findIndex = data?.findIndex((uker) => uker.id === selectedUkerId);
  return (
    <CardContentHeaderFooter
      header={
        <div className="px-4 py-2 flex items-center">
          <p className="font-semibold text-base">Risk Control Hasil Analisa</p>
        </div>
      }
      footer={
        <div
          className={`p-3 flex items-center ${isDisabled && "min-h-[2.5rem]"}`}
        >
          {!isDisabled ? (
            <div className="w-48 text-sm font-semibold">
              <ButtonField
                iconAfter={
                  <div className="text-atlasian-purple">
                    <IconPlus size="medium" />
                  </div>
                }
                text={"Tambah Risk Issue"}
                textColor={"purple"}
                handler={() => handleClickAddRow()}
              />
            </div>
          ) : (
            ""
          )}
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
              <div className="custom-table-header justify-center">Aksi</div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">
                Lingkup Pemeriksaan
              </div>
            </Header>
            <Header
              width="40%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header justify-center`}>
                Risk Issue
              </div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header justify-center`}>
                Rekomendasi Terpilih
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                index,
                id,
                // orgeh_name,
                // jumlah,
                // keterangan,
                // is_edit,
                // is_new,
              }) => (
                <Row>
                  <Cell width="10%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      {/* {is_new ? (
                        <ButtonIcon
                          icon={
                            <Image
                              src={ImageCircleCheckGreen}
                              alt=""
                              width={22}
                              height={22}
                            />
                          }
                          handleClick={handleClickSave}
                        />
                      ) : ( */}
                      <div className="flex justify-between items-center gap-1.5">
                        <RadioField
                          isChecked={findIndex === index}
                          handleChange={() => handleSelectedUker(id)}
                        />
                        {!isDisabled ? (
                          <ButtonIcon
                            icon={<ButtonDelete />}
                            handleClick={() => handleClickDelete(id)}
                            color={"red"}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      {/* )} */}
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{"N/A"}</p>
                    </div>
                  </Cell>
                  <Cell width="40%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center relative">
                      <RiskSelect
                        selectedValue={
                          newUker?.orgeh_kode
                            ? {
                                label: newUker?.orgeh_name,
                                value: {
                                  orgeh_kode: newUker?.orgeh_kode,
                                  orgeh_name: newUker?.orgeh_name,
                                },
                              }
                            : null
                        }
                        handleChange={(e) => handleChangeUker(e.value)}
                        positionAbsolute={true}
                        width="w-[13rem]"
                      />
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

export default TableRiskIssue;

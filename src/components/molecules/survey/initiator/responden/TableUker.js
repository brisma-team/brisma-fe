import {
  ButtonDelete,
  CardContentHeaderFooter,
  DataNotFound,
  BranchSelect,
} from "@/components/molecules/commons";
import {
  ButtonField,
  ButtonIcon,
  RadioField,
  TextAreaField,
} from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import { ImageCircleCheckGreen } from "@/helpers/imagesUrl";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Image from "next/image";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableUker = ({
  data,
  newUker,
  selectedUkerId,
  handleClickAddRow,
  handleClickSave,
  handleClickDelete,
  handleChangeUker,
  handleChangeTextUker,
  handleSelectedUker,
}) => {
  const findIndex = data?.findIndex((uker) => uker.id === selectedUkerId);
  return (
    <CardContentHeaderFooter
      header={
        <div className="px-4 py-2 flex items-center">
          <p className="font-semibold text-base">Daftar UKER Responden</p>
        </div>
      }
      footer={
        <div className="p-3 flex items-center">
          <div className="w-40 text-sm font-semibold">
            <ButtonField
              iconAfter={
                <div className="text-atlasian-purple">
                  <IconPlus size="medium" />
                </div>
              }
              text={"Tambah UKER"}
              textColor={"purple"}
              handler={() => handleClickAddRow()}
            />
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
              <div className="custom-table-header justify-center">Aksi</div>
            </Header>
            <Header
              width="6%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">No.</div>
            </Header>
            <Header
              width="21%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>UKER</div>
            </Header>
            <Header
              width="27%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>Jumlah</div>
            </Header>
            <Header
              width="37%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>Keterangan</div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                index,
                id,
                branch_name,
                jumlah,
                keterangan,
                is_edit,
                is_new,
              }) => (
                <Row>
                  <Cell width="9%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      {is_new ? (
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
                      ) : (
                        <div className="flex justify-between gap-3">
                          <RadioField
                            isChecked={findIndex === index}
                            handleChange={() => handleSelectedUker(id)}
                          />
                          <ButtonIcon
                            icon={<ButtonDelete />}
                            handleClick={() => handleClickDelete(id)}
                            color={"red"}
                          />
                        </div>
                      )}
                    </div>
                  </Cell>
                  <Cell width="6%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{index + 1}</p>
                    </div>
                  </Cell>
                  <Cell width="21%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center relative">
                      {is_edit ? (
                        <BranchSelect
                          selectedValue={
                            newUker?.branch_kode
                              ? {
                                  label: newUker?.branch_name,
                                  value: {
                                    branch_kode: newUker?.branch_kode,
                                    branch_name: newUker?.branch_name,
                                  },
                                }
                              : null
                          }
                          handleChange={(e) => handleChangeUker(e.value)}
                          positionAbsolute={true}
                          width="w-[13rem]"
                        />
                      ) : (
                        <p className="text-xs">{branch_name}</p>
                      )}
                    </div>
                  </Cell>
                  <Cell width="27%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">{is_edit ? "" : jumlah}</p>
                    </div>
                  </Cell>
                  <Cell width="37%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      {is_edit ? (
                        <TextAreaField
                          value={newUker?.keterangan}
                          handleChange={(e) =>
                            handleChangeTextUker("keterangan", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-xs">{keterangan}</p>
                      )}
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

export default TableUker;

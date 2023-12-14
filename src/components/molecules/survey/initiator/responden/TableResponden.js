import {
  ButtonDelete,
  CardContentHeaderFooter,
  DataNotFound,
  PekerjaSelect,
} from "@/components/molecules/commons";
import { ButtonField, ButtonIcon, TextAreaField } from "@/components/atoms";
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

const TableResponden = ({
  data,
  dataUker,
  newResponden,
  selectedUkerId,
  handleClickAddRow,
  handleClickSave,
  handleClickDelete,
  handleChangeResponden,
  handleChangeText,
  withUker,
}) => {
  const findIndex = dataUker?.findIndex((uker) => uker.id === selectedUkerId);
  return (
    <CardContentHeaderFooter
      header={
        <div className="px-4 py-2 flex items-center justify-between">
          <p className="font-semibold text-base">Daftar PN Responden</p>
          {withUker ? (
            <div className="font-semibold text-base text-atlasian-blue-light">
              {dataUker[findIndex]?.orgeh_name}
            </div>
          ) : (
            ""
          )}
        </div>
      }
      footer={
        <div className="p-3 flex items-center">
          <div className="w-48 text-sm font-semibold">
            <ButtonField
              iconAfter={
                <div className="text-atlasian-purple">
                  <IconPlus size="medium" />
                </div>
              }
              text={"Tambah Responden"}
              textColor={"purple"}
              handler={handleClickAddRow}
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
              <div className={`custom-table-header`}>PN Responden</div>
            </Header>
            <Header
              width="27%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>Nama Responden</div>
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
                pn_responden,
                nama_responden,
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
                      ) : is_edit ? (
                        <div className="flex justify-between gap-2">
                          <ButtonIcon
                            icon={<ButtonDelete />}
                            handleClick={() => handleClickDelete(id)}
                            color={"red"}
                          />
                          <ButtonIcon
                            icon={
                              <Image
                                src={ImageCircleCheckGreen}
                                alt=""
                                width={22}
                                height={22}
                              />
                            }
                            handleClick={() => handleClickDelete(id)}
                            color={"yellow"}
                          />
                        </div>
                      ) : (
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={() => handleClickDelete(id)}
                          color={"red"}
                        />
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
                        <PekerjaSelect
                          selectedValue={
                            newResponden.name
                              ? {
                                  label: newResponden?.name,
                                  value: {
                                    pn: newResponden.pn,
                                    name: newResponden.name,
                                  },
                                }
                              : null
                          }
                          handleChange={(e) => handleChangeResponden(e.value)}
                          positionAbsolute={true}
                          width="w-[13rem]"
                        />
                      ) : (
                        <p className="text-xs">{pn_responden}</p>
                      )}
                    </div>
                  </Cell>
                  <Cell width="27%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">
                        {is_edit ? newResponden?.name : nama_responden}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="37%" className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      {is_edit ? (
                        <TextAreaField
                          value={newResponden?.keterangan}
                          handleChange={(e) =>
                            handleChangeText("keterangan", e.target.value)
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

export default TableResponden;

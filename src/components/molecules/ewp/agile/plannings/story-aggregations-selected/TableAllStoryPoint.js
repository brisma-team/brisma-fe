import { ButtonField, CustomCheckbox, DivButton } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  DataNotFound,
} from "@/components/molecules/commons";
import { ImageCheckAll, ImageUncheck } from "@/helpers/imagesUrl";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Image from "next/image";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableAllStoryPoint = ({
  data,
  payload,
  isDisabled,
  handleChangeCheckbox,
  handleClickSelectAll,
  handleClickUnselectAll,
  handleSubmit,
}) => {
  return (
    <CardContentHeaderFooter
      footer={
        <div className="w-full flex items-center justify-end gap-3 mt-4">
          <DivButton
            handleClick={handleClickUnselectAll}
            className="w-32 h-10 rounded border border-gray-300 flex gap-2 justify-center items-center hover:bg-gray-100"
          >
            <Image alt="" src={ImageUncheck} width={18} height={18} />
            <div className="font-semibold text-sm">Unselect All</div>
          </DivButton>
          <DivButton
            handleClick={handleClickSelectAll}
            className="w-32 h-10 rounded border border-gray-300 flex gap-2 justify-center items-center hover:bg-gray-100"
          >
            <Image alt="" src={ImageCheckAll} width={18} height={18} />
            <div className="font-semibold text-sm">Select All</div>
          </DivButton>
          <div className="w-36 bg-atlasian-green rounded">
            <ButtonField text={"Simpan"} handler={handleSubmit} />
          </div>
        </div>
      }
      withoutBorderBottom
      className={"!p-4"}
    >
      <div className="overflow-x-scroll max-w-[95rem] pb-3">
        <div className="w-[1980px] bg-white">
          <TableTree>
            <Headers>
              <Header
                width={80}
                className="border-x border-t rounded-ss-lg cell-custom-dataTables"
              >
                <div className="custom-table-header justify-center">AKSI</div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">STORY POINT</div>
                    <div className="text-xs italic">(RISK ISSUE / CONTROL)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <div>
                    <div className="text-sm font-bold">EPIC</div>
                    <div className="text-xs italic">(SUB MAJOR RISK)</div>
                  </div>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">MAJOR</p>
                </div>
              </Header>
              <Header
                width={350}
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">MEGA</p>
                </div>
              </Header>
              <Header
                width={500}
                className="border-t border-r rounded-se-lg cell-custom-dataTables"
              >
                <div className="custom-table-header">
                  <p className="text-sm font-bold">RISK TYPE</p>
                </div>
              </Header>
            </Headers>
            {data?.length ? (
              <Rows
                items={data}
                render={({
                  id,
                  risk_issue,
                  sub_major,
                  major,
                  mega,
                  risk_type,
                }) => (
                  <Row>
                    <Cell width={80} className={`border-x ${customCell}`}>
                      <div className="custom-table-position-center justify-center gap-1">
                        <CustomCheckbox
                          value={
                            payload?.length
                              ? payload?.find((value) => value == id)
                              : null
                          }
                          handleChange={(e) =>
                            handleChangeCheckbox(e.target.checked, id)
                          }
                          isDisabled={isDisabled}
                        />
                      </div>
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {risk_issue?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{risk_issue?.abbr}</span>{" "}
                          - {risk_issue?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {sub_major?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{sub_major?.abbr}</span> -{" "}
                          {sub_major?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {major?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{major?.abbr}</span> -{" "}
                          {major?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={350} className={`border-r ${customCell}`}>
                      {mega?.kode ? (
                        <p className="text-xs">
                          <span className="font-bold">{mega?.abbr}</span> -{" "}
                          {mega?.nama}
                        </p>
                      ) : (
                        "-"
                      )}
                    </Cell>
                    <Cell width={500} className={`border-r ${customCell}`}>
                      {risk_type || "-"}
                    </Cell>
                  </Row>
                )}
              />
            ) : (
              <div className="w-full border-x border-b pb-4">
                <DataNotFound />
              </div>
            )}
          </TableTree>
        </div>
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableAllStoryPoint;

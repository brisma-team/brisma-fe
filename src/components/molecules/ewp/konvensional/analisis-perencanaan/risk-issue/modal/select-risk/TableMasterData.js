import { ButtonIcon, TextInput } from "@/components/atoms";
import { IconArrowLeft, IconEditorSearch } from "@/components/icons";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useEffect, useState } from "react";
const customHeader = `w-full h-full flex items-center text-brisma font-bold`;
const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const positionCenter = `w-full h-full flex items-center`;

const TableMasterData = ({ data, keywordMasterData, handleChangeKeyword }) => {
  const [masterData, setMasterData] = useState([]);
  useEffect(() => {
    const keyword = keywordMasterData.toLowerCase();
    if (keyword.length) {
      const filteredData = data.filter((item) => {
        return (
          item.code.toLowerCase().includes(keyword) ||
          item.deskripsi.toLowerCase().includes(keyword)
        );
      });
    }

    setMasterData((prev) => {
      return { ...prev, master_data: filteredData };
    });
    return;
  }, [data]);

  return (
    <div
      className="w-full rounded flex flex-col items-center h-full border-slate-700"
      style={{
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="border-b-2 w-full flex px-4 py-2">
        <p className="text-base text-brisma font-semibold">
          Master Data Kontrol
        </p>
      </div>
      <div className="p-4 w-full">
        <div className="w-4/5 mb-2">
          <TextInput
            placeholder={"Masukkan Code & Deskripsi"}
            icon={
              <ButtonIcon
                isDisabled={true}
                icon={<IconEditorSearch />}
              ></ButtonIcon>
            }
            onChange={handleChangeKeyword}
          />
        </div>
        <TableTree>
          <Headers>
            <Header width="15%" className="border-x border-t rounded-ss-xl">
              <div className={`${customHeader} justify-center text-center`}>
                Aksi
              </div>
            </Header>
            <Header
              width="20%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={customHeader}>Code</div>
            </Header>
            <Header
              width="65%"
              className="border-t border-r cell-custom-dataTables rounded-se-xl"
            >
              <div className={`${customHeader}`}>Deskripsi</div>
            </Header>
          </Headers>
          {data?.length ? (
            <div className="max-h-[18rem] overflow-y-scroll">
              <Rows
                items={data}
                render={({ code, deskripsi }) => (
                  <Row>
                    <Cell width="15%" className={`border-x ${customCell}`}>
                      <div className={`${positionCenter} justify-center`}>
                        <ButtonIcon
                          icon={
                            <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-5 h-5 flex items-center justify-center">
                              <IconArrowLeft size="small" />
                            </div>
                          }
                          handleClick={
                            () => console.log("test")
                            // handleSelectedSample(directory, filename)
                          }
                          isDisabled={false}
                        />
                      </div>
                    </Cell>
                    <Cell width="20%" className={`border-r ${customCell}`}>
                      <div className={`${positionCenter} text-xs`}>{code}</div>
                    </Cell>
                    <Cell width="65%" className={`border-r ${customCell}`}>
                      <div className={`${positionCenter} text-xs`}>
                        {deskripsi}
                      </div>
                    </Cell>
                  </Row>
                )}
              />
            </div>
          ) : (
            <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
              <DataNotFound />
            </div>
          )}
        </TableTree>
        <div className="w-full h-6 border-x border-b rounded-b-xl"></div>
      </div>
    </div>
  );
};

export default TableMasterData;

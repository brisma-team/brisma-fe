import { ButtonIcon } from "@/components/atoms";
import { IconArrowDown } from "@/components/icons";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { getFileDetails } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useEffect, useState } from "react";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableSampleFile = ({ data }) => {
  const [fileDetails, setFileDetails] = useState({});

  useEffect(() => {
    const fetchFileDetails = async () => {
      const details = await Promise.all(
        data.map(async (content) => ({
          type: (await getFileDetails(content?.directory))?.type,
          size: (await getFileDetails(content?.directory))?.size,
        }))
      );
      setFileDetails(details);
    };

    fetchFileDetails();
  }, [data]);

  useEffect(() => {
    console.log("fileDetail => ", fileDetails);
  }, [fileDetails]);

  return (
    <div className="h-fit w-52">
      <CardContentHeaderFooter
        width={"w-fit"}
        footer={<div className="min-h-[1rem]" />}
        withoutBorderTop
        withoutBorderBottom
      >
        <div className="min-w-[54.5rem] max-w-[54.5rem] overflow-x-scroll pb-3">
          <TableTree>
            <Headers>
              <Header
                width="8%"
                className="border-x border-t cell-custom-dataTables"
              >
                <div
                  className={`custom-table-header text-sm font-semibold justify-center`}
                >
                  Action
                </div>
              </Header>
              <Header
                width="30%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold">
                  Filename
                </div>
              </Header>
              <Header
                width="37%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold">
                  Description
                </div>
              </Header>
              <Header
                width="15%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header text-sm font-semibold justify-center">
                  Type
                </div>
              </Header>
              <Header
                width="10%"
                className="border-t border-r cell-custom-dataTables"
              >
                <div className="custom-table-header justify-center text-sm font-semibold">
                  Size
                </div>
              </Header>
            </Headers>
            <Rows
              items={data}
              render={({ content }) => (
                <Row>
                  <Cell width="8%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <ButtonIcon
                        handleClick={(e) => {
                          e.stopPropagation();
                        }}
                        icon={
                          <div className="rounded-full border-2 border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                            <IconArrowDown size="medium" />
                          </div>
                        }
                        className={"ml-[0.85rem] pt-1.5 w-full"}
                        color={"red"}
                        downloadUrl={content?.directory}
                        downloadFilename={content?.filename}
                      />
                    </div>
                  </Cell>
                  <Cell width="30%" className={`border-r ${customCell}`}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">{content?.filename}</p>
                    </div>
                  </Cell>
                  <Cell width="37%" className={`border-r ${customCell}`}>
                    <div className="custom-table-position-center">
                      <p className="text-xs">{content?.description}</p>
                    </div>
                  </Cell>
                  <Cell width="15%" className={`border-r ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{fileDetails[0]?.type || ""}</p>
                    </div>
                  </Cell>
                  <Cell width="10%" className={`border-r ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{fileDetails[0]?.size || ""}</p>
                    </div>
                  </Cell>
                </Row>
              )}
            />
          </TableTree>
        </div>
      </CardContentHeaderFooter>
    </div>
  );
};

export default TableSampleFile;

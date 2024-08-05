import { ButtonIcon } from "@/components/atoms";
import {
  ButtonDelete,
  ButtonDownload,
  DataNotFound,
} from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TabPoolSampleCSV = ({
  data,
  withoutAction,
  handleClickDownloadSample,
  handleClickDeleteSample,
}) => {
  return (
    <div className="w-[50rem]">
      <TableTree>
        <Headers>
          <Header
            width="10%"
            className="border-x border-t rounded-ss-xl justify-center"
          >
            AKSI
          </Header>
          <Header
            width="30%"
            className="border-t border-r cell-custom-dataTables"
          >
            Uploader
          </Header>
          <Header
            width="30%"
            className="border-t border-r cell-custom-dataTables"
          >
            Filename
          </Header>
          <Header
            width="30%"
            className="border-t border-r rounded-se-xl cell-custom-dataTables"
          >
            Risk Issue
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({ id, directory, uploader, filename, risk_issue }) => (
              <Row>
                <Cell
                  width="10%"
                  className="border-x cell-custom-dataTables justify-center"
                >
                  {!withoutAction ? (
                    <div className="custom-table-position-center justify-center gap-1">
                      <ButtonIcon
                        icon={<ButtonDownload />}
                        handleClick={async () =>
                          await handleClickDownloadSample({
                            id,
                            directory,
                            filename,
                          })
                        }
                      />
                      <ButtonIcon
                        icon={<ButtonDelete />}
                        handleClick={async () =>
                          await handleClickDeleteSample(id)
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Cell>
                <Cell width="30%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    <p className="text-xs">
                      {uploader?.pn
                        ? `${uploader?.pn} - ${uploader?.name}`
                        : ""}
                    </p>
                  </div>
                </Cell>
                <Cell width="30%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    <p className="text-xs">{filename || ""}</p>
                  </div>
                </Cell>
                <Cell width="30%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    {risk_issue?.kode ? (
                      <p>
                        <span className="font-semibold">
                          {risk_issue?.abbr} {" - "}
                        </span>
                        {risk_issue?.nama}
                      </p>
                    ) : (
                      ""
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
  );
};

export default TabPoolSampleCSV;

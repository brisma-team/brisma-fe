import { ButtonIcon } from "@/components/atoms";
import {
  ButtonDelete,
  ButtonDownload,
  DataNotFound,
} from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TabPoolSampleFile = ({
  data,
  withoutAction,
  handleClickDownloadSample,
  handleClickDeleteSample,
}) => {
  return (
    <div className="w-[70rem]">
      <TableTree>
        <Headers>
          <Header
            width="10%"
            className="border-x border-t rounded-ss-xl justify-center"
          >
            AKSI
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables"
          >
            Uploader
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables"
          >
            Filename
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables"
          >
            Tanggal
          </Header>
          <Header
            width="25%"
            className="border-t border-r rounded-se-xl cell-custom-dataTables"
          >
            Deskripsi
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({
              id,
              directory,
              uploader,
              filename,
              upload_date,
              description,
            }) => (
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
                            directory,
                            filename,
                            description,
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
                <Cell width="25%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    <p className="text-xs">
                      {uploader?.pn
                        ? `${uploader?.pn} - ${uploader?.name}`
                        : ""}
                    </p>
                  </div>
                </Cell>
                <Cell width="25%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    <p className="text-xs">{filename || ""}</p>
                  </div>
                </Cell>
                <Cell width="15%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    <p className="text-xs">
                      {upload_date ? convertDate(upload_date, "/", "d") : ""}
                    </p>
                  </div>
                </Cell>
                <Cell width="25%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    <p className="text-xs">{description}</p>
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

export default TabPoolSampleFile;

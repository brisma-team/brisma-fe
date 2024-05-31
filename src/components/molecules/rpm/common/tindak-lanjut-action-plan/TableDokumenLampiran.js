import { CardContentHeaderFooter } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { convertDate } from "@/helpers";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import {
  ButtonDelete,
  ButtonDownload,
  DataNotFound,
} from "@/components/molecules/commons";
import { IconArrowDown } from "@/components/icons";

const TableDokumenLampiran = ({
  data,
  dataContent,
  withoutAction,
  handleClickDelete,
  handleClickUpload,
}) => {
  return (
    <CardContentHeaderFooter
      header={
        <div className="h-12 flex justify-between items-center px-3">
          <div className="font-semibold text-base">
            Dokumen Lampiran Tindak Lanjut
          </div>
          <div className="font-semibold text-base text-atlasian-red">
            Batas Waktu Pengerjaan :{" "}
            {dataContent?.batas_waktu
              ? convertDate(dataContent?.batas_waktu, "/", "d")
              : ""}
          </div>
        </div>
      }
    >
      <div className="p-4">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="12%"
              className="border-t border-x cell-custom-dataTables flex justify-center rounded-ss-lg"
            >
              <p className="font-bold text-brisma">ACTION</p>
            </Header>
            <Header
              width="14%"
              className="border-t border-x cell-custom-dataTables flex justify-center"
            >
              <p className="font-bold text-brisma text-center">
                TANGGAL UPLOAD
              </p>
            </Header>
            <Header
              width="50%"
              className="border-t border-r cell-custom-dataTables"
            >
              <p className="font-bold text-brisma">NAMA DOKUMEN</p>
            </Header>
            <Header
              width="24%"
              className="border-t border-r cell-custom-dataTables rounded-se-lg"
            >
              <p className="font-bold text-brisma">UPLOADER</p>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                doc_id,
                upload_date,
                file_url,
                file_name,
                uploader,
              }) => (
                <Row>
                  <Cell className="!hidden" />
                  <Cell
                    width="12%"
                    className="border-x cell-custom-dataTables flex justify-center"
                  >
                    {!withoutAction ? (
                      <div className="flex justify-center items-center gap-1.5">
                        <ButtonIcon
                          icon={<ButtonDownload />}
                          handleClick={(e) => {
                            e.stopPropagation();
                          }}
                          downloadFilename={file_name}
                          downloadUrl={file_url}
                        />
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={async () =>
                            await handleClickDelete(doc_id)
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell
                    width="14%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {convertDate(upload_date, "/", "d")}
                  </Cell>
                  <Cell width="50%" className="border-r cell-custom-dataTables">
                    {file_name}
                  </Cell>
                  <Cell width="24%" className="border-r cell-custom-dataTables">
                    {uploader?.pn ? `${uploader?.pn} - ${uploader?.nama}` : ""}
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <div className="w-full border-x border-b pb-3 rounded-es-lg rounded-ee-lg">
              <DataNotFound />
            </div>
          )}
        </TableTree>
        {!withoutAction ? (
          <div className="mt-4 w-full flex justify-end">
            <div className="w-36 rounded border-2">
              <ButtonField
                icon={
                  <div className="text-brisma rotate-180">
                    <IconArrowDown />
                  </div>
                }
                text={`Upload`}
                textColor={"brisma"}
                handler={handleClickUpload}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableDokumenLampiran;

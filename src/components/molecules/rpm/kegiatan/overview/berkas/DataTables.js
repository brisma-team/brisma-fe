import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { convertDate } from "@/helpers";
import { ButtonIcon, UploadButton } from "@/components/atoms";
import {
  ButtonDelete,
  ButtonDownload,
  DataNotFound,
} from "@/components/molecules/commons";
// import { IconInfo } from "@/components/icons";

const DataTables = ({
  data,
  handleUploadDocument,
  handleClickDelete,
  isEditable,
  // handleClickInfo,
}) => {
  return (
    <div className="dataTables-custom">
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
            width="25%"
            className="border-t border-x cell-custom-dataTables flex justify-center"
          >
            <p className="font-bold text-brisma text-center">TANGGAL UPLOAD</p>
          </Header>
          <Header
            width="34%"
            className="border-t border-r cell-custom-dataTables flex justify-center"
          >
            <p className="font-bold text-brisma text-center">NAMA DOKUMEN</p>
          </Header>
          <Header
            width="29%"
            className="border-t border-r cell-custom-dataTables flex justify-center"
          >
            <p className="font-bold text-brisma text-center">UPLOADER</p>
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({ id, createdAt, file_url, file_name, create_by }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell
                  width="12%"
                  className="border-x cell-custom-dataTables flex justify-center"
                >
                  <div className="flex justify-center items-center gap-1.5">
                    {isEditable && (
                      <>
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
                          handleClick={async () => await handleClickDelete(id)}
                        />
                      </>
                    )}
                  </div>
                </Cell>
                <Cell
                  width="25%"
                  className="border-r cell-custom-dataTables justify-center"
                >
                  {convertDate(createdAt, "/", "d")}
                </Cell>
                <Cell width="34%" className="border-r cell-custom-dataTables">
                  {file_name}
                </Cell>
                <Cell width="29%" className="border-r cell-custom-dataTables">
                  {create_by?.pn + " - " + create_by?.nama}
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b p-3">
            <DataNotFound />
          </div>
        )}
      </TableTree>
      <div className="w-full flex justify-end gap-3 mt-2">
        {isEditable && (
          <UploadButton
            className={`border-[1px] rounded border-gray-300 hover:bg-gray-100 p-2`}
            text={
              <div className="text-sm font-semibold px-4">&#8593; Upload</div>
            }
            fileAccept={"*/*"}
            handleUpload={handleUploadDocument}
          />
        )}
      </div>
    </div>
  );
};

export default DataTables;

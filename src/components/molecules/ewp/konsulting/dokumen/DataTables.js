import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { convertDate } from "@/helpers";
import { ButtonIcon } from "@/components/atoms";
import { ButtonDelete, ButtonDownload } from "@/components/molecules/commons";
import { IconInfo } from "@/components/icons";

const DataTables = ({ data, handleClickDelete, handleClickInfo }) => {
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
            width="10%"
            className="border-t border-x cell-custom-dataTables flex justify-center"
          >
            <p className="font-bold text-brisma text-center">TANGGAL UPLOAD</p>
          </Header>
          <Header
            width="40%"
            className="border-t border-r cell-custom-dataTables"
          >
            <p className="font-bold text-brisma">NAMA DOKUMEN</p>
          </Header>
          <Header
            width="20%"
            className="border-t border-r cell-custom-dataTables"
          >
            <p className="font-bold text-brisma">UPLOADER</p>
          </Header>
          <Header
            width="18%"
            className="border-t border-r cell-custom-dataTables rounded-se-lg"
          >
            <p className="font-bold text-brisma">JENIS DOKUMEN</p>
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({
            index,
            doc_id,
            upload_date,
            file_url,
            file_name,
            uploader,
            ref_document_name,
          }) => (
            <Row>
              <Cell className="!hidden" />
              <Cell
                width="12%"
                className="border-x cell-custom-dataTables flex justify-center"
              >
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
                    handleClick={async () => await handleClickDelete(doc_id)}
                  />
                  <ButtonIcon
                    icon={
                      <div className="h-full flex items-center">
                        <IconInfo size="medium" />
                      </div>
                    }
                    handleClick={() => handleClickInfo(index)}
                    color={"yellow"}
                  />
                </div>
              </Cell>
              <Cell
                width="10%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {convertDate(upload_date, "/", "d")}
              </Cell>
              <Cell width="40%" className="border-r cell-custom-dataTables">
                {file_name}
              </Cell>
              <Cell width="20%" className="border-r cell-custom-dataTables">
                {uploader}
              </Cell>
              <Cell width="18%" className="border-r cell-custom-dataTables">
                {ref_document_name}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
    </div>
  );
};

export default DataTables;

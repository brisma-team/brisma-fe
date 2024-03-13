import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { convertDate } from "@/helpers";
import { DataNotFound } from "@/components/molecules/commons";
import { DivButton } from "@/components/atoms";

const DataTables = ({ data, handleClickDownload }) => {
  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="25%"
            className="border-t border-x cell-custom-dataTables flex justify-center rounded-ss-lg"
          >
            <p className="font-bold text-brisma">TANGGAL UPLOAD</p>
          </Header>
          <Header
            width="45%"
            className="border-t border-r cell-custom-dataTables"
          >
            <p className="font-bold text-brisma">NAMA DOKUMEN</p>
          </Header>
          <Header
            width="30%"
            className="border-t border-r cell-custom-dataTables rounded-se-lg"
          >
            <p className="font-bold text-brisma">UPLOADER</p>
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({ upload_date, file_url, file_name, uploader }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell
                  width="25%"
                  className="border-x cell-custom-dataTables flex justify-center"
                >
                  {convertDate(upload_date, "/", "d")}
                </Cell>
                <Cell width="45%" className="border-r cell-custom-dataTables">
                  <DivButton
                    handleClick={() => handleClickDownload(file_url, file_name)}
                    className={
                      "text-atlasian-blue-light underline hover:text-hover-blue"
                    }
                  >
                    {file_name}
                  </DivButton>
                </Cell>
                <Cell width="30%" className="border-r cell-custom-dataTables">
                  {uploader}
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl py-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
    </div>
  );
};

export default DataTables;

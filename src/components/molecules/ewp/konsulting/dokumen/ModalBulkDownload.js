import { ButtonIcon, CloseModal, Modal } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { DataNotFound, ModalFooter } from "@/components/molecules/commons";
import DocumentTypeSelect from "./DocumentTypeSelect";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const ModalBulkDownload = ({
  showModal,
  data,
  payload,
  handleChange,
  handleReset,
  handleCloseModal,
  handleBulkDownload,
}) => {
  return (
    <Modal
      showModal={showModal}
      footer={
        <ModalFooter
          buttonText={"Download"}
          handleSubmit={handleBulkDownload}
        />
      }
    >
      <div className="w-[34rem] relative h-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="w-full font-bold text-xl">BULK DOWNLOAD DOKUMEN</p>
            <CloseModal
              handleCloseModal={handleCloseModal}
              showModal={showModal}
            />
          </div>
          <div className="w-56">
            <DocumentTypeSelect
              customIcon={
                <ButtonIcon handleClick={handleReset} icon={<IconClose />} />
              }
              selectedValue={
                payload?.kode
                  ? {
                      label: payload?.name,
                      value: payload,
                    }
                  : null
              }
              handleChange={handleChange}
              placeholder={"Jenis Dokumen"}
            />
          </div>
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
                  width="75%"
                  className="border-t border-r cell-custom-dataTables rounded-se-lg"
                >
                  <p className="font-bold text-brisma">NAMA DOKUMEN</p>
                </Header>
              </Headers>
              {data?.length ? (
                <Rows
                  items={data}
                  render={({ upload_date, file_url, file_name }) => (
                    <Row>
                      <Cell className="!hidden" />
                      <Cell
                        width="25%"
                        className="border-x cell-custom-dataTables flex justify-center"
                      >
                        {convertDate(upload_date, "/", "d")}
                      </Cell>
                      <Cell
                        width="75%"
                        className="border-r cell-custom-dataTables"
                      >
                        {file_name}
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
        </div>
      </div>
    </Modal>
  );
};

export default ModalBulkDownload;

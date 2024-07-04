import { ButtonField, ButtonIcon, Modal } from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import {
  ModalHeader,
  ButtonEdit,
  ButtonDelete,
} from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const ModalTableAuditTimelines = ({
  data,
  showModal,
  handleClickEdit,
  handleClickDelete,
  handleClickAdd,
  handleCloseModal,
  withoutButtonAction,
}) => {
  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          headerText={"Business Modal Canvas"}
          title={"Audit Timelines"}
          titleClassName={
            "mt-1 text-base text-atlasian-blue-light font-semibold"
          }
          handleCloseModal={handleCloseModal}
        />
      }
    >
      <div className="w-[50rem] dataTables-custom">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="10%"
              className="border-t border-x cell-jadwal-audit-mapa-ewp justify-center rounded-ss-lg"
            >
              Aksi
            </Header>
            <Header
              width="40%"
              className="border-t border-r cell-jadwal-audit-mapa-ewp"
            >
              Keterangan
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-jadwal-audit-mapa-ewp"
            >
              Tanggal Dimulai
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-jadwal-audit-mapa-ewp rounded-se-lg"
            >
              Tanggal Berakhir
            </Header>
          </Headers>
          <Rows
            items={data}
            render={({ id, title, start_date, end_date }) => (
              <Row>
                <Cell className="!hidden" />
                <Cell
                  width="10%"
                  className="border-x cell-jadwal-audit-mapa-ewp"
                >
                  <div className="flex gap-1 justify-center">
                    <ButtonIcon
                      icon={<ButtonEdit />}
                      handleClick={() => handleClickEdit(id)}
                    />
                    <ButtonIcon
                      icon={<ButtonDelete />}
                      handleClick={() => handleClickDelete(id)}
                    />
                  </div>
                </Cell>
                <Cell
                  width="40%"
                  className="border-r cell-jadwal-audit-mapa-ewp"
                >
                  {title}
                </Cell>
                <Cell
                  width="25%"
                  className="border-r cell-jadwal-audit-mapa-ewp"
                >
                  {convertDate(start_date, "/", "d")}
                </Cell>
                <Cell
                  width="25%"
                  className="border-r cell-jadwal-audit-mapa-ewp"
                >
                  {convertDate(end_date, "/", "d")}
                </Cell>
              </Row>
            )}
          />
          {!withoutButtonAction ? (
            <div className="w-full border rounded-ee-lg rounded-es-lg !p-2 flex justify-end">
              <div className="w-52">
                <ButtonField
                  iconAfter={
                    <div className="text-atlasian-purple">
                      <IconPlus size="medium" />
                    </div>
                  }
                  text={"Tambah Audit Timeline"}
                  textColor={"purple"}
                  handler={handleClickAdd}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </TableTree>
      </div>
    </Modal>
  );
};

export default ModalTableAuditTimelines;

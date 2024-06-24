import { ButtonField, ButtonIcon, Card } from "@/components/atoms";
import { IconFile } from "@/components/icons";
import {
  ButtonDelete,
  ButtonEdit,
  DataNotFound,
} from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import ModalDetailRingkasan from "./ModalDetailRingkasan";

const ContentRingkasan = ({
  data,
  dataDetail,
  dataInfoProject,
  payload,
  validation,
  showModalDetail,
  showModalEdit,
  handleChangePayload,
  handleCloseModal,
  handleClickUpdate,
  handleClickDelete,
  handleClickView,
  handleResetRingkasan,
  handleSaveRingkasan,
  handleSubmitEditRingkasan,
}) => {
  const section = {
    tim: "Tim",
    uker: "Uker Assessment",
    mapa_project: "Project",
  };

  return (
    <div className="w-full">
      <Card>
        <div className="px-6 pt-2 pb-4 w-full">
          <p className="ml-2 font-bold text-base">Ringkasan</p>
          <div className="my-2 " />
          <TableTree>
            <Headers>
              <Header className="!hidden" />
              <Header
                width="10%"
                className="border-t border-x cell-custom-dataTables flex justify-center"
              >
                Aksi
              </Header>
              <Header
                width="18%"
                className="border-t border-x cell-custom-dataTables"
              >
                Section
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                Keterangan
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                Sebelum
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                Sesudah
              </Header>
              <Header
                width="18%"
                className="border-t border-r cell-custom-dataTables"
              >
                Alasan
              </Header>
            </Headers>
            {data?.length ? (
              <Rows
                items={data}
                render={({
                  id,
                  part,
                  keterangan,
                  note_sebelum,
                  note_sesudah,
                  alasan,
                }) => (
                  <Row>
                    <Cell className="!hidden" />
                    <Cell
                      width="10%"
                      className="border-x cell-custom-dataTables flex justify-center"
                    >
                      <div className="flex justify-center items-center gap-1">
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() => handleClickUpdate(id)}
                          color={"yellow"}
                        />
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={() => handleClickDelete(id)}
                        />
                        <ButtonIcon
                          icon={
                            <div className="rounded-full border border-atlasian-dark w-5 h-5 flex items-center justify-center p-1 text-atlasian-dark">
                              <IconFile size="small" />
                            </div>
                          }
                          handleClick={() => handleClickView(id)}
                        />
                      </div>
                    </Cell>
                    <Cell
                      width="18%"
                      className="border-r cell-custom-dataTables overflow-hidden text-ellipsis break-words"
                    >
                      {section[part] || "-"}
                    </Cell>
                    <Cell
                      width="18%"
                      className="border-r cell-custom-dataTables overflow-hidden text-ellipsis break-words"
                    >
                      {keterangan || "-"}
                    </Cell>
                    <Cell
                      width="18%"
                      className="border-r cell-custom-dataTables overflow-hidden text-ellipsis break-words"
                    >
                      {note_sebelum || "-"}
                    </Cell>
                    <Cell
                      width="18%"
                      className="border-r cell-custom-dataTables overflow-hidden text-ellipsis break-words"
                    >
                      {note_sesudah || "-"}
                    </Cell>
                    <Cell
                      width="18%"
                      className="border-r cell-custom-dataTables overflow-hidden text-ellipsis break-words"
                    >
                      {alasan || "-"}
                    </Cell>
                  </Row>
                )}
              />
            ) : (
              <DataNotFound />
            )}
          </TableTree>
        </div>
      </Card>
      <ModalDetailRingkasan
        data={dataDetail}
        dataInfoProject={dataInfoProject}
        showModal={showModalDetail}
        handleCloseModal={handleCloseModal}
      />
      <div className="mt-3 flex justify-end gap-2">
        <div className="w-36 bg-atlasian-red rounded">
          <ButtonField text={"Reset"} handler={handleResetRingkasan} />
        </div>
        <div className="w-36 bg-atlasian-green rounded">
          <ButtonField text={"Simpan"} handler={handleSaveRingkasan} />
        </div>
      </div>
    </div>
  );
};

export default ContentRingkasan;

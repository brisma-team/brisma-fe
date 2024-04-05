import {
  ButtonIcon,
  Modal,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
  CardContentHeaderFooter,
} from "@/components/molecules/commons";
import { convertDate, convertToRupiah } from "@/helpers";

const ModalRingkasan = ({
  data,
  showModal,
  handleChangeText,
  handleCloseModal,
  handleSubmit,
  typeModal = "update",
}) => {
  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={
            typeModal == "update" ? "Ubah Ringkasan" : "Detail Ringkasan"
          }
        />
      }
      footer={
        typeModal == "update" && <ModalFooter handleSubmit={handleSubmit} />
      }
    >
      {typeModal == "update" ? (
        <CardBodyContent>
          <FormWithLabel
            label={"Keterangan"}
            form={
              <TextInput
                value={data?.keterangan || ""}
                onChange={(e) => handleChangeText("keterangan", e.target.value)}
                placeholder="Keterangan..."
                icon={
                  <ButtonIcon
                    handleClick={() => handleChangeText("keterangan", "")}
                    icon={<IconClose size="medium" />}
                  />
                }
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Sebelum"}
            form={
              <TextInput
                value={data?.note_sebelum || ""}
                onChange={(e) =>
                  handleChangeText("note_sebelum", e.target.value)
                }
                placeholder="Catatan Sebelum..."
                icon={
                  <ButtonIcon
                    handleClick={() => handleChangeText("note_sebelum", "")}
                    icon={<IconClose size="medium" />}
                  />
                }
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Sesudah"}
            form={
              <TextInput
                value={data?.note_sesudah || ""}
                onChange={(e) =>
                  handleChangeText("note_sesudah", e.target.value)
                }
                placeholder="Catatan Sesudah..."
                icon={
                  <ButtonIcon
                    handleClick={() => handleChangeText("note_sesudah", "")}
                    icon={<IconClose size="medium" />}
                  />
                }
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Alasan"}
            form={
              <TextAreaField
                resize="auto"
                placeholder={"Masukkan alasan..."}
                handleChange={(e) => handleChangeText("alasan", e.target.value)}
                value={data?.alasan || ""}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
        </CardBodyContent>
      ) : (
        <div className="w-[100rem] flex justify-between gap-4">
          <CardContentHeaderFooter
            header={
              <h4 className="p-4 text-atlasian-green">Sebelum Addendum</h4>
            }
          >
            {data?.part == "sumber_informasi" ? (
              <div
                className="p-4 h-[40rem] overflow-y-scroll"
                dangerouslySetInnerHTML={{
                  __html: data?.sebelum?.sumber_informasi,
                }}
              />
            ) : (
              <div className="p-4 dataTables-custom">
                <TableTree>
                  <Headers>
                    <Header className="!hidden" />
                    <Header
                      width="25%"
                      className="border-t border-x cell-custom-dataTables"
                    >
                      Tipe Pengeluaran
                    </Header>
                    <Header
                      width="30%"
                      className="border-t border-r cell-custom-dataTables"
                    >
                      Periode
                    </Header>
                    <Header
                      width="20%"
                      className="border-t border-r cell-custom-dataTables"
                    >
                      Biaya
                    </Header>
                    <Header
                      width="25%"
                      className="border-t border-r cell-custom-dataTables"
                    >
                      Deskripsi
                    </Header>
                  </Headers>
                  <Rows
                    items={data?.sebelum?.anggaran}
                    render={({
                      tipe_anggaran_name,
                      tanggal,
                      tanggal_end,
                      amount,
                      deskripsi,
                    }) => (
                      <Row>
                        <Cell className="!hidden" />
                        <Cell
                          width="25%"
                          className="border-r border-l cell-custom-dataTables"
                        >
                          {tipe_anggaran_name}
                        </Cell>
                        <Cell
                          width="30%"
                          className="border-r cell-width-full-height-full"
                        >
                          <div className="w-full h-full flex">
                            <div
                              className="w-5/12 border-r flex items-center"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {convertDate(tanggal, "/", "d")}
                            </div>
                            <div className="w-1/12 border-r flex items-center justify-center">
                              -
                            </div>
                            <div
                              className="w-5/12 flex items-center"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {convertDate(tanggal_end, "/", "d")}
                            </div>
                          </div>
                        </Cell>
                        <Cell
                          width="20%"
                          className="border-r cell-custom-dataTables"
                        >
                          {"Rp. " + convertToRupiah(amount)}
                        </Cell>
                        <Cell
                          width="25%"
                          className="border-r cell-custom-dataTables"
                        >
                          {deskripsi}
                        </Cell>
                      </Row>
                    )}
                  />
                </TableTree>
              </div>
            )}
          </CardContentHeaderFooter>
          <CardContentHeaderFooter
            header={<h4 className="p-4 text-atlasian-red">Sesudah Addendum</h4>}
          >
            {data?.part == "sumber_informasi" ? (
              <div
                className="p-4 h-[40rem] overflow-y-scroll"
                dangerouslySetInnerHTML={{
                  __html: data?.sesudah?.sumber_informasi,
                }}
              />
            ) : (
              <div className="p-4 w-full overflow-x-scroll dataTables-custom">
                <TableTree>
                  <Headers>
                    <Header className="!hidden" />
                    <Header
                      width="25%"
                      className="border-t border-l border-x cell-custom-dataTables"
                    >
                      Tipe Pengeluaran
                    </Header>
                    <Header
                      width="30%"
                      className="border-t border-r cell-custom-dataTables"
                    >
                      Periode
                    </Header>
                    <Header
                      width="20%"
                      className="border-t border-r cell-custom-dataTables"
                    >
                      Biaya
                    </Header>
                    <Header
                      width="25%"
                      className="border-t border-r cell-custom-dataTables"
                    >
                      Deskripsi
                    </Header>
                  </Headers>
                  <Rows
                    items={data?.sesudah?.anggaran}
                    render={({
                      tipe_anggaran_name,
                      tanggal,
                      tanggal_end,
                      amount,
                      deskripsi,
                    }) => (
                      <Row>
                        <Cell className="!hidden" />
                        <Cell
                          width="25%"
                          className="border-r border-l cell-custom-dataTables"
                        >
                          {tipe_anggaran_name}
                        </Cell>
                        <Cell
                          width="30%"
                          className="border-r cell-width-full-height-full"
                        >
                          <div className="w-full h-full flex">
                            <div
                              className="w-5/12 border-r flex items-center"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {convertDate(tanggal, "/", "d")}
                            </div>
                            <div className="w-1/12 border-r flex items-center justify-center">
                              -
                            </div>
                            <div
                              className="w-5/12 flex items-center"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {convertDate(tanggal_end, "/", "d")}
                            </div>
                          </div>
                        </Cell>
                        <Cell
                          width="20%"
                          className="border-r cell-custom-dataTables"
                        >
                          {"Rp. " + convertToRupiah(amount)}
                        </Cell>
                        <Cell
                          width="25%"
                          className="border-r cell-custom-dataTables"
                        >
                          {deskripsi}
                        </Cell>
                      </Row>
                    )}
                  />
                </TableTree>
              </div>
            )}
          </CardContentHeaderFooter>
        </div>
      )}
    </Modal>
  );
};

export default ModalRingkasan;

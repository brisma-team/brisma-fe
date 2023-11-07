import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import {
  confirmationSwal,
  convertDate,
  convertToRupiah,
  loadingSwal,
  useDeleteData,
} from "@/helpers";
import { IconPlus } from "@/components/icons";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import { ButtonDelete, ButtonEdit } from "@/components/molecules/commons";

const DataTables = ({
  data,
  mutate,
  setShowModal,
  setTypeModal,
  setSelectedId,
}) => {
  const handleClickUpdate = async (id) => {
    setShowModal(true);
    setTypeModal("update");
    setSelectedId(id);
  };

  const handleClickDelete = async (id) => {
    const confirm = await confirmationSwal("Menghapus Anggaran.");

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/anggaran/${id}`,
      { id }
    );
    mutate();
    loadingSwal("close");
  };

  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="8%"
            className="border-t border-x cell-custom-dataTables flex justify-center"
          >
            Aksi
          </Header>
          <Header
            width="25%"
            className="border-t border-x cell-custom-dataTables"
          >
            Tipe Pengeluaran
          </Header>
          <Header
            width="22%"
            className="border-t border-r cell-custom-dataTables"
          >
            Periode
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables"
          >
            Biaya
          </Header>
          <Header
            width="30%"
            className="border-t border-r cell-custom-dataTables"
          >
            Deskripsi
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({
            id,
            tipe_anggaran_name,
            tanggal,
            tanggal_end,
            amount,
            deskripsi,
          }) => (
            <Row>
              <Cell className="!hidden" />
              <Cell
                width="8%"
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
                </div>
              </Cell>
              <Cell width="25%" className="border-r cell-custom-dataTables">
                {tipe_anggaran_name}
              </Cell>
              <Cell
                width="22%"
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
              <Cell width="15%" className="border-r cell-custom-dataTables">
                {"Rp. " + convertToRupiah(amount)}
              </Cell>
              <Cell width="30%" className="border-r cell-custom-dataTables">
                {deskripsi}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      <div className="w-full border rounded-ee-lg rounded-es-lg">
        <div className="w-52 p-2">
          <ButtonField
            iconAfter={
              <div className="text-atlasian-purple">
                <IconPlus size="medium" />
              </div>
            }
            text={"Tambah ANGGARAN"}
            textColor={"purple"}
            handler={() => setShowModal(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTables;

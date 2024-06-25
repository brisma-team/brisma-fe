import ModalDetailRingkasan from "./ModalDetailRingkasan";
import { ModalEditRingkasan, TableRingkasan } from "../../../common/addendum";

const ContentRingkasan = ({
  data,
  dataDetail,
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
    latar_belakang: "Latar Belakang",
    tujuan: "Tujuan",
    analisa: "Analisa",
    anggaran: "Anggaran",
    jadwal: "Jadwal",
  };

  return (
    <div className="w-full">
      <TableRingkasan
        data={data}
        section={section}
        withButtonDelete
        handleClickDelete={handleClickDelete}
        handleClickEdit={handleClickUpdate}
        handleClickView={handleClickView}
        handleClickReset={handleResetRingkasan}
        handleClickSave={handleSaveRingkasan}
      />
      <ModalDetailRingkasan
        data={dataDetail}
        showModal={showModalDetail}
        handleCloseModal={handleCloseModal}
      />
      <ModalEditRingkasan
        data={payload}
        showModal={showModalEdit}
        handleCloseModal={handleCloseModal}
        handleChangeText={handleChangePayload}
        handleSubmit={handleSubmitEditRingkasan}
      />
    </div>
  );
};

export default ContentRingkasan;

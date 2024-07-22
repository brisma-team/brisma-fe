import ModalDetailRingkasan from "./ModalDetailRingkasan";
import { ModalEditRingkasan, TableRingkasan } from "../../../common/addendum";

const ContentRingkasan = ({
  data,
  dataDetail,
  dataInfoProject,
  payload,
  // validation,
  showModalDetail,
  showModalEdit,
  handleChangePayload,
  handleCloseModal,
  handleClickUpdate,
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
      <TableRingkasan
        data={data}
        section={section}
        handleClickEdit={handleClickUpdate}
        handleClickView={handleClickView}
        handleClickReset={handleResetRingkasan}
        handleClickSave={handleSaveRingkasan}
      />
      <ModalDetailRingkasan
        data={dataDetail}
        dataInfoProject={dataInfoProject}
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

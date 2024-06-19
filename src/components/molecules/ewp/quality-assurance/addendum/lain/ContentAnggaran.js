import { ButtonField, Card } from "@/components/atoms";
import { ModalAddAnggaran, TableAnggaran } from "../../../common/anggaran";

const ContentAnggaran = ({
  showModal,
  dataContent,
  payload,
  validation,
  handleChangePayload,
  handleClickAddAnggaran,
  handleClickUpdateAnggaran,
  handleClickDeleteAnggaran,
  handleLoadDataFromEWP,
  handleSaveAnggaran,
  handleSubmitAnggaran,
  handleCloseModalAnggaran,
}) => {
  return (
    <div className="w-full">
      <Card>
        <div className="px-6 pt-2 pb-4 w-full">
          <p className="ml-2 font-bold text-base">Usulan Anggaran</p>
          <div className="my-2 " />
          <TableAnggaran
            data={dataContent}
            handleClickAdd={handleClickAddAnggaran}
            handleClickUpdate={handleClickUpdateAnggaran}
            handleClickDelete={handleClickDeleteAnggaran}
          />
        </div>
      </Card>
      <div className="mt-3 flex justify-end gap-2">
        <div className="w-[8.75rem] bg-atlasian-yellow rounded">
          <ButtonField
            text={"Load from MAPA"}
            handler={() => handleLoadDataFromEWP("anggaran")}
          />
        </div>
        <div className="w-[7.75rem] bg-atlasian-green rounded">
          <ButtonField text={"Simpan"} handler={handleSaveAnggaran} />
        </div>
      </div>
      <ModalAddAnggaran
        showModal={showModal}
        data={payload}
        validation={validation}
        handleChangeText={handleChangePayload}
        handleCloseModal={handleCloseModalAnggaran}
        handleSubmit={handleSubmitAnggaran}
      />
    </div>
  );
};

export default ContentAnggaran;

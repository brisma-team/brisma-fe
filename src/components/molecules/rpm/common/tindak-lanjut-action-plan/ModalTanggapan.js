import { ButtonField, CloseModal, Modal } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";

const ModalTanggapan = ({
  data,
  showModal,
  isEditable,
  handleChangePayload,
  handleSubmit,
  handleCloseModal,
}) => {
  return (
    <Modal
      showModal={showModal}
      header={
        <div className="relative w-[63rem]">
          <CloseModal
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          />
          <div className="text-2xl font-semibold text-center p-3">
            Rekomendasi
          </div>
        </div>
      }
      footer={
        isEditable && (
          <div className="w-[10rem]">
            <div className="bg-atlasian-green rounded-md">
              <ButtonField text={"Simpan"} handler={handleSubmit} />
            </div>
          </div>
        )
      }
    >
      <div className="w-[63rem]">
        <div className="w-full p-4 -mt-2">
          <CardContentHeaderFooter
            header={
              <div className="py-2 px-4 text-base font-semibold w-full">
                Tanggapan
              </div>
            }
          >
            <div className="flex flex-col gap-4 px-6 py-4 w-full">
              <textarea
                className="w-full border-2 border-gray-200 text-sm rounded-md"
                value={data}
                placeholder={
                  !isEditable && !data ? "" : "Berikan tanggapan disini..."
                }
                rows={5}
                onChange={(e) => handleChangePayload(e.target.value)}
                disabled={!isEditable}
              ></textarea>
            </div>
          </CardContentHeaderFooter>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTanggapan;

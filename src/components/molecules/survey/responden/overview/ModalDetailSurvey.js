import { CloseModal, Modal } from "@/components/atoms";
import { confirmationSwal, convertDate } from "@/helpers";
const row = "w-full flex border-b border-gray-300";
const columnBorder =
  "border-r border-gray-300 flex items-center px-3 py-2 text-sm font-semibold";
const columnBorderNone = "flex items-center px-3 py-2 text-sm";

const ModalDetailSurvey = ({ showModal, handleCloseModal, data }) => {
  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    handleCloseModal();
  };

  return (
    <Modal showModal={showModal}>
      <div className="w-[45rem] relative">
        <CloseModal handleCloseModal={closeModal} showModal={showModal} />
        <div className="px-2 pb-2 pt-6">
          <div className="border border-gray-300 rounded-ss-lg rounded-se-lg">
            <div className={row}>
              <div className={`${columnBorder} w-1/4`}>Judul Survei</div>
              <div className={`${columnBorderNone} w-3/4`}>
                {data?.nama_survey}
              </div>
            </div>
            <div className={row}>
              <div className={`${columnBorder} w-1/4`}>Jenis Survei</div>
              <div className={`${columnBorder} w-1/4`}>
                {data?.jenis_survey_name}
              </div>
              <div className={`${columnBorder} w-1/4`}>Status Survei</div>
              <div className={`${columnBorderNone} w-1/4`}>
                {data?.status_name}
              </div>
            </div>
            <div className={row}>
              <div className={`${columnBorder} w-1/4`}>Dimulai</div>
              <div className={`${columnBorder} w-1/4`}>
                {convertDate(data?.pelaksanaan_start, "-", "d")}
              </div>
              <div className={`${columnBorder} w-1/4`}>Selesai</div>
              <div className={`${columnBorderNone} w-1/4`}>
                {convertDate(data?.pelaksanaan_end, "-", "d")}
              </div>
            </div>
            <div className={row}>
              <div className={`${columnBorder} w-1/4`}>Pembuat Survei</div>
              <div className={`${columnBorder} w-1/4`}>
                {convertDate(data?.createdAt, "-", "d")}
              </div>
              <div className={`${columnBorder} w-1/4`}>Survei Code</div>
              <div className={`${columnBorderNone} w-1/4`}>
                {data?.project_survey_id}
              </div>
            </div>
            <div className={`${row} min-h-[5rem]`}>
              <div className={`${columnBorder} w-1/4`}>Catatan</div>
              <div className={`${columnBorderNone} w-3/4`}>{data?.catatan}</div>
            </div>
            <div className={row}>
              <div className={`${columnBorder} w-1/4`}>Daftar Responden</div>
              <div className={`${columnBorderNone} w-3/4`}></div>
            </div>
            {data?.responden_survey?.length ? (
              <div className={`${row} grid grid-cols-4`}>
                {data?.responden_survey?.map((responden, index) => {
                  const rowIndex = Math.floor(index / 4);

                  // Tambahkan border-b hanya untuk baris pertama
                  const hasBorderBottom = rowIndex === 0;

                  // Gabungkan kelas border-b jika diperlukan
                  const columnClasses = `${columnBorder} ${
                    hasBorderBottom ? "border-b" : ""
                  }`;

                  return (
                    <div className={columnClasses} key={index}>
                      {responden?.nama_responden}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailSurvey;

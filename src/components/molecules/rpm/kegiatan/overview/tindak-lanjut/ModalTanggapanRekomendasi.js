import { ButtonField, CloseModal, Modal } from "@/components/atoms";
import { confirmationSwal } from "@/helpers";
// import { useEffect } from "react";
// import { useActivitySchedule, useKategoriAnggaran } from "@/data/pat";
import ModalBodyTanggapanRekomendasi from "./ModalBodyTanggapanRekomendasi";

const ModalTanggapanRekomendasi = ({
  showModal,
  setShowModal,
  handleUpdateTanggapan,
  selectedValue,
  setSelectedValue,
}) => {
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

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
        <div className="w-[10rem]">
          <div className="bg-atlasian-green rounded-md">
            <ButtonField text={"Simpan"} handler={handleUpdateTanggapan} />
          </div>
        </div>
      }
    >
      <ModalBodyTanggapanRekomendasi
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    </Modal>
  );
};

export default ModalTanggapanRekomendasi;

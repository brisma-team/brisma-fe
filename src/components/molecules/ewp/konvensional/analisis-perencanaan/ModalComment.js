import { CloseModal, Modal, TableField } from "@/components/atoms";
import { useHistoryCommentMapaEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import { confirmationSwal, convertDate } from "@/helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ModalComment = ({ showModal, setShowModal, selectedSubActivityId }) => {
  const { id } = useRouter().query;

  const { historyCommentMapaEWP } = useHistoryCommentMapaEWP({
    id,
    sub_aktivitas_id: selectedSubActivityId,
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (historyCommentMapaEWP?.data?.length) {
      const mapping = historyCommentMapaEWP?.data?.map((v) => {
        return {
          "P.I.C": v.name_from,
          Deskripsi: v.approval_desc,
          Tanggal: convertDate(v.createdAt, "-", "d"),
        };
      });

      setHistory(mapping);
    }
  }, [historyCommentMapaEWP]);

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
    <Modal showModal={showModal} positionCenter>
      <div className="w-[61rem] mx-3">
        <div className="relative">
          <CloseModal
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          />
          <div className="font-bold text-xl text-brisma">Riwayat Workflow</div>
          <div className="py-3">
            <TableField
              headers={["P.I.C", "Deskripsi", "Tanggal"]}
              columnWidths={["35%", "50%", "15%"]}
              items={history}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComment;

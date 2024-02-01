import { CloseModal, Modal, TableField } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useActivityScheduleOther } from "@/data/pat";
import { useRouter } from "next/router";
import { confirmationSwal } from "@/helpers";

const ModalOtherScheduleDetail = ({ showModal, setShowModal, scheduleId }) => {
  const { id } = useRouter().query;
  const [items, setItems] = useState([]);
  const { activityScheduleOther } = useActivityScheduleOther("detail", {
    kegiatan_lain_id: scheduleId,
    id,
  });
  useEffect(() => {
    const jenisAuditee =
      activityScheduleOther?.data.jadwal?.count_target_jenis_auditee;
    if (jenisAuditee?.length > 0) {
      const mappingItems = jenisAuditee?.map((v) => ({
        "Objek Audit": v?.name,
        Eksisting: v?.existing.toString(),
        Target: v?.target.toString(),
        Presentase: !parseInt(v?.existing)
          ? "0%"
          : `${(
              (parseInt(v?.target) / parseInt(v?.existing)) *
              100
            ).toString()}%`,
      }));
      setItems(mappingItems);
    } else {
      setItems([]);
    }
  }, [activityScheduleOther]);

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
    <Modal showModal={showModal} onClickOutside={() => setShowModal(false)}>
      <div className="w-[50rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <TableField
          headers={["Objek Audit", "Eksisting", "Target", "Presentase"]}
          columnWidths={["40%", "20%", "20%", "20%"]}
          items={items}
        />
      </div>
    </Modal>
  );
};

export default ModalOtherScheduleDetail;

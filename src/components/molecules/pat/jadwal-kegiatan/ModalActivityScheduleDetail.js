import { CloseModal, Modal, TableField } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useActivitySchedule } from "@/data/pat";
import { useRouter } from "next/router";
import { confirmationSwal } from "@/helpers";

const ModalActivityScheduleDetail = ({
  showModal,
  setShowModal,
  scheduleId,
}) => {
  const { id } = useRouter().query;
  const [items, setItems] = useState([]);
  const { activitySchedule } = useActivitySchedule("detail", {
    jadwal_sbp_id: scheduleId,
    id,
  });
  useEffect(() => {
    const jenisAuditee =
      activitySchedule?.data.jadwal?.count_target_jenis_auditee;
    if (jenisAuditee?.length > 0) {
      const mappingItems = jenisAuditee?.map((v) => {
        if (!parseInt(v?.existing)) {
          return {
            "Objek Audit": v?.name,
            Eksisting: "0",
            Target: "0",
            Presentase: "0%",
          };
        } else {
          return {
            "Objek Audit": v?.name,
            Eksisting: v?.existing.toString(),
            Target: v?.target.toString(),
            Presentase: `${(
              (parseInt(v?.target) / parseInt(v?.existing)) *
              100
            ).toString()}%`,
          };
        }
      });
      setItems(mappingItems);
    } else {
      setItems([]);
    }
  }, [activitySchedule]);

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

export default ModalActivityScheduleDetail;

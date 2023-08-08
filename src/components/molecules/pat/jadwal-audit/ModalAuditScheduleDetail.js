import { Modal, PageTitle, TableField } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useAuditSchedule } from "@/data/pat";
import { useRouter } from "next/router";

const ModalAuditScheduleDetail = ({ showModal, setShowModal, scheduleId }) => {
  console.log("scheduleId => ", scheduleId);
  const { id } = useRouter().query;
  const [items, setItems] = useState([]);
  const { auditSchedule } = useAuditSchedule("detail", {
    jadwal_id: scheduleId,
    id,
  });
  useEffect(() => {
    const jenisAuditee = auditSchedule?.data.jadwal?.count_target_jenis_auditee;
    if (jenisAuditee?.length > 0) {
      const mappingItems = jenisAuditee?.map((v) => {
        if (!parseInt(v?.existing)) {
          return {
            "Objek Audit": v?.name,
            Eksisting: v?.existing.toString(),
            Target: v?.target.toString(),
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
  }, [auditSchedule]);

  return (
    <Modal showModal={showModal} onClickOutside={() => setShowModal(false)}>
      <div className="w-[50rem]">
        <div className="mb-2">
          <PageTitle text={auditSchedule?.data.jadwal?.name_kegiatan_audit} />
        </div>
        <TableField
          headers={["Objek Audit", "Eksisting", "Target", "Presentase"]}
          columnWidths={["40%", "20%", "20%", "20%"]}
          items={items}
        />
      </div>
    </Modal>
  );
};

export default ModalAuditScheduleDetail;

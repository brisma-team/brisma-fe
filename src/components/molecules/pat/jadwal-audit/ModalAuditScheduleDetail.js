import {
  CloseModal,
  ModalScroll,
  PageTitle,
  TableField,
} from "@/components/atoms";
import { useEffect, useState } from "react";
import { useAuditSchedule } from "@/data/pat";
import { useRouter } from "next/router";
import { confirmationSwal } from "@/helpers";

const ModalAuditScheduleDetail = ({ showModal, setShowModal, scheduleId }) => {
  const { id } = useRouter().query;
  const [items, setItems] = useState([]);
  const { auditSchedule } = useAuditSchedule("detail", {
    jadwal_id: scheduleId,
    id,
  });

  useEffect(() => {
    const jenisAuditee = auditSchedule?.data.jadwal?.count_target_jenis_auditee;
    if (jenisAuditee?.length) {
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
  }, [auditSchedule]);

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
    <ModalScroll showModal={showModal}>
      <div className="w-[50rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-2">
          <PageTitle text={auditSchedule?.data.jadwal?.name_kegiatan_audit} />
        </div>
        <TableField
          headers={["Objek Audit", "Eksisting", "Target", "Presentase"]}
          columnWidths={["40%", "20%", "20%", "20%"]}
          items={items}
        />
      </div>
    </ModalScroll>
  );
};

export default ModalAuditScheduleDetail;

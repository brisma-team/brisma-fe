import { Modal } from "@/components/atoms";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ModalBodyInfoKegiatan,
  ModalBodyObjekAudit,
  ModalBodyAnggaran,
} from "./sub-modal";
import { useSelector } from "react-redux";
import { usePostData, useUpdateData } from "@/helpers";
import { useRouter } from "next/router";
import { ModalHeader, ModalFooter } from "@/components/molecules/pat";

const ModalAuditSchedule = ({ showModal, setShowModal, typeModal, mutate }) => {
  const { id } = useRouter().query;
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );

  useEffect(() => {
    if (typeModal === "detail") {
      setIsDisabled(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedAnggaranKegiatan = auditScheduleData.anggaran_kegiatan.reduce(
      (result, item) => {
        return [...result, ...item.ref_sub_kategori_anggarans];
      },
      []
    );

    const data = {
      ...auditScheduleData,
      pat_id: id,
      anggaran_kegiatan: combinedAnggaranKegiatan,
    };

    if (typeModal === "update") {
      await useUpdateData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/audit`,
        data
      );
    } else {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/audit/create`,
        data
      );
    }

    setShowModal(false);
    mutate;
  };

  const handleNextStage = () => {
    if (currentModalStage < 3) setCurrentModalStage(currentModalStage + 1);
  };

  const items = [
    {
      id: "step-1",
      label: (
        <Link href="#" onClick={() => setCurrentModalStage(1)}>
          Info Kegiatan
        </Link>
      ),
      percentageComplete: currentModalStage > 1 ? 100 : 0,
      status: currentModalStage === 1 ? "current" : "unvisited",
      href: "#",
    },
    {
      id: "step-2",
      label: (
        <Link href="#" onClick={() => setCurrentModalStage(2)}>
          Objek Audit
        </Link>
      ),
      percentageComplete: currentModalStage > 2 ? 100 : 0,
      status: currentModalStage === 2 ? "current" : "unvisited",
      href: "#",
    },
    {
      id: "step-3",
      label: (
        <Link href="#" onClick={() => setCurrentModalStage(3)}>
          Anggaran
        </Link>
      ),
      percentageComplete: 0,
      status: currentModalStage === 3 ? "current" : "unvisited",
      href: "#",
    },
  ];

  return (
    <Modal
      showModal={showModal}
      onClickOutside={() => setShowModal(false)}
      header={
        <ModalHeader headerText={"Buat Jadwal Audit"} progressItems={items} />
      }
      footer={
        <ModalFooter
          handleSubmit={handleSubmit}
          handleNextStage={handleNextStage}
          isDisabled={false}
        />
      }
    >
      {currentModalStage === 1 && (
        <ModalBodyInfoKegiatan
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isDisabled}
        />
      )}
      {currentModalStage === 2 && (
        <ModalBodyObjekAudit
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isDisabled}
        />
      )}
      {currentModalStage === 3 && (
        <ModalBodyAnggaran
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isDisabled}
        />
      )}
    </Modal>
  );
};

export default ModalAuditSchedule;

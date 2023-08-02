import { Modal } from "@/components/atoms";
import { useState } from "react";
import Link from "next/link";
import {
  ModalBodyActivityInfo,
  ModalBodyActivityObject,
  ModalBodyBudget,
} from "./sub-modal";
import { useSelector } from "react-redux";
import { usePostData, useUpdateData } from "@/helpers";
import { useRouter } from "next/router";
import { ModalHeader, ModalFooter } from "@/components/molecules/pat";

const ModalActivitySchedule = ({
  showModal,
  setShowModal,
  typeModal,
  mutate,
  scheduleId,
}) => {
  const { id } = useRouter().query;
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const activityScheduleData = useSelector(
    (state) => state.activitySchedule.activityScheduleData
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedActivityBudget =
      activityScheduleData.anggaran_kegiatan.reduce((result, item) => {
        return [...result, ...item.ref_sub_kategori_anggarans];
      }, []);

    const data = {
      ...activityScheduleData,
      pat_id: id,
      anggaran_kegiatan: combinedActivityBudget,
    };

    if (typeModal === "update") {
      await useUpdateData(`${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp`, {
        ...data,
        jadwal_sbp_id: scheduleId,
      });
    } else {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp/create`,
        data
      );
    }

    setShowModal(false);
    mutate;
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
          Objek Kegiatan
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
        <ModalHeader
          headerText={
            currentModalStage === 3
              ? "Buat Jadwal Consulting"
              : "Buat Jadwal Kegiatan"
          }
          progressItems={items}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      {currentModalStage === 1 && (
        <ModalBodyActivityInfo
          setCurrentModalStage={setCurrentModalStage}
          typeModal={typeModal}
        />
      )}
      {currentModalStage === 2 && (
        <ModalBodyActivityObject
          setCurrentModalStage={setCurrentModalStage}
          typeModal={typeModal}
        />
      )}
      {currentModalStage === 3 && (
        <ModalBodyBudget
          setCurrentModalStage={setCurrentModalStage}
          typeModal={typeModal}
        />
      )}
    </Modal>
  );
};

export default ModalActivitySchedule;

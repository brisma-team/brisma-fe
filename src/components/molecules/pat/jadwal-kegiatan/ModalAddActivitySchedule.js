import { Modal, ButtonField } from "@/components/atoms";
import { ProgressTracker } from "@atlaskit/progress-tracker";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ModalBodyObjekKegiatan,
  ModalBodyInfoKegiatan,
  ModalBodyAnggaran,
} from "./sub-modal";

const Header = ({ headerText, progressItems }) => {
  return (
    <div className="text-center w-[31.1875rem]">
      <p className="text-3xl font-semibold">{headerText}</p>
      <div className="w-full -mt-4">
        <ProgressTracker items={progressItems} />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      <div className="rounded w-28 bg-atlasian-blue-light">
        <ButtonField text={"Lanjut"} />
      </div>
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text={"Simpan"} />
      </div>
    </div>
  );
};

const ModalAddActivitySchedule = ({ showModal, setShowModal }) => {
  const [currentModalStage, setCurrentModalStage] = useState(1);

  useEffect(() => {
    console.log("currentModalStage => ", currentModalStage);
  }, [currentModalStage]);

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
        <Header
          headerText={
            currentModalStage === 3
              ? "Buat Jadwal Consulting"
              : "Buat Jadwal Kegiatan"
          }
          progressItems={items}
        />
      }
      footer={<Footer />}
    >
      {currentModalStage === 1 && (
        <ModalBodyInfoKegiatan setCurrentModalStage={setCurrentModalStage} />
      )}
      {currentModalStage === 2 && (
        <ModalBodyObjekKegiatan setCurrentModalStage={setCurrentModalStage} />
      )}
      {currentModalStage === 3 && (
        <ModalBodyAnggaran setCurrentModalStage={setCurrentModalStage} />
      )}
    </Modal>
  );
};

export default ModalAddActivitySchedule;

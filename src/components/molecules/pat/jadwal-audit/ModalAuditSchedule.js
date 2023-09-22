import { DivButton, Modal } from "@/components/atoms";
import { useEffect, useState } from "react";
import {
  ModalBodyInfoKegiatan,
  ModalBodyObjekAudit,
  ModalBodyAnggaran,
} from "./sub-modal";
import { useSelector, useDispatch } from "react-redux";
import { setErrorValidation, usePostData, useUpdateData } from "@/helpers";
import { useRouter } from "next/router";
import { ModalHeader, ModalFooter } from "@/components/molecules/pat";
import {
  activityInfoSchema,
  activityObjectSchema,
} from "@/helpers/schemas/pat/auditScheduleSchema";
import {
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetAuditScheduleData,
} from "@/slices/pat/auditScheduleSlice";

const ModalAuditSchedule = ({ showModal, setShowModal, typeModal, mutate }) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();

  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );
  const schemaMappings = {
    1: {
      schema: activityInfoSchema,
      resetErrors: resetvalidationErrorsAI,
      setErrors: setvalidationErrorsAI,
    },
    2: {
      schema: activityObjectSchema,
      resetErrors: resetvalidationErrorsAO,
      setErrors: setvalidationErrorsAO,
    },
  };

  useEffect(() => {
    if (typeModal === "detail") {
      setIsFormDisabled(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.textContent;
    const combinedAnggaranKegiatan = auditScheduleData.anggaran_kegiatan.reduce(
      (result, item) => {
        return [...result, ...item.ref_sub_kategori_anggarans];
      },
      []
    );

    const filterEchannel = auditScheduleData.echannel.filter(
      (v) => v.posisi_data !== ""
    );

    const data = {
      ...auditScheduleData,
      pat_id: id,
      anggaran_kegiatan: combinedAnggaranKegiatan,
      echannel: filterEchannel,
    };

    const validate = setErrorValidation(
      data,
      dispatch,
      schemaMappings[currentModalStage]
    );

    if ((validate && currentModalStage > 1) || currentModalStage === 3) {
      if (buttonName === "Simpan") {
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
        mutate();
        handleCloseModal();
      }
    }
  };

  const handleNextStage = async () => {
    const validate = setErrorValidation(
      auditScheduleData,
      dispatch,
      schemaMappings[currentModalStage]
    );

    if (validate && currentModalStage < 3) {
      setCurrentModalStage(currentModalStage + 1);
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    setCurrentModalStage(1);
    dispatch(resetvalidationErrorsAI());
    dispatch(resetvalidationErrorsAO());
    dispatch(resetAuditScheduleData());
  };

  const items = [
    {
      id: "step-1",
      label: (
        <DivButton handleClick={() => setCurrentModalStage(1)}>
          Info Kegiatan
        </DivButton>
      ),
      percentageComplete: currentModalStage > 1 ? 100 : 0,
      status: currentModalStage === 1 ? "current" : "visited",
    },
    {
      id: "step-2",
      label: (
        <DivButton handleClick={() => setCurrentModalStage(2)}>
          Objek Audit
        </DivButton>
      ),
      percentageComplete: currentModalStage > 2 ? 100 : 0,
      status: currentModalStage === 2 ? "current" : "visited",
    },
    {
      id: "step-3",
      label: (
        <DivButton handleClick={() => setCurrentModalStage(3)}>
          Anggaran
        </DivButton>
      ),
      percentageComplete: 0,
      status: currentModalStage === 3 ? "current" : "visited",
    },
  ];

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Buat Jadwal Audit"}
          progressItems={items}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
        <ModalFooter
          currentModalStage={currentModalStage}
          handleSubmit={handleSubmit}
          handleNextStage={handleNextStage}
        />
      }
    >
      {currentModalStage === 1 && (
        <ModalBodyInfoKegiatan
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 2 && (
        <ModalBodyObjekAudit
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 3 && (
        <ModalBodyAnggaran
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
    </Modal>
  );
};

export default ModalAuditSchedule;

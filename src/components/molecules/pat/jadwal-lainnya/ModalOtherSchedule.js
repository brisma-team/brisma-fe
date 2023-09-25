import { DivButton, Modal } from "@/components/atoms";
import { useState } from "react";
import {
  ModalBodyActivityObject,
  ModalBodyActivityInfo,
  ModalBodyBudget,
} from "./sub-modal";
import { setErrorValidation, usePostData, useUpdateData } from "@/helpers";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ModalHeader, ModalFooter } from "@/components/molecules/pat";
import {
  activityInfoSchema,
  activityObjectSchema,
} from "@/helpers/schemas/pat/otherScheduleSchema";
import {
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetOtherScheduleData,
} from "@/slices/pat/activityScheduleOtherSlice";
import { useEffect } from "react";

const ModalOtherSchedule = ({ showModal, setShowModal, typeModal, mutate }) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();

  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
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
    const combinedActivityBudget =
      activityScheduleOtherData.anggaran_kegiatan.reduce((result, item) => {
        return [...result, ...item.ref_sub_kategori_anggarans];
      }, []);

    const data = {
      ...activityScheduleOtherData,
      pat_id: id,
      anggaran_kegiatan: combinedActivityBudget,
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
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain`,
            data
          );
        } else {
          await usePostData(
            `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain/create`,
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
      activityScheduleOtherData,
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
    dispatch(resetOtherScheduleData());
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
          Objek Kegiatan
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
          headerText={"Buat Jadwal Kegiatan Lain"}
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
        <ModalBodyActivityInfo
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 2 && (
        <ModalBodyActivityObject
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
      {currentModalStage === 3 && (
        <ModalBodyBudget
          setCurrentModalStage={setCurrentModalStage}
          isDisabled={isFormDisabled}
        />
      )}
    </Modal>
  );
};

export default ModalOtherSchedule;

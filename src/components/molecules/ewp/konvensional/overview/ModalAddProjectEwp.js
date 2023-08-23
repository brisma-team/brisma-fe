import { Modal } from "@/components/atoms";
import { useEffect, useState } from "react";
import {
  ModalBodySource,
  ModalBodySchedulePAT,
  ModalBodySummaryPAT,
} from "./sub-modal";
import { ModalFooterEWP, ModalHeaderEWP } from "../..";
import {
  resetProjectOverviewData,
  setProjectOverviewData,
} from "@/slices/ewp/projectOverviewEWPSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalAddProjectEWP = ({ showModal, setShowModal, typeModal, mutate }) => {
  const dispatch = useDispatch();
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isPat, setIsPat] = useState(true);
  const [maxStage, setMaxStage] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWP.projectOverviewData
  );

  //   const schemaMappings = {
  //     1: {
  //       schema: activityInfoSchema,
  //       resetErrors: resetvalidationErrorsAI,
  //       setErrors: setvalidationErrorsAI,
  //     },
  //     2: {
  //       schema: activityObjectSchema,
  //       resetErrors: resetvalidationErrorsAO,
  //       setErrors: setvalidationErrorsAO,
  //     },
  //     3: {
  //       schema: activityObjectSchema,
  //       resetErrors: resetvalidationErrorsAO,
  //       setErrors: setvalidationErrorsAO,
  //     },
  //   };

  useEffect(() => {
    if (typeModal === "detail") {
      setIsFormDisabled(true);
    }
  }, []);

  useEffect(() => {
    if (isPat) {
      setMaxStage(3);
    } else {
      setMaxStage(4);
    }
  }, [isPat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.textContent;
    dispatch(
      setProjectOverviewData((prev) => {
        return { ...prev, is_pat: isPat };
      })
    );
    console.log("projectOverviewData => ", projectOverviewData);
    // const combinedActivityBudget =
    //   activityScheduleOtherData.anggaran_kegiatan.reduce((result, item) => {
    //     return [...result, ...item.ref_sub_kategori_anggarans];
    //   }, []);

    // const data = {
    //   ...activityScheduleOtherData,
    //   anggaran_kegiatan: combinedActivityBudget,
    // };

    // const validate = setErrorValidation(
    //   data,
    //   dispatch,
    //   schemaMappings[currentModalStage]
    // );

    // if ((validate && currentModalStage > 1) || currentModalStage === 3) {
    //   if (buttonName === "Simpan") {
    //     if (typeModal === "update") {
    //       await useUpdateData(
    //         `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain`,
    //         data
    //       );
    //     } else {
    //       await usePostData(
    //         `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain/create`,
    //         data
    //       );
    //     }
    //     mutate();
    //     setShowModal(false);
    //   }
    // }
  };

  const handlePrevStage = async () => {
    setCurrentModalStage(currentModalStage - 1);
  };

  const handleNextStage = async () => {
    setCurrentModalStage(currentModalStage + 1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentModalStage(1);
    setIsPat(true);
    setMaxStage(0);
    setIsFormDisabled(false);
    dispatch(resetProjectOverviewData());
  };

  const generateProgressItems = () => {
    if (isPat) {
      return [
        {
          id: "step-1",
          label: <span>Sumber</span>,
          percentageComplete: currentModalStage > 1 ? 100 : 0,
          status: currentModalStage === 1 ? "current" : "unvisited",
          href: "#",
        },
        {
          id: "step-2",
          label: <span>Jadwal</span>,
          percentageComplete: currentModalStage > 2 ? 100 : 0,
          status: currentModalStage === 2 ? "current" : "unvisited",
          href: "#",
        },
        {
          id: "step-3",
          label: <span>Ringkasan</span>,
          percentageComplete: 0,
          status: currentModalStage === 3 ? "current" : "unvisited",
          href: "#",
        },
      ];
    } else {
      return [
        {
          id: "step-1",
          label: <span>Sumber</span>,
          percentageComplete: currentModalStage > 1 ? 100 : 0,
          status: currentModalStage === 1 ? "current" : "unvisited",
          href: "#",
        },
        {
          id: "step-2",
          label: <span>Jadwal</span>,
          percentageComplete: currentModalStage > 2 ? 100 : 0,
          status: currentModalStage === 2 ? "current" : "unvisited",
          href: "#",
        },
        {
          id: "step-3",
          label: <span>Surat</span>,
          percentageComplete: 0,
          status: currentModalStage === 3 ? "current" : "unvisited",
          href: "#",
        },

        {
          id: "step-3",
          label: <span>Ringkasan</span>,
          percentageComplete: 0,
          status: currentModalStage === 3 ? "current" : "unvisited",
          href: "#",
        },
      ];
    }
  };

  const progressItems = generateProgressItems();

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeaderEWP
          headerText={"Buat Project EWP"}
          progressItems={progressItems}
          setShowModal={setShowModal}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
        <ModalFooterEWP
          currentModalStage={currentModalStage}
          handleSubmit={handleSubmit}
          handlePrevStage={handlePrevStage}
          handleNextStage={handleNextStage}
          maxStage={maxStage}
        />
      }
      withoutFooter={currentModalStage < 2 && true}
    >
      {
        currentModalStage === 1 ? (
          <ModalBodySource
            setCurrentModalStage={setCurrentModalStage}
            setIsPat={setIsPat}
            isDisabled={isFormDisabled}
          />
        ) : isPat ? (
          // Start Submodal sumber audit PAT
          currentModalStage === 2 ? (
            <ModalBodySchedulePAT
              setCurrentModalStage={setCurrentModalStage}
              isDisabled={isFormDisabled}
            />
          ) : (
            currentModalStage === 3 && (
              <ModalBodySummaryPAT
                setCurrentModalStage={setCurrentModalStage}
                isDisabled={isFormDisabled}
              />
            )
          )
        ) : // End Submodal sumber audit PAT
        // Start Submodal sumber audit Non-PAT
        currentModalStage === 2 ? (
          <ModalBodySchedulePAT
            setCurrentModalStage={setCurrentModalStage}
            isDisabled={isFormDisabled}
          />
        ) : currentModalStage === 3 ? (
          <ModalBodySchedulePAT
            setCurrentModalStage={setCurrentModalStage}
            isDisabled={isFormDisabled}
          />
        ) : (
          currentModalStage === 4 && (
            <ModalBodySummaryPAT
              setCurrentModalStage={setCurrentModalStage}
              isDisabled={isFormDisabled}
            />
          )
        )
        // End Submodal sumber audit Non-PAT
      }
    </Modal>
  );
};

export default ModalAddProjectEWP;

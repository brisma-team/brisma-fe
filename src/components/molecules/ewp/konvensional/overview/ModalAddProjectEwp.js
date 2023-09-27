import { Modal } from "@/components/atoms";
import { useEffect, useState } from "react";
import {
  ModalBodySource,
  ModalBodySchedulePAT,
  ModalBodySummaryPAT,
  ModalBodyDocumentNonPAT,
  ModalBodyScheduleNonPAT,
  ModalBodySummaryNonPAT,
} from "./sub-modal";
import { ModalFooterEWP, ModalHeaderEWP } from "../..";
import {
  resetProjectOverviewData,
  setValidationErrorsSchedulePAT,
  setValidationErrorsSummaryPAT,
  setValidationErrorsDocumentNonPAT,
  setValidationErrorsScheduleNonPAT,
  resetValidationErrorsSchedulePAT,
  resetValidationErrorsSummaryPAT,
  resetValidationErrorsDocumentNonPAT,
  resetValidationErrorsScheduleNonPAT,
} from "@/slices/ewp/projectOverviewEWPSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  schedulePATSchema,
  summaryPATSchema,
  scheduleNonPATSchema,
  documentNonPATSchema,
} from "@/helpers/schemas/ewp/konvensional/projectOverviewEWPSchema";
import { confirmationSwal, setErrorValidation, usePostData } from "@/helpers";
import _ from "lodash";

const ModalAddProjectEWP = ({ showModal, setShowModal, mutate }) => {
  const dispatch = useDispatch();
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isPat, setIsPat] = useState(true);
  const [maxStage, setMaxStage] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [differentKTA, setDifferentKTA] = useState(true);
  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWP.projectOverviewData
  );

  const schemaMappings = {
    true: {
      2: {
        schema: schedulePATSchema,
        resetErrors: resetValidationErrorsSchedulePAT,
        setErrors: setValidationErrorsSchedulePAT,
      },
      3: {
        schema: summaryPATSchema,
        resetErrors: resetValidationErrorsSummaryPAT,
        setErrors: setValidationErrorsSummaryPAT,
      },
    },
    false: {
      2: {
        schema: scheduleNonPATSchema,
        resetErrors: resetValidationErrorsScheduleNonPAT,
        setErrors: setValidationErrorsScheduleNonPAT,
      },
      3: {
        schema: documentNonPATSchema,
        resetErrors: resetValidationErrorsDocumentNonPAT,
        setErrors: setValidationErrorsDocumentNonPAT,
      },
    },
  };

  useEffect(() => {
    if (isPat) {
      setMaxStage(3);
    } else {
      setMaxStage(4);
    }
  }, [isPat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.offsetParent.name;
    const data = {
      ...projectOverviewData,
      is_pat: isPat,
      audit_year: !isPat
        ? parseInt(new Date().getFullYear())
        : projectOverviewData.audit_year,
    };

    if (buttonName === "saveButton" || buttonName === "sendApprovalButton") {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/auditor/create`,
        _.omit(data, ["tim_audit"])
      );
      mutate();
      setShowModal(false);
      setCurrentModalStage(1);
      setIsPat(true);
      dispatch(resetProjectOverviewData());
    }
  };

  const handlePrevStage = async () => {
    setCurrentModalStage(currentModalStage - 1);
  };

  const handleNextStage = async () => {
    const data = {
      ...projectOverviewData,
      is_pat: isPat,
    };

    const validate = setErrorValidation(
      data,
      dispatch,
      schemaMappings[isPat][currentModalStage]
    );

    if (validate) {
      setCurrentModalStage(currentModalStage + 1);
    }
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setCurrentModalStage(1);
    setIsPat(true);
    dispatch(resetProjectOverviewData());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      return handleCloseModal();
    }
  };

  const generateProgressItems = () => {
    if (isPat) {
      return [
        {
          id: "step-1",
          label: <span>Sumber</span>,
          percentageComplete: currentModalStage > 1 ? 100 : 0,
          status: currentModalStage === 1 ? "current" : "visited",
        },
        {
          id: "step-2",
          label: <span>Jadwal</span>,
          percentageComplete: currentModalStage > 2 ? 100 : 0,
          status: currentModalStage === 2 ? "current" : "visited",
        },
        {
          id: "step-3",
          label: <span>Ringkasan</span>,
          percentageComplete: 0,
          status: currentModalStage === 3 ? "current" : "visited",
        },
      ];
    } else {
      return [
        {
          id: "step-4",
          label: <span>Sumber</span>,
          percentageComplete: currentModalStage > 1 ? 100 : 0,
          status: currentModalStage === 1 ? "current" : "visited",
        },
        {
          id: "step-5",
          label: <span>Jadwal</span>,
          percentageComplete: currentModalStage > 2 ? 100 : 0,
          status: currentModalStage === 2 ? "current" : "visited",
        },
        {
          id: "step-6",
          label: <span>Surat</span>,
          percentageComplete: currentModalStage > 3 ? 100 : 0,
          status: currentModalStage === 3 ? "current" : "visited",
        },
        {
          id: "step-7",
          label: <span>Ringkasan</span>,
          percentageComplete: 0,
          status: currentModalStage === 4 ? "current" : "visited",
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
          handleKeyDown={handleKeyDown}
        />
      }
      footer={
        <ModalFooterEWP
          currentModalStage={currentModalStage}
          handleSubmit={handleSubmit}
          handlePrevStage={handlePrevStage}
          handleNextStage={handleNextStage}
          maxStage={maxStage}
          differentKTA={differentKTA}
          isDisabled={isFormDisabled}
          isPat={isPat}
        />
      }
      withoutFooter={currentModalStage < 2 && true}
      widthFullFooter={
        differentKTA && isPat && currentModalStage === maxStage && true
      }
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
              setDifferentKTA={setDifferentKTA}
            />
          ) : (
            currentModalStage === 3 && (
              <ModalBodySummaryPAT
                setCurrentModalStage={setCurrentModalStage}
                isDisabled={isFormDisabled}
                isPat={isPat}
              />
            )
          )
        ) : // End Submodal sumber audit PAT
        // Start Submodal sumber audit Non-PAT
        currentModalStage === 2 ? (
          <ModalBodyScheduleNonPAT
            setCurrentModalStage={setCurrentModalStage}
            isDisabled={isFormDisabled}
          />
        ) : currentModalStage === 3 ? (
          <ModalBodyDocumentNonPAT
            setCurrentModalStage={setCurrentModalStage}
            isDisabled={isFormDisabled}
          />
        ) : (
          currentModalStage === 4 && (
            <ModalBodySummaryNonPAT
              setCurrentModalStage={setCurrentModalStage}
              isDisabled={isFormDisabled}
              isPat={isPat}
            />
          )
        )
        // End Submodal sumber audit Non-PAT
      }
    </Modal>
  );
};

export default ModalAddProjectEWP;

import { ModalScroll } from "@/components/atoms";
import {
  ModalBodySource,
  ModalBodySchedulePAT,
  ModalBodySummaryPAT,
  ModalBodyRelatedProjectNonPAT,
  ModalBodyScheduleNonPAT,
  ModalBodySummaryNonPAT,
} from "./sub-modal";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

const ModalAddProjectEWP = ({
  module,
  showModal,
  payload,
  user,
  currentModalStage,
  setCurrentModalStage,
  isPat,
  maxStage,
  differentPIC,
  validationErrorsSchedulePAT,
  validationErrorsSummaryPAT,
  validationErrorsScheduleNonPAT,
  handleChangePayload,
  handleChangePICPayload,
  handleIsPAT,
  handleSubmitForm,
  handlePrevStage,
  handleNextStage,
  handleCloseModal,
  handleClickRowTableSchedulePAT,
  handleUploadSurat,
}) => {
  const generateProgressItems = () => {
    if (isPat) {
      return [
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
          id: "step-5",
          label: <span>Jadwal</span>,
          percentageComplete: currentModalStage > 2 ? 100 : 0,
          status: currentModalStage === 2 ? "current" : "visited",
        },
        {
          id: "step-6",
          label: <span>Proyek Terkait</span>,
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
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          headerText={`Buat Proyek ${
            currentModalStage > 1 && isPat
              ? " - Sumber P.A.T"
              : currentModalStage > 1 && !isPat
              ? " - Sumber Non-P.A.T"
              : ""
          }`}
          progressItems={progressItems}
          currentModalStage={currentModalStage}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      }
      withoutFooter
    >
      <div>
        {
          currentModalStage === 1 ? (
            <ModalBodySource
              currentModalStage={currentModalStage}
              setCurrentModalStage={setCurrentModalStage}
              handleIsPAT={handleIsPAT}
            />
          ) : isPat ? (
            // Start Submodal sumber audit PAT
            currentModalStage === 2 ? (
              <ModalBodySchedulePAT
                module={module}
                data={payload}
                user={user}
                validationErrors={validationErrorsSchedulePAT}
                setCurrentModalStage={setCurrentModalStage}
                handleChangeData={handleClickRowTableSchedulePAT}
                handleChangeFilter={handleChangePayload}
              />
            ) : (
              currentModalStage === 3 && (
                <ModalBodySummaryPAT
                  module={module}
                  data={payload}
                  validationErrors={validationErrorsSummaryPAT}
                  isPat={isPat}
                  handleChange={handleChangePayload}
                  setCurrentModalStage={setCurrentModalStage}
                />
              )
            )
          ) : // End Submodal sumber audit PAT
          // Start Submodal sumber audit Non-PAT
          currentModalStage === 2 ? (
            <ModalBodyScheduleNonPAT
              data={payload}
              validationErrors={validationErrorsScheduleNonPAT}
              setCurrentModalStage={setCurrentModalStage}
              handleChangePayload={handleChangePayload}
              handleUpload={handleUploadSurat}
            />
          ) : currentModalStage === 3 ? (
            <ModalBodyRelatedProjectNonPAT
              data={payload}
              // validationErrors={validationErrorsDocumentNonPAT}
              setCurrentModalStage={setCurrentModalStage}
            />
          ) : (
            currentModalStage === 4 && (
              <ModalBodySummaryNonPAT
                data={payload}
                isPat={isPat}
                setCurrentModalStage={setCurrentModalStage}
                handleChange={handleChangePayload}
              />
            )
          )
          // End Submodal sumber audit Non-PAT
        }
        <ModalFooter
          data={payload}
          currentModalStage={currentModalStage}
          maxStage={maxStage}
          differentPIC={differentPIC}
          isPat={isPat}
          validation={validationErrorsSummaryPAT}
          handleSubmit={handleSubmitForm}
          handlePrevStage={handlePrevStage}
          handleNextStage={handleNextStage}
          handleChange={handleChangePICPayload}
        />
      </div>
    </ModalScroll>
  );
};

export default ModalAddProjectEWP;

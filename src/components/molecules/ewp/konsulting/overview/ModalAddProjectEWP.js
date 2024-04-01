import { ModalScroll } from "@/components/atoms";
import { useEffect, useState } from "react";
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
import {
  setProjectOverviewData,
  resetProjectOverviewData,
  setValidationErrorsSchedulePAT,
  setValidationErrorsSummaryPAT,
  setValidationErrorsScheduleNonPAT,
  resetValidationErrorsSchedulePAT,
  resetValidationErrorsSummaryPAT,
  resetValidationErrorsScheduleNonPAT,
} from "@/slices/ewp/konsulting/projectOverviewEWPKonsultingSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  schedulePATSchema,
  summaryPATSchema,
  scheduleNonPATSchema,
} from "@/helpers/schemas/ewp/konsulting/overview/projectOverviewEWPKonsultingSchema";
import { confirmationSwal, fetchApi, setErrorValidation } from "@/helpers";
import useUser from "@/data/useUser";
import _ from "lodash";

const ModalAddProjectEWP = ({ showModal, setShowModal, mutate }) => {
  const dispatch = useDispatch();
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isPat, setIsPat] = useState(false);
  const [maxStage, setMaxStage] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [differentPIC, setDifferentPIC] = useState(true);

  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWPKonsulting.projectOverviewData
  );
  const validationErrorsSchedulePAT = useSelector(
    (state) => state.projectOverviewEWPKonsulting.validationErrorsSchedulePAT
  );
  const validationErrorsSummaryPAT = useSelector(
    (state) => state.projectOverviewEWPKonsulting.validationErrorsSummaryPAT
  );
  const validationErrorsScheduleNonPAT = useSelector(
    (state) => state.projectOverviewEWPKonsulting.validationErrorsScheduleNonPAT
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
    },
  };

  const { user } = useUser();

  useEffect(() => {
    if (isPat) {
      setMaxStage(3);
    } else {
      setMaxStage(4);
    }
  }, [isPat]);

  const handleChangeText = (props, value) => {
    dispatch(
      setProjectOverviewData({
        ...projectOverviewData,
        [props]: value,
      })
    );
  };

  const handleChangeSelect = (props, value) => {
    dispatch(
      setProjectOverviewData({
        ...projectOverviewData,
        [props]: value,
      })
    );
  };

  const handleChangePIC = (e) => {
    dispatch(
      setProjectOverviewData({
        ...projectOverviewData,
        pn_approver: e.value.pn,
        nama_approver: e.value.name,
      })
    );
  };

  const handleIsPAT = (value) => {
    setIsPat(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = setErrorValidation(
      projectOverviewData,
      dispatch,
      schemaMappings[isPat][currentModalStage]
    );

    if (validate) {
      const buttonName = e.target.offsetParent.name;
      const data = {
        ...projectOverviewData,
        is_pat: isPat,
        audit_year: !isPat
          ? parseInt(new Date().getFullYear())
          : projectOverviewData.audit_year,
        project_terkait:
          _.map(
            projectOverviewData?.project_terkait,
            ({ project_id, project_name }) => ({ project_id, project_name })
          ) || [],
      };

      if (buttonName === "saveButton" || buttonName === "sendApprovalButton") {
        if (
          isPat &&
          currentModalStage === maxStage &&
          differentPIC &&
          !projectOverviewData?.pn_approver
        ) {
          dispatch(
            setValidationErrorsSummaryPAT({ pn_approver: "Wajib diisi" })
          );
          return;
        }

        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/auditor/create`,
          data
        );
        mutate();
        setShowModal(false);
        setCurrentModalStage(1);
        setIsPat(true);
        dispatch(resetProjectOverviewData());
      }
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

  // [ START ] Handler for change data on sub modal ModalBodySchedule PAT
  const handleClickTableOnModalBodySchedulePAT = (value) => {
    const {
      id,
      name_kegiatan_audit,
      ref_penanggung_jawabs,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      audited,
      createdAt,
      create_by,
      deskripsi,
    } = value;

    const updatedData = {
      ...projectOverviewData,
      project_name: name_kegiatan_audit,
      pat_jadwal_kegiatan_id: id,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      audited,
      deskripsi,
      ref_penanggung_jawabs,
      createdAt,
      create_by,
    };
    dispatch(setProjectOverviewData(updatedData));

    const result = ref_penanggung_jawabs?.find((v) => v?.pn == user?.data?.pn);
    setDifferentPIC(!result);
  };

  const handleChangeFilterYear = (e) => {
    const updatedData = {
      ...projectOverviewData,
      audit_year: e.value,
    };
    dispatch(setProjectOverviewData(updatedData));
  };
  // [ END ] Handler for change data on sub modal ModalBodySchedule PAT

  // [ START ] Handler for change data on sub modal ModalBodyDocument Non-PAT
  const handleUploadSurat = ({ url, fileName }) => {
    dispatch(
      setProjectOverviewData({
        ...projectOverviewData,
        url_file_surat: url,
        nama_file_surat: fileName,
      })
    );
  };
  // [ END ] Handler for change data on sub modal ModalBodyDocument Non-PAT

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
                data={projectOverviewData}
                user={user?.data}
                validationErrors={validationErrorsSchedulePAT}
                isDisabled={isFormDisabled}
                setCurrentModalStage={setCurrentModalStage}
                handleChangeData={handleClickTableOnModalBodySchedulePAT}
                handleChangeFilter={handleChangeFilterYear}
              />
            ) : (
              currentModalStage === 3 && (
                <ModalBodySummaryPAT
                  data={projectOverviewData}
                  validationErrors={validationErrorsSummaryPAT}
                  isDisabled={isFormDisabled}
                  isPat={isPat}
                  handleChange={handleChangeText}
                  setCurrentModalStage={setCurrentModalStage}
                />
              )
            )
          ) : // End Submodal sumber audit PAT
          // Start Submodal sumber audit Non-PAT
          currentModalStage === 2 ? (
            <ModalBodyScheduleNonPAT
              data={projectOverviewData}
              validationErrors={validationErrorsScheduleNonPAT}
              isDisabled={isFormDisabled}
              setCurrentModalStage={setCurrentModalStage}
              handleChangeText={handleChangeText}
              handleChangeSelect={handleChangeSelect}
              handleUpload={handleUploadSurat}
            />
          ) : currentModalStage === 3 ? (
            <ModalBodyRelatedProjectNonPAT
              data={projectOverviewData}
              // validationErrors={validationErrorsDocumentNonPAT}
              isDisabled={isFormDisabled}
              setCurrentModalStage={setCurrentModalStage}
            />
          ) : (
            currentModalStage === 4 && (
              <ModalBodySummaryNonPAT
                data={projectOverviewData}
                isDisabled={isFormDisabled}
                isPat={isPat}
                setCurrentModalStage={setCurrentModalStage}
                handleChange={handleChangeText}
              />
            )
          )
          // End Submodal sumber audit Non-PAT
        }
        <ModalFooter
          data={projectOverviewData}
          currentModalStage={currentModalStage}
          maxStage={maxStage}
          differentPIC={differentPIC}
          isDisabled={isFormDisabled}
          isPat={isPat}
          validation={validationErrorsSummaryPAT}
          handleSubmit={handleSubmit}
          handlePrevStage={handlePrevStage}
          handleNextStage={handleNextStage}
          handleChange={handleChangePIC}
        />
      </div>
    </ModalScroll>
  );
};

export default ModalAddProjectEWP;

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
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import {
  setProjectOverviewData,
  resetProjectOverviewData,
  setValidationErrorsSchedulePAT,
  setValidationErrorsSummaryPAT,
  setValidationErrorsDocumentNonPAT,
  setValidationErrorsScheduleNonPAT,
  resetValidationErrorsSchedulePAT,
  resetValidationErrorsSummaryPAT,
  resetValidationErrorsDocumentNonPAT,
  resetValidationErrorsScheduleNonPAT,
} from "@/slices/ewp/konsulting/projectOverviewEWPKonsultingSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  schedulePATSchema,
  summaryPATSchema,
  scheduleNonPATSchema,
  documentNonPATSchema,
} from "@/helpers/schemas/ewp/konsulting/overview/projectOverviewEWPKonsultingSchema";
import { confirmationSwal, fetchApi, setErrorValidation } from "@/helpers";
import useUser from "@/data/useUser";

const ModalAddProjectEWP = ({ showModal, setShowModal, mutate }) => {
  const dispatch = useDispatch();
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isPat, setIsPat] = useState(true);
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
  const validationErrorsSummaryNonPAT = useSelector(
    (state) => state.projectOverviewEWPKonsulting.validationErrorsSummaryNonPAT
  );

  useEffect(() => {
    console.log("projectOverviewData => ", projectOverviewData);
  }, [projectOverviewData]);

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

    console.log("schemaMappings => ", schemaMappings[isPat][currentModalStage]);
    console.log("isPat => ", isPat);
    console.log("currentModalStage => ", currentModalStage);

    if (validate) {
      const buttonName = e.target.offsetParent.name;
      const data = {
        ...projectOverviewData,
        is_pat: isPat,
        audit_year: !isPat
          ? parseInt(new Date().getFullYear())
          : projectOverviewData.audit_year,
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
        <ModalHeader
          headerText={"Buat Consulting"}
          progressItems={progressItems}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
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
      }
      withoutFooter={currentModalStage < 2}
      widthFullFooter={differentPIC && isPat && currentModalStage === maxStage}
    >
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
            isDisabled={isFormDisabled}
            setCurrentModalStage={setCurrentModalStage}
            handleChangeText={handleChangeText}
            handleChangeSelect={handleChangeSelect}
          />
        ) : currentModalStage === 3 ? (
          <ModalBodyDocumentNonPAT
            data={projectOverviewData}
            isDisabled={isFormDisabled}
            setCurrentModalStage={setCurrentModalStage}
            handleChange={handleChangeText}
            handleUpload={handleUploadSurat}
          />
        ) : (
          currentModalStage === 4 && (
            <ModalBodySummaryNonPAT
              data={projectOverviewData}
              validationErrors={validationErrorsSummaryNonPAT}
              isDisabled={isFormDisabled}
              isPat={isPat}
              setCurrentModalStage={setCurrentModalStage}
              handleChange={handleChangeText}
            />
          )
        )
        // End Submodal sumber audit Non-PAT
      }
    </Modal>
  );
};

export default ModalAddProjectEWP;

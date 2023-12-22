import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import { NavigationTab } from "@/components/molecules/commons";
import {
  ModalGuidelines,
  ModalSelectedTemplateSurvey,
  Sidebar,
  TabInformation,
  TabKuesioner,
} from "@/components/molecules/survey/initiator/buat-template";
import { useSelector } from "react-redux";
import {
  resetPayloadKuesioner,
  resetWorkflowData,
  setHistoryWorkflow,
  setPayloadInformasi,
  setWorkflowData,
  setPayloadKuesioner,
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  resetPayloadInformasi,
  resetHistoryWorkflow,
} from "@/slices/survey/initiator/createSurveySlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  confirmationSwal,
  convertDate,
  errorSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { useWorkflowSurvey } from "@/data/survey/initiator/buat-survey";
import _ from "lodash";
import { workflowSchema } from "@/helpers/schemas/survey/createSurveySchema";
import { ModalWorkflowEWP } from "@/components/molecules/ewp/konvensional/common";
import { LandingLayoutSurvey } from "@/layouts/survey";
import {
  useInformation,
  useKuesioner,
} from "@/data/survey/initiator/informasi";
import useUser from "@/data/useUser";

const index = () => {
  const dispatch = useDispatch();
  const { id, is_approval } = useRouter().query;
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isNewTemplate, setIsNewTemplate] = useState(true);
  const [isDisabledButtonAction, setIsDisabledButtonAction] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isUpdateGuidline, setIsUpdateGuidline] = useState(false);
  const [isRefreshWorkflow, setIsRefreshWorkflow] = useState(false);

  const [currentContentStage, setCurrentContentStage] = useState(1);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [showModalGuidelines, setShowModalGuidelines] = useState(false);
  const [showModalSelectedTemplateSurvey, setShowModalSelectedTemplateSurvey] =
    useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const payloadInformasi = useSelector(
    (state) => state.createSurvey.payloadInformasi
  );
  const payloadKuesioner = useSelector(
    (state) => state.createSurvey.payloadKuesioner
  );
  const workflowData = useSelector((state) => state.createSurvey.workflowData);
  const historyWorkflow = useSelector(
    (state) => state.createSurvey.historyWorkflow
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.createSurvey.validationErrorsWorkflow
  );

  const [navigationTabItems, setNavigationTabItems] = useState([
    { idx: 1, title: "Informasi", isDisabled: false },
    { idx: 2, title: "Kuesioner", isDisabled: true },
  ]);

  const { information, informationError, informationMutate } = useInformation({
    id,
  });
  const { kuesioner, kuesionerError } = useKuesioner({ id });
  const { workflowSurvey, workflowSurveyMutate } = useWorkflowSurvey(
    "project_survey",
    {
      id,
    }
  );
  const { user } = useUser();

  useEffect(() => {
    dispatch(resetWorkflowData());
    dispatch(resetHistoryWorkflow());
  }, []);

  useEffect(() => {
    setIsNewTemplate(id === "new");
  }, [id]);

  useEffect(() => {
    const {
      nama_survey,
      pelaksanaan_start,
      pelaksanaan_end,
      deskripsi,
      jenis_survey_kode,
    } = payloadInformasi;
    const isInformasiComplete =
      nama_survey &&
      pelaksanaan_start &&
      pelaksanaan_end &&
      deskripsi &&
      jenis_survey_kode;

    setNavigationTabItems((prevItems) => [
      { ...prevItems[0], isDisabled: false },
      {
        ...prevItems[1],
        isDisabled: !(isInformasiComplete && !isNewTemplate),
      },
    ]);

    setIsDisabledButtonAction(!isInformasiComplete);
  }, [payloadInformasi, isNewTemplate]);

  useEffect(() => {
    if (is_approval) setShowModalApproval(true);
  }, [is_approval]);

  useEffect(() => {
    if (!informationError) {
      dispatch(
        setPayloadInformasi(
          _.omit(information?.data, [
            "id",
            "create_by",
            "update_by",
            "createdAt",
            "updatedAt",
          ])
        )
      );
    }
    setIsFormDisabled(
      information?.data?.status_persetujuan === "On Approver" ||
        information?.data?.status_persetujuan === "Final" ||
        (information?.data?.create_by?.pn &&
          information?.data?.create_by?.pn !== user?.data?.pn)
    );
  }, [information, user]);

  useEffect(() => {
    if (!kuesionerError && kuesioner?.data?.kategori?.length) {
      const mapping = kuesioner.data.kategori.map((category) => {
        const sortedQuestions = category.template_pertanyaan.sort(
          (a, b) => a.tipe_pertanyaan_kode - b.tipe_pertanyaan_kode
        );

        return {
          id: category.kategori_id,
          name: category.kategori_name,
          pertanyaan: sortedQuestions?.length
            ? sortedQuestions.map((question) => {
                return {
                  id: question.pertanyaan_id,
                  guideline: question.guideline,
                  tipe_pertanyaan_kode: question.tipe_pertanyaan_kode,
                  tipe_pertanyaan_name: question.tipe_pertanyaan_name,
                  uraian: question.uraian,
                  is_need_deskripsi: false,
                  bobot: question.bobot,
                  jawaban: question.template_jawaban.length
                    ? question.template_jawaban.map((answer) => {
                        return {
                          jawaban_id: answer.jawaban_id,
                          bobot: answer.bobot,
                          text: answer.text,
                        };
                      })
                    : [],
                };
              })
            : [],
        };
      });

      dispatch(setPayloadKuesioner(mapping));
    } else {
      dispatch(resetPayloadKuesioner());
    }
  }, [kuesioner]);

  useEffect(() => {
    let templateName = "Informasi";

    if (currentContentStage !== 1) {
      templateName = "Template Kuesioner";
    }

    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "Survei", path: "/survey" },
      { name: "Overview", path: "/survey/initiator/overview" },
      {
        name: `Buat Survei / ${templateName}`,
        path: `/survey/initiator/overview/${id}`,
      },
    ]);
  }, [currentContentStage]);

  useEffect(() => {
    const workflowInfo = workflowSurvey?.data?.info;
    const maker = workflowSurvey?.data?.initiator;
    const approvers = workflowSurvey?.data?.approver;

    const newWorkflowData = {
      ...workflowData,
      status_approver: workflowInfo?.status_persetujuan,
      on_approver: workflowInfo?.status_approver,
    };

    newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.fullName}`;
    newWorkflowData.maker = maker;

    newWorkflowData.ref_tim_audit_approver = approvers?.length
      ? approvers.map(({ pn, nama, is_signed }) => ({ pn, nama, is_signed }))
      : [];

    if (workflowSurvey?.data?.log?.length) {
      const mapping = workflowSurvey?.data?.log?.map((v) => {
        return {
          "P.I.C": v?.from?.pn + " - " + v?.from?.nama,
          Alasan: v?.note,
          Status:
            v?.is_signed === true
              ? "Approved"
              : v?.is_signed === false
              ? "Rejected"
              : "",
          Tanggal: convertDate(v?.createdAt, "-", "d"),
        };
      });
      dispatch(setHistoryWorkflow(mapping));
    }

    dispatch(setWorkflowData(newWorkflowData));
    setIsRefreshWorkflow(false);
  }, [workflowSurvey, isRefreshWorkflow]);

  // [ START ] Handler for content stage informasi
  const handleChangeFormInformasi = (property, value) => {
    let updatedData;
    switch (property) {
      case "jenis_survey":
        updatedData = {
          ...payloadInformasi,
          jenis_survey_kode: value.value.kode,
          jenis_survey_name: value.value.nama,
        };
        break;
      case "ref_template":
        updatedData = {
          ...payloadInformasi,
          ref_template_id: value.value.id,
          ref_template_name: value.value.judul,
          ref_template_desc: value.value.deskripsi,
        };
        break;
      default:
        updatedData = {
          ...payloadInformasi,
          [property]: value,
        };
        break;
    }
    dispatch(setPayloadInformasi(updatedData));
  };

  const handleClickKuesioner = () => {
    setCurrentContentStage(2);
  };

  const handleClickResponden = () => {
    router.push(`/survey/initiator/overview/${id}/responden`);
  };

  const handleSaveInformation = async () => {
    const message = isNewTemplate
      ? "Apakah anda yakin ingin membuat survey?"
      : "Apakah anda yakin ingin melakukan perubahan informasi pada survey ini?";

    const confirm = await confirmationSwal(message);
    if (!confirm.value) {
      return;
    }

    loadingSwal();

    const apiPayload = isNewTemplate
      ? payloadInformasi
      : { ...payloadInformasi, id };

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey`,
      apiPayload
    ).then((res) => {
      if (isNewTemplate) {
        router.push(`/survey/initiator/overview/${res?.data?.id}`);
      }
    });

    dispatch(resetPayloadInformasi());
    setShowModalSelectedTemplateSurvey(false);
    loadingSwal("close");
  };

  const handleOpenModalSelectedTemplateSurvey = () => {
    setShowModalSelectedTemplateSurvey(true);
  };

  const handleCloseModalSelectedTemplateSurvey = () => {
    setShowModalSelectedTemplateSurvey(false);
  };
  // [ END ] Handler for content stage informasi

  // [ START ] Handler for modal guidelines
  const handleClickOpenModalGuidelines = (
    indexCategory,
    indexQuestion,
    isModalUpdate
  ) => {
    setSelectedCategoryIndex(indexCategory);
    setSelectedQuestionIndex(indexQuestion);
    if (isModalUpdate) {
      setIsUpdateGuidline(true);
    } else {
      setShowModalGuidelines(true);
    }
  };

  const handleCloseModalGuidelines = () => {
    setShowModalGuidelines(false);
    setIsUpdateGuidline(false);
  };
  // [ END ] Handler for modal guidelines

  // [ START ] Handler for modal approval
  const handleClickOpenModalApproval = () => {
    setShowModalApproval(true);
  };

  const handleCloseModalApproval = () => {
    dispatch(resetHistoryWorkflow());
    dispatch(resetWorkflowData());
    setIsRefreshWorkflow(true);
  };

  const handleAdd = (property) => {
    const newData = [...workflowData[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = [...workflowData[property]];
    newData.splice(idx, 1);
    dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
  };

  const handleChangeText = (property, value) => {
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: value,
      })
    );
  };

  const handleChangeSelect = (property, index, e) => {
    const newData = [...workflowData[property]];
    const updated = { ...newData[index] };
    updated["pn"] = e?.value?.pn;
    updated["nama"] = e?.value?.name;
    newData[index] = updated;
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: newData,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowSchema,
      resetErrors: resetValidationErrorsWorkflow,
      setErrors: setValidationErrorsWorkflow,
    };
    const validate = setErrorValidation(workflowData, dispatch, schemaMapping);

    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "project_survey",
        sub_modul_id: id,
      };

      const signedCount = workflowData?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      switch (actionType) {
        case "change":
          data.approvers = workflowData.ref_tim_audit_approver;
          break;
        case "create":
          data.approvers = workflowData.ref_tim_audit_approver;
          break;
        case "reject":
          if (!workflowData.note) {
            await errorSwal("Silahkan berikan alasan!");
            return;
          }
          data.note = workflowData.note;
          break;
        case "approve":
          if (signedCount >= workflowData?.ref_tim_audit_approver?.length) {
            data.data = "<p>pirli test</p>";
          }
          data.note = workflowData.note;
          break;
      }

      if (actionType === "reset") {
        const confirm = await confirmationSwal(
          "Terkait dengan workflow ini, apakah Anda yakin ingin melakukan pengaturan ulang?"
        );
        if (!confirm.value) {
          return;
        }
      }

      if (actionType === "change") {
        const response = await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow/change`,
          data
        );
        if (!response.isDismissed) return;
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow/${actionType}`,
          data
        );
      }

      informationMutate();
      workflowSurveyMutate();
      dispatch(resetWorkflowData());
      setShowModalApproval(false);
    }
    workflowSurveyMutate();
  };
  // [ END ] Handler for modal approval

  return (
    <LandingLayoutSurvey overflowY={true}>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <PageTitle
              text={
                currentContentStage === 1
                  ? "Buat Survei"
                  : "Preview Template Kuesioner"
              }
            />
          </div>
          <div className="w-full flex justify-between">
            <NavigationTab
              items={navigationTabItems}
              currentStage={currentContentStage}
              setCurrentStage={setCurrentContentStage}
            />
            {/* {currentContentStage === 2 && (
              <div className="bg-atlasian-purple h-fit w-44 rounded">
                <ButtonField
                  text={"Pertanyaan Tambahan"}
                  handler={() => console.log("test")}
                />
              </div>
            )} */}
          </div>
          {currentContentStage === 1 ? (
            <TabInformation
              isNewTemplate={isNewTemplate}
              isDisabledPickTemplate={isDisabledButtonAction}
              isFormDisabled={isFormDisabled}
              handleChangeForm={handleChangeFormInformasi}
              handleClickAddKuesioner={handleClickKuesioner}
              handleOpenModalSelectedTemplateSurvey={
                handleOpenModalSelectedTemplateSurvey
              }
              handleSaveInformation={handleSaveInformation}
              handleClickOpenModalApproval={handleClickOpenModalApproval}
              handleClickResponden={handleClickResponden}
            />
          ) : (
            <TabKuesioner
              data={payloadKuesioner}
              isPreviewPage={true}
              isDisabledForm={true}
              handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
            />
          )}
        </div>
      </div>
      {currentContentStage === 2 ? (
        <Sidebar
          data={payloadKuesioner}
          isPreviewPage={true}
          isDisabledForm={true}
        />
      ) : (
        ""
      )}
      <ModalWorkflowEWP
        workflowData={workflowData}
        historyWorkflow={historyWorkflow}
        validationErrors={validationErrorsWorkflow}
        setShowModal={setShowModalApproval}
        showModal={showModalApproval}
        headerTitle={"Approval Survey"}
        handleChange={handleChangeText}
        handleChangeSelect={handleChangeSelect}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModalApproval}
        widthHeader={`w-[42rem]`}
        withoutSigner={true}
      />
      <ModalGuidelines
        showModal={showModalGuidelines}
        handleCloseModal={handleCloseModalGuidelines}
        isUpdate={isUpdateGuidline}
        data={
          payloadKuesioner[selectedCategoryIndex]?.pertanyaan[
            selectedQuestionIndex
          ]?.guideline
        }
      />
      <ModalSelectedTemplateSurvey
        showModal={showModalSelectedTemplateSurvey}
        handleCloseModal={handleCloseModalSelectedTemplateSurvey}
        handleSubmit={handleSaveInformation}
        handleChangeForm={handleChangeFormInformasi}
      />
      {/* End Content */}
    </LandingLayoutSurvey>
  );
};

export default index;

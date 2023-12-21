import { Breadcrumbs, PageTitle } from "@/components/atoms";
import LayoutSurveyReference from "@/layouts/reference/LayoutSurveyReference";
import { useEffect, useState } from "react";
import { NavigationTab } from "@/components/molecules/commons";
import {
  ModalAddQuestion,
  ModalGuidelines,
  Sidebar,
  TabInformation,
  TabKuesioner,
} from "@/components/molecules/reference/survey/buat-template";
import { useSelector } from "react-redux";
import {
  resetWorkflowData,
  resetPayloadKuesioner,
  resetPayloadPertanyaan,
  resetValidationErrorsWorkflow,
  resetHistoryWorkflow,
  setDataCategory,
  setWorkflowData,
  setPayloadInformasi,
  setPayloadKuesioner,
  setPayloadPertanyaan,
  setValidationErrorsWorkflow,
  setHistoryWorkflow,
} from "@/slices/reference/createTemplateReferenceSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  confirmationSwal,
  convertDate,
  errorSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  successSwal,
} from "@/helpers";
import {
  useInformation,
  useKuesioner,
  useWorkflow,
} from "@/data/reference/admin-survey/informasi";
import _ from "lodash";
import { useCategory } from "@/data/reference/admin-survey/kuesioner";
import { workflowSchema } from "@/helpers/schemas/reference/adminSurveiSchema";
import { ModalWorkflowEWP } from "@/components/molecules/ewp/konvensional/common";
import useUser from "@/data/useUser";

const index = () => {
  const dispatch = useDispatch();
  const { id, is_approval } = useRouter().query;
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isNewTemplate, setIsNewTemplate] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isUnderChange, setIsUnderChange] = useState(false);
  const [isUpdateGuidline, setIsUpdateGuidline] = useState(false);
  const [isApprovalFinal, setIsApprovalFinal] = useState(false);
  const [isRefreshWorkflow, setIsRefreshWorkflow] = useState(false);

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [
    currentContentModalAddQuestionStage,
    setCurrentContentModalAddQuestionStage,
  ] = useState(1);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [showModalAddQuestion, setShowModalAddQuestion] = useState(false);
  const [showModalGuidelines, setShowModalGuidelines] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const payloadInformasi = useSelector(
    (state) => state.createTemplateReference.payloadInformasi
  );
  const dataCategory = useSelector(
    (state) => state.createTemplateReference.dataCategory
  );
  const payloadKuesioner = useSelector(
    (state) => state.createTemplateReference.payloadKuesioner
  );
  const payloadPertanyaan = useSelector(
    (state) => state.createTemplateReference.payloadPertanyaan
  );
  const workflowData = useSelector(
    (state) => state.createTemplateReference.workflowData
  );
  const historyWorkflow = useSelector(
    (state) => state.createTemplateReference.historyWorkflow
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.createTemplateReference.validationErrorsWorkflow
  );

  const [navigationTabItems, setNavigationTabItems] = useState([
    { idx: 1, title: "Informasi", isDisabled: false },
    { idx: 2, title: "Kuesioner", isDisabled: true },
  ]);

  const { category, categoryMutate } = useCategory({ id });
  const { information, informationError, informationMutate } = useInformation({
    id,
  });
  const { kuesioner, kuesionerMutate, kuesionerError } = useKuesioner({ id });
  const { workflow, workflowMutate } = useWorkflow({
    sub_modul: "template_survey",
    sub_modul_id: id,
  });
  const { user } = useUser();

  useEffect(() => {
    dispatch(resetWorkflowData());
    dispatch(resetHistoryWorkflow());
  }, []);

  useEffect(() => {
    setIsNewTemplate(id === "new");
  }, [id]);

  useEffect(() => {
    if (is_approval) setShowModalApproval(true);
  }, [is_approval]);

  useEffect(() => {
    if (!informationError) {
      dispatch(
        setPayloadInformasi(
          _.pick(information?.data, [
            "judul",
            "deskripsi",
            "project_template_id",
            "jenis_survey_kode",
            "jenis_survey_name",
          ])
        )
      );

      setIsApprovalFinal(information?.data?.status_persetujuan === "Final");
    }
    setIsFormDisabled(
      information?.data?.status_persetujuan === "On Approver" ||
        information?.data?.status_persetujuan === "Final" ||
        (information?.data?.create_by?.pn &&
          information?.data?.create_by?.pn !== user?.data?.pn)
    );
  }, [information, user]);

  useEffect(() => {
    if (!kuesionerError && kuesioner?.data?.length) {
      const mapping = kuesioner.data.map((category) => {
        return {
          id: category.id,
          template_id: category.template_id,
          name: category.name,
          pertanyaan: category.template_pertanyaan.length
            ? category.template_pertanyaan.map((question) => {
                return {
                  id: question.id,
                  template_id: question.template_id,
                  guideline: question.guideline,
                  tipe_pertanyaan_kode: question.tipe_pertanyaan_kode,
                  tipe_pertanyaan_name: question.tipe_pertanyaan_name,
                  uraian: question.uraian,
                  is_need_deskripsi: question.is_need_deskripsi,
                  bobot: question.bobot,
                  jawaban: question.template_jawaban.length
                    ? question.template_jawaban.map((answer) => {
                        return {
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
    const { judul, deskripsi, jenis_survey_kode } = payloadInformasi;
    const isInformasiComplete = judul && deskripsi && jenis_survey_kode;

    setNavigationTabItems((prevItems) => [
      { ...prevItems[0], isDisabled: false },
      {
        ...prevItems[1],
        isDisabled: !(isInformasiComplete && !isNewTemplate),
      },
    ]);

    setIsDisabled(!isInformasiComplete);
  }, [payloadInformasi, isNewTemplate]);

  useEffect(() => {
    let templateName = "Buat Form / Informasi";

    if (currentContentStage !== 1) {
      templateName = "Kuesioner";
    }

    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "Reference", path: "/reference" },
      { name: "Form Survei", path: "/reference/survey/overview" },
      {
        name: templateName,
        path: `/reference/survey/overview/${id}`,
      },
    ]);
  }, [currentContentStage]);

  useEffect(() => {
    const workflowInfo = workflow?.data?.info;
    const maker = workflow?.data?.initiator;
    const approvers = workflow?.data?.approver;

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

    if (workflow?.data?.log?.length) {
      const mapping = workflow?.data?.log?.map((v) => {
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
  }, [workflow, isRefreshWorkflow]);

  const handleUnderChange = () => {
    if (!isUnderChange) setIsUnderChange(true);
  };

  const handleSaveKuesioner = async () => {
    loadingSwal();
    const payload = {
      template_id: id,
      pertanyaan: payloadKuesioner.flatMap((kategori) => {
        return kategori.pertanyaan.map((pertanyaan) => ({
          template_id: pertanyaan.template_id,
          kategori_pertanyaan_id: kategori.id,
          guideline: pertanyaan.guideline,
          uraian: pertanyaan.uraian,
          tipe_pertanyaan_kode: pertanyaan.tipe_pertanyaan_kode,
          tipe_pertanyaan_name: pertanyaan.tipe_pertanyaan_name,
          is_need_deskripsi: pertanyaan.is_need_deskripsi,
          bobot: pertanyaan.bobot,
          jawaban: pertanyaan.jawaban.map((jawaban) => ({
            bobot: jawaban.bobot,
            text: jawaban.text,
          })),
        }));
      }),
    };
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/kuesioner`,
      payload
    );
    setIsUnderChange(false);
    categoryMutate();
    kuesionerMutate();
    loadingSwal("close");
  };

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

  const handleClickFormula = () => {
    router.push(`${id}/rumus`);
  };

  const handleMutateCategory = () => {
    categoryMutate();
  };

  const handleSaveInformation = async () => {
    const message = isNewTemplate
      ? "Apakah anda yakin ingin membuat template survey?"
      : "Apakah anda yakin ingin melakukan perubahan informasi pada template survey ini?";

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
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey`,
      apiPayload
    ).then((res) => {
      if (isNewTemplate) {
        router.push(`${res?.data?.id}`);
      }
    });

    loadingSwal("close");
  };
  // [ END ] Handler for content stage informasi

  // [ START ] Handler for category
  const handleAddCategory = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/kategori_pertanyaan`,
      { template_id: id }
    );

    categoryMutate();
    kuesionerMutate();
    handleUnderChange();
    loadingSwal("close");
  };

  const handleUpdateCategory = async (index, data) => {
    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/kategori_pertanyaan/update/${data.id}`,
      { name: data.name }
    );

    categoryMutate();
    kuesionerMutate();
    handleUnderChange();
    handleOnEditCategory(index, false);
    loadingSwal("close");
  };

  const handleDeleteCategory = async (category_id) => {
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/kategori_pertanyaan/${category_id}`
    );
    categoryMutate();
    kuesionerMutate();
    handleUnderChange();
    loadingSwal("close");
  };

  const handleOnEditCategory = (idx, value) => {
    const newData = [...dataCategory];
    const updated = { ...newData[idx], onEdit: value };
    newData[idx] = updated;
    dispatch(setDataCategory(newData));
    handleUnderChange();
  };

  const handleChangeNameCategory = (idx, value) => {
    const newData = [...dataCategory];
    const updated = { ...newData[idx], name: value };
    newData[idx] = updated;
    dispatch(setDataCategory(newData));
    handleUnderChange();
  };
  // [ END ] Handler for category

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
      setShowModalAddQuestion(true);
      setCurrentContentModalAddQuestionStage(2);

      dispatch(
        setPayloadPertanyaan({
          ...payloadPertanyaan,
          guideline:
            payloadKuesioner[indexCategory]?.pertanyaan[indexQuestion]
              ?.guideline,
        })
      );
    } else {
      setShowModalGuidelines(true);
    }
  };

  const handleCloseModalGuidelines = () => {
    setShowModalGuidelines(false);
    setIsUpdateGuidline(false);
  };

  const handleSubmitModalGuidelines = (value) => {
    handleChangeQuestion(
      selectedCategoryIndex,
      selectedQuestionIndex,
      "guideline",
      value
    );
    handleCloseModalGuidelines();
    setSelectedCategoryIndex(0);
    setSelectedQuestionIndex(0);
  };
  // [ END ] Handler for modal guidelines

  // [ START ] Handler for modal add question
  const handleSetCurrentModalAddQuestionStage = (index) => {
    setCurrentContentModalAddQuestionStage(index);
  };

  const handleClickOpenModalAddQuestion = (indexCategory) => {
    setShowModalAddQuestion(true);
    setSelectedCategoryIndex(indexCategory);
  };

  const handleCloseModalAddQuestion = () => {
    setShowModalAddQuestion(false);
    setIsUpdateGuidline(false);
    dispatch(resetPayloadPertanyaan());
  };

  const handleChangePayloadQuestion = (property, value) => {
    const updatedData = {
      ...payloadPertanyaan,
      template_id: id,
    };

    switch (property) {
      case "tipe_pertanyaan":
        updatedData.tipe_pertanyaan_kode = value.kode;
        updatedData.tipe_pertanyaan_name = value.name;
        break;
      default:
        updatedData[property] = value;
        break;
    }

    dispatch(setPayloadPertanyaan(updatedData));
    handleUnderChange();
  };

  const handleSubmitButtonAddQuestion = async () => {
    const newCategory = JSON.parse(JSON.stringify(payloadKuesioner));
    const newQuestion = [...newCategory[selectedCategoryIndex].pertanyaan];
    if (isUpdateGuidline) {
      newQuestion[selectedQuestionIndex].guideline =
        payloadPertanyaan.guideline;
    } else {
      if (!isUpdateGuidline && !payloadPertanyaan.tipe_pertanyaan_kode) {
        await errorSwal("Jenis pertanyaan wajib diisi!");
        return;
      }
      newQuestion.push(payloadPertanyaan);
    }

    newCategory[selectedCategoryIndex] = {
      ...newCategory[selectedCategoryIndex],
      pertanyaan: newQuestion,
    };
    dispatch(setPayloadKuesioner(newCategory));
    dispatch(resetPayloadPertanyaan());
    setShowModalAddQuestion(false);
    setIsUpdateGuidline(false);
    handleUnderChange();
    await successSwal("Berhasil menambahkan pertanyaan");
  };

  // [ END ] Handler for modal add question

  // [ START ] Handler for question
  const handleChangeQuestion = (
    indexCategory,
    indexQuestion,
    property,
    value
  ) => {
    const newCategory = [...payloadKuesioner];
    const newQuestion = [...newCategory[indexCategory].pertanyaan];

    newQuestion[indexQuestion] = {
      ...newQuestion[indexQuestion],
      [property]: value,
    };

    newCategory[indexCategory] = {
      ...newCategory[indexCategory],
      pertanyaan: newQuestion,
    };
    dispatch(setPayloadKuesioner(newCategory));
    handleUnderChange();
  };

  const handleDeleteQuestion = (indexCategory, indexQuestion) => {
    const newCategory = [...payloadKuesioner];
    const newQuestion = [...newCategory[indexCategory].pertanyaan];

    newQuestion.splice(indexQuestion, 1);

    newCategory[indexCategory] = {
      ...newCategory[indexCategory],
      pertanyaan: newQuestion,
    };
    dispatch(setPayloadKuesioner(newCategory));
    handleUnderChange();
  };
  // [ END ] Handler for question

  // [ START ] Handler for answer
  const handleChangeAnswer = (
    idxCategory,
    idxQuestion,
    indexAnswer,
    property,
    value
  ) => {
    const newCategory = [...payloadKuesioner];
    const newQuestion = [...newCategory[idxCategory].pertanyaan];
    const newAnswer = [...newQuestion[idxQuestion].jawaban];

    newAnswer[indexAnswer] = {
      ...newAnswer[indexAnswer],
      [property]: value,
    };

    newQuestion[idxQuestion] = {
      ...newQuestion[idxQuestion],
      jawaban: newAnswer,
    };

    newCategory[idxCategory] = {
      ...newCategory[idxCategory],
      pertanyaan: newQuestion,
    };

    dispatch(setPayloadKuesioner(newCategory));
    handleUnderChange();
  };

  const handleAddAnswer = (idxCategory, idxQuestion) => {
    const newCategory = [...payloadKuesioner];
    const newQuestion = [...newCategory[idxCategory].pertanyaan];
    const newAnswer = [...newQuestion[idxQuestion].jawaban];

    newAnswer.push({
      bobot: 0,
      text: "",
    });

    newQuestion[idxQuestion] = {
      ...newQuestion[idxQuestion],
      jawaban: newAnswer,
    };

    newCategory[idxCategory] = {
      ...newCategory[idxCategory],
      pertanyaan: newQuestion,
    };

    dispatch(setPayloadKuesioner(newCategory));
    handleUnderChange();
  };

  const handleDeleteAnswer = (indexCategory, indexQuestion, indexAnswer) => {
    const newCategory = [...payloadKuesioner];
    const newQuestions = [...newCategory[indexCategory].pertanyaan];
    const newAnswers = [...newQuestions[indexQuestion].jawaban];

    newAnswers.splice(indexAnswer, 1);

    newQuestions[indexQuestion] = {
      ...newQuestions[indexQuestion],
      jawaban: newAnswers,
    };

    newCategory[indexCategory] = {
      ...newCategory[indexCategory],
      pertanyaan: newQuestions,
    };

    dispatch(setPayloadKuesioner(newCategory));
    handleUnderChange();
  };
  // [ END ] Handler for answer

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
        sub_modul: "template_survey",
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
          `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/workflow/change`,
          data
        );
        console.log("response => ", response);
        if (!response.isDismissed) return;
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/workflow/${actionType}`,
          data
        );
      }

      informationMutate();
      workflowMutate();
      dispatch(resetWorkflowData());
      dispatch(resetHistoryWorkflow());
      setShowModalApproval(false);
    }
    workflowMutate();
  };
  // [ END ] Handler for modal approval

  return (
    <LayoutSurveyReference>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <PageTitle text={"Template Kuesioner Overview"} />
          </div>
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            setCurrentStage={setCurrentContentStage}
          />
          {currentContentStage === 1 ? (
            <TabInformation
              isNewTemplate={isNewTemplate}
              isDisabled={isDisabled}
              isFormDisabled={isFormDisabled}
              isApprovalFinal={isApprovalFinal}
              handleChangeForm={handleChangeFormInformasi}
              handleClickAddKuesioner={handleClickKuesioner}
              handleSubmit={handleSaveInformation}
              handleClickOpenModalApproval={handleClickOpenModalApproval}
              handleClickFormula={handleClickFormula}
            />
          ) : (
            <TabKuesioner
              isPreviewPage={false}
              isDisabledForm={isFormDisabled}
              isApprovalFinal={isApprovalFinal}
              handleChangeQuestion={handleChangeQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
              handleChangeAnswer={handleChangeAnswer}
              handleAddAnswer={handleAddAnswer}
              handleDeleteAnswer={handleDeleteAnswer}
              handleClickOpenModalAddQuestion={handleClickOpenModalAddQuestion}
              handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
            />
          )}
        </div>
      </div>
      {currentContentStage === 2 ? (
        <Sidebar
          data={category}
          isUnderChange={isUnderChange}
          isPreviewPage={isFormDisabled}
          handleAddCategory={handleAddCategory}
          handleMutateData={handleMutateCategory}
          handleUpdateCategory={handleUpdateCategory}
          handleDeleteCategory={handleDeleteCategory}
          handleOnEditCategory={handleOnEditCategory}
          handleChangeNameCategory={handleChangeNameCategory}
          handleSaveKuesioner={handleSaveKuesioner}
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
        headerTitle={"Approval Template Survey"}
        handleChange={handleChangeText}
        handleChangeSelect={handleChangeSelect}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModalApproval}
        widthHeader={`w-[42rem]`}
        withoutSigner={true}
      />
      <ModalAddQuestion
        data={payloadPertanyaan}
        showModal={showModalAddQuestion}
        currentContentStage={currentContentModalAddQuestionStage}
        isUpdateModal={isUpdateGuidline}
        handleChangeCurrentContentStage={handleSetCurrentModalAddQuestionStage}
        handleCloseModal={handleCloseModalAddQuestion}
        handleSubmit={handleSubmitButtonAddQuestion}
        handleChangePayloadQuestion={handleChangePayloadQuestion}
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
        handleSubmit={handleSubmitModalGuidelines}
      />
      {/* End Content */}
    </LayoutSurveyReference>
  );
};

export default index;

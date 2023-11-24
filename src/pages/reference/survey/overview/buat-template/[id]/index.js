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
  resetPayloadKuesioner,
  resetPayloadPertanyaan,
  setDataCategory,
  setPayloadInformasi,
  setPayloadKuesioner,
  setPayloadPertanyaan,
} from "@/slices/reference/createTemplateReferenceSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { errorSwal, fetchApi, loadingSwal, successSwal } from "@/helpers";
import {
  useInformation,
  useKuesioner,
} from "@/data/reference/admin-survey/informasi";
import _ from "lodash";
import { useCategory } from "@/data/reference/admin-survey/kuesioner";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isNewTemplate, setIsNewTemplate] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isUnderChange, setIsUnderChange] = useState(false);
  const [isUpdateGuidline, setIsUpdateGuidline] = useState(false);
  const [currentContentStage, setCurrentContentStage] = useState(1);

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

  const [navigationTabItems, setNavigationTabItems] = useState([
    { idx: 1, title: "Informasi", isDisabled: false },
    { idx: 2, title: "Kuesioner", isDisabled: true },
  ]);

  const { category, categoryMutate } = useCategory({ id });
  const { information, informationError } = useInformation({ id });
  const { kuesioner, kuesionerMutate, kuesionerError } = useKuesioner({ id });

  useEffect(() => {
    setIsNewTemplate(id === "new");
  }, [id]);

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
    }
  }, [information]);

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
    console.log("ke trigger");
  }, [kuesioner]);

  useEffect(() => {
    const { judul, deskripsi, jenis_survey_kode } = payloadInformasi;
    const isInformasiComplete = judul && deskripsi && jenis_survey_kode;

    setNavigationTabItems((prevItems) => [
      { ...prevItems[0], isDisabled: false },
      {
        ...prevItems[1],
        isDisabled: !isInformasiComplete || isNewTemplate,
      },
    ]);

    setIsFormDisabled(!isInformasiComplete);
  }, [payloadInformasi]);

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
        path: "/reference/survey/buat-template",
      },
    ]);
  }, [currentContentStage]);

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

  const handleMutateCategory = () => {
    categoryMutate();
  };

  const handleSaveInformation = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey`,
      payloadInformasi
    ).then((res) => router.push(`${res?.data?.id}`));
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
    setShowModalGuidelines(true);
    setSelectedCategoryIndex(indexCategory);
    setSelectedQuestionIndex(indexQuestion);
    if (isModalUpdate) setIsUpdateGuidline(true);
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
  const handleClickOpenModalAddQuestion = (indexCategory) => {
    setShowModalAddQuestion(true);
    setSelectedCategoryIndex(indexCategory);
  };

  const handleCloseModalAddQuestion = () => {
    setShowModalAddQuestion(false);
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
    if (!payloadPertanyaan.tipe_pertanyaan_kode) {
      await errorSwal("Jenis pertanyaan wajib diisi!");
    }

    const newCategory = [...payloadKuesioner];
    const newQuestion = [...newCategory[selectedCategoryIndex].pertanyaan];
    newQuestion.push(payloadPertanyaan);
    newCategory[selectedCategoryIndex] = {
      ...newCategory[selectedCategoryIndex],
      pertanyaan: newQuestion,
    };
    dispatch(setPayloadKuesioner(newCategory));
    dispatch(resetPayloadPertanyaan());
    setShowModalAddQuestion(false);
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

  // useEffect(() => {
  //   console.log("payload kuesioner => ", payloadKuesioner);
  // }, [payloadKuesioner]);

  // useEffect(() => {
  //   console.log("payload pertanyaan => ", payloadPertanyaan);
  // }, [payloadPertanyaan]);

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
              isFormDisabled={isFormDisabled}
              handleChangeForm={handleChangeFormInformasi}
              handleClickAddKuesioner={handleClickKuesioner}
              handleSubmit={handleSaveInformation}
            />
          ) : (
            <TabKuesioner
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
      <ModalAddQuestion
        data={payloadPertanyaan}
        showModal={showModalAddQuestion}
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

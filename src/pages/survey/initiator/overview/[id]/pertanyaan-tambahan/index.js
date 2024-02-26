import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import {
  ModalAddQuestion,
  ModalGuidelines,
} from "@/components/molecules/survey/initiator/buat-template";
import {
  Sidebar,
  TabKuesioner,
} from "@/components/molecules/survey/initiator/pertanyaan-tambahan";
import { useSelector, useDispatch } from "react-redux";
import {
  setPayloadKuesioner,
  setPayloadPertanyaan,
  setValidationErrorsKuesioner,
  resetPayloadKuesioner,
  resetPayloadPertanyaan,
  resetValidationErrorsKuesioner,
} from "@/slices/survey/initiator/additionalQuestionSlice";
import { useRouter } from "next/router";
import {
  confirmationSwal,
  errorSwal,
  errorSwalTimeout,
  fetchApi,
  infoSwal,
  loadingSwal,
  successSwal,
} from "@/helpers";
import { LandingLayoutSurvey } from "@/layouts/survey";
import {
  useInformation,
  useKuesioner,
} from "@/data/survey/initiator/informasi";
import { useAdditionalQuestionsFromRedis } from "@/data/survey/initiator/pertanyaan-tambahan";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Survei", path: "/survey" },
    { name: "Overview", path: "/survey/initiator/overview" },
    {
      name: `Buat Survei / Template Kuesioner`,
      path: `/survey/initiator/overview/${id}`,
    },
    {
      name: `Pertanyaan Tambahan`,
      path: `/survey/initiator/overview/${id}/pertanyaan-tambahan`,
    },
  ];

  const [dataCategory, setDataCategory] = useState([]);
  const [isUnderChange, setIsUnderChange] = useState(false);
  const [isUpdateGuidline, setIsUpdateGuidline] = useState(false);
  const [
    currentContentModalAddQuestionStage,
    setCurrentContentModalAddQuestionStage,
  ] = useState(1);

  const [showModalAddQuestion, setShowModalAddQuestion] = useState(false);
  const [showModalGuidelines, setShowModalGuidelines] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const payloadPertanyaan = useSelector(
    (state) => state.additionalQuestionSurvey.payloadPertanyaan
  );
  const payloadKuesioner = useSelector(
    (state) => state.additionalQuestionSurvey.payloadKuesioner
  );
  const validationErrorsKuesioner = useSelector(
    (state) => state.additionalQuestionSurvey.validationErrorsKuesioner
  );

  const { information } = useInformation({
    id,
  });
  const { kuesioner, kuesionerError, kuesionerMutate } = useKuesioner({ id });
  const { additionalQuestionsFromRedis, additionalQuestionsFromRedisMutate } =
    useAdditionalQuestionsFromRedis({ id });

  useEffect(() => {
    if (!kuesionerError && kuesioner?.data?.kategori?.length) {
      const mapping = kuesioner.data.kategori.map((category) => {
        const matchingRedisItem = additionalQuestionsFromRedis?.data?.find(
          (redisItem) => redisItem.id === category.kategori_id
        );
        return {
          id: category.kategori_id,
          name: category.kategori_name,
          is_default: category.is_default,
          pertanyaan:
            information?.data?.status_persetujuan === "On Progress"
              ? matchingRedisItem?.pertanyaan?.length
                ? matchingRedisItem.pertanyaan
                : category.template_pertanyaan?.length
                ? category.template_pertanyaan.map((question) => {
                    return {
                      id: question.pertanyaan_id,
                      guideline: question.guideline,
                      tipe_pertanyaan_kode: question.tipe_pertanyaan_kode,
                      tipe_pertanyaan_name: question.tipe_pertanyaan_name,
                      uraian: question.uraian,
                      is_need_deskripsi: question.is_need_deskripsi,
                      bobot: question.bobot,
                      is_default: question.is_default,
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
                : []
              : [],
        };
      });

      dispatch(setPayloadKuesioner(mapping));
    } else {
      dispatch(resetPayloadKuesioner());
    }
  }, [kuesioner, additionalQuestionsFromRedis, information]);

  useEffect(() => {
    if (payloadKuesioner?.length) {
      let kategoriCount = 0;
      let tambahanCount = 0;
      const total_pertanyaan_all_kategori = payloadKuesioner
        .filter((v) => v.is_default)
        .reduce((acc, obj) => {
          return acc + obj.pertanyaan.length;
        }, 0);

      const mapping = payloadKuesioner.map((category, idx) => {
        const { id, name, is_default } = category;
        const total_pertanyaan = category.pertanyaan
          ? category.pertanyaan.length
          : 0;

        let category_name;
        if (is_default) {
          kategoriCount++;
          category_name = `Kategori ${kategoriCount}`;
        } else {
          tambahanCount++;
          category_name = `Kategori Tambahan ${tambahanCount}`;
        }

        return {
          idx: idx + 1,
          id,
          category_name,
          name,
          total_pertanyaan,
          total_pertanyaan_all_kategori,
          onEdit: false,
          is_default,
        };
      });

      setDataCategory(mapping);
    } else {
      setDataCategory([]);
    }
  }, [payloadKuesioner]);

  useEffect(() => {
    if (["On Approver", "Final"].includes(information?.data)) {
      errorSwalTimeout("Not Authorized", `/survey/initiator/overview/${id}`);
    }
  }, [information]);

  const handleUnderChange = () => {
    if (!isUnderChange) setIsUnderChange(true);
  };

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
    setCurrentContentModalAddQuestionStage(1);
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

  // [ START ] Handler for category
  const handleAddCategory = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_APP}/api/redis`,
      {
        key: `additionalQuestionsId-${id}`,
        value: JSON.stringify(payloadKuesioner),
      },
      true
    );
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/kategori/tambahan/${id}`,
      {}
    );

    additionalQuestionsFromRedisMutate();
    kuesionerMutate();
    handleUnderChange();
    loadingSwal("close");
  };

  const handleUpdateCategory = async (index, data) => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_APP}/api/redis`,
      {
        key: `additionalQuestionsId-${id}`,
        value: JSON.stringify(payloadKuesioner),
      },
      true
    );
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/kategori/tambahan/${id}`,
      { kategori_id: data.id, name: data.name }
    );

    additionalQuestionsFromRedisMutate();
    kuesionerMutate();
    handleUnderChange();
    handleOnEditCategory(index, false);
    loadingSwal("close");
  };

  const handleDeleteCategory = async (category_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus kategori ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_APP}/api/redis`,
      {
        key: `additionalQuestionsId-${id}`,
        value: JSON.stringify(payloadKuesioner),
      },
      true
    );
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/kategori/tambahan/${id}/${category_id}`
    );

    additionalQuestionsFromRedisMutate();
    kuesionerMutate();
    handleUnderChange();
    loadingSwal("close");
  };

  const handleOnEditCategory = (idx, value) => {
    const newData = [...dataCategory];
    const updated = { ...dataCategory[idx], onEdit: value };
    newData[idx] = updated;
    setDataCategory(newData);
    handleUnderChange();
  };

  const handleChangeNameCategory = (idx, value) => {
    const newData = [...dataCategory];
    const updated = { ...dataCategory[idx], name: value };
    newData[idx] = updated;
    setDataCategory(newData);
    handleUnderChange();
  };
  // [ END ] Handler for category

  // [ START ] Handler for sidebar
  const validateTextNotEmpty = async (data) => {
    let isValid = true;
    const errors = [];

    data?.forEach((category, categoryIndex) => {
      category?.pertanyaan?.forEach((question, questionIndex) => {
        if (
          (question?.tipe_pertanyaan_kode === "2" ||
            question?.tipe_pertanyaan_kode === "3") &&
          question?.jawaban?.some((answer) => answer?.text?.trim() === "")
        ) {
          isValid = false;
          question.jawaban.forEach((answer, answerIndex) => {
            if (answer.text.trim() === "") {
              errors.push(`${categoryIndex}-${questionIndex}-${answerIndex}`);
            }
          });
        }

        if (!question?.uraian) {
          isValid = false;
          errors.push(`${categoryIndex}-${questionIndex}`);
        }
      });
    });

    return { isValid, errors };
  };

  const handleSaveKuesioner = async () => {
    const validation = await validateTextNotEmpty(payloadKuesioner);

    if (!validation.isValid) {
      await infoSwal("Mohon lengkapi form kuesioner");
      dispatch(setValidationErrorsKuesioner(validation.errors));
      return;
    } else {
      dispatch(resetValidationErrorsKuesioner());
    }

    loadingSwal();
    const mappingPayload = payloadKuesioner.flatMap((kategori) => {
      return kategori.pertanyaan.map((pertanyaan) => ({
        kategori_id: kategori.id,
        guideline: pertanyaan.guideline,
        uraian: pertanyaan.uraian,
        tipe_pertanyaan_kode: pertanyaan.tipe_pertanyaan_kode,
        tipe_pertanyaan_name: pertanyaan.tipe_pertanyaan_name,
        is_need_deskripsi: pertanyaan.is_need_deskripsi,
        is_default: pertanyaan.is_default,
        bobot: pertanyaan.bobot,
        template_jawaban: pertanyaan.jawaban.map((jawaban) => ({
          bobot: jawaban.bobot,
          text: jawaban.text,
        })),
      }));
    });
    const payload = mappingPayload.filter((v) => !v.is_default);

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_APP}/api/redis`,
      {
        key: `additionalQuestionsId-${id}`,
        value: JSON.stringify(payloadKuesioner),
      },
      true
    );

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/kuesioner/tambahan/${id}`,
      payload
    );
    setIsUnderChange(false);
    additionalQuestionsFromRedisMutate();
    kuesionerMutate();
    loadingSwal("close");
  };
  // [ END ] Handler for sidebar

  return (
    <LandingLayoutSurvey overflowY>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex gap-3 items-center">
            <ButtonIconBack
              backUrl={`/survey/initiator/overview/${id}?is_kuesioner=true`}
            />
            <PageTitle text={"Pertanyaan Tambahan"} />
          </div>
          <TabKuesioner
            data={payloadKuesioner}
            validation={validationErrorsKuesioner}
            isDisabledBobot
            handleChangeQuestion={handleChangeQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
            handleAddAnswer={handleAddAnswer}
            handleChangeAnswer={handleChangeAnswer}
            handleDeleteAnswer={handleDeleteAnswer}
            handleClickOpenModalAddQuestion={handleClickOpenModalAddQuestion}
            handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
          />
        </div>
      </div>
      <Sidebar
        isUnderChange={isUnderChange}
        data={dataCategory}
        handleSaveKuesioner={handleSaveKuesioner}
        handleAddCategory={handleAddCategory}
        handleOnEditCategory={handleOnEditCategory}
        handleChangeNameCategory={handleChangeNameCategory}
        handleUpdateCategory={handleUpdateCategory}
        handleDeleteCategory={handleDeleteCategory}
        handleMutateData={kuesionerMutate}
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
      />
      {/* End Content */}
    </LandingLayoutSurvey>
  );
};

export default index;

import {
  Breadcrumbs,
  ButtonField,
  LinkIcon,
  PageTitle,
} from "@/components/atoms";
import LayoutSurveyReference from "@/layouts/reference/LayoutSurveyReference";
import { useEffect, useState } from "react";
import {
  ModalGuidelines,
  Sidebar,
  TabKuesioner,
} from "@/components/molecules/reference/survey/buat-template";
import { useSelector } from "react-redux";
import {
  resetPayloadKuesioner,
  setPayloadKuesioner,
} from "@/slices/reference/createTemplateReferenceSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useKuesioner } from "@/data/reference/admin-survey/informasi";
import { useCategory } from "@/data/reference/admin-survey/kuesioner";
import { IconArrowLeft } from "@/components/icons";
import { previewPrintDocument } from "@/helpers";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Reference", path: "/reference" },
    { name: "Form Survei", path: "/reference/survey/overview" },
    {
      name: "Kuesioner / Preview",
      path: `/reference/survey/overview/buat-template/${id}/preview`,
    },
  ];

  const [showModalGuidelines, setShowModalGuidelines] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const payloadKuesioner = useSelector(
    (state) => state.createTemplateReference.payloadKuesioner
  );

  const { category } = useCategory({ id });
  const { kuesioner, kuesionerError } = useKuesioner({ id });

  useEffect(() => {
    if (!kuesionerError && kuesioner?.data?.length) {
      const mappingQuestions = kuesioner.data.map((category) => ({
        id: category.id,
        template_id: category.template_id,
        name: category.name,
        pertanyaan: category.template_pertanyaan.map((question) => ({
          id: question.id,
          template_id: question.template_id,
          guideline: question.guideline,
          tipe_pertanyaan_kode: question.tipe_pertanyaan_kode,
          tipe_pertanyaan_name: question.tipe_pertanyaan_name,
          uraian: question.uraian,
          is_need_deskripsi: question.is_need_deskripsi,
          deskripsi_jawaban: "",
          bobot: question.bobot,
          jawaban_user: [],
          jawaban: question.template_jawaban.map((answer) => ({
            id: answer.id,
            bobot: answer.bobot,
            text: answer.text,
          })),
        })),
      }));

      dispatch(setPayloadKuesioner(mappingQuestions));
    } else {
      dispatch(resetPayloadKuesioner());
    }
  }, [kuesioner]);

  const handleClickDownloadDocument = () => {
    previewPrintDocument("content-doc");
  };

  // [ START ] Handler for modal guidelines
  const handleClickOpenModalGuidelines = (indexCategory, indexQuestion) => {
    setShowModalGuidelines(true);
    setSelectedCategoryIndex(indexCategory);
    setSelectedQuestionIndex(indexQuestion);
  };

  const handleCloseModalGuidelines = () => {
    setShowModalGuidelines(false);
  };
  // [ END ] Handler for modal guidelines

  // [ START ] Handler for answer
  const handleChangeAnswer = (
    type,
    value,
    categoryIndex,
    questionIndex,
    answerIndex
  ) => {
    const newPayloadKuesioner = JSON.parse(JSON.stringify(payloadKuesioner));
    const currentQuestion = {
      ...newPayloadKuesioner[categoryIndex].pertanyaan[questionIndex],
    };

    const currentAnswer = currentQuestion.jawaban[answerIndex];
    const currentAnswers = [...currentQuestion.jawaban_user];

    if (type === "deskripsi jawaban") {
      currentQuestion.deskripsi_jawaban = value;
    } else if (type === "3") {
      const findAnswerIndex = currentAnswers.findIndex(
        (v) => v.id === currentAnswer.id
      );

      if (findAnswerIndex !== -1 && !value) {
        currentAnswers.splice(findAnswerIndex, 1);
      } else {
        currentAnswers.push({ ...currentAnswer });
      }
    } else {
      if (!currentAnswers.length) {
        currentAnswers.push({
          ...currentAnswer,
          text: value,
        });
      } else {
        currentAnswers[0].text = value;
      }
    }

    newPayloadKuesioner[categoryIndex].pertanyaan[questionIndex] = {
      ...currentQuestion,
      jawaban_user: currentAnswers,
    };

    dispatch(setPayloadKuesioner(newPayloadKuesioner));
  };
  // [ END ] Handler for answer

  return (
    <LayoutSurveyReference>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <LinkIcon
                href={`/reference/survey/overview/buat-template/${id}`}
                icon={
                  <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-6 h-6 flex items-center justify-center">
                    <IconArrowLeft size="medium" />
                  </div>
                }
              />
              <PageTitle text={"Preview Kuesioner Responden"} />
            </div>
            <div className="rounded w-28 bg-atlasian-blue-light">
              <ButtonField
                text="Download"
                handler={handleClickDownloadDocument}
              />
            </div>
          </div>
          <TabKuesioner
            isPreviewPage={true}
            handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
            handleChangeAnswer={handleChangeAnswer}
          />
        </div>
      </div>
      <Sidebar data={category} isPreviewPage={true} />
      <ModalGuidelines
        showModal={showModalGuidelines}
        handleCloseModal={handleCloseModalGuidelines}
        data={
          payloadKuesioner[selectedCategoryIndex]?.pertanyaan[
            selectedQuestionIndex
          ]?.guideline
        }
      />
      {/* End Content */}
    </LayoutSurveyReference>
  );
};

export default index;

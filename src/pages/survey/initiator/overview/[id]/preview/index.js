import {
  Breadcrumbs,
  ButtonField,
  LinkIcon,
  PageTitle,
} from "@/components/atoms";
import { useEffect, useState } from "react";
import {
  ModalGuidelines,
  Sidebar,
  TabKuesioner,
} from "@/components/molecules/survey/initiator/buat-template";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { previewPrintDocument } from "@/helpers";
import { LandingLayoutSurvey } from "@/layouts/survey";
import {
  useInformation,
  useKuesioner,
} from "@/data/survey/initiator/informasi";
import {
  setPayloadInformasi,
  setPayloadKuesioner,
  resetPayloadKuesioner,
} from "@/slices/survey/initiator/previewSurveySlice";
import { IconArrowLeft } from "@/components/icons";
import _ from "lodash";

const index = () => {
  const dispatch = useDispatch();
  const { id, is_print } = useRouter().query;

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Survei", path: "/survey" },
    { name: "Overview", path: "/survey/initiator/overview" },
    {
      name: `Buat Survei / Template Kuesioner`,
      path: `/survey/initiator/overview/${id}`,
    },
    {
      name: `Preview`,
      path: `/survey/initiator/overview/${id}/preview`,
    },
  ];

  const [showModalGuidelines, setShowModalGuidelines] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const payloadKuesioner = useSelector(
    (state) => state.previewSurvey.payloadKuesioner
  );
  const payloadInformasi = useSelector(
    (state) => state.previewSurvey.payloadInformasi
  );
  const { kuesioner, kuesionerError } = useKuesioner({ id });
  const { information, informationError } = useInformation({
    id,
  });

  useEffect(() => {
    if (is_print) {
      setTimeout(() => {
        if (payloadKuesioner?.length && is_print) {
          previewPrintDocument("content-doc", true);
        }
      }, 1000);
    }
  }, [is_print, payloadKuesioner]);

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
  }, [information]);

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
                  deskripsi_jawaban: "",
                  jawaban_user: [],
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
    } else if (type == "3") {
      const findAnswerIndex = currentAnswers.findIndex(
        (v) => v.jawaban_id === currentAnswer.jawaban_id
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
    <LandingLayoutSurvey overflowY={true}>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <LinkIcon
                href={`/survey/initiator/overview/${id}`}
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
            data={payloadKuesioner}
            dataInformasi={payloadInformasi}
            isPreviewPage={true}
            isDownload={true}
            handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
            handleChangeAnswer={handleChangeAnswer}
          />
        </div>
      </div>
      <Sidebar data={payloadKuesioner} isPreviewPage withoutButtonTop />
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
    </LandingLayoutSurvey>
  );
};

export default index;

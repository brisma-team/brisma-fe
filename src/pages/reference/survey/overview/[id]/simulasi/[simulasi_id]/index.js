import {
  Breadcrumbs,
  ButtonField,
  LinkIcon,
  PageTitle,
} from "@/components/atoms";
import { useEffect, useState } from "react";
import {
  ModalGuidelines,
  TabKuesioner,
} from "@/components/molecules/survey/responden/kuesioner";
import { Sidebar } from "@/components/molecules/reference/survey/buat-template/simulasi";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataCategory,
  setPayloadInformasi,
  setPayloadKuesioner,
  setPayloadKuesionerFromRedis,
  resetDataCategory,
  resetPayloadKuesioner,
} from "@/slices/reference/simulasiTemplateReferenceSlice";
import { useRouter } from "next/router";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
import { useInformation } from "@/data/survey/initiator/informasi";
import { IconArrowLeft } from "@/components/icons";
import useUser from "@/data/useUser";
import _ from "lodash";
import { LayoutSurveyReference } from "@/layouts/reference";
import {
  useAnswerSimulasi,
  useAnswerSimulasiFromRedis,
  useDuplicateAnswerSimulasiFromRedis,
} from "@/data/reference/admin-survey/simulasi";
import { CustomSelect } from "@/components/molecules/commons";

const index = () => {
  const dispatch = useDispatch();
  const { id, simulasi_id } = useRouter().query;

  const arrTotalResponden = [];
  for (let i = 1; i <= 10; i++) {
    const fixedResult = i * 10;
    arrTotalResponden.push({ label: fixedResult, value: fixedResult });
  }

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModalGuidelines, setShowModalGuidelines] = useState(false);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedTotalResponden, setSelectedTotalResponden] = useState(0);

  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  const payloadKuesioner = useSelector(
    (state) => state.simulasiTemplateReference.payloadKuesioner
  );
  const payloadKuesionerFromRedis = useSelector(
    (state) => state.simulasiTemplateReference.payloadKuesionerFromRedis
  );
  const payloadInformasi = useSelector(
    (state) => state.simulasiTemplateReference.payloadInformasi
  );
  const dataCategory = useSelector(
    (state) => state.simulasiTemplateReference.dataCategory
  );

  const { user } = useUser(true);
  const { information, informationError } = useInformation({ id }, true);
  const { answerSimulasi, answerSimulasiError } = useAnswerSimulasi({
    id: simulasi_id,
  });
  const { answerSimulasiFromRedis } = useAnswerSimulasiFromRedis({
    id: simulasi_id,
  });
  const {
    duplicateAnswerSimulasiFromRedis,
    duplicateAnswerSimulasiFromRedisMutate,
  } = useDuplicateAnswerSimulasiFromRedis({
    id: simulasi_id,
  });

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
    if (!answerSimulasiError) {
      const findIndex = answerSimulasi?.data?.mapping?.findIndex(
        (v) => v.id == simulasi_id
      );

      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "Reference", path: "/reference" },
        { name: "Form Survei", path: "/reference/survey/overview" },
        {
          name: "Simulasi",
          path: `/reference/survey/overview/${id}/simulasi`,
        },
        {
          name: `Kuestioner ${findIndex + 1}`,
          path: `/reference/survey/overview/${id}/simulasi/${simulasi_id}`,
        },
      ]);

      setSelectedTotalResponden(
        parseInt(answerSimulasi?.data?.info?.jumlah_responden) || 0
      );
    }

    let payload;
    if (
      information?.data?.status_persetujuan === "On Progress" &&
      answerSimulasiFromRedis?.data?.length
    ) {
      payload = answerSimulasi?.data?.kuesioner?.map((category) => {
        const findCategoryFromRedis = answerSimulasiFromRedis?.data?.find(
          (value) => value.id == category.id
        );

        const pertanyaan =
          findCategoryFromRedis?.pertanyaan ||
          (category?.template_pertanyaan?.length
            ? category.template_pertanyaan.map((question) => {
                return {
                  id: question?.id,
                  guideline: question?.guideline,
                  tipe_pertanyaan_kode:
                    question?.tipe_pertanyaan_kode?.toString(),
                  tipe_pertanyaan_name: question?.tipe_pertanyaan_name,
                  uraian: question?.uraian,
                  is_need_deskripsi: question?.is_need_deskripsi,
                  bobot: question?.bobot,
                  deskripsi_jawaban: question?.simulasi_jawaban?.length
                    ? question?.simulasi_jawaban[0]?.deskripsi
                    : "",
                  jawaban_user: question?.simulasi_jawaban?.length
                    ? question?.simulasi_jawaban?.map((answer) => {
                        const { text } = answer;
                        const bobot = question?.template_jawaban?.find(
                          (value) => value?.id == answer?.jawaban_id
                        )?.bobot;
                        return {
                          jawaban_id: answer?.jawaban_id,
                          bobot,
                          text,
                        };
                      })
                    : [],
                  jawaban: question?.template_jawaban?.length
                    ? question?.template_jawaban?.map((v) => {
                        return {
                          jawaban_id: v.id,
                          ..._.omit(v, ["id"]),
                        };
                      })
                    : [],
                };
              })
            : []);

        return {
          id: category.id,
          name: category.name,
          is_need_saved: false,
          pertanyaan,
        };
      });
    } else if (answerSimulasi?.data?.kuesioner?.length) {
      payload = answerSimulasi?.data?.kuesioner?.map((category) => {
        return {
          id: category.id,
          name: category.name,
          is_need_saved: false,
          pertanyaan: category?.template_pertanyaan?.length
            ? category?.template_pertanyaan?.map((question) => {
                return {
                  id: question?.id,
                  guideline: question?.guideline,
                  tipe_pertanyaan_kode:
                    question?.tipe_pertanyaan_kode?.toString(),
                  tipe_pertanyaan_name: question?.tipe_pertanyaan_name,
                  uraian: question?.uraian,
                  is_need_deskripsi: question?.is_need_deskripsi,
                  bobot: question?.bobot,
                  deskripsi_jawaban: question?.simulasi_jawaban?.length
                    ? question?.simulasi_jawaban[0]?.deskripsi
                    : "",
                  jawaban_user: question?.simulasi_jawaban?.length
                    ? question?.simulasi_jawaban?.map((answer) => {
                        const { text } = answer;
                        const bobot = question?.template_jawaban?.find(
                          (value) => value?.jawaban_id == answer?.jawaban_id
                        )?.bobot;
                        return {
                          jawaban_id: answer?.jawaban_id,
                          bobot,
                          text,
                        };
                      })
                    : [],
                  jawaban: question?.template_jawaban?.length
                    ? question?.template_jawaban?.map((v) => {
                        return {
                          jawaban_id: v.id,
                          ..._.omit(v, ["id"]),
                        };
                      })
                    : [],
                };
              })
            : [],
        };
      });
    } else {
      dispatch(resetPayloadKuesioner());
      return;
    }
    dispatch(setPayloadKuesioner(payload));
  }, [information, answerSimulasi, answerSimulasiFromRedis, user]);

  useEffect(() => {
    dispatch(
      setPayloadKuesionerFromRedis(duplicateAnswerSimulasiFromRedis?.data)
    );
  }, [duplicateAnswerSimulasiFromRedis]);

  useEffect(() => {
    if (payloadKuesioner?.length) {
      const total_pertanyaan_all_kategori = payloadKuesioner.reduce(
        (acc, obj) => {
          return acc + obj.pertanyaan.length;
        },
        0
      );

      const mapping = payloadKuesioner.map((category, idx) => {
        const { id, name, pertanyaan } = category;

        const total_pertanyaan = category.pertanyaan
          ? category.pertanyaan.length
          : 0;

        const is_completed = pertanyaan?.length
          ? pertanyaan?.every((pertanyaanItem) => {
              return pertanyaanItem?.is_need_deskripsi
                ? pertanyaanItem?.jawaban_user?.length &&
                    pertanyaanItem?.jawaban_user[0]?.text &&
                    pertanyaanItem?.deskripsi_jawaban
                : (pertanyaanItem?.jawaban_user?.length &&
                    pertanyaanItem?.jawaban_user[0]?.text) ||
                    "";
            })
          : false;

        return {
          idx: idx + 1,
          id,
          name,
          is_completed,
          total_pertanyaan,
          total_pertanyaan_all_kategori,
        };
      });

      dispatch(setDataCategory(mapping));
    } else {
      dispatch(resetDataCategory());
    }
  }, [payloadKuesioner]);

  useEffect(() => {
    const allCompleted = dataCategory?.every(
      (category) => category?.is_completed
    );
    setIsDisabledSubmit(!allCompleted);
  }, [dataCategory]);

  // [ START ] Handler for answer
  const handleSaveAnswerPerCategory = async (categoryIndex, categoryId) => {
    loadingSwal();

    const newPayloadKuesioner = JSON.parse(JSON.stringify(payloadKuesioner));
    let newPayloadKuesionerFromRedis = duplicateAnswerSimulasiFromRedis?.data
      ? JSON.parse(JSON.stringify(duplicateAnswerSimulasiFromRedis?.data))
      : "";

    newPayloadKuesioner[categoryIndex].is_need_saved = false;
    const findCategory = newPayloadKuesioner.find(
      (value) => value.id === categoryId
    );

    if (newPayloadKuesionerFromRedis?.length) {
      const findPayloadKuesionerFromRedisIndex =
        newPayloadKuesionerFromRedis.findIndex((obj) => obj.id === categoryId);

      if (findPayloadKuesionerFromRedisIndex !== -1) {
        newPayloadKuesionerFromRedis = payloadKuesionerFromRedis.map(
          (obj, index) =>
            index === findPayloadKuesionerFromRedisIndex
              ? { ...obj, ...findCategory }
              : obj
        );
      } else {
        newPayloadKuesionerFromRedis.push({ ...findCategory });
      }
    } else {
      newPayloadKuesionerFromRedis = [findCategory];
    }

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_APP}/api/redis`,
      {
        key: `simulasiId-${simulasi_id}`,
        value: JSON.stringify(newPayloadKuesionerFromRedis),
      },
      false,
      "Jawaban sementara berhasil tersimpan"
    );

    dispatch(setPayloadKuesioner(newPayloadKuesioner));
    duplicateAnswerSimulasiFromRedisMutate();
    loadingSwal("close");
  };

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

    if (type == "deskripsi jawaban") {
      currentQuestion.deskripsi_jawaban = value;
    } else if (type == "2") {
      const findAnswer = currentQuestion.jawaban.find(
        (v) => v.jawaban_id == value
      );

      if (findAnswer) {
        currentAnswers[0] = findAnswer;
      }
    } else if (type == "3") {
      const findAnswerIndex = currentAnswers.findIndex(
        (v) => v.jawaban_id == currentAnswer.jawaban_id
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

    newPayloadKuesioner[categoryIndex].is_need_saved = true;

    dispatch(setPayloadKuesioner(newPayloadKuesioner));
  };

  const handleSubmitKuesioner = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menyimpan jawaban ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    if (payloadKuesioner?.length) {
      const payload = [];
      payloadKuesioner.forEach((category) => {
        category.pertanyaan.forEach((question) => {
          const {
            id,
            bobot,
            deskripsi_jawaban,
            tipe_pertanyaan_kode,
            jawaban_user,
          } = question;
          const mappingJawabanUser = jawaban_user?.map((answer) => {
            const { jawaban_id, bobot, text } = answer;
            return { id: jawaban_id, bobot, text };
          });

          payload.push({
            pertanyaan_id: id,
            bobot,
            deskripsi_jawaban: deskripsi_jawaban || "",
            tipe_pertanyaan_kode,
            jawaban: mappingJawabanUser,
          });
        });
      });

      await fetchApi(
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/simulasi/jumlah_responden`,
        { simulasi_id, jumlah_responden: selectedTotalResponden },
        true
      );

      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/simulasi/kuesioner/${simulasi_id}`,
        payload
      );
    }
    loadingSwal("close");
  };
  // [ END ] Handler for answer

  // [ START ] Handler for modal guidelines
  const handleClickOpenModalGuidelines = (indexCategory, indexQuestion) => {
    setSelectedCategoryIndex(indexCategory);
    setSelectedQuestionIndex(indexQuestion);
    setShowModalGuidelines(true);
  };

  const handleCloseModalGuidelines = () => {
    setShowModalGuidelines(false);
  };
  // [ END ] Handler for modal guidelines

  return (
    <LayoutSurveyReference overflowY>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <LinkIcon
                href={`/reference/survey/overview/${id}/simulasi`}
                icon={
                  <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-6 h-6 flex items-center justify-center">
                    <IconArrowLeft size="medium" />
                  </div>
                }
              />
              <PageTitle text={"Kuesioner"} />
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-44">
                <CustomSelect
                  optionValue={arrTotalResponden}
                  selectedValue={
                    selectedTotalResponden
                      ? {
                          label: selectedTotalResponden?.toString(),
                          value: selectedTotalResponden,
                        }
                      : null
                  }
                  placeholder={"Jumlah Responden"}
                  handleChange={(e) => setSelectedTotalResponden(e.value)}
                />
              </div>
              <div
                className={`rounded w-28 h-fit ${
                  (isDisabledSubmit && !selectedTotalResponden) ||
                  payloadInformasi?.status_persetujuan !== "On Progress"
                    ? "bg-atlasian-gray-light"
                    : "bg-atlasian-red"
                }`}
              >
                <ButtonField
                  text={"SUBMIT"}
                  handler={handleSubmitKuesioner}
                  disabled={
                    (isDisabledSubmit && !selectedTotalResponden) ||
                    payloadInformasi?.status_persetujuan !== "On Progress"
                  }
                />
              </div>
            </div>
          </div>
          <TabKuesioner
            isDisabledForm={
              payloadInformasi?.status_persetujuan !== "On Progress"
            }
            dataKuesioner={payloadKuesioner}
            dataInformasi={payloadInformasi}
            handleChangeAnswer={handleChangeAnswer}
            handleSaveAnswerPerCategory={handleSaveAnswerPerCategory}
            handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
          />
        </div>
      </div>
      <Sidebar isPreviewPage={true} isDisabledForm={true} data={dataCategory} />
      <ModalGuidelines
        showModal={showModalGuidelines}
        handleCloseModal={handleCloseModalGuidelines}
        data={
          payloadKuesioner &&
          payloadKuesioner[selectedCategoryIndex] &&
          payloadKuesioner[selectedCategoryIndex]?.pertanyaan &&
          payloadKuesioner[selectedCategoryIndex]?.pertanyaan[
            selectedQuestionIndex
          ]
            ? payloadKuesioner[selectedCategoryIndex]?.pertanyaan[
                selectedQuestionIndex
              ]?.guideline
            : undefined
        }
      />

      {/* End Content */}
    </LayoutSurveyReference>
  );
};

export default index;

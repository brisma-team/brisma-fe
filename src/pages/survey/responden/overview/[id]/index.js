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
} from "@/components/molecules/survey/responden/kuesioner";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataCategory,
  setWorkflowData,
  setPayloadKuesioner,
  setPayloadInformasi,
  setHistoryWorkflow,
  setValidationErrorsWorkflow,
  resetDataCategory,
  resetWorkflowData,
  resetHistoryWorkflow,
  resetPayloadKuesioner,
  resetValidationErrorsWorkflow,
} from "@/slices/survey/responden/respondenAnswerSlice";
import { useRouter } from "next/router";
import {
  confirmationSwal,
  convertDate,
  errorSwal,
  fetchApi,
  loadingSwal,
  previewPrintDocument,
  setErrorValidation,
} from "@/helpers";
import { useWorkflowSurvey } from "@/data/survey/initiator/buat-survey";
import { workflowSchema } from "@/helpers/schemas/survey/respondenSurveySchema";
import { ModalWorkflow } from "@/components/molecules/survey/responden/kuesioner";
import { RespondenLayoutSurvey } from "@/layouts/survey";
import {
  useInformation,
  useKuesioner,
} from "@/data/survey/initiator/informasi";
import { IconArrowLeft } from "@/components/icons";
import { useAnswerSurvey } from "@/data/survey/responden/answer";
import useUser from "@/data/useUser";
import _ from "lodash";

const index = () => {
  const dispatch = useDispatch();
  const { id, is_approver, from, is_print } = useRouter().query;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [sidebarContent, setSidebarContent] = useState([]);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [showModalGuidelines, setShowModalGuidelines] = useState(false);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const [isRefreshWorkflow, setIsRefreshWorkflow] = useState(false);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [respondenId, setRespondenId] = useState("");
  const [isResponden, setIsResponden] = useState("");
  const [isPreviewPage, setIsPreviewPage] = useState(false);
  const [approverFromPn, setApproverFromPn] = useState("");
  const [statusApprover, setStatusApprover] = useState("On Progress");

  const payloadKuesioner = useSelector(
    (state) => state.respondenAnswer.payloadKuesioner
  );
  const payloadInformasi = useSelector(
    (state) => state.respondenAnswer.payloadInformasi
  );
  const workflowData = useSelector(
    (state) => state.respondenAnswer.workflowData
  );
  const historyWorkflow = useSelector(
    (state) => state.respondenAnswer.historyWorkflow
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.respondenAnswer.validationErrorsWorkflow
  );
  const dataCategory = useSelector(
    (state) => state.respondenAnswer.dataCategory
  );

  const { user } = useUser();
  const { information, informationError } = useInformation({ id });
  const { kuesioner } = useKuesioner({ id });
  const { workflowSurvey, workflowSurveyMutate } = useWorkflowSurvey(
    "responden",
    {
      id: respondenId,
    }
  );
  const { answerSurvey, answerSurveyMutate, answerSurveyError } =
    useAnswerSurvey({
      id,
      pn: approverFromPn,
    });

  useEffect(() => {
    dispatch(resetWorkflowData());
    dispatch(resetHistoryWorkflow());
  }, []);

  useEffect(() => {
    if (is_approver) setShowModalApproval(true);
    if (from) setApproverFromPn(from);
  }, [is_approver, from]);

  useEffect(() => {
    if (is_print) {
      setIsPreviewPage(true);
      setTimeout(() => {
        if (payloadKuesioner?.length && is_print) {
          previewPrintDocument("content-doc", true);
        }
      }, 500);
    }
  }, [is_print, payloadKuesioner]);

  useEffect(() => {
    if (!informationError) {
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "Survei", path: "/survey" },
        { name: "Overview", path: "/survey/responden/overview" },
        {
          name: `${information?.data?.project_survey_id?.toUpperCase()} / Kuesioner`,
          path: `/survey/responden/overview/${id}`,
        },
      ]);

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
    const infoSurvey = kuesioner?.data?.infoSurvey;
    if (infoSurvey) {
      setSidebarContent([
        { title: "Jenis Survei", desc: infoSurvey?.jenis_survey_name },
        { title: "Status Survei", desc: infoSurvey?.status_name },
        {
          title: "Survei Dimulai",
          desc: convertDate(infoSurvey?.pelaksanaan_start, "-", "d"),
        },
        {
          title: "Survei Selesai",
          desc: convertDate(infoSurvey?.pelaksanaan_end, "-", "d"),
        },
      ]);
    }
  }, [kuesioner]);

  useEffect(() => {
    setRespondenId(answerSurvey?.data?.info?.id?.toString());
    setIsResponden(answerSurvey?.data?.info?.pn_responden === user?.data?.pn);
    if (!answerSurveyError && answerSurvey?.data?.kategori?.length) {
      const mapping = answerSurvey.data.kategori.map((category) => {
        return {
          id: category.kategori_id,
          name: category.kategori_name,
          is_saved: false,
          pertanyaan: category?.template_pertanyaan?.length
            ? category?.template_pertanyaan?.map((question) => {
                return {
                  id: question.pertanyaan_id,
                  guideline: question.guideline,
                  tipe_pertanyaan_kode:
                    question?.tipe_pertanyaan_kode?.toString(),
                  tipe_pertanyaan_name: question.tipe_pertanyaan_name,
                  uraian: question.uraian,
                  is_need_deskripsi: question.is_need_deskripsi,
                  bobot: question.bobot,
                  deskripsi_jawaban: question?.jawaban[0]?.deskripsi,
                  jawaban_user: question.jawaban?.length
                    ? question.jawaban.map((answer) => {
                        const { text } = answer;
                        const bobot = question?.template_jawaban?.find(
                          (value) =>
                            value?.jawaban_id == answer?.template_jawaban_id
                        )?.bobot;
                        return {
                          jawaban_id: answer.template_jawaban_id,
                          bobot,
                          text,
                        };
                      })
                    : [],
                  jawaban: question.template_jawaban,
                };
              })
            : [],
        };
      });

      dispatch(setPayloadKuesioner(mapping));
    } else {
      dispatch(resetPayloadKuesioner());
    }
  }, [answerSurvey, user]);

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

        const is_completed = pertanyaan.every((pertanyaanItem) => {
          return pertanyaanItem.is_need_deskripsi
            ? pertanyaanItem?.jawaban_user[0]?.text &&
                pertanyaanItem?.deskripsi_jawaban
            : pertanyaanItem?.jawaban_user[0]?.text;
        });

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

  useEffect(() => {
    const workflowInfo = workflowSurvey?.data?.info;
    const maker = workflowSurvey?.data?.initiator;
    const approvers = workflowSurvey?.data?.approver;

    const newWorkflowData = {
      ...workflowData,
      status_approver: workflowInfo?.status_persetujuan,
      on_approver: workflowInfo?.status_approver,
    };

    newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.nama}`;
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

    setStatusApprover(workflowInfo?.status_persetujuan);
    dispatch(setWorkflowData(newWorkflowData));
    setIsRefreshWorkflow(false);
  }, [workflowSurvey, isRefreshWorkflow]);

  // [ START ] Handler for answer
  const handleSaveAnswerPerCategory = async (categoryId) => {
    // console.log("save");
    console.log("categoryId", categoryId);
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

    if (type === "deskripsi jawaban") {
      currentQuestion.deskripsi_jawaban = value;
    } else if (type == "2") {
      const findAnswer = currentQuestion.jawaban.find(
        (v) => v.jawaban_id === value
      );

      if (findAnswer) {
        currentAnswers[0] = findAnswer;
      }
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

  // [ START ] Handler for modal approval
  const handleCloseModalWorkflow = () => {
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
    loadingSwal();
    if (statusApprover === "On Progress") {
      const payload = {
        sub_modul_id: respondenId,
        sub_modul: "responden",
        approvers: workflowData?.ref_tim_audit_approver,
        is_need_approval: !!workflowData?.ref_tim_audit_approver?.length,
        jawaban: [],
      };
      if (payloadKuesioner?.length) {
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

            payload.jawaban.push({
              pertanyaan_id: id,
              bobot,
              deskripsi_jawaban: deskripsi_jawaban || "",
              tipe_pertanyaan_kode,
              jawaban: mappingJawabanUser,
            });
          });
        });
      }
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow/create`,
        payload
      );
    } else {
      const schemaMapping = {
        schema: workflowSchema,
        resetErrors: resetValidationErrorsWorkflow,
        setErrors: setValidationErrorsWorkflow,
      };
      const validate = setErrorValidation(
        workflowData,
        dispatch,
        schemaMapping
      );

      if (validate) {
        const actionType = e.target.offsetParent.name;
        const data = {
          sub_modul: "responden",
          sub_modul_id: respondenId,
        };

        switch (actionType) {
          case "change":
            data.approvers = workflowData?.ref_tim_audit_approver;
            break;
          case "create":
            data.approvers = workflowData?.ref_tim_audit_approver;
            break;
          case "reject":
            if (!workflowData.note) {
              await errorSwal("Silahkan berikan alasan!");
              return;
            }
            data.note = workflowData?.note;
            break;
          case "approve":
            data.note = workflowData?.note;
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
      }
    }
    answerSurveyMutate();
    workflowSurveyMutate();
    dispatch(resetWorkflowData());
    setShowModalApproval(false);
    loadingSwal("close");
  };
  // [ END ] Handler for modal approval

  return (
    <RespondenLayoutSurvey
      data={kuesioner?.data?.infoSurvey}
      content={sidebarContent}
    >
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <LinkIcon
                href={`/survey/responden/overview`}
                icon={
                  <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-6 h-6 flex items-center justify-center">
                    <IconArrowLeft size="medium" />
                  </div>
                }
              />
              <PageTitle text={"Kuesioner"} />
            </div>
            <div
              className={`rounded w-28 ${
                isDisabledSubmit ? "bg-atlasian-gray-light" : "bg-atlasian-red"
              }`}
            >
              <ButtonField
                text={statusApprover === "On Progress" ? `SUBMIT` : `APPROVAL`}
                handler={() => setShowModalApproval(true)}
                disabled={isDisabledSubmit}
              />
            </div>
          </div>
          <TabKuesioner
            isPreviewPage={isPreviewPage}
            isDisabledForm={statusApprover !== "On Progress" || !isResponden}
            isDownload={is_print}
            dataKuesioner={payloadKuesioner}
            dataInformasi={payloadInformasi}
            handleChangeAnswer={handleChangeAnswer}
            handleSaveAnswerPerCategory={handleSaveAnswerPerCategory}
            handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
          />
        </div>
      </div>
      <Sidebar isPreviewPage={true} isDisabledForm={true} />
      <ModalWorkflow
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
        handleCloseModal={handleCloseModalWorkflow}
        statusApprover={statusApprover}
        widthHeader={statusApprover !== "On Progress" && `w-[42rem]`}
      />
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
    </RespondenLayoutSurvey>
  );
};

export default index;

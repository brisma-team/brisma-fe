import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { previewPrintDocument } from "@/helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "lodash";
import {
  setPayloadKuesioner,
  setPayloadInformasi,
  resetPayloadKuesioner,
} from "@/slices/ewp/quality-assurance/preview/previewTemplateSurveyEWPQualityAssuranceSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useInformation,
  useKuesioner,
} from "@/data/reference/admin-survey/informasi";
import {
  ModalGuidelines,
  Sidebar,
  TabKuesioner,
} from "@/components/molecules/reference/survey/buat-template";
import { LandingLayoutSurvey } from "@/layouts/survey";
import { useCategory } from "@/data/reference/admin-survey/kuesioner";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    template_id: 0,
  });
  const { auditInfo } = useAuditInfo({
    id: params?.id,
    module: "qa",
  });

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModalGuidelines, setShowModalGuidelines] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const payloadKuesioner = useSelector(
    (state) => state.previewTemplateSurveyEWPQualityAssurance.payloadKuesioner
  );
  const payloadInformasi = useSelector(
    (state) => state.previewTemplateSurveyEWPQualityAssurance.payloadInformasi
  );

  const { category } = useCategory({ id: params?.template_id });
  const { kuesioner, kuesionerError } = useKuesioner({
    id: params?.template_id,
  });
  const { information, informationError } = useInformation({
    id: params?.template_id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, template_id } = router.query;
    setParams({
      id,
      template_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (auditInfo?.data) {
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "EWP", path: "/ewp" },
        { name: "Overview", path: "/ewp/quality-assurance" },
        {
          name: auditInfo?.data?.project_info?.project_id?.toUpperCase(),
          path: `/ewp/quality-assurance/${params?.id}/info`,
        },
        {
          name: `Preview Template Survey`,
          path: `/ewp/quality-assurance/${params?.id}/preview/${params?.template_id}`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

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
    if (!kuesionerError && kuesioner?.data?.length) {
      const mappingQuestions = kuesioner?.data?.map((category) => ({
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

  return (
    <LandingLayoutSurvey isLayoutResponden>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <PageTitle text={"Preview Template Survey"} />
            <div className="rounded w-28 bg-atlasian-blue-light">
              <ButtonField
                text="Download"
                handler={handleClickDownloadDocument}
              />
            </div>
          </div>
          <TabKuesioner
            isPreviewPage
            isDisabledForm
            isDownload
            dataKuesioner={payloadKuesioner}
            dataInformasi={payloadInformasi}
            handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
          />
        </div>
      </div>
      <Sidebar data={category} isPreviewPage />
      <ModalGuidelines
        showModal={showModalGuidelines}
        handleCloseModal={handleCloseModalGuidelines}
        data={
          payloadKuesioner[selectedCategoryIndex]?.pertanyaan[
            selectedQuestionIndex
          ]?.guideline
        }
      />
    </LandingLayoutSurvey>
  );
};

export default index;

import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuditInfo } from "@/data/ewp/common/info";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/quality-assurance/reporting/rencanaPerbaikanEWPQualityAssuranceSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigationTab,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import {
  ModalRekomendasi,
  TableRencanaPerbaikan,
  UraianRencanaPerbaikan,
} from "@/components/molecules/ewp/quality-assurance/reporting/dokumen-reporting";
import {
  useDokumenReporting,
  useDokumenReportingDetail,
  useRekomendasiRencanaPerbaikan,
} from "@/data/ewp/quality-assurance/reporting";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";
import { addRekomendasiSchema } from "@/helpers/schemas/ewp/quality-assurance/quality-assurance/rencanaPerbaikanEWPQualityAssuranceSchema";
import useUser from "@/data/useUser";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Standar Review", slug: "standar-review" },
  { name: "Ruang Lingkup", slug: "ruang-lingkup" },
  { name: "Metode Penilaian", slug: "metode-penilaian" },
  { name: "Hasil Review Kualitas", slug: "hasil-review" },
  { name: "Peluang Peningkatan Kualitas", slug: "peluang-peningkatan" },
  { name: "Rencana Perbaikan", slug: "rencana-perbaikan" },
  { name: "Dokumen", slug: "dokumen" },
];
const navigationTabItems = [
  { idx: 1, title: "Uraian Rencana Perbaikan" },
  { idx: 2, title: "Rekomendasi dan Action Plan" },
];

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    id: 0,
    matrix_id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/reporting/${params?.matrix_id}/dokumen-reporting`;

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(true);

  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");
  const [content, setContent] = useState("");

  const [isEditRekomendasi, setIsEditRekomendasi] = useState(false);
  const [expansionMap, setExpansionMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedRekomendasiId, setSelectedRekomendasiId] = useState(0);

  const data = useSelector(
    (state) => state.rencanaPerbaikanEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.rencanaPerbaikanEWPQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.rencanaPerbaikanEWPQualityAssurance.validationErrors
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { dokumenReporting, dokumenReportingMutate } = useDokumenReporting({
    id: params?.matrix_id,
    page_type: "uraian_rencana_perbaikan",
  });
  const { dokumenReportingDetail } = useDokumenReportingDetail({
    id: selectedRekomendasiId,
    page_type: "rekomendasi",
  });
  const { rekomendasiRencanaPerbaikan, rekomendasiRencanaPerbaikanMutate } =
    useRekomendasiRencanaPerbaikan({ id: params?.id });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, matrix_id, stage } = router.query;
    setParams({
      id,
      matrix_id,
    });
    if (stage === "2") {
      setCurrentContentStage(2);
    }
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      { name: "Reporting", path: `${baseUrl}/reporting` },
      {
        name: "Dokumen Reporting",
        path: pathName,
      },
      {
        name: "Rencana Perbaikan",
        path: `${pathName}/rencana-perbaikan`,
      },
    ]);

    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

  useEffect(() => {
    if (rekomendasiRencanaPerbaikan?.data?.length) {
      const mapping = rekomendasiRencanaPerbaikan?.data?.map((project) => {
        return {
          id: project?.id,
          project: project?.judul_kkpt,
          role: "parent",
          children: project?.kkpt_rekomendasi_list?.length
            ? project?.kkpt_rekomendasi_list?.map((rekomendasi) => {
                return {
                  id: rekomendasi?.id,
                  deskripsi: rekomendasi?.desc,
                  metode: {
                    kode: rekomendasi?.tipe_rekomendasi_kode,
                    name: rekomendasi?.tipe_rekomendasi_name,
                  },
                  jumlah_action_plan: rekomendasi?.action_plans?.length || 0,
                  role: "child",
                };
              })
            : [],
          status_survei: project?.project_survey?.status_name,
          mtd_tipe: project?.mapa_project_audit?.mtd_tipe,
          mtd_jenis: project?.mapa_project_audit?.mtd_jenis,
          analisa: project?.mapa_project_audit?.analisa,
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [rekomendasiRencanaPerbaikan]);

  useEffect(() => {
    if (dokumenReportingDetail?.data) {
      const { tipe_rekomendasi_kode, tipe_rekomendasi_name, desc } =
        dokumenReportingDetail.data;
      dispatch(
        setObjPayload({
          desc,
          tipe_rekomendasi: {
            kode: tipe_rekomendasi_kode,
            nama: tipe_rekomendasi_name,
          },
        })
      );
    }
  }, [dokumenReportingDetail, showModal]);

  useEffect(() => {
    setContent(dokumenReporting?.data || "");
  }, [dokumenReporting]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  // [ START ] handler for uraian rencana perbaikan
  const handleChangeUraian = (value) => {
    setContent(value);
  };
  const handleClickUploadAttachment = () => {
    setTypeUpload("attachment");
  };

  const handleClickUploadImage = () => {
    setTypeUpload("image");
  };

  const handleUploadFile = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const handleSubmit = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/uraian_rencana_perbaikan`,
      { uraian_rencana_perbaikan: content, id: params?.matrix_id }
    );
    dokumenReportingMutate();
    loadingSwal("close");
  };
  // [ END ] handler for uraian rencana perbaikan

  // [ START ] handler for table rencana perbaikan
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setSelectedProjectId(0);
    setSelectedRekomendasiId(0);
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
  };

  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleAddRekomendasi = (id) => {
    setShowModal(true);
    setSelectedProjectId(id);
  };

  const handleEditRekomendasi = (id) => {
    setShowModal(true);
    setIsEditRekomendasi(true);
    setSelectedRekomendasiId(id);
  };

  const handleDeleteRekomendasi = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/rekomendasi/${id}`,
      {}
    );

    rekomendasiRencanaPerbaikanMutate();
    loadingSwal("close");
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleResetPayload = (property) => {
    dispatch(setObjPayload({ ...payload, [property]: "" }));
  };

  const handleSubmitForm = async () => {
    const schemaMappings = {
      schema: addRekomendasiSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      const objPayload = {
        desc: payload?.desc,
        tipe_rekomendasi_kode: payload?.tipe_rekomendasi?.kode,
        tipe_rekomendasi_name: payload?.tipe_rekomendasi?.nama,
        ...(isEditRekomendasi
          ? { id: selectedRekomendasiId }
          : { kkpt_id: selectedProjectId }),
      };

      loadingSwal();
      await fetchApi(
        isEditRekomendasi ? "PATCH" : "POST",
        `${
          process.env.NEXT_PUBLIC_API_URL_EWP
        }/ewp/qa/reporting/dokumen_reporting/rekomendasi${
          isEditRekomendasi ? "/update" : ""
        }`,
        objPayload
      );

      setSelectedProjectId(0);
      setSelectedRekomendasiId(0);
      setShowModal(false);
      setIsEditRekomendasi(false);
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      rekomendasiRencanaPerbaikanMutate();
      loadingSwal("close");
    }
  };
  // [ END ] handler for table rencana perbaikan

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Rencana Perbaikan" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/peluang-peningkatan"}
          nextUrl={"/dokumen"}
          marginLeft={"-100px"}
          widthDropdown={"w-[15rem]"}
        />
      </div>
      <NavigationTab
        items={navigationTabItems}
        currentStage={currentContentStage}
        width={"w-[27rem]"}
        handleChange={handleChangeTab}
      />
      {/* Start Content */}
      {currentContentStage === 1 ? (
        <UraianRencanaPerbaikan
          content={content}
          isInitiator={isInitiator}
          isCloseSubmodule={isCloseSubmodule}
          dataImageClipList={imageClipList}
          dataAttachmentClipList={attachmentClipList}
          handleChangeContent={handleChangeUraian}
          handleUploadFile={handleUploadFile}
          handleClickUploadImage={handleClickUploadImage}
          handleClickUploadAttachment={handleClickUploadAttachment}
          handleSubmit={handleSubmit}
        />
      ) : (
        <TableRencanaPerbaikan
          data={data}
          expansionMap={expansionMap}
          withoutButton={isCloseSubmodule}
          pathName={`/ewp/quality-assurance/${params?.id}/reporting/${params?.matrix_id}/dokumen-reporting/rencana-perbaikan`}
          handleToggleExpansion={handleToggleExpansion}
          handleAddRekomendasi={handleAddRekomendasi}
          handleEditRekomendasi={handleEditRekomendasi}
          handleDeleteRekomendasi={handleDeleteRekomendasi}
        />
      )}
      <ModalRekomendasi
        showModal={showModal}
        payload={payload}
        validation={validation}
        handleCloseModal={handleCloseModal}
        handleChangePayload={handleChangePayload}
        handleResetPayload={handleResetPayload}
        handleSubmit={handleSubmitForm}
      />
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

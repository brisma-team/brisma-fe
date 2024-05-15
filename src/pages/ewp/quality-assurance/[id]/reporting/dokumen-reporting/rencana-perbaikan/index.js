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
} from "@/components/molecules/ewp/quality-assurance/reporting/dokumen-reporting";
import { useDokumenReporting } from "@/data/ewp/quality-assurance/reporting";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { addRekomendasiSchema } from "@/helpers/schemas/ewp/quality-assurance/quality-assurance/rencanaPerbaikanEWPQualityAssuranceSchema";

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
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/reporting`;

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [isEditRekomendasi, setIsEditRekomendasi] = useState(false);
  const [expansionMap, setExpansionMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);

  const data = useSelector(
    (state) => state.rencanaPerbaikanEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.rencanaPerbaikanEWPQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.rencanaPerbaikanEWPQualityAssurance.validationErrors
  );

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { dokumenReporting, dokumenReportingMutate } = useDokumenReporting({
    id: params?.id,
    page_type: "rekomendasi",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
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
      { name: "Reporting", path: pathName },
      {
        name: "Dokumen Reporting",
        path: `${pathName}/dokumen-reporting`,
      },
      {
        name: "Rencana Perbaikan",
        path: `${pathName}/dokumen-reporting/rencana-perbaikan`,
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    if (dokumenReporting?.data?.length) {
      const mapping = dokumenReporting?.data?.map((project) => {
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
                  jumlah_action_plan: 0,
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
  }, [dokumenReporting]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  // [ START ] handler for table rencana perbaikan
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
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
    setSelectedProjectId(id);
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

    dokumenReportingMutate();
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
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/rekomendasi`,
        {
          kkpt_id: selectedProjectId,
          desc: payload?.desc,
          tipe_rekomendasi_kode: payload?.tipe_rekomendasi?.kode,
          tipe_rekomendasi_name: payload?.tipe_rekomendasi?.name,
        }
      );
      setShowModal(false);
      setIsEditRekomendasi(false);
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      dokumenReportingMutate();
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
        <TableRencanaPerbaikan
          data={data}
          expansionMap={expansionMap}
          pathName={`/ewp/quality-assurance/${params?.id}`}
          handleToggleExpansion={handleToggleExpansion}
          handleAddRekomendasi={handleAddRekomendasi}
          handleEditRekomendasi={handleEditRekomendasi}
          handleDeleteRekomendasi={handleDeleteRekomendasi}
        />
      ) : (
        ""
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

import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  NavigationTab,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import useUser from "@/data/useUser";
import { useLandingStatus } from "@/data/ewp/common";
import { useAuditInfo } from "@/data/ewp/common/info";
import {
  useAnalisisPerencanaanInternal,
  useAnalisisPerencanaanEksternal,
  useAnalisisPerencanaanProyek,
} from "@/data/ewp/quality-assurance/perencanaan/analisis-perencanaan";
import {
  setObjDataTableInternal,
  setObjDataTableEksternal,
  setObjDataTableObjekAudit,
  setObjDataFilterModalInternal,
  setObjDataPicAnalisator,
  setObjPayloadInternal,
  setObjPayloadEksternal,
  setValidationErrorsInternal,
  setValidationErrorsEksternal,
  resetObjDataTableInternal,
  resetObjDataTableEksternal,
  resetObjDataTableObjekAudit,
  resetObjDataPicAnalisator,
  resetObjPayloadInternal,
  resetObjPayloadEksternal,
  resetValidationErrorsInternal,
  resetValidationErrorsEksternal,
} from "@/slices/ewp/quality-assurance/perencanaan/analisisPerencanaanEWPQualityAssuranceSlice";
import {
  TableAnalisisPerencanaan,
  ModalAddProjectInternal,
  ModalAddProjectEksternal,
} from "@/components/molecules/ewp/quality-assurance/perencanaan/analisis-perencanaan";
import {
  addProjectEksternalSchema,
  addProjectInternalSchema,
} from "@/helpers/schemas/ewp/quality-assurance/perencanaan/analisisPerencananaanEWPQualityAssuranceSchema";
import { useTim } from "@/data/ewp/quality-assurance/perencanaan/tim";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Analisa", slug: "analisa" },
  { name: "Tim", slug: "tim" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis Perencanaan", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal", slug: "jadwal" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;
  const navigationTabItems = [
    { idx: 1, title: "BRISMA" },
    { idx: 2, title: "Eksternal" },
  ];

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [expansionMapInternal, setExpansionMapInternal] = useState({});
  const [expansionMapEksternal, setExpansionMapEksternal] = useState({});
  const [selectedDataInternal, setSelectedDataInternal] = useState({});
  const [selectedDataEksternal, setSelectedDataEksternal] = useState({});

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [totalDataProyekList, setTotalDataProyekList] = useState(1);
  const [showModalInternal, setShowModalInternal] = useState(false);
  const [showModalEksternal, setShowModalEksternal] = useState(false);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(true);
  const [isInitiator, setIsInitiator] = useState(true);

  const dataTableInternal = useSelector(
    (state) => state.analisisPerencanaanEWPQualityAssurance.objDataTableInternal
  );
  const dataTableEksternal = useSelector(
    (state) =>
      state.analisisPerencanaanEWPQualityAssurance.objDataTableEksternal
  );
  const dataTableObjekAudit = useSelector(
    (state) =>
      state.analisisPerencanaanEWPQualityAssurance.objDataTableObjekAudit
  );
  const dataFilterModalInternal = useSelector(
    (state) =>
      state.analisisPerencanaanEWPQualityAssurance.objDataFilterModalInternal
  );
  const dataPicAnalisator = useSelector(
    (state) => state.analisisPerencanaanEWPQualityAssurance.objDataPicAnalisator
  );
  const payloadInternal = useSelector(
    (state) => state.analisisPerencanaanEWPQualityAssurance.objPayloadInternal
  );
  const payloadEksternal = useSelector(
    (state) => state.analisisPerencanaanEWPQualityAssurance.objPayloadEksternal
  );
  const validationPayloadInternal = useSelector(
    (state) =>
      state.analisisPerencanaanEWPQualityAssurance.validationErrorsInternal
  );
  const validationPayloadEksternal = useSelector(
    (state) =>
      state.analisisPerencanaanEWPQualityAssurance.validationErrorsEksternal
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id: params?.id,
  });
  const { analisisPerencanaanInternal, analisisPerencanaanInternalMutate } =
    useAnalisisPerencanaanInternal({ id: params?.id });
  const { analisisPerencanaanEksternal, analisisPerencanaanEksternalMutate } =
    useAnalisisPerencanaanEksternal({ id: params?.id });
  const { analisisPerencanaanProyek, analisisPerencanaanProyekMutate } =
    useAnalisisPerencanaanProyek({
      ...dataFilterModalInternal,
      uker_id: selectedDataInternal?.id,
      orgeh_kode: selectedDataInternal?.orgeh_kode,
      branch_kode: selectedDataInternal?.branch_kode,
    });

  const { tim, timError } = useTim({
    id: params?.id,
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
      {
        name: `Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `Analisis Perencanaan`,
        path: `${pathName}/analisis-perencanaan`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

  useEffect(() => {
    if (analisisPerencanaanInternal?.data?.length) {
      const mapping = analisisPerencanaanInternal?.data?.map((uker) => {
        return {
          id: uker?.id,
          branch_kode: uker?.ref_auditee_branch_kode,
          branch_name: uker?.ref_auditee_branch_name,
          orgeh_kode: uker?.ref_auditee_orgeh_kode,
          orgeh_name: uker?.ref_auditee_orgeh_name,
          role: "parent",
          children: uker?.mapa_project_audit?.length
            ? uker?.mapa_project_audit?.map((project) => {
                return {
                  ..._.pick(project, [
                    "id",
                    "ewp_id",
                    "project_id",
                    "project_name",
                    "tahun",
                    "mtd_tipe",
                    "mtd_jenis",
                    "analisa",
                  ]),
                  pic: { pn: project?.pn_pic, name: project?.name_pic },
                  role: "child",
                };
              })
            : [],
        };
      });
      dispatch(setObjDataTableInternal(mapping));
    } else {
      dispatch(resetObjDataTableInternal());
    }
  }, [analisisPerencanaanInternal]);

  useEffect(() => {
    if (analisisPerencanaanEksternal?.data?.length) {
      const mapping = analisisPerencanaanEksternal?.data?.map((uker) => {
        return {
          id: uker?.id,
          branch_kode: uker?.ref_auditee_branch_kode,
          branch_name: uker?.ref_auditee_branch_name,
          orgeh_kode: uker?.ref_auditee_orgeh_kode,
          orgeh_name: uker?.ref_auditee_orgeh_name,
          role: "parent",
          children: uker?.mapa_project_audit?.length
            ? uker?.mapa_project_audit?.map((project) => {
                return {
                  ..._.pick(project, [
                    "id",
                    "project_id",
                    "project_name",
                    "tahun",
                    "mtd_tipe",
                    "mtd_jenis",
                    "analisa",
                  ]),
                  pic: { pn: project?.pn_pic, name: project?.name_pic },
                  role: "child",
                };
              })
            : [],
        };
      });
      dispatch(setObjDataTableEksternal(mapping));
    } else {
      dispatch(resetObjDataTableEksternal());
    }
  }, [analisisPerencanaanEksternal]);

  useEffect(() => {
    if (analisisPerencanaanProyek?.data?.length) {
      const mapping = analisisPerencanaanProyek?.data?.map((project) => {
        return {
          ..._.pick(project, ["project_id", "project_name"]),
          ewp_id: project?.id,
          ma_review: project?.info_team_audit?.auditor || [],
          kta_review: project?.info_team_audit?.auditee || [],
          ata_review: project?.info_team_audit?.ata || [],
          mtd_tipe: project?.ref_tipe || "",
          mtd_jenis: project?.ref_jenis || "",
          tahun: project?.audit_year,
          periode_proyek: `${convertDate(
            project?.info_periode_pelaksanaan_start,
            "/",
            "d"
          )} s/d ${convertDate(
            project?.info_periode_pelaksanaan_end,
            "/",
            "d"
          )}`,
          status_proyek: project?.status_name,
          jumlah_temuan_major: 0,
          jumlah_temuan_minor: 0,
          status_rpm: "",
        };
      });
      dispatch(setObjDataTableObjekAudit(mapping));
      setTotalDataProyekList(analisisPerencanaanProyek?.pagination?.totalData);
    } else {
      dispatch(resetObjDataTableObjekAudit());
      setTotalDataProyekList(1);
    }
  }, [analisisPerencanaanProyek, showModalInternal]);

  useEffect(() => {
    if (!timError) {
      const timAuditInfo = tim?.data?.tim_audit;
      const mappingKTA = timAuditInfo?.kta?.length
        ? timAuditInfo?.kta?.map((v) => {
            const { pn, nama } = v;
            return {
              pn,
              nama,
            };
          })
        : [];

      const mappingATA = timAuditInfo?.ata?.length
        ? timAuditInfo?.ata?.map((v) => {
            const { pn, nama } = v;
            return {
              pn,
              nama,
            };
          })
        : [];

      const mergeMapping = [...mappingKTA, ...mappingATA];
      const mapping = mergeMapping?.length
        ? mergeMapping?.map((v) => {
            return { label: v?.nama, value: { pn: v?.pn, name: v?.nama } };
          })
        : [];
      dispatch(setObjDataPicAnalisator(mapping));
    } else {
      dispatch(resetObjDataPicAnalisator());
    }
  }, [tim]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  const handleToggleExpansionInternal = (kode, role) => {
    setExpansionMapInternal((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleToggleExpansionEksternal = (kode, role) => {
    setExpansionMapEksternal((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalInternal(false);
    setShowModalEksternal(false);
    dispatch(resetObjPayloadInternal());
    dispatch(resetObjPayloadEksternal());
    dispatch(resetObjDataTableObjekAudit());
  };

  // [ START ] handler for modal add project eksternal
  const handleClickAddProjectEksternal = (data) => {
    setShowModalEksternal(true);
    setSelectedDataEksternal(data);
  };

  const handleChangePayloadModalEksternal = (property, value) => {
    dispatch(
      setObjPayloadEksternal({ ...payloadEksternal, [property]: value })
    );
  };

  const handleResetPayloadModalEksternal = (property) => {
    dispatch(setObjPayloadEksternal({ ...payloadEksternal, [property]: "" }));
  };

  const handleSubmitModalEksternal = async (e) => {
    e.preventDefault();
    const schemaMappings = {
      schema: addProjectEksternalSchema,
      resetErrors: resetValidationErrorsEksternal,
      setErrors: setValidationErrorsEksternal,
    };
    const validate = setErrorValidation(
      payloadEksternal,
      dispatch,
      schemaMappings
    );

    if (validate) {
      loadingSwal();
      const payload = {
        ..._.pick(payloadEksternal, [
          "project_id",
          "project_name",
          "mtd_tipe",
          "mtd_jenis",
          "tahun",
        ]),
        mapa_uker_id: selectedDataEksternal?.id,
        pn_pic: payloadEksternal?.pic?.pn,
        name_pic: payloadEksternal?.pic?.name,
      };
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/analisis_perencanaan/project/create/eksternal`,
        payload
      );

      analisisPerencanaanEksternalMutate();
      analisisPerencanaanProyekMutate();
      dispatch(resetObjPayloadEksternal());
      setShowModalEksternal(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal add project eksternal

  // [ START ] handler for modal add project internal
  const handleChangeFilterModalInternal = (props, value) => {
    dispatch(
      setObjDataFilterModalInternal({
        ...dataFilterModalInternal,
        [props]: value,
      })
    );
  };

  const handleClickAddProjectInternal = (data) => {
    setShowModalInternal(true);
    setSelectedDataInternal(data);
  };

  const handleChangePICProjectInternal = (data) => {
    setSelectedDataInternal({ ...selectedDataInternal, pic: data });
  };

  const handleResetPICProjectInternal = () => {
    setSelectedDataInternal({ ...selectedDataInternal, pic: "" });
  };

  const handleChangeCheckboxByProjectId = (isChecked, project) => {
    const updatedData = [...payloadInternal];

    if (isChecked) {
      const findId = updatedData.some(
        (value) => value?.project_id === project?.project_id
      );

      if (!findId) {
        updatedData.push(project);
      }
    } else {
      const filter = updatedData.filter(
        (value) => value?.project_id !== project?.project_id
      );
      dispatch(setObjPayloadInternal(filter));
      return;
    }

    dispatch(setObjPayloadInternal(updatedData));
  };

  const handleSubmitModalInternal = async (e) => {
    e.preventDefault();
    const schemaMappings = {
      schema: addProjectInternalSchema,
      resetErrors: resetValidationErrorsInternal,
      setErrors: setValidationErrorsInternal,
    };
    const validate = setErrorValidation(
      selectedDataInternal,
      dispatch,
      schemaMappings
    );

    if (validate) {
      loadingSwal();
      const payload = payloadInternal.map((project) => {
        return {
          mapa_uker_id: selectedDataInternal?.id,
          pn_pic: selectedDataInternal?.pic?.pn,
          name_pic: selectedDataInternal?.pic?.name,
          ..._.pick(project, [
            "project_id",
            "project_name",
            "mtd_tipe",
            "mtd_jenis",
            "ewp_id",
            "tahun",
          ]),
          is_eksternal: false,
        };
      });

      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/analisis_perencanaan/project/create/internal`,
        { project: payload }
      );

      analisisPerencanaanInternalMutate();
      dispatch(resetObjPayloadInternal());
      dispatch(resetObjDataTableObjekAudit());
      setShowModalInternal(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal add project internal

  const handleClickDeleteProject = async (project_id) => {
    const confirm = await confirmationSwal(
      "Menghapus Project akan menghapus seluruh dokumen terkait."
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/analisis_perencanaan/project/${project_id}`,
      {}
    );

    analisisPerencanaanInternalMutate();
    analisisPerencanaanEksternalMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Analisis Perencanaan" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/uker-assessment"}
          nextUrl={"/penugasan"}
          marginLeft={"-70px"}
        />
      </div>
      <NavigationTab
        items={navigationTabItems}
        currentStage={currentContentStage}
        width={"w-40"}
        handleChange={handleChangeTab}
      />
      {/* Start Content */}
      <div className="w-full mt-4">
        {currentContentStage === 1 ? (
          <TableAnalisisPerencanaan
            isInitiator={isInitiator}
            user={user?.data}
            data={dataTableInternal}
            expansionMap={expansionMapInternal}
            pathName={`/ewp/quality-assurance/${params?.id}/perencanaan/analisis-perencanaan`}
            withoutButton={!(isOnProgress && !isCloseSubmodule && isInitiator)}
            handleClickAddProject={handleClickAddProjectInternal}
            handleClickToggleExpansion={handleToggleExpansionInternal}
            handleClickDeleteProject={handleClickDeleteProject}
          />
        ) : (
          <TableAnalisisPerencanaan
            isEksternal
            isInitiator={isInitiator}
            user={user?.data}
            data={dataTableEksternal}
            pathName={`/ewp/quality-assurance/${params?.id}/perencanaan/analisis-perencanaan`}
            expansionMap={expansionMapEksternal}
            withoutButton={!(isOnProgress && !isCloseSubmodule && isInitiator)}
            handleClickAddProject={handleClickAddProjectEksternal}
            handleClickToggleExpansion={handleToggleExpansionEksternal}
            handleClickDeleteProject={handleClickDeleteProject}
          />
        )}
      </div>
      <ModalAddProjectInternal
        showModal={showModalInternal}
        selectedData={selectedDataInternal}
        selectedProject={payloadInternal}
        data={dataTableObjekAudit}
        dataPic={dataPicAnalisator}
        totalData={totalDataProyekList}
        filter={dataFilterModalInternal}
        isDisabled={!payloadInternal?.length}
        validation={validationPayloadInternal}
        handleCloseModal={handleCloseModal}
        handleChangePIC={handleChangePICProjectInternal}
        handleResetPIC={handleResetPICProjectInternal}
        handleChangeCheckbox={handleChangeCheckboxByProjectId}
        handleChangeFilter={handleChangeFilterModalInternal}
        handleSubmit={handleSubmitModalInternal}
      />
      <ModalAddProjectEksternal
        showModal={showModalEksternal}
        payload={payloadEksternal}
        dataPic={dataPicAnalisator}
        selectedData={selectedDataEksternal}
        validation={validationPayloadEksternal}
        handleCloseModal={handleCloseModal}
        handleChangePayload={handleChangePayloadModalEksternal}
        handleResetPayload={handleResetPayloadModalEksternal}
        handleSubmit={handleSubmitModalEksternal}
      />
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

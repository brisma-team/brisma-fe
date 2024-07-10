import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  ModalAddProjectEksternal,
  ModalAddProjectInternal,
} from "../../perencanaan/analisis-perencanaan";
import { useEffect, useState } from "react";
import {
  setObjDataTableInternal,
  setObjDataTableEksternal,
  setObjDataTableObjekAudit,
  setObjDataFilterModalInternal,
  setObjDataPicAnalisator,
  setObjPayloadInternal,
  setObjPayloadEksternal,
  setObjPayloadEditProject,
  setValidationErrorsInternal,
  setValidationErrorsEksternal,
  setValidationErrorsEditProject,
  resetObjDataTableInternal,
  resetObjDataTableEksternal,
  resetObjDataTableObjekAudit,
  resetObjDataPicAnalisator,
  resetObjPayloadInternal,
  resetObjPayloadEksternal,
  resetObjPayloadEditProject,
  resetValidationErrorsInternal,
  resetValidationErrorsEksternal,
  resetValidationErrorsEditProject,
} from "@/slices/ewp/quality-assurance/addendum/utama/analisisPerencanaanAddendumUtamaEWPQualityAssuranceSlice";
import {
  useAnalisisPerencanaanInternal,
  useAnalisisPerencanaanEksternal,
  useAnalisisPerencanaanProyek,
  useAnalisisPerencanaanProyekDetail,
} from "@/data/ewp/common/addendum/utama/analisis-perencanaan";
import {
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  successSwal,
} from "@/helpers";
import {
  addProjectEksternalSchema,
  addProjectInternalSchema,
} from "@/helpers/schemas/ewp/quality-assurance/perencanaan/analisisPerencananaanEWPQualityAssuranceSchema";
import { NavigationTab } from "@/components/molecules/commons";
import { ButtonField, Card } from "@/components/atoms";
import ModalEditProject from "./ModalEditProject";
import TableAnalisisPerencanaan from "./TableAnalisisPerencanaan";
import ModalEditAnalisa from "./ModalEditAnalisa";
import editProjectAddendumUtamaEWPQualityAssuranceSchema from "@/helpers/schemas/ewp/quality-assurance/addendum/utama/editProjectAddendumUtamaEWPQualityAssuranceSchema";
import { useRingkasan } from "@/data/ewp/common/addendum/utama";

const ContentAnalisisPerencanaan = ({
  params,
  user,
  tim,
  isInitiator,
  isCloseSubmodule,
  isOnProgress,
  handleLoadDataFromMAR,
}) => {
  const dispatch = useDispatch();
  const navigationTabItems = [
    { idx: 1, title: "BRISMA" },
    { idx: 2, title: "Eksternal" },
  ];

  const [isDisabledEditAnalisa, setIsDisabledEditAnalisa] = useState(false);

  const [expansionMapInternal, setExpansionMapInternal] = useState({});
  const [expansionMapEksternal, setExpansionMapEksternal] = useState({});
  const [selectedDataInternal, setSelectedDataInternal] = useState({});
  const [selectedDataEksternal, setSelectedDataEksternal] = useState({});
  const [selectedDataEditProject, setSelectedDataEditProject] = useState({});
  const [selectedProyekId, setSelectedProyekId] = useState(0);

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [totalDataProyekList, setTotalDataProyekList] = useState(1);
  const [showModalInternal, setShowModalInternal] = useState(false);
  const [showModalEksternal, setShowModalEksternal] = useState(false);
  const [showModalEditProject, setShowModalEditProject] = useState(false);
  const [showModalEditAnalisa, setShowModalEditAnalisa] = useState(false);

  const dataTableInternal = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objDataTableInternal
  );
  const dataTableEksternal = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objDataTableEksternal
  );
  const dataTableObjekAudit = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objDataTableObjekAudit
  );
  const dataFilterModalInternal = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objDataFilterModalInternal
  );
  const dataPicAnalisator = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objDataPicAnalisator
  );
  const payloadInternal = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objPayloadInternal
  );
  const payloadEksternal = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objPayloadEksternal
  );
  const payloadEditProject = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .objPayloadEditProject
  );
  const validationPayloadInternal = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .validationErrorsInternal
  );
  const validationPayloadEksternal = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .validationErrorsEksternal
  );
  const validationPayloadEditProject = useSelector(
    (state) =>
      state.analisisPerencanaanAddendumUtamaEWPQualityAssurance
        .validationErrorsEditProject
  );

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
  const {
    analisisPerencanaanProyekDetail,
    analisisPerencanaanProyekDetailMutate,
  } = useAnalisisPerencanaanProyekDetail({ id: selectedProyekId });
  const { ringkasanMutate } = useRingkasan({
    id: params?.id,
    module: "qa",
  });

  useEffect(() => {
    if (analisisPerencanaanInternal?.data?.ukers?.length) {
      const listUpdated =
        analisisPerencanaanInternal?.data?.updated_mapa_project || [];
      const mapping = analisisPerencanaanInternal?.data?.ukers?.map((uker) => {
        return {
          id: uker?.id,
          uker_origin_id: uker?.mapa_uker_origin_id,
          branch_kode: uker?.ref_auditee_branch_kode,
          branch_name: uker?.ref_auditee_branch_name,
          orgeh_kode: uker?.ref_auditee_orgeh_kode,
          orgeh_name: uker?.ref_auditee_orgeh_name,
          is_new: Boolean(!uker?.mapa_uker_origin_id),
          is_delete: Boolean(!uker?.is_active),
          role: "parent",
          children: uker?.mapa_project_audit_adendum?.length
            ? uker?.mapa_project_audit_adendum?.map((project) => {
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
                  is_new: Boolean(!project?.mapa_project_origin_id),
                  is_edit: listUpdated?.find((id) => id == project?.id),
                  is_delete: Boolean(project?.is_deleted),
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
    if (analisisPerencanaanEksternal?.data?.ukers?.length) {
      const listUpdated =
        analisisPerencanaanInternal?.data?.updated_mapa_project || [];
      const mapping = analisisPerencanaanEksternal?.data?.ukers?.map((uker) => {
        return {
          id: uker?.id,
          uker_origin_id: uker?.mapa_uker_origin_id,
          branch_kode: uker?.ref_auditee_branch_kode,
          branch_name: uker?.ref_auditee_branch_name,
          orgeh_kode: uker?.ref_auditee_orgeh_kode,
          orgeh_name: uker?.ref_auditee_orgeh_name,
          is_new: Boolean(!uker?.mapa_uker_origin_id),
          is_delete: Boolean(!uker?.is_active),
          role: "parent",
          children: uker?.mapa_project_audit_adendum?.length
            ? uker?.mapa_project_audit_adendum?.map((project) => {
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
                  is_new: Boolean(!project?.mapa_project_origin_id),
                  is_edit: listUpdated?.find((id) => id == project?.id),
                  is_delete: Boolean(project?.is_deleted),
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
    if (tim?.data?.tim_audit) {
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

  useEffect(() => {
    if (analisisPerencanaanProyekDetail?.data) {
      const response = analisisPerencanaanProyekDetail?.data;
      const mappingPetugas = response?.mapa_petugas_adendum?.length
        ? response?.mapa_petugas_adendum?.map((petugas) => {
            return {
              ..._.pick(petugas, ["pn", "nama"]),
            };
          })
        : [];
      dispatch(
        setObjPayloadEditProject({
          analisa: response?.analisa,
          pic: { pn: response?.pn_pic, nama: response?.name_pic },
          petugas: mappingPetugas,
        })
      );
      setSelectedDataEditProject({
        ..._.pick(response, ["project_id", "project_name"]),
      });
    } else {
      dispatch(resetObjPayloadEditProject());
      setSelectedDataEditProject({});
    }
  }, [analisisPerencanaanProyekDetail, showModalEditProject]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
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

  // [ START ] handler for table
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

  const handleClickDeleteProject = async (project_id) => {
    const confirm = await confirmationSwal(
      "Menghapus Project akan menghapus seluruh dokumen terkait."
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisis_perencanaan/${project_id}/remove`,
      {}
    );

    analisisPerencanaanInternalMutate();
    analisisPerencanaanEksternalMutate();
    analisisPerencanaanProyekDetailMutate();
    ringkasanMutate();
    loadingSwal("close");
  };

  const handleClickRestoreProject = async (project_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin mengembalikan perubahan data Project seperti semula?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisis_perencanaan/${project_id}/restore`,
      {}
    );

    analisisPerencanaanInternalMutate();
    analisisPerencanaanEksternalMutate();
    analisisPerencanaanProyekDetailMutate();
    ringkasanMutate();
    loadingSwal("close");
  };

  const handleClickEditProject = (id) => {
    setShowModalEditProject(true);
    setSelectedProyekId(id);
  };

  const handleClickAnalisa = (id) => {
    setShowModalEditAnalisa(true);
    setIsDisabledEditAnalisa(true);
    setSelectedProyekId(id);
  };
  // [ END ] handler for table

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
        mapa_uker_origin_id: selectedDataEksternal?.uker_origin_id,
        pn_pic: payloadEksternal?.pic?.pn,
        name_pic: payloadEksternal?.pic?.name,
      };
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisis_perencanaan/${params?.id}/eksternal/create`,
        payload
      );

      analisisPerencanaanEksternalMutate();
      analisisPerencanaanProyekMutate();
      ringkasanMutate();
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
          mapa_uker_origin_id: selectedDataInternal?.uker_origin_id,
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
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisis_perencanaan/${params?.id}/internal/create`,
        { project: payload }
      );

      analisisPerencanaanProyekDetailMutate();
      analisisPerencanaanInternalMutate();
      ringkasanMutate();
      dispatch(resetObjPayloadInternal());
      dispatch(resetObjDataTableObjekAudit());
      setShowModalInternal(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal add project internal

  // [ START ] handler for modal edit project
  const handleCloseModalEditProject = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    dispatch(resetObjPayloadEditProject());
    dispatch(resetValidationErrorsEditProject());
    setSelectedDataEditProject({});
    setShowModalEditProject(false);
  };

  const handleEditAnalisa = () => {
    setShowModalEditAnalisa(true);
  };

  const handleChangePetugas = (index, value) => {
    const newData = [...payloadEditProject.petugas];
    newData[index] = value;
    dispatch(
      setObjPayloadEditProject({ ...payloadEditProject, petugas: newData })
    );
  };

  const handleAddPetugas = () => {
    if (payloadEditProject?.petugas) {
      const newPetugas = [...payloadEditProject.petugas];
      newPetugas.push({ pn: "", nama: "" });
      dispatch(
        setObjPayloadEditProject({ ...payloadEditProject, petugas: newPetugas })
      );
    } else {
      dispatch(
        setObjPayloadEditProject({ ...payloadEditProject, petugas: [] })
      );
    }
  };

  const handleDeletePetugas = (index) => {
    const newPetugas = [...payloadEditProject.petugas];
    newPetugas.splice(index, 1);
    dispatch(
      setObjPayloadEditProject({ ...payloadEditProject, petugas: newPetugas })
    );
  };

  const handleChangePayloadEditProject = (property, value) => {
    dispatch(
      setObjPayloadEditProject({ ...payloadEditProject, [property]: value })
    );
  };

  const handleResetPayloadEditProject = (property, value) => {
    dispatch(
      setObjPayloadEditProject({ ...payloadEditProject, [property]: value })
    );
  };

  const handleSubmitEditProject = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: editProjectAddendumUtamaEWPQualityAssuranceSchema,
      resetErrors: resetValidationErrorsEditProject,
      setErrors: setValidationErrorsEditProject,
    };
    const validate = setErrorValidation(
      payloadEditProject,
      dispatch,
      schemaMapping
    );

    if (validate) {
      loadingSwal();
      await fetchApi(
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisis_perencanaan/${selectedProyekId}/update`,
        {
          ..._.pick(payloadEditProject, "analisa", "petugas"),
          pn_pic: payloadEditProject?.pic?.pn,
          name_pic: payloadEditProject?.pic?.nama,
        }
      );

      analisisPerencanaanProyekDetailMutate();
      analisisPerencanaanInternalMutate();
      analisisPerencanaanEksternalMutate();
      ringkasanMutate();
      dispatch(resetObjPayloadEditProject());
      dispatch(resetValidationErrorsEditProject());
      setShowModalEditProject(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal edit project

  // [ START ] handler for modal edit uraian control
  const handleCloseModalEditAnalisa = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalEditAnalisa(false);
    setIsDisabledEditAnalisa(false);
  };

  const handleSubmitModalEditAnalisa = (value) => {
    successSwal("Berhasil mengubah analisa");
    handleChangePayloadEditProject("analisa", value);
    setShowModalEditAnalisa(false);
  };
  // [ END ] handler for modal edit uraian control

  return (
    <div>
      <Card>
        <div className="w-full px-6 py-2">
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
                withoutButton={!(isOnProgress && !isCloseSubmodule)}
                handleClickAddProject={handleClickAddProjectInternal}
                handleClickToggleExpansion={handleToggleExpansionInternal}
                handleClickEditProject={handleClickEditProject}
                handleClickAnalisa={handleClickAnalisa}
                handleClickDeleteProject={handleClickDeleteProject}
                handleClickRestoreProject={handleClickRestoreProject}
              />
            ) : (
              <TableAnalisisPerencanaan
                isEksternal
                isInitiator={isInitiator}
                user={user?.data}
                data={dataTableEksternal}
                expansionMap={expansionMapEksternal}
                withoutButton={!(isOnProgress && !isCloseSubmodule)}
                handleClickAddProject={handleClickAddProjectEksternal}
                handleClickToggleExpansion={handleToggleExpansionEksternal}
                handleClickEditProject={handleClickEditProject}
                handleClickAnalisa={handleClickAnalisa}
                handleClickDeleteProject={handleClickDeleteProject}
                handleClickRestoreProject={handleClickRestoreProject}
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
            dataPic={dataPicAnalisator}
            showModal={showModalEksternal}
            payload={payloadEksternal}
            selectedData={selectedDataEksternal}
            validation={validationPayloadEksternal}
            handleCloseModal={handleCloseModal}
            handleChangePayload={handleChangePayloadModalEksternal}
            handleResetPayload={handleResetPayloadModalEksternal}
            handleSubmit={handleSubmitModalEksternal}
          />
          <ModalEditProject
            showModal={showModalEditProject}
            validation={validationPayloadEditProject}
            payload={payloadEditProject}
            dataTeam={dataPicAnalisator}
            selectedData={selectedDataEditProject}
            handleCloseModal={handleCloseModalEditProject}
            handleEditAnalisa={handleEditAnalisa}
            handleChangePayload={handleChangePayloadEditProject}
            handleResetPayload={handleResetPayloadEditProject}
            handleChangePetugasPayload={handleChangePetugas}
            handleAddPetugas={handleAddPetugas}
            handleDeletePetugas={handleDeletePetugas}
            handleSubmit={handleSubmitEditProject}
          />
          <ModalEditAnalisa
            data={payloadEditProject?.analisa || ""}
            showModal={showModalEditAnalisa}
            isDisabled={isDisabledEditAnalisa}
            handleCloseModal={handleCloseModalEditAnalisa}
            handleSubmit={handleSubmitModalEditAnalisa}
          />
        </div>
      </Card>
      <div className="mt-3 flex justify-end">
        <div className="w-36 bg-atlasian-yellow rounded">
          <ButtonField
            text={"Load From MAR"}
            handler={async () =>
              await handleLoadDataFromMAR("analisis_perencanaan")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ContentAnalisisPerencanaan;

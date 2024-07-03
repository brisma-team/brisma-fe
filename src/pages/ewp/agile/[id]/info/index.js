import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { NavigationTab } from "@/components/molecules/commons";
import {
  ProjectDetail,
  InformativeLetter,
  RealizationTable,
  InfoPAT,
  ModalEditProject,
} from "@/components/molecules/ewp/common/info";
import { useAuditInfo, useRelatedProjectInfo } from "@/data/ewp/common/info";
import {
  confirmationSwal,
  convertDate,
  errorSwalTimeout,
  fetchApi,
  infoSwal,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "lodash";
import {
  setObjDataInfoPAT,
  setObjPayloadEditProject,
  setObjPayloadRelatedProject,
  setValidationErrorsEditProject,
  setValidationErrorsRelatedProject,
  resetObjDataInfoPAT,
  resetObjPayloadEditProject,
  resetObjPayloadRelatedProject,
  resetValidationErrorsRelatedProject,
  resetValidationErrorsEditProject,
} from "@/slices/ewp/agile/info/infoEWPAgileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuditSchedule } from "@/data/pat";
import TableRelatedProject from "@/components/molecules/ewp/common/overview/sub-modal/non-pat/TableRelatedProject";
import { relatedProjectNonPATSchema } from "@/helpers/schemas/ewp/common/overviewEWPSchema";
import {
  PATSchema,
  nonPATSchema,
} from "@/helpers/schemas/ewp/common/info/editProjectEWPSchema";
import useUser from "@/data/useUser";
import LandingLayoutEWPAgile from "@/layouts/ewp/LandingLayoutEWPAgile";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}`;

  const navigationTabItems = [
    { idx: 1, title: "Project Details" },
    { idx: 2, title: "Proyek Terkait" },
    { idx: 3, title: "Info PAT" },
  ];

  const [statusName, setStatusName] = useState("");
  const [isPAT, setIsPAT] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isFinalProject, setIsFinalProject] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddNewRowRelatedProject, setIsAddNewRowRelatedProject] =
    useState(false);
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [patId, setPatId] = useState(0);
  const [scheduleAuditId, setScheduleAuditId] = useState(0);
  const [dataTables, setDataTables] = useState([]);
  const [dataRelatedProject, setDataRelatedProject] = useState([]);
  const [showModalEditProject, setShowModalEditProject] = useState(false);

  const { user } = useUser();
  const { auditInfo, auditInfoMutate, auditInfoError, auditInfoIsLoading } =
    useAuditInfo({
      id: params?.id,
      module: "agile",
    });
  const { relatedProjectInfo } = useRelatedProjectInfo({
    id: params?.id,
    module: "agile",
  });
  const { activitySchedule } = useAuditSchedule("detail", {
    id: patId,
    jadwal_id: scheduleAuditId,
  });

  const dataInfoPAT = useSelector((state) => state.infoEWPAgile.objDataInfoPAT);
  const payloadRelatedProject = useSelector(
    (state) => state.infoEWPAgile.objPayloadRelatedProject
  );
  const payloadEditProject = useSelector(
    (state) => state.infoEWPAgile.objPayloadEditProject
  );
  const validationRelatedProject = useSelector(
    (state) => state.infoEWPAgile.validationErrorsRelatedProject
  );
  const validationEditProject = useSelector(
    (state) => state.infoEWPAgile.validationErrorsEditProject
  );

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Overview", path: "/ewp/agile" },
    {
      name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()} / Info`,
      path: `/ewp/agile/${params?.id}/info`,
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    const status_code =
      parseInt(auditInfo?.data?.project_info?.status_kode) || 0;

    setPatId(
      auditInfo?.data?.project_info?.is_pat
        ? auditInfo?.data?.project_info?.pat_id
        : 0
    );
    setScheduleAuditId(
      auditInfo?.data?.project_info?.is_pat
        ? auditInfo?.data?.project_info?.pat_jadwal_audit_id
        : 0
    );
    setDataTables([
      {
        is_open: true,
        is_onprogress: status_code === 1,
        is_close: auditInfo?.data?.realisasi?.penyusunan_mapa_real_start
          ? true
          : false,
        is_without_button: true,
        status_code: 2,
        label: "Project Initiation",
        start_date: auditInfo?.data?.project_info?.createdAt,
        end_date: auditInfo?.data?.realisasi?.penyusunan_mapa_real_start,
        url: `${baseUrl}/initiation`,
      },
      {
        is_open: status_code === 1,
        is_onprogress: status_code === 2,
        is_close: auditInfo?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        status_code: 2,
        is_addendum: Boolean(
          auditInfo?.data?.realisasi?.pelaksanaan_audit_real_start &&
            !auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end
        ),
        label: "Project Plannings",
        start_date: auditInfo?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: auditInfo?.data?.realisasi?.penyusunan_mapa_real_end,
        url: `${baseUrl}/plannings`,
      },
      {
        is_open: auditInfo?.data?.realisasi?.penyusunan_mapa_real_end,
        is_onprogress: status_code === 4 || status_code === 12,
        is_close: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        status_code: 4,
        label: "Project Executions",
        start_date: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end,
        url: `${baseUrl}/executions`,
      },
      {
        is_open: auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end,
        is_onprogress: status_code === 10,
        is_close: auditInfo?.data?.realisasi?.monitoring_real_end
          ? true
          : false,
        status_code: 10,
        label: "Project Retro",
        start_date: auditInfo?.data?.realisasi?.monitoring_real_start,
        end_date: auditInfo?.data?.realisasi?.monitoring_real_end,
        url: `${baseUrl}/landing`,
      },
      {
        is_open: auditInfo?.data?.realisasi?.monitoring_real_end,
        is_onprogress: status_code === 8,
        is_close: auditInfo?.data?.realisasi?.Wrapup_Meeting_real_end
          ? true
          : false,
        status_code: 8,
        label: "Wrap-Up",
        start_date: auditInfo?.data?.realisasi?.Wrapup_Meeting_real_start,
        end_date: auditInfo?.data?.realisasi?.Wrapup_Meeting_real_end,
        url: `${baseUrl}/wrapup`,
      },
    ]);

    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn == user?.data?.pn)
    );
    setIsFinalProject(
      Boolean(auditInfo?.data?.project_info?.status_kode === "9")
    );
    setIsPAT(Boolean(auditInfo?.data?.project_info?.is_pat));
  }, [auditInfo, user]);

  useEffect(() => {
    const projectInfo = auditInfo?.data?.project_info;
    const pickPayload = _.pick(projectInfo, [
      "ref_metode",
      "ref_tipe",
      "ref_jenis",
      "ref_tema",
      "project_name",
      "no_surat",
      "perihal",
      "tanggal_surat",
      "nama_file_surat",
      "url_file_surat",
    ]);
    const objFixPayload = {
      ...pickPayload,
      info_periode_pelaksanaan_start: convertDate(
        projectInfo?.info_periode_pelaksanaan_start,
        "-"
      ),
      info_periode_pelaksanaan_end: convertDate(
        projectInfo?.info_periode_pelaksanaan_end,
        "-"
      ),
      tanggal_surat: convertDate(projectInfo?.tanggal_surat, "-"),
    };
    dispatch(setObjPayloadEditProject(objFixPayload));

    setStatusName(projectInfo?.status_name);
  }, [auditInfo, showModalEditProject]);

  useEffect(() => {
    if (!auditInfoIsLoading && params?.id) {
      setIsError(Boolean(auditInfoError));
    }
  }, [auditInfoError, auditInfoIsLoading, params]);

  useEffect(() => {
    if (relatedProjectInfo?.data?.length) {
      const mappingRelatedProject = relatedProjectInfo?.data?.map((v) => {
        return {
          id: v?.id,
          ..._.pick(v, ["project_name", "project_id"]),
        };
      });
      setDataRelatedProject(mappingRelatedProject);
    } else {
      setDataRelatedProject([]);
    }
  }, [relatedProjectInfo]);

  useEffect(() => {
    if (activitySchedule?.data) {
      const response = activitySchedule?.data;
      const mappingInfoPAT = {
        title: response?.jadwal?.nama,
        type: response?.jadwal?.ref_tipe?.nama,
        jenis: response?.jadwal?.ref_jenis?.nama,
        tema: response?.jadwal?.ref_tema?.nama,
        maker: response?.jadwal?.create_by?.nama,
        createdDate: response?.jadwal?.createdAt,
        start_date: response?.jadwal?.pelaksanaan_start,
        end_date: response?.jadwal?.pelaksanaan_end,
        budget: response?.jadwal?.total_anggaran,
        desc: response?.jadwal?.deskripsi,
        pic: response?.penanggung_jawab?.length
          ? response?.penanggung_jawab?.map((v) => {
              return v?.nama;
            })
          : [],
      };
      dispatch(setObjDataInfoPAT(mappingInfoPAT));
    } else {
      dispatch(resetObjDataInfoPAT());
    }
  }, [activitySchedule]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  const handleClickInitiate = async (statusCode, type) => {
    const pathMappings = {
      2: "mapa",
      4: "pelaksanaan",
      10: "reporting",
      8: "wrapup",
    };

    let path = pathMappings[statusCode] || "";
    path += `/${type === "close" ? "close" : "initiate"}`;

    if (type === "close") {
      const confirm = await confirmationSwal(
        "Aksi ini akan mengakhiri progres saat ini, apakah Anda yakin ingin melanjutkan ke proses berikutnya?"
      );
      if (!confirm.value) {
        return;
      }
    }

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/initiate/${path}/${params?.id}`,
      {}
    );
    auditInfoMutate();
  };

  const handleClickInitiateAddendum = async () => {
    if (statusName !== "addendum") {
      const confirm = await confirmationSwal(
        "Addendum belum dilaksanakan, apakah Anda yakin ingin inisiasi Addendum?"
      );
      if (!confirm.value) {
        return;
      }

      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/initiate/addendum/initiate/${params?.id}`,
        {}
      );

      auditInfoMutate();
      loadingSwal("close");
    }
    setTimeout(() => {
      router.push(`/ewp/agile/${params?.id}/addendum`);
    }, 1000);
  };

  if (isError) {
    errorSwalTimeout(auditInfoError, "/ewp/agile");
  }

  const handleClickLog = () => {
    router.push(`/ewp/agile/${params?.id}/log`);
  };

  // [ START ] handler for modal related project
  const handleSubmitRelatedProject = async () => {
    if (isAddNewRowRelatedProject) {
      await infoSwal(
        "Anda sedang menambahkan proyek terkait. Silahkan lengkapi terlebih dahulu"
      );
      return;
    }
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/project_terkait`,
      {
        ewp_id: params?.id,
        project: _.map(dataRelatedProject, ({ project_id, project_name }) => ({
          project_id,
          project_name,
        })),
      }
    );
    loadingSwal("close");
  };

  const handleChangeTextRelatedProject = (props, value) => {
    const newPayload = {
      ...payloadRelatedProject,
      [props]: value,
    };
    dispatch(setObjPayloadRelatedProject(newPayload));
  };

  const handleClickAddRowRelatedProject = () => {
    if (!isAddNewRowRelatedProject) {
      const newDataTables = [...dataRelatedProject];
      newDataTables?.push(payloadRelatedProject);
      setDataRelatedProject(newDataTables);
      setIsAddNewRowRelatedProject(true);
    }
  };

  const handleClickSaveRelatedProject = (project_id) => {
    const newDataTables = [...dataRelatedProject];
    const findIndex = newDataTables.findIndex(
      (v) => v.project_id === project_id
    );
    if (findIndex !== -1) {
      const schemaMapping = {
        schema: relatedProjectNonPATSchema,
        resetErrors: resetValidationErrorsRelatedProject,
        setErrors: setValidationErrorsRelatedProject,
      };
      const validate = setErrorValidation(
        payloadRelatedProject,
        dispatch,
        schemaMapping
      );

      if (validate) {
        newDataTables[findIndex] = { ...payloadRelatedProject, is_new: false };
        setDataRelatedProject(newDataTables);
        dispatch(resetObjPayloadRelatedProject());
        dispatch(resetValidationErrorsRelatedProject());
        setIsAddNewRowRelatedProject(false);
      }
    }
  };

  const handleClickDeleteRelatedProject = async (project_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    const newDataTables = [...dataRelatedProject];
    const findAnswerIndex = newDataTables?.findIndex(
      (v) => v.project_id == project_id
    );
    newDataTables.splice(findAnswerIndex, 1);
    setDataRelatedProject(newDataTables);
    dispatch(resetValidationErrorsRelatedProject());
    setIsAddNewRowRelatedProject(false);
  };
  // [ END ] handler for modal related project

  // [ START ] handler for modal edit project
  const handleOpenModalEditProject = () => {
    setShowModalEditProject(true);
  };

  const handleCloseModalEditProject = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalEditProject(false);
  };

  const handleChangePayloadEditProject = (property, value) => {
    dispatch(
      setObjPayloadEditProject({
        ...payloadEditProject,
        [property]: value,
      })
    );
  };

  const handleResetPayloadEditProject = (property) => {
    dispatch(
      setObjPayloadEditProject({
        ...payloadEditProject,
        [property]: "",
      })
    );
  };

  const handleUploadSurat = async (e) => {
    loadingSwal();
    const files = e?.target?.files;
    if (files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(
        url,
        {
          file: files[0],
          modul: "ewp",
        },
        true
      );

      dispatch(
        setObjPayloadEditProject({
          ...payloadEditProject,
          url_file_surat: response.url[0],
          nama_file_surat: files[0].name,
        })
      );
    }
    loadingSwal("close");
  };

  const handleSubmitEditProject = async () => {
    const schemaMapping = {
      schema: isPAT ? PATSchema : nonPATSchema,
      resetErrors: resetValidationErrorsEditProject,
      setErrors: setValidationErrorsEditProject,
    };
    const payload = isPAT
      ? _.pick(payloadEditProject, [
          "project_name",
          "info_periode_pelaksanaan_start",
          "info_periode_pelaksanaan_end",
        ])
      : payloadEditProject;

    const validate = setErrorValidation(payload, dispatch, schemaMapping);
    if (validate) {
      loadingSwal();
      await fetchApi(
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/${params?.id}/audit_info/update`,
        payload
      );
      dispatch(resetObjPayloadEditProject());
      dispatch(resetValidationErrorsEditProject());
      auditInfoMutate();
      setShowModalEditProject(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal edit project

  return (
    <LandingLayoutEWPAgile>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Info" />
        <div className="mt-7">
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            width={"w-[20rem]"}
            handleChange={handleChangeTab}
          />
          {currentContentStage === 1 ? (
            <div className="w-full">
              <Card>
                <div className="px-6 pt-1 pb-3 w-full">
                  <div className="flex gap-9">
                    <ProjectDetail data={auditInfo?.data?.project_info} />
                    <InformativeLetter data={auditInfo?.data?.project_info} />
                  </div>
                  <div className="my-4"></div>
                  <RealizationTable
                    data={dataTables}
                    handleClickInitiate={handleClickInitiate}
                    handleClickInitiateAddendum={handleClickInitiateAddendum}
                    handleClickLog={handleClickLog}
                    isHideButton={!isInitiator}
                  />
                </div>
              </Card>
              {isInitiator && !isFinalProject ? (
                <div className="w-full flex items-center justify-end mt-4">
                  <div className="w-48 text-sm font-semibold my-1 bg-atlasian-red rounded">
                    <ButtonField
                      text={"Ubah Project Info"}
                      handler={handleOpenModalEditProject}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : currentContentStage === 2 ? (
            <div className="">
              <TableRelatedProject
                data={dataRelatedProject}
                handleChangeText={handleChangeTextRelatedProject}
                handleClickAddRow={handleClickAddRowRelatedProject}
                handleClickDelete={handleClickDeleteRelatedProject}
                handleClickSave={handleClickSaveRelatedProject}
                payload={payloadRelatedProject}
                validation={validationRelatedProject}
                withoutButton={!isInitiator}
              />
              {isInitiator ? (
                <div className="w-full flex items-center justify-end mt-4">
                  <div
                    className={`w-fit text-sm font-semibold my-1 ${
                      dataRelatedProject?.length
                        ? "bg-atlasian-green"
                        : "bg-atlasian-gray-light"
                    } rounded`}
                  >
                    <ButtonField
                      text={"Simpan"}
                      handler={handleSubmitRelatedProject}
                      disabled={!dataRelatedProject?.length}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : scheduleAuditId ? (
            <InfoPAT data={dataInfoPAT} />
          ) : (
            ""
          )}
        </div>
        <ModalEditProject
          showModal={showModalEditProject}
          payload={payloadEditProject}
          validation={validationEditProject}
          isPAT={isPAT}
          handleChange={handleChangePayloadEditProject}
          handleReset={handleResetPayloadEditProject}
          handleCloseModal={handleCloseModalEditProject}
          handleSubmit={handleSubmitEditProject}
          handleUploadSurat={handleUploadSurat}
        />
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;

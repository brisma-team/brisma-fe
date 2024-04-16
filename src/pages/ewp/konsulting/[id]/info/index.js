import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import {
  NavigationTab,
  ModalDescription,
  ModalAttachment,
} from "@/components/molecules/commons";
import {
  ProjectDetail,
  InformativeLetter,
  RealizationTable,
  UkerAssessmentTable,
  InfoPAT,
  ModalEditProject,
} from "@/components/molecules/ewp/konsulting/info";
import { useProjectDetail } from "@/data/ewp/konsulting";
import {
  useRelatedProjectInfo,
  useUkerAssessmentInfo,
} from "@/data/ewp/konsulting/info";
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
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "lodash";
import {
  setObjDataInfoPAT,
  setObjPayloadEditProject,
  setObjPayloadRelatedProject,
  setObjPayloadUkerAssessment,
  setValidationErrorsEditProject,
  setValidationErrorsRelatedProject,
  resetObjDataInfoPAT,
  resetObjPayloadEditProject,
  resetObjPayloadRelatedProject,
  resetObjPayloadUkerAssessment,
  resetValidationErrorsRelatedProject,
  resetValidationErrorsEditProject,
} from "@/slices/ewp/konsulting/info/infoEWPKonsultingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useActivitySchedule } from "@/data/pat";
import TableRelatedProject from "@/components/molecules/ewp/konsulting/overview/sub-modal/non-pat/TableRelatedProject";
import { relatedProjectNonPATSchema } from "@/helpers/schemas/ewp/konsulting/overview/projectOverviewEWPKonsultingSchema";
import {
  PATSchema,
  nonPATSchema,
} from "@/helpers/schemas/ewp/konsulting/info/editProjectEWPKonsultingSchema";
import useUser from "@/data/useUser";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });

  const navigationTabItems = [
    { idx: 1, title: "Project Details" },
    { idx: 2, title: "Proyek Terkait" },
    { idx: 3, title: "UKER Assessment" },
    { idx: 4, title: "Info PAT" },
  ];
  const [statusName, setStatusName] = useState("");
  const [isPAT, setIsPAT] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isFinalProject, setIsFinalProject] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [isAddNewRowRelatedProject, setIsAddNewRowRelatedProject] =
    useState(false);
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [patId, setPatId] = useState(0);
  const [scheduleActivityId, setScheduleActivityId] = useState(0);
  const [dataTables, setDataTables] = useState([]);
  const [dataRelatedProject, setDataRelatedProject] = useState([]);
  const [dataUkerAssessment, setDataUkerAssessment] = useState([]);
  const [showModalEditProject, setShowModalEditProject] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [showModalAttachment, setShowModalAttachment] = useState(false);

  const { user } = useUser();
  const {
    projectDetail,
    projectDetailError,
    projectDetailMutate,
    projectDetailIsLoading,
  } = useProjectDetail({ id: params?.id });
  const { relatedProjectInfo, relatedProjectInfoMutate } =
    useRelatedProjectInfo({ id: params?.id });
  const { ukerAssessmentInfo, ukerAssessmentInfoMutate } =
    useUkerAssessmentInfo({ id: params?.id });
  const { activitySchedule } = useActivitySchedule("detail", {
    id: patId,
    jadwal_sbp_id: scheduleActivityId,
  });

  const dataInfoPAT = useSelector(
    (state) => state.infoEWPKonsulting.objDataInfoPAT
  );
  const payloadRelatedProject = useSelector(
    (state) => state.infoEWPKonsulting.objPayloadRelatedProject
  );
  const payloadEditProject = useSelector(
    (state) => state.infoEWPKonsulting.objPayloadEditProject
  );
  const payloadUkerAssessment = useSelector(
    (state) => state.infoEWPKonsulting.objPayloadUkerAssessment
  );
  const validationRelatedProject = useSelector(
    (state) => state.infoEWPKonsulting.validationErrorsRelatedProject
  );
  const validationEditProject = useSelector(
    (state) => state.infoEWPKonsulting.validationErrorsEditProject
  );

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Overview", path: "/ewp/konsulting" },
    {
      name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Info`,
      path: `/ewp/konsulting/${params?.id}/info`,
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
      parseInt(projectDetail?.data?.project_info?.status_kode) || 0;

    setPatId(
      projectDetail?.data?.project_info?.is_pat
        ? projectDetail?.data?.project_info?.pat_id
        : 0
    );
    setScheduleActivityId(
      projectDetail?.data?.project_info?.is_pat
        ? projectDetail?.data?.project_info?.pat_jadwal_kegiatan_id
        : 0
    );
    setDataTables([
      {
        is_open: true,
        is_onprogress: status_code === 2,
        is_close: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end
          ? true
          : false,
        status_code: 2,
        is_addendum: Boolean(
          projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start &&
            !projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end
        ),
        label: "Perencanaan",
        start_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_start,
        end_date: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        url: `/ewp/konsulting/${params?.id}/perencanaan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.penyusunan_mapa_real_end,
        is_onprogress: status_code === 4 || status_code === 12,
        is_close: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end
          ? true
          : false,
        status_code: 4,
        label: "Analisa",
        start_date:
          projectDetail?.data?.realisasi?.pelaksanaan_audit_real_start,
        end_date: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        url: `/ewp/konsulting/${params?.id}/analisa`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end,
        is_onprogress: status_code === 6,
        is_close: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end
          ? true
          : false,
        status_code: 6,
        label: "Peluang Peningkatan",
        start_date:
          projectDetail?.data?.realisasi?.peluang_peningkatan_real_start,
        end_date: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end,
        url: `/ewp/konsulting/${params?.id}/peluang-peningkatan`,
      },
      {
        is_open: projectDetail?.data?.realisasi?.peluang_peningkatan_real_end,
        is_onprogress: status_code === 8,
        is_close: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_end
          ? true
          : false,
        status_code: 8,
        label: "Wrap-Up",
        start_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_start,
        end_date: projectDetail?.data?.realisasi?.Wrapup_Meeting_real_end,
        url: `/ewp/konsulting/${params?.id}/wrapup`,
      },
    ]);

    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn == user?.data?.pn
      )
    );
    setIsFinalProject(
      Boolean(projectDetail?.data?.project_info?.status_kode === "9")
    );
    setIsPAT(Boolean(projectDetail?.data?.project_info?.is_pat));
  }, [projectDetail, user]);

  useEffect(() => {
    const projectInfo = projectDetail?.data?.project_info;
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
  }, [projectDetail, showModalEditProject]);

  useEffect(() => {
    if (!projectDetailIsLoading && params?.id) {
      setIsError(Boolean(projectDetailError));
    }
  }, [projectDetailError, projectDetailIsLoading, params]);

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
    if (ukerAssessmentInfo?.data?.length) {
      const mapping = ukerAssessmentInfo?.data?.map((v, i) => {
        return {
          index: i,
          uker_id: v?.id,
          branch: {
            branch_kode: v?.ref_auditee_branch_kode,
            branch_name: v?.ref_auditee_branch_name,
          },
          orgeh: {
            orgeh_kode: v?.ref_auditee_orgeh_kode,
            orgeh_name: v?.ref_auditee_orgeh_name,
          },
          uker_type: { name: v?.tipe_uker },
          description: v?.desc,
          attachments: v?.attachments,
          is_edit: false,
          is_new: false,
        };
      });
      setDataUkerAssessment(mapping);
    } else {
      setDataUkerAssessment([]);
    }
  }, [ukerAssessmentInfo]);

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
      6: "peluang_peningkatan",
      8: "wrapup_meeting",
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/initiate/${path}/${params?.id}`,
      {}
    );
    projectDetailMutate();
  };

  const handleClickInitiateAddendum = async () => {
    if (statusName !== "addendum") {
      const confirm = await confirmationSwal(
        "Addendum belum dilaksanakan, apakah Anda yakin ingin inisiasi Addendum?"
      );
      if (!confirm.value) {
        return;
      }
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/initiate/addendum/initiate/${params?.id}`,
        {}
      );
    }
    router.push(`/ewp/konsulting/${params?.id}/addendum`);
  };

  if (isError) {
    errorSwalTimeout(projectDetailError, "/ewp/konsulting");
  }

  const handleClickLog = () => {
    router.push(`/ewp/konsulting/${params?.id}/log`);
  };

  // [ START ] handler for modal description
  const handleClickDescription = (index) => {
    setSelectedIndex(index);
    setShowModalDescription(true);
  };

  const handleCloseModalDescription = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalDescription(false);
  };

  const handleSubmitDescription = (value) => {
    dispatch(
      setObjPayloadUkerAssessment({
        ...payloadUkerAssessment,
        description: value,
      })
    );
    setShowModalDescription(false);
  };
  // [ END ] handler for modal description

  // [ START ] handler for modal attachment
  const handleClickAttachment = (index) => {
    setSelectedIndex(index);
    setShowModalAttachment(true);
  };

  const handleCloseModalAttachment = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalAttachment(false);
  };

  const handleUploadAttachment = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "pat",
      });

      dispatch(
        setObjPayloadUkerAssessment({
          ...payloadUkerAssessment,
          attachments: response?.url,
        })
      );
      setShowModalDescription(false);
    }
    loadingSwal("close");
  };
  // [ END ] handler for modal attachment

  // [ START ] handler for uker assessment table
  const handleChangePayloadUkerAssessment = (property, value) => {
    dispatch(
      setObjPayloadUkerAssessment({
        ...payloadUkerAssessment,
        [property]: value,
      })
    );
  };

  useEffect(() => {
    console.log("dataUkerAssessment => ", dataUkerAssessment);
  }, [dataUkerAssessment]);

  const handleClickEditUkerAssessment = (index) => {
    const objData = dataUkerAssessment[index];
    const newData = [...dataUkerAssessment];
    newData[index] = { ...newData[index], is_edit: true };
    setDataUkerAssessment(newData);
    dispatch(
      setObjPayloadUkerAssessment({
        branch: {
          branch_kode: objData?.branch?.branch_kode,
          branch_name: objData?.branch?.branch_name,
        },
        orgeh: {
          orgeh_kode: objData?.orgeh?.orgeh_kode,
          orgeh_name: objData?.orgeh?.orgeh_name,
        },
        tipe_uker: objData?.uker_type?.name,
        deskripsi: objData?.desc,
      })
    );
  };

  const handleClickAddRowUkerAssessment = () => {
    if (!isAddNewRowUker) {
      const newDataUkerAssessment = [...dataUkerAssessment];
      newDataUkerAssessment.push({
        ...payloadUkerAssessment,
        index: dataUkerAssessment?.length,
        is_edit: false,
        is_new: true,
      });
      setDataUkerAssessment(newDataUkerAssessment);
      setIsAddNewRowUker(true);
    }
  };

  const handleClickDeleteUkerAssessment = async (uker_id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/uker_info/${uker_id}`,
      {}
    );

    relatedProjectInfoMutate();
    ukerAssessmentInfoMutate();
    loadingSwal("close");
  };

  const handleSaveUkerAssessment = async (isUpdate, uker_id) => {
    loadingSwal();
    const response = await fetchApi(
      isUpdate ? "PATCH" : "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/uker_info/${
        isUpdate ? uker_id : { id: params?.id }
      }`,
      {
        ref_auditee_branch_kode: parseInt(
          payloadUkerAssessment?.branch?.branch_kode
        ),
        ref_auditee_branch_name: payloadUkerAssessment?.branch?.branch_name,
        ref_auditee_orgeh_kode: parseInt(
          payloadUkerAssessment?.orgeh?.orgeh_kode
        ),
        ref_auditee_orgeh_name: payloadUkerAssessment?.orgeh?.orgeh_name,
        tipe_uker: payloadUkerAssessment?.tipe_uker,
        desc: payloadUkerAssessment?.description,
        attachments: payloadUkerAssessment?.attachments,
      }
    );
    if (response.isDismissed) return;
    setIsAddNewRowUker(false);
    ukerAssessmentInfoMutate();
    dispatch(resetObjPayloadUkerAssessment());
    loadingSwal("close");
  };
  // [ END ] handler for uker assessment table

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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/project_terkait`,
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
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/${params?.id}/audit_info/update`,
        payload
      );
      dispatch(resetObjPayloadEditProject());
      dispatch(resetValidationErrorsEditProject());
      projectDetailMutate();
      setShowModalEditProject(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal edit project

  return (
    <LandingLayoutEWPConsulting>
      <div className="w-[71.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <PageTitle text="Project Info" />
        <div className="mt-7">
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            width={"w-[30rem]"}
            handleChange={handleChangeTab}
          />
          {currentContentStage === 1 ? (
            <div className="w-full">
              <Card>
                <div className="px-6 pt-1 pb-3 w-full">
                  <div className="flex gap-9">
                    <ProjectDetail data={projectDetail?.data?.project_info} />
                    <InformativeLetter
                      data={projectDetail?.data?.project_info}
                    />
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
          ) : currentContentStage === 3 ? (
            <UkerAssessmentTable
              data={dataUkerAssessment}
              payload={payloadUkerAssessment}
              withoutButton={!isInitiator}
              handleChange={handleChangePayloadUkerAssessment}
              handleClickAddUkerAssessment={handleClickAddRowUkerAssessment}
              handleClickSave={handleSaveUkerAssessment}
              handleClickEdit={handleClickEditUkerAssessment}
              handleClickDelete={handleClickDeleteUkerAssessment}
              handleClickDescription={handleClickDescription}
              handleClickAttachment={handleClickAttachment}
            />
          ) : scheduleActivityId ? (
            <InfoPAT data={dataInfoPAT} />
          ) : (
            ""
          )}
        </div>
        <ModalDescription
          data={
            dataUkerAssessment[selectedIndex]?.is_new
              ? payloadUkerAssessment?.description
              : dataUkerAssessment[selectedIndex]?.description
          }
          showModal={showModalDescription}
          handleCloseModal={handleCloseModalDescription}
          isEdit={
            dataUkerAssessment[selectedIndex]?.is_new ||
            dataUkerAssessment[selectedIndex]?.is_edit
          }
          handleSubmit={handleSubmitDescription}
        />
        <ModalAttachment
          data={
            dataUkerAssessment[selectedIndex]?.is_new
              ? payloadUkerAssessment?.attachments[0]
              : dataUkerAssessment[selectedIndex]?.attachments[0]
          }
          isEdit={
            dataUkerAssessment[selectedIndex]?.is_new ||
            dataUkerAssessment[selectedIndex]?.is_edit
          }
          showModal={showModalAttachment}
          handleCloseModal={handleCloseModalAttachment}
          handleUpload={handleUploadAttachment}
        />
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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

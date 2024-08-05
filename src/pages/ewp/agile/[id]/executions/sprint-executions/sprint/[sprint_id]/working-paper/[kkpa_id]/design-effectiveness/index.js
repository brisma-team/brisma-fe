import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataUserStory,
  setObjDataTask,
  setObjDataSample,
  setObjDataNewSampleCSV,
  setObjDataPoolSampleCSV,
  setObjDataNewSampleFile,
  setObjDataPoolSampleFile,
  setObjPayloadTask,
  setObjPayloadSample,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjDataSample,
  resetObjDataNewSampleCSV,
  resetObjDataPoolSampleCSV,
  resetObjDataNewSampleFile,
  resetObjDataPoolSampleFile,
  resetObjPayloadTask,
  resetObjPayloadSample,
  resetObjPayloadUploadSample,
} from "@/slices/ewp/agile/executions/designEffectivenessExecutionEWPAgileSlice";
import {
  confirmationSwal,
  convertDataFromCSV,
  errorSwal,
  fetchApi,
  infoSwal,
  loadingSwal,
  usePostFileData,
  withTokenConfig,
} from "@/helpers";
import {
  CardContentSampleDetail,
  TableTask,
  ModalSample,
  ModalUploadSampleFile,
} from "@/components/molecules/ewp/agile/executions/working-paper";
import _ from "lodash";
import {
  ModalDescription,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useDetailSprint } from "@/data/ewp/agile/plannings/sprint-planning";
import {
  useWorkingPaperStatus,
  useWorkingPaperTaskList,
  useWorkingPaperSample,
} from "@/data/ewp/agile/executions/working-paper";
import {
  useContentSampleCSV,
  useSamplePoolCSV,
  useSamplePoolFile,
} from "@/data/ewp/agile/executions/working-paper/sample";

const routes = [
  {
    name: "Design Effectiveness",
    slug: "design-effectiveness",
  },
  {
    name: "Operating Effectiveness",
    slug: "operating-effectiveness",
  },
  {
    name: "Conclusion",
    slug: "conclusion",
  },
  {
    name: "Document",
    slug: "dokumen",
  },
];

const dataTabUploadSample = [
  { kode: "csv", name: "CSV" },
  { kode: "file", name: "File" },
];
const dataTabUploadSampleType = [
  { kode: "new", name: "Upload Sample Baru" },
  { kode: "pool", name: "Pilih Sample Pool" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    sprint_id: 0,
    kkpa_id: 0,
  });

  const baseUrl = `/ewp/agile/${params?.id}/executions`;
  const pathSprint = `${baseUrl}/sprint-executions/sprint/${params?.sprint_id}`;
  const pathWorkingPaper = `${pathSprint}/working-paper/${params?.kkpa_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [dataDeadline, setDataDeadline] = useState({});
  const [showModalEvaluasi, setShowModalEvaluasi] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(0);

  // [ START ] state management for modal upload sample
  const [showModalSample, setShowModalSample] = useState(false);
  const [showModalUploadSampleFile, setShowModalUploadSampleFile] =
    useState(false);
  const [currentModalUploadSampleStage, setCurrentModalUploadSampleStage] =
    useState("csv");
  const [
    currentModalUploadSampleTypeStage,
    setCurrentModalUploadSampleTypeStage,
  ] = useState("new");
  const [selectedSampleId, setSelectedSampleId] = useState(0);
  const [isUpdateSample, setIsUpdateSample] = useState(false);
  // [ START ] state management for modal upload sample

  const dataUserStory = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataUserStory
  );
  const dataTask = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataTask
  );
  const dataSample = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataSample
  );
  const dataNewSampleCSV = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataNewSampleCSV
  );
  const dataPoolSampleCSV = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataPoolSampleCSV
  );
  const dataNewSampleFile = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataNewSampleFile
  );
  const dataPoolSampleFile = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataPoolSampleFile
  );
  const payloadTask = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objPayloadTask
  );
  const payloadSample = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objPayloadSample
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { detailSprint } = useDetailSprint({ id: params?.sprint_id });
  const { workingPaperTaskList, workingPaperTaskListMutate } =
    useWorkingPaperTaskList({
      id: params?.kkpa_id,
      task_type: 2,
    });
  const { workingPaperStatus } = useWorkingPaperStatus({
    id: params?.kkpa_id,
  });
  const {
    workingPaperSample,
    workingPaperSampleError,
    workingPaperSampleMutate,
  } = useWorkingPaperSample({ id: params?.kkpa_id, task_type: 2 });
  const { contentSampleCSV } = useContentSampleCSV({
    id: selectedSampleId,
    kkpa_id: params?.kkpa_id,
  });
  const { samplePoolCSV, samplePoolCSVMutate } = useSamplePoolCSV({
    id: params?.kkpa_id,
  });
  const { samplePoolFile, samplePoolFileMutate } = useSamplePoolFile({
    id: params?.kkpa_id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, sprint_id, kkpa_id } = router.query;
    setParams({
      id,
      sprint_id,
      kkpa_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (auditInfo?.data && detailSprint?.data) {
      const responseSprint = detailSprint?.data;
      setDataDeadline(_.pick(responseSprint, ["start_date", "end_date"]));
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "EWP", path: "/ewp" },
        { name: "Overview", path: "/ewp/agile" },
        {
          name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
          path: `/ewp/agile/${params?.id}`,
        },
        { name: "Project Executions", path: baseUrl },
        {
          name: "Sprint Executions",
          path: `${baseUrl}/sprint-executions`,
        },
        {
          name: responseSprint?.sprint_name,
          path: pathSprint,
        },
        {
          name: "Working Paper",
          path: pathWorkingPaper,
        },
        {
          name: "Design Effectiveness",
          path: `${pathWorkingPaper}/design-effectiveness`,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo, detailSprint]);

  useEffect(() => {
    if (workingPaperTaskList?.data?.tasking?.length) {
      const mapping = workingPaperTaskList?.data?.tasking?.map(
        (data, index) => {
          return {
            ..._.pick(data, [
              "id",
              "description",
              "status_penyelesaian",
              "hasil_pengujian",
              "evaluasi",
              "result",
            ]),
            index,
            pic: { pn: data?.pn_auditor, name: data?.name_auditor },
          };
        }
      );
      dispatch(setObjDataTask(mapping));
    } else {
      dispatch(resetObjDataTask());
    }
  }, [workingPaperTaskList]);

  useEffect(() => {
    if (workingPaperStatus?.data && workingPaperTaskList?.data?.info) {
      dispatch(
        setObjDataUserStory({
          jumlah_sample: workingPaperStatus?.data?.rl_jumlah_sample,
          populasi: workingPaperTaskList?.data?.info?.rl_jumlah_populasi_de,
        })
      );
    } else {
      dispatch(resetObjDataUserStory());
    }
  }, [workingPaperStatus, workingPaperTaskList]);

  useEffect(() => {
    if (!workingPaperSampleError) {
      dispatch(setObjDataSample(workingPaperSample?.data));
    } else {
      dispatch(resetObjDataSample());
    }
  }, [workingPaperSample, showModalSample]);

  useEffect(() => {
    if (contentSampleCSV?.data?.csvPool) {
      const responseCsv = contentSampleCSV?.data?.csvPool;
      const mappingValues = contentSampleCSV?.data?.existingSample?.length
        ? contentSampleCSV?.data?.existingSample?.map((v) => {
            return v?.value;
          })
        : [];
      const fetchData = async () => {
        try {
          const { headers } = withTokenConfig();
          const response = await fetch(responseCsv?.directory, {
            method: "GET",
            headers: {
              ...headers,
              "Strict-Transport-Security": "max-age=86400; preload",
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const file = await response.text();
          const data = await convertDataFromCSV(file);

          dispatch(
            setObjDataNewSampleCSV({
              ...dataNewSampleCSV,
              url: responseCsv?.directory,
              filename: responseCsv?.filename,
              columns: data?.columns,
              data: data?.data,
              total_row: data?.total_data,
              values: mappingValues,
            })
          );

          setCurrentModalUploadSampleTypeStage("new");
        } catch (error) {
          console.log("error => ", error?.message);
        }
      };

      fetchData();
    }
  }, [contentSampleCSV, selectedSampleId]);

  useEffect(() => {
    if (samplePoolCSV?.data?.length) {
      const mapping = samplePoolCSV?.data?.map((v) => {
        return {
          ..._.pick(v, ["id", "directory", "filename"]),
          uploader: {
            pn: v?.pn_uploader,
            name: v?.name_uploader,
          },
          risk_issue: _.pick(v?.original_risk_issue, ["kode", "abbr", "nama"]),
        };
      });

      dispatch(setObjDataPoolSampleCSV(mapping));
    } else {
      dispatch(resetObjDataPoolSampleCSV());
    }
  }, [samplePoolCSV, showModalUploadSampleFile]);

  useEffect(() => {
    if (samplePoolFile?.data?.length) {
      const mapping = samplePoolFile?.data?.map((v) => {
        return {
          ..._.pick(v, ["id", "directory", "filename", "description"]),
          uploader: {
            pn: v?.pn_uploader,
            name: v?.name_uploader,
          },
          upload_date: v?.created_at,
          risk_issue: _.pick(v?.original_risk_issue, ["kode", "abbr", "nama"]),
        };
      });

      dispatch(setObjDataPoolSampleFile(mapping));
    } else {
      dispatch(resetObjDataPoolSampleFile());
    }
  }, [samplePoolFile, showModalUploadSampleFile]);

  const handleClickUploadSample = () => {
    setShowModalSample(true);
  };

  // [ START ] handler for table task
  const handleChangeStatusTask = async (id, value) => {
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/tasking/update/${id}`,
      { status_penyelesaian: value },
      true
    );
    workingPaperTaskListMutate();
  };

  const handleChangeEffectivenessTask = async (id, value) => {
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/tasking/update/${id}`,
      { hasil_pengujian: value },
      true
    );
    workingPaperTaskListMutate();
  };

  const handleClickEditEvaluasi = (task_index) => {
    setSelectedTaskId(dataTask[task_index].id);
    dispatch(
      setObjPayloadTask({
        ...payloadTask,
        evaluasi: dataTask[task_index].result,
      })
    );
    setShowModalEvaluasi(true);
  };
  // [ END ] handler for table task

  // [ START ] handler for modal update evaluasi task
  const handleCloseModalEvaluasi = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalEvaluasi(false);
    dispatch(resetObjPayloadTask());
  };

  const handleSubmitUpdateEvaluasi = async (value) => {
    if (!value) {
      infoSwal("Silahkan isi evaluasi!");
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/tasking/update/${selectedTaskId}`,
      { result: value }
    );
    workingPaperTaskListMutate();
    dispatch(resetObjPayloadTask());
    setShowModalEvaluasi(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal update comment task

  // [ START ] handler for modal sample
  const handleCloseModalSample = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalSample(false);
    dispatch(resetObjDataSample());
    dispatch(resetObjPayloadUploadSample());
  };

  const handleChangeTabUploadSample = (kode) => {
    setCurrentModalUploadSampleStage(kode);
    dispatch(resetObjPayloadSample());
  };

  const handleClickPickSample = () => {
    setShowModalUploadSampleFile(true);
  };

  const handleChangeCheckboxSample = (isChecked, sample_id) => {
    const updatedData = [...payloadSample];

    if (isChecked) {
      const findId = updatedData.some((data) => data === sample_id);

      if (!findId) {
        updatedData.push(sample_id);
      }
    } else {
      const filter = updatedData.filter((data) => data !== sample_id);
      dispatch(setObjPayloadSample(filter));
      return;
    }

    dispatch(setObjPayloadSample(updatedData));
  };

  const handleClickEditSample = (id) => {
    setSelectedSampleId(id);
    setIsUpdateSample(true);
    setShowModalUploadSampleFile(true);
  };

  const handleClickDeleteSample = async () => {
    if (!payloadSample.length) {
      await errorSwal("Silahkan pilih data yang ingin dihapus");
      return;
    }

    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    const payload = payloadSample?.map((sample_id) => {
      return {
        objek_sample_id: sample_id,
      };
    });

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/sample/${currentModalUploadSampleStage}/${params?.kkpa_id}`,
      payload
    );

    workingPaperSampleMutate();
    dispatch(resetObjPayloadSample());
    loadingSwal("close");
  };
  // [ END ] handler for modal sample

  // [ START ] handler for modal upload sample
  const mappingReduxUploadSampleCSV = {
    state: {
      new: dataNewSampleCSV,
      pool: dataPoolSampleCSV,
    },
    action: {
      new: setObjDataNewSampleCSV,
      pool: setObjDataPoolSampleCSV,
    },
  };

  const mappingReduxUploadSampleFile = {
    state: {
      new: dataNewSampleFile,
      pool: dataPoolSampleFile,
    },
    action: {
      new: setObjDataNewSampleFile,
      pool: setObjDataPoolSampleFile,
    },
  };

  const handleChangeTabUploadSampleType = (kode) => {
    setCurrentModalUploadSampleTypeStage(kode);
  };

  const handleCloseModalUploadSampleFile = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setSelectedSampleId(0);
    setIsUpdateSample(false);
    setShowModalUploadSampleFile(false);
    setCurrentModalUploadSampleTypeStage("new");
    dispatch(resetObjDataNewSampleCSV());
    dispatch(resetObjDataPoolSampleCSV());
    dispatch(resetObjDataNewSampleFile());
    dispatch(resetObjDataPoolSampleFile());
  };

  // [ START ] handler for upload csv
  const handleChangeCheckboxCSV = (isChecked, no) => {
    const updatedData = [...(dataNewSampleCSV?.values || [])];
    if (isChecked) {
      const findData = updatedData.some((value) => value === no);

      if (!findData) {
        updatedData.push(no);
      }
    } else {
      const filter = updatedData.filter((value) => value !== no);
      dispatch(
        setObjDataNewSampleCSV({
          ...dataNewSampleCSV,
          values: filter,
        })
      );
      return;
    }

    dispatch(
      setObjDataNewSampleCSV({
        ...dataNewSampleCSV,
        values: updatedData,
      })
    );
  };

  const handleUploadSampleCSV = async (e) => {
    loadingSwal();
    if (e?.target?.files) {
      if (e.target.files[0]?.type !== "application/vnd.ms-excel") {
        await errorSwal(`Format .csv tidak didukung`);
        return;
      }

      const upload = await usePostFileData(
        `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`,
        {
          file: e?.target?.files[0],
          modul: "ewp",
        }
      );

      const url = upload?.url[0];
      const file = e?.target?.files[0];

      convertDataFromCSV(file)
        .then((data) => {
          dispatch(
            setObjDataNewSampleCSV({
              ...dataNewSampleCSV,
              url,
              filename: file?.name,
              columns: data?.columns,
              data: data?.data,
              total_row: data?.total_data,
            })
          );
        })
        .catch((error) => {
          console.error(error.message);
        });
    }

    loadingSwal("close");
  };

  const handleSubmitUpdateCSV = async () => {
    if (!dataNewSampleCSV?.values?.length) {
      infoSwal("Silahkan pilih data yang ingin dijadikan sample!");
      return;
    }
    loadingSwal();

    const mappingValue = dataNewSampleCSV?.values?.map((v) => {
      return {
        objek_sample_id: selectedSampleId,
        value: v,
      };
    });
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/sample/csv/update/${params?.kkpa_id}`,
      {
        sample_id: mappingValue,
        task_type_kode: 2,
        task_type_name: "Design Effectiveness",
      }
    );

    setIsUpdateSample(false);
    workingPaperSampleMutate();
    samplePoolCSVMutate();
    dispatch(resetObjDataNewSampleCSV());
    setShowModalUploadSampleFile(false);
    loadingSwal("close");
  };

  const handleSubmitUploadCSV = async () => {
    if (!dataNewSampleCSV?.url) {
      infoSwal("Silahkan upload file terlebih dahulu!");
      return;
    }

    if (!dataNewSampleCSV?.values?.length) {
      infoSwal("Silahkan pilih data yang ingin dijadikan sample!");
      return;
    }
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/sample/csv/upload/${params?.kkpa_id}`,
      {
        ..._.pick(dataNewSampleCSV, [
          "url",
          "filename",
          "values",
          "sample_pool_id",
        ]),
        jumlah_baris: dataNewSampleCSV?.total_row,
        uniq_column: "no",
        task_type_kode: 2,
        task_type_name: "Design Effectiveness",
      }
    );

    workingPaperSampleMutate();
    samplePoolCSVMutate();
    dispatch(resetObjDataNewSampleCSV());
    setShowModalUploadSampleFile(false);
    loadingSwal("close");
  };
  // [ END ] handler for upload csv

  // [ START ] handler for pool csv
  const handleClickDownloadPoolSampleCSV = async (params) => {
    loadingSwal();
    const { headers } = withTokenConfig();
    const response = await fetch(params?.directory, {
      method: "GET",
      headers: {
        ...headers,
        "Strict-Transport-Security": "max-age=86400; preload",
      },
    });

    const file = await response.text();
    convertDataFromCSV(file)
      .then((data) => {
        dispatch(
          setObjDataNewSampleCSV({
            ...dataNewSampleCSV,
            sample_pool_id: params?.id,
            url: params?.directory,
            filename: params?.filename,
            columns: data?.columns,
            data: data?.data,
            total_row: data?.total_data,
          })
        );
      })
      .catch((error) => {
        console.log("error => ", error?.message);
      });

    setCurrentModalUploadSampleTypeStage("new");
    loadingSwal("close");
  };

  const handleClickDeletePoolSampleCSV = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/pool/csv/${id}`,
      {}
    );

    samplePoolCSVMutate();
    loadingSwal("close");
  };
  // [ END ] handler for pool csv

  // [ START ] handler for upload file
  const handleChangeDescriptionFile = (value) => {
    dispatch(
      setObjDataNewSampleFile({ ...dataNewSampleFile, description: value })
    );
  };

  const handleUploadSampleFile = async (e) => {
    loadingSwal();
    if (e?.target?.files) {
      const upload = await usePostFileData(
        `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`,
        {
          file: e?.target?.files[0],
          modul: "ewp",
        }
      );

      const url = upload?.url[0];
      const file = e?.target?.files[0];

      dispatch(
        setObjDataNewSampleFile({
          ...dataNewSampleFile,
          filename: file?.name,
          url,
        })
      );
    }

    loadingSwal("close");
  };

  const handleSubmitUploadFile = async () => {
    if (!dataNewSampleFile?.url) {
      infoSwal("Silahkan upload file terlebih dahulu!");
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/sample/file/upload/${params?.kkpa_id}`,
      {
        ...dataNewSampleFile,
        task_type_kode: 2,
        task_type_name: "Design Effectiveness",
      }
    );

    workingPaperSampleMutate();
    samplePoolFileMutate();
    dispatch(resetObjDataNewSampleFile());
    setShowModalUploadSampleFile(false);
    loadingSwal("close");
  };
  // [ END ] handler for upload file

  // [ START ] handler for pool file
  const handleClickDownloadPoolSampleFile = async (params) => {
    loadingSwal();
    dispatch(
      setObjDataNewSampleFile({
        url: params?.directory,
        filename: params?.filename,
        description: params?.description,
      })
    );
    setCurrentModalUploadSampleTypeStage("new");
    loadingSwal("close");
  };

  const handleClickDeletePoolSampleFile = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/pool/file/${id}`,
      {}
    );

    samplePoolFileMutate();
    loadingSwal("close");
  };
  // [ END ] handler for pool csv
  // [ END ] handler for modal upload sample

  return (
    <LandingLayoutEWPAgile>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 justify-between items-center mb-7">
        <PageTitle text="Design Effectiveness" />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          nextUrl={"/operating-effectiveness"}
          marginLeft={"-80px"}
          widthDropdown={"w-[16rem]"}
        />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-4">
        <CardContentSampleDetail
          data={dataUserStory}
          handleClickUploadSample={handleClickUploadSample}
        />
        <TableTask
          data={dataTask}
          dataUserStory={dataUserStory}
          dataDeadline={dataDeadline}
          handleClickEditEvaluasi={handleClickEditEvaluasi}
          handleChangeStatusTask={handleChangeStatusTask}
          handleChangeEffectivenessTask={handleChangeEffectivenessTask}
        />
      </div>
      <ModalDescription
        isEdit
        headerText={"Ubah Evaluasi Task"}
        data={payloadTask?.evaluasi || ""}
        showModal={showModalEvaluasi}
        handleCloseModal={handleCloseModalEvaluasi}
        handleSubmit={handleSubmitUpdateEvaluasi}
      />
      <ModalSample
        showModal={showModalSample}
        currentModalStage={currentModalUploadSampleStage}
        dataTab={dataTabUploadSample}
        dataSample={dataSample}
        handleCloseModal={handleCloseModalSample}
        handleClickPickSample={handleClickPickSample}
        handleChangeCheckbox={handleChangeCheckboxSample}
        handleChangeCurrentTab={handleChangeTabUploadSample}
        handleEditSample={handleClickEditSample}
        handleDeleteSample={handleClickDeleteSample}
      />
      <ModalUploadSampleFile
        showModal={showModalUploadSampleFile}
        mappingReduxCSV={mappingReduxUploadSampleCSV}
        mappingReduxFile={mappingReduxUploadSampleFile}
        currentModalStage={currentModalUploadSampleStage}
        currentModalSubStage={currentModalUploadSampleTypeStage}
        dataTab={dataTabUploadSampleType}
        isUpdateSample={isUpdateSample}
        handleCloseModal={handleCloseModalUploadSampleFile}
        handleChangeCurrentTab={handleChangeTabUploadSampleType}
        handleChangeDescriptionFile={handleChangeDescriptionFile}
        handleClickCheckboxCSV={handleChangeCheckboxCSV}
        handleClickDownloadPoolSampleCSV={handleClickDownloadPoolSampleCSV}
        handleClickDeletePoolSampleCSV={handleClickDeletePoolSampleCSV}
        handleClickDownloadPoolSampleFile={handleClickDownloadPoolSampleFile}
        handleClickDeletePoolSampleFile={handleClickDeletePoolSampleFile}
        handleUploadSampleCSV={handleUploadSampleCSV}
        handleUploadSampleFile={handleUploadSampleFile}
        handleSubmitUploadCSV={handleSubmitUploadCSV}
        handleSubmitUploadFile={handleSubmitUploadFile}
        handleSubmitUpdateCSV={handleSubmitUpdateCSV}
      />
      {/* End Content */}
    </LandingLayoutEWPAgile>
  );
};

export default index;

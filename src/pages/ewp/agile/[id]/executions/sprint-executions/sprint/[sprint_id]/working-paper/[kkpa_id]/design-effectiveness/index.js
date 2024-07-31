import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LandingLayoutEWPAgile } from "@/layouts/ewp";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataUserStory,
  setObjDataTask,
  setObjPayloadTask,
  setObjPayloadSelectedSample,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjPayloadTask,
  resetObjPayloadSelectedSample,
} from "@/slices/ewp/agile/executions/designEffectivenessExecutionEWPAgileSlice";
import {
  confirmationSwal,
  errorSwal,
  fetchApi,
  infoSwal,
  loadingSwal,
} from "@/helpers";
import {
  CardContentSampleDetail,
  TableTask,
  ModalUploadSample,
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
} from "@/data/ewp/agile/executions/working-paper";

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
  { no: 1, name: "CSV" },
  { no: 2, name: "File" },
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
  const [showModalUploadSample, setShowModalUploadSample] = useState(false);
  const [currentModalUploadSampleStage, setCurrentModalUploadSampleStage] =
    useState(1);
  const [isPickSample, setIsPickSample] = useState(false);
  // [ START ] state management for modal upload sample

  const dataUserStory = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataUserStory
  );
  const dataTask = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objDataTask
  );
  const payloadTask = useSelector(
    (state) => state.designEffectivenessExecutionEWPAgile.objPayloadTask
  );
  const payloadSelectedSample = useSelector(
    (state) =>
      state.designEffectivenessExecutionEWPAgile.objPayloadSelectedSample
  );

  const { auditInfo } = useAuditInfo({ module: "agile", id: params?.id });
  const { detailSprint } = useDetailSprint({ id: params?.sprint_id });
  const { workingPaperTaskList, workingPaperTaskListMutate } =
    useWorkingPaperTaskList({
      id: params?.kkpa_id,
      task_type: 1,
    });
  const { workingPaperStatus } = useWorkingPaperStatus({
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

  const handleClickUploadSample = () => {
    setShowModalUploadSample(true);
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

  // [ START ] handler for modal upload sample
  const handleChangeStage = (index) => {
    setCurrentModalUploadSampleStage(index);
  };

  const handleClickPickSample = () => {
    setIsPickSample(true);
  };

  const handleClickDeleteSample = async () => {
    if (!payloadSelectedSample.length) {
      await errorSwal("Silahkan pilih data yang ingin dihapus");
      return;
    }

    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();

    let url;
    switch (currentModalUploadSampleStage) {
      case 1:
        url = `sample_csv`;
        break;
      case 2:
        url = `sample_file`;
        break;
    }
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/${id}/${selectedRiskIssue}/${url}`,
      payloadSelectedSample
    );

    loadingSwal("close");
    sampleUploadMapaEWPMutate();
  };
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
      <ModalUploadSample
        showModal={showModalUploadSample}
        dataTab={dataTabUploadSample}
        currentModalStage={currentModalUploadSampleStage}
        handleClickPickSample={handleClickPickSample}
        handleChangeCurrentTab={handleChangeStage}
      />
      {/* End Content */}
    </LandingLayoutEWPAgile>
  );
};

export default index;

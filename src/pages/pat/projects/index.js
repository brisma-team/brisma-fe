import React, { useEffect, useState } from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import {
  CardFilterProjectOverview,
  ModalCreateProjectPAT,
} from "@/components/molecules/pat/overview";
import useProjectOverview from "@/data/pat/useProjectOverview";
import { CardOverview } from "@/components/molecules/pat/overview";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import {
  setWorkflowData,
  resetWorkflowData,
  setValidationErrorsWorkflow,
  resetValidationErrorsWorkflow,
} from "@/slices/ewp/konsulting/changeInitiatorSlice";
import _ from "lodash";
import useApprovalPat from "@/data/pat/useApprovalPat";
import {
  confirmationSwal,
  convertDate,
  errorSwal,
  fetchApi,
  setErrorValidation,
} from "@/helpers";
import { ModalWorkflowResetPAT } from "@/components/molecules/pat/reset-pat";
import { useWorkflowResetPAT, useWorkflowResetPATLog } from "@/data/pat";
import { useDispatch, useSelector } from "react-redux";
import workflowResetSchema from "@/helpers/schemas/pat/workflowResetSchema";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
];

const convertProgressAndPercent = (approvers, status_approver, status_pat) => {
  let progress, percent;
  switch (status_pat) {
    case "Final":
      progress = 1;
      percent = "100%";
      break;
    case "On Approver":
      progress = 0.6;
      percent = "66%";
      break;
    case "On Progress":
      progress = 0.3;
      percent = "33%";
      break;
    default:
      progress = 0;
      percent = "0%";
      break;
  }

  return { progress, percent };
};

const index = () => {
  const dispatch = useDispatch();
  const [totalData, setTotalData] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalWorkflowApproval, setShowModalWorkflowApproval] =
    useState(false);
  const [payloadWorkflow, setPayloadWorkflow] = useState({
    id: "",
  });
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [params, setParams] = useState({
    project_name: "",
    status_approver: "",
    status_pat: "",
    year: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [filter, setFilter] = useState({
    project_name: "",
    status_approver: "",
    status_pat: "",
    year: "",
    sort_by: "ASC",
    limit: 8,
    page: 1,
  });

  const { projectOverview, projectOverviewMutate, projectOverviewError } =
    useProjectOverview(params);
  const { approvalPat } = useApprovalPat();

  const { workflowReset, workflowResetMutate } = useWorkflowResetPAT({
    id: payloadWorkflow?.id,
  });
  const { workflowResetLog } = useWorkflowResetPATLog({
    id: payloadWorkflow?.id,
  });

  const workflowData = useSelector(
    (state) => state.changeInitiator.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.changeInitiator.validationErrorsWorkflow
  );

  useEffect(() => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
      };
    });
  }, [filter.limit]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      projectOverviewMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (projectOverview) {
      const mapping = projectOverview.data.map((v) => {
        return {
          id: v.id,
          title: v.pat_name,
          year: v.tahun,
          progress: convertProgressAndPercent(
            v?.approvers,
            v?.status_approver,
            v?.status_pat
          ).progress,
          percent: convertProgressAndPercent(
            v?.approvers,
            v?.status_approver,
            v?.status_pat
          ).percent,
          documentStatus: v?.status_pat,
          apporovalStatus: v?.status_approver
            ? `On ${v?.status_approver?.pn}`
            : `-`,
          addendum: v?.riwayat_adendum.toString(),
          href: `/pat/projects/${v.id}`,
        };
      });
      setData(mapping);
      setTotalData(projectOverview?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(0);
    }
  }, [projectOverview, params]);

  useEffect(() => {
    if (workflowReset?.data && showModalWorkflowApproval) {
      const workflowInfo = workflowReset?.data?.info;
      const maker = workflowReset?.data?.initiator;
      const approvers = workflowReset?.data?.approver;
      const signers = workflowReset?.data?.signer;

      const newWorkflowData = {
        ...workflowData,
        status_approver: workflowInfo?.status_persetujuan,
        on_approver: workflowInfo?.status_approver,
        initiator_from: {
          pn: workflowInfo?.pn_from,
          name: workflowInfo?.name_from,
        },
        initiator_to: {
          pn: workflowInfo?.pn_to,
          name: workflowInfo?.name_to,
        },
      };

      newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.name}`;
      newWorkflowData.maker = {
        pn: workflowInfo?.pn_from,
        nama: workflowInfo?.name_from,
      };

      if (approvers?.length) {
        const mappingApprovers = _.map(
          approvers,
          ({ pn, nama, is_signed }) => ({
            pn,
            nama,
            is_signed,
          })
        );
        newWorkflowData.ref_tim_audit_approver = mappingApprovers;
      }

      if (signers?.length) {
        const mappingSigners = _.map(signers, ({ nama, pn }) => ({ nama, pn }));
        newWorkflowData.ref_tim_audit_signer = mappingSigners;
      }

      if (workflowResetLog?.data?.log?.length) {
        const mapping = workflowResetLog?.data?.log?.map((v) => {
          return {
            children: v?.children?.length
              ? v?.children?.map((child) => ({
                  role: "child",
                  pic: child?.from?.pn + " - " + child?.from?.nama,
                  alasan: child?.note,
                  status:
                    child?.is_signed === true
                      ? "Approved"
                      : child?.is_signed === false
                      ? "Rejected"
                      : child?.note || "",
                  tanggal: convertDate(v?.createdAt, "-", "d"),
                }))
              : [],
            id: v?.id,
            role: "parent",
            pic: v?.create_by?.pn + " - " + v?.create_by?.fullName,
            alasan: v?.note,
            status: "",
            tanggal: convertDate(v?.createdAt, "-", "d"),
          };
        });
        setHistoryWorkflow(mapping);
      }

      dispatch(setWorkflowData(newWorkflowData));
    } else {
      dispatch(resetWorkflowData());
    }
  }, [workflowReset, setShowModalWorkflowApproval]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleReset = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin mengajukan pengaturan ulang PAT ini?"
    );
    if (!confirm.value) {
      return;
    }
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/request-reset/create/${id}`,
      { note: "kebutuhan reset pat" }
    );
  };

  const handleApproval = async (id) => {
    console.log(id);
    setShowModalWorkflowApproval(true);
    setPayloadWorkflow({ ...payloadWorkflow, id });
  };

  const handleSubmitWorkflow = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowResetSchema,
      resetErrors: resetValidationErrorsWorkflow,
      setErrors: setValidationErrorsWorkflow,
    };
    const validate = setErrorValidation(workflowData, dispatch, schemaMapping);
    // const validate = true;
    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "reset_pat_id",
        sub_modul_id: payloadWorkflow?.id,
      };

      data.pn_to = workflowData?.initiator_to?.pn;
      data.name_to = workflowData?.initiator_to?.name;

      const signedCount = workflowData?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      if (actionType === "" || actionType === undefined) {
        return;
      }

      switch (actionType) {
        case "change":
          data.approvers = workflowData.ref_tim_audit_approver;
          data.signers = [];
          break;
        case "create":
          data.approvers = workflowData.ref_tim_audit_approver;
          data.signers = [];
          break;
        case "reject":
          if (!workflowData.note) {
            await errorSwal("Silahkan berikan alasan!");
            return;
          }
          data.note = workflowData.note;
          break;
        case "approve":
          if (signedCount >= workflowData?.ref_tim_audit_approver?.length) {
            data.data = "<p>pirli test</p>";
          }
          data.note = workflowData.note;
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
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/request-reset/workflow`,
          data
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/request-reset/workflow/${actionType}`,
          data
        );
      }
      projectOverviewMutate();
      workflowResetMutate();
      dispatch(resetWorkflowData());
      setShowModalWorkflowApproval(false);
    }
    projectOverviewMutate();
    workflowResetMutate();
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

  const handleChangeText = (property, value) => {
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: value,
      })
    );
  };

  const handleAdd = (property) => {
    const newData = [...workflowData[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: newData,
      })
    );
  };

  const handleDelete = (property, idx) => {
    const newData = [...workflowData[property]];
    newData.splice(idx, 1);
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: newData,
      })
    );
  };

  return (
    <PatOverviewLayout
      title={"Approval Information"}
      data={approvalPat?.data?.header}
    >
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      {/* Start Filter */}
      <div className="flex gap-3 items-center">
        <div className="w-36 rounded bg-atlasian-blue-light">
          <ButtonField
            handler={() => setOpenFilter(!openFilter)}
            text={openFilter ? `Tutup Filter` : `Tampilkan Filter`}
          />
        </div>
        <div className="w-40 rounded bg-atlasian-purple">
          <ButtonField
            handler={() => setShowModal(true)}
            text={"Buat Project"}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <CardFilterProjectOverview
          openFilter={openFilter}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="w-full flex justify-end items-end p-2">
          <SelectSortFilter change={handleChangeFilter} />
        </div>
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {projectOverviewError ? (
        <DataNotFound />
      ) : data?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-4 overflow-hidden -ml-2">
          {data.map((v, i) => {
            return (
              <CardOverview
                key={i}
                id={v.id}
                title={v.title}
                year={v.year}
                progress={v.progress}
                percent={v.percent}
                documentStatus={v.documentStatus}
                apporovalStatus={v.apporovalStatus}
                addendum={v.addendum}
                href={v.href}
                handleApproval={handleApproval}
                handleReset={handleReset}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
      <CustomPagination
        perPage={filter.limit}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        defaultCurrentPage={filter.page}
        totalData={totalData}
      />
      <ModalWorkflowResetPAT
        workflowData={workflowData}
        historyWorkflow={historyWorkflow}
        validationErrors={validationErrorsWorkflow}
        setShowModal={setShowModalWorkflowApproval}
        showModal={showModalWorkflowApproval}
        headerTitle={"Pengajuan Reset P.A.T"}
        handleChange={handleChangeText}
        handleChangeSelect={handleChangeSelect}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleSubmit={handleSubmitWorkflow}
        handleCloseModal={() => setShowModalWorkflowApproval(false)}
      />
      {/* End Content */}
      <ModalCreateProjectPAT
        showModal={showModal}
        setShowModal={setShowModal}
        mutate={projectOverviewMutate}
      />
    </PatOverviewLayout>
  );
};

export default index;

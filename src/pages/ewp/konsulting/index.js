import React, { useEffect, useState } from "react";
import _ from "lodash";
import { OverviewLayoutEWP } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import { workflowChangeInitiatorSchema } from "@/helpers/schemas/ewp/konsulting/workflowChangeInitiator";
import {
  confirmationSwal,
  convertDate,
  copyToClipboard,
  errorSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  usePostData,
} from "@/helpers";
import {
  setWorkflowData,
  resetWorkflowData,
  setValidationErrorsWorkflow,
  resetValidationErrorsWorkflow,
} from "@/slices/ewp/konsulting/changeInitiatorSlice";
import {
  CardOverview,
  CardFilterOverview,
  ModalAddProjectEWP,
  ModalApproveProjectPat,
  ModalCopyLink,
} from "@/components/molecules/ewp/konsulting/overview";
import { useApprovalEWP, useWorkflowDetailEWP } from "@/data/ewp";
import {
  useGetApprovalProjectPAT,
  useOverviewEWPKonsulting,
} from "@/data/ewp/konsulting/overview";
import { ModalWorkflowRequestChangeInitiator } from "@/components/molecules/ewp/konsulting/common";
import { useSelector, useDispatch } from "react-redux";
import useUser from "@/data/useUser";
import { useRouter } from "next/router";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Consulting / Overview", path: "/ewp/konsulting" },
];

const convertProgressAndPercent = (status) => {
  let progress, percent;
  switch (status) {
    case "mapa":
      progress = 0.2;
      percent = "20%";
      break;
    case "pelaksanaan":
      progress = 0.4;
      percent = "40%";
      break;
    case "peluang peningkatan":
      progress = 0.6;
      percent = "60%";
      break;
    case "wrapup":
      progress = 0.8;
      percent = "80%";
      break;
    case "final":
      progress = 1;
      percent = "100%";
      break;
  }
  return { progress, percent };
};

const index = () => {
  const router = useRouter();
  const { ewp_pat_id, is_approval } = router.query;
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalApprovalExtension, setShowModalApprovalExtension] =
    useState(false);
  const [showModalProjectPAT, setShowModalProjectPAT] = useState(false);
  const [showModalCopyLink, setShowModalCopyLink] = useState(false);
  const [patId, setPatId] = useState("");
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [changeInitiatorId, setChangeInitiatorId] = useState("");
  const [copyLinkUrl, setCopyLinkUrl] = useState("");
  const [tempWorkflowData, setTempWorkflowData] = useState("");
  const [filter, setFilter] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const { user } = useUser();

  const { overviewEWPKonsulting, overviewEWPKonsultingMutate } =
    useOverviewEWPKonsulting(params);

  const { approvalEWP } = useApprovalEWP("ewp");

  const { workflowTempData } = useGetApprovalProjectPAT(patId);

  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "change_initiator",
    { id: changeInitiatorId }
  );

  const workflowData = useSelector(
    (state) => state.changeInitiator.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.changeInitiator.validationErrorsWorkflow
  );

  useEffect(() => {
    if (is_approval) {
      setShowModalProjectPAT(true);
      setPatId(ewp_pat_id);
    }
  }, [is_approval]);

  useEffect(() => {
    if (workflowTempData !== undefined) {
      setTempWorkflowData(workflowTempData?.data);
    }
  }, [workflowTempData]);

  useEffect(() => {
    if (workflowDetailEWP?.data && showModalApprovalExtension) {
      const workflowInfo = workflowDetailEWP?.data?.info;
      const maker = workflowDetailEWP?.data?.initiator;
      const approvers = workflowDetailEWP?.data?.approver;
      const signers = workflowDetailEWP?.data?.signer;

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

      if (workflowDetailEWP?.data?.log?.length) {
        const mapping = workflowDetailEWP?.data?.log?.map((v) => {
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
  }, [workflowDetailEWP, showModalApprovalExtension, changeInitiatorId, user]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      overviewEWPKonsultingMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (overviewEWPKonsulting?.data?.length) {
      const mapping = overviewEWPKonsulting.data.map((v) => {
        const {
          createdAt,
          need_approved,
          number_adendum,
          status_name,
          status_persetujuan_name,
          project_id,
          project_name,
          initiator,
          change_initiator,
        } = v;
        setChangeInitiatorId(change_initiator[0]?.id);
        return {
          id: v?.id,
          tipe: v?.ref_tipe?.nama,
          jenis: v?.ref_jenis?.nama,
          project_code: project_id,
          project_name: project_name,
          period: `${convertDate(
            v?.info_periode_pelaksanaan_start,
            "-",
            "d"
          )} s/d ${convertDate(v?.info_periode_pelaksanaan_end, "-", "d")}`,
          progress: convertProgressAndPercent(v?.status_name).progress,
          percent: convertProgressAndPercent(v?.status_name).percent,
          auditor: v?.info_team_audit?.auditor || [],
          auditee: v?.info_team_audit?.auditee || [],
          ata: v?.info_team_audit?.ata || [],
          document_status: status_name,
          approval_status: status_persetujuan_name,
          addendum: number_adendum,
          need_approval: need_approved,
          href: `/ewp/projects/konsulting/${v?.id}/info`,
          created_at: createdAt,
          maker: `${initiator?.pn} - ${initiator?.nama}`,
          change_initiator,
        };
      });
      setData(mapping);
      setTotalData(overviewEWPKonsulting?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(1);
    }
  }, [overviewEWPKonsulting]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleCloseProject = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menutup project ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/disable/${id}`,
      { id }
    );
    overviewEWPKonsultingMutate();
    loadingSwal("close");
  };

  const handleCopyProject = (e, url) => {
    e.stopPropagation();
    copyToClipboard(url, "Link meeting berhasil disalin ke clipboard.");
  };

  const handleOpenCopyProject = (id) => {
    setCopyLinkUrl(window.location.href + `/${id}/info`);
    setShowModalCopyLink(true);
  };

  const handleChangeInitiator = async (status, ewp_id, change_initiator_id) => {
    if (status == false) {
      const confirm = await confirmationSwal(
        "Apakah anda yakin ingin melakukan perubahan Inisiator?"
      );

      if (!confirm.value) {
        return;
      }
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/change_initiator/create`,
        { ewp_id, note: "change initiator" }
      );
      overviewEWPKonsultingMutate();
    } else {
      dispatch(resetWorkflowData());
      setChangeInitiatorId(change_initiator_id);
      setShowModalApprovalExtension(!showModalApprovalExtension);
    }
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

  const handleChangeSelectInitiator = (property, e) => {
    const newData = {
      pn: e?.value?.pn,
      name: e?.value?.name,
    };
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: newData,
      })
    );
  };
  const handleSubmitRequestChangeInitiator = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowChangeInitiatorSchema,
      resetErrors: resetValidationErrorsWorkflow,
      setErrors: setValidationErrorsWorkflow,
    };
    const validate = setErrorValidation(workflowData, dispatch, schemaMapping);
    // const validate = true;
    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "change_initiator",
        sub_modul_id: changeInitiatorId,
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
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/change`,
          data
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/${actionType}`,
          data
        );
      }
      overviewEWPKonsultingMutate();
      workflowDetailEWPMutate();
      dispatch(resetWorkflowData());
      setShowModalApprovalExtension(false);
    }
    overviewEWPKonsultingMutate();
    workflowDetailEWPMutate();
  };

  const handleSubmitApprovePAT = async () => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menyetujui project ini?"
    );

    if (!confirm.value) {
      return;
    }
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/need_approval/` +
        patId +
        `?is_approve=true`,
      {}
    );
    setShowModalProjectPAT(false);
  };

  const handleRejectApprovePAT = async () => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menolak project ini?"
    );

    if (!confirm.value) {
      return;
    }
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/need_approval/` +
        patId +
        `?is_approve=false`,
      {}
    );
    setShowModalProjectPAT(false);
  };

  const handleCloseModalRequestChangeInitiator = () => {
    // dispatch(resetHistoryWorkflowExtensionRequest());
    dispatch(resetWorkflowData());
  };

  const handleChangeTextRequestChangeInitiator = (property, value) => {
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: value,
      })
    );
  };

  const handleAddApproverRequestChangeInitiator = (property) => {
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

  const handleDeleteApproverRequestChangeInitiator = (property, idx) => {
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
    <OverviewLayoutEWP data={approvalEWP?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex items-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField
              handler={() => setShowModal(true)}
              text={"Buat Project"}
            />
            <ModalAddProjectEWP
              showModal={showModal}
              setShowModal={setShowModal}
              mutate={overviewEWPKonsultingMutate}
            />
          </div>
        </div>
        {/* Arsip function (don't delete this)
        ----------------------------------------
        <div className="w-24 rounded bg-atlasian-blue-light">
          <ButtonField handler={() => console.log("test")} text={`Arsip`} />
        </div> */}
      </div>
      <div className="">
        <CardFilterOverview
          showFilter={showFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilter}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {data?.length ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
          {data.map((v, i) => {
            return (
              <CardOverview
                key={i}
                data={v}
                handleCloseProject={async () => await handleCloseProject(v?.id)}
                handleCopyProject={() => handleOpenCopyProject(v?.id)}
                handleChangeInitiator={async () =>
                  await handleChangeInitiator(
                    Boolean(v?.change_initiator?.length > 0),
                    v?.id,
                    v?.change_initiator[0]?.id
                  )
                }
                user={user?.data}
              />
            );
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
      <CustomPagination
        perPage={filter.limit}
        defaultCurrentPage={1}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        totalData={totalData}
      />

      <ModalWorkflowRequestChangeInitiator
        isExtensionRequest={false}
        isChangeInitiator={true}
        workflowData={workflowData}
        historyWorkflow={historyWorkflow}
        validationErrors={validationErrorsWorkflow}
        setShowModal={setShowModalApprovalExtension}
        showModal={showModalApprovalExtension}
        headerTitle={"Pergantian Inisiator"}
        handleChange={handleChangeTextRequestChangeInitiator}
        handleChangeSelect={handleChangeSelect}
        handleChangeSelectInitiator={handleChangeSelectInitiator}
        handleDelete={handleDeleteApproverRequestChangeInitiator}
        handleAdd={handleAddApproverRequestChangeInitiator}
        handleSubmit={handleSubmitRequestChangeInitiator}
        handleCloseModal={handleCloseModalRequestChangeInitiator}
      />
      <ModalApproveProjectPat
        headerTitle={"Persetujuan Project EWP P.A.T"}
        showModal={showModalProjectPAT}
        setShowModal={setShowModalProjectPAT}
        handleChangeSelect={handleChangeSelect}
        objectId={patId}
        handleSubmit={handleSubmitApprovePAT}
        handleReject={handleRejectApprovePAT}
        data={tempWorkflowData}
      />
      <ModalCopyLink
        showModal={showModalCopyLink}
        setShowModal={setShowModalCopyLink}
        handleCopyProject={handleCopyProject}
        url={copyLinkUrl}
      />
      {/* End Content */}
    </OverviewLayoutEWP>
  );
};

export default index;

import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import {
  PrevNextNavigation,
  ApprovalItems,
} from "@/components/molecules/commons";
import { CardComment, DocumentItems } from "@/components/molecules/pat/dokumen";
import Image from "next/image";
import { ImageChat } from "@/helpers/imagesUrl";
import { PatLandingLayout } from "@/layouts/pat";
import { useRef, useState, useEffect } from "react";
import {
  useCommentPAT,
  useDocument,
  useStatusPat,
  useWorkflow,
} from "@/data/pat";
import { useRouter } from "next/router";
import { getAuditTeamTable } from "@/helpers/templates/auditTeam";
import { getAuditTargetTable } from "@/helpers/templates/auditTarget";
import { ModalWorkflowEWP } from "@/components/molecules/ewp/konvensional/common";
import {
  confirmationSwal,
  convertDate,
  errorSwal,
  fetchApi,
  setErrorValidation,
} from "@/helpers";
import { useDispatch } from "react-redux";
import {
  resetvalidationErrorsWorkflow,
  resetWorkflowData,
  setWorkflowData,
  setvalidationErrorsWorkflow,
} from "@/slices/pat/documentSlice";
import { useSelector } from "react-redux";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import _ from "lodash";
import useUser from "@/data/useUser";

const routes = [
  {
    name: "Latar Belakang dan Tujuan",
    slug: "latar-belakang-dan-tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, is_approval } = useRouter().query;
  const ref = useRef(null);
  const baseUrl = `/pat/projects/${id}`;
  const nav = [
    { idx: 0, name: "Latar Belakang dan Tujuan", url: "ltb" },
    { idx: 1, name: "Sumber Informasi", url: "si" },
    { idx: 2, name: "Ruang Lingkup", url: "target_audit" },
    { idx: 3, name: "Jadwal Kegiatan", url: "jadwal_audit" },
    { idx: 4, name: "Jadwal Konsulting", url: "jadwal_sbp" },
    { idx: 5, name: "Jadwal Lainnya", url: "kegiatan_lain" },
    {
      idx: 6,
      name: "Susunan Tim Audit, Unit Kerja, Binaan & Auditor",
      url: "tim_audit",
    },
    { idx: 7, name: "Anggaran Audit", url: "anggaran" },
  ];

  const { user } = useUser();
  const { statusPat } = useStatusPat(id);
  const { workflow, workflowMutate } = useWorkflow("detail", { id });
  const workflowLog = useWorkflow("log", { id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    { name: "Dokumen", path: `/pat/projects/${id}/dokumen` },
  ];

  const [showModal, setShowModal] = useState(false);
  const [openCardComment, setOpenCardComment] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexComment, setActiveIndexComment] = useState(0);
  const activeDivRef = useRef(null);
  const [hitEndpointCount, setHitEndpointCount] = useState(0);
  const [doc, setDoc] = useState([]);
  const [workflowDetail, setWorkflowDetail] = useState({});
  const [currentPosition, setCurrentPosition] = useState(0);
  const [content, setContent] = useState(null);
  const [totalComment, setTotalComment] = useState([]);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);

  const workflowData = useSelector((state) => state.documentPAT.workflowData);
  const validationErrors = useSelector(
    (state) => state.documentPAT.validationErrorsWorkflow
  );

  const [type, setType] = useState("ltb");
  const { documentPAT, documentPATMutate } = useDocument(type, { id });
  const { commentPAT } = useCommentPAT("total", { id });

  const handleScrollHitEndpoint = () => {
    const parentContainer = document.querySelector(".parent");
    if (parentContainer) {
      const elements = Array.from(
        parentContainer.querySelectorAll(".page-container-a4")
      );
      const positions = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + parentContainer.scrollTop;
      });

      const viewportTop = parentContainer.scrollTop + 235;
      const viewportBottom = viewportTop + parentContainer.clientHeight + 235;

      let activeIndex = positions.findIndex(
        (position) => position >= viewportTop && position < viewportBottom
      );

      if (activeIndex === -1) {
        activeIndex = positions.findIndex(
          (position) => position >= viewportBottom
        );
      }

      setCurrentPosition(activeIndex);

      const isAtBottom =
        parentContainer.scrollTop + parentContainer.clientHeight ===
        parentContainer.scrollHeight;
      if (isAtBottom && hitEndpointCount < 7) {
        setHitEndpointCount((prev) => Math.min(prev + 1, 7));
      }
    }
  };

  useEffect(() => {
    if (is_approval) setShowModal(true);
  }, [is_approval]);

  useEffect(() => {
    if (commentPAT?.data?.length) {
      const mappingTotalComment = commentPAT?.data?.map((v) => {
        const bab = v?.ref_bab_pat_kode;
        const total = v?.data?.filter((item) => !item?.is_closed)?.length;
        return { bab, total };
      });

      setTotalComment(mappingTotalComment);
    }
  }, [commentPAT]);

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    if (activeDivRef.current) {
      activeDivRef.current.focus();
      const parentContainer = activeDivRef.current.closest(".parent");
      if (parentContainer) {
        const topOffset = activeDivRef.current.offsetTop - 220;
        parentContainer.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (router.query?.openModal) setShowModal(true);
    const addScrollListener = () => {
      const parentContainer = document.querySelector(".parent");
      if (parentContainer) {
        parentContainer.addEventListener("scroll", handleScrollHitEndpoint);
        return () => {
          parentContainer.removeEventListener(
            "scroll",
            handleScrollHitEndpoint
          );
        };
      }
    };

    const timeoutId = setTimeout(() => {
      addScrollListener();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setType(nav[hitEndpointCount].url);
  }, [hitEndpointCount]);

  useEffect(() => {
    if (documentPAT) {
      setDoc((prev) => [
        ...prev,
        {
          idx: hitEndpointCount,
          key: nav[hitEndpointCount].name,
          content: documentPAT?.data,
          comment: documentPAT?.comments,
        },
      ]);
    }
  }, [documentPAT, documentPATMutate]);

  useEffect(() => {
    const mappingChecker = workflow?.data?.approvers?.map((v) => {
      return v;
    });
    const mappingSigner = workflow?.data?.signers?.map((v) => {
      return v;
    });

    setWorkflowDetail({
      statusPat: workflow?.data?.status_pat,
      on_approver: workflow?.data?.status_approver,
      maker: workflow?.data?.pn_maker_akhir?.nama,
      checker: mappingChecker,
      signer: mappingSigner,
    });
  }, [workflow]);

  useEffect(() => {
    const workflowDetail = workflow?.data;
    const maker = workflowDetail?.pn_maker_akhir;
    const approvers = workflowDetail?.approvers;
    const signers = workflowDetail?.signers;

    const newWorkflowData = {
      ...workflowData,
      status_approver: workflowDetail?.status_pat,
      on_approver: workflowDetail?.status_approver,
    };

    newWorkflowData.ref_tim_audit_maker = maker
      ? `${maker?.pn} - ${maker?.nama}`
      : `${user?.data?.pn} - ${user?.data?.fullName}`;

    newWorkflowData.maker = maker || {
      pn: user?.data?.pn,
      nama: user?.data?.fullName,
    };

    if (approvers?.length) {
      const mappingApprovers = _.map(approvers, ({ pn, nama, is_signed }) => ({
        pn,
        nama,
        is_signed,
      }));
      newWorkflowData.ref_tim_audit_approver = mappingApprovers;
    }

    if (signers?.length) {
      const mappingSigners = _.map(signers, ({ nama, pn }) => ({ nama, pn }));
      newWorkflowData.ref_tim_audit_signer = mappingSigners;
    }

    dispatch(setWorkflowData(newWorkflowData));
  }, [workflow]);

  useEffect(() => {
    if (workflowLog?.workflow?.data?.log?.length) {
      const mapping = workflowLog?.workflow?.data?.log?.map((v) => {
        return {
          "P.I.C": v?.from?.pn + " - " + v?.from?.nama,
          Alasan: v?.note,
          Status:
            v?.is_approved === true
              ? "Approved"
              : v?.is_approved === false
              ? "Rejected"
              : "",
          Tanggal: convertDate(v?.createdAt, "-", "d"),
        };
      });
      setHistoryWorkflow(mapping);
    }
  }, [workflowLog.workflow]);

  const handleClickComment = (idx) => {
    setOpenCardComment(true);
    setActiveIndexComment(idx);
  };

  const findTotalComment = (idx) => {
    const correspondingTotal = totalComment?.find(
      (item) => item.bab === idx + 1
    );
    const count = correspondingTotal ? correspondingTotal.total : 0;
    return count;
  };

  // [START] Modal for approver
  const handleCloseModalWorkflow = async () => {
    setShowModal(false);
  };

  const handleAdd = (property) => {
    const newData = [...workflowData[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = [...workflowData[property]];
    newData.splice(idx, 1);
    dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
  };

  const handleChangeText = (property, value) => {
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: value,
      })
    );
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

  const handleSaveApproval = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowSchema,
      resetErrors: resetvalidationErrorsWorkflow,
      setErrors: setvalidationErrorsWorkflow,
    };
    const validate = setErrorValidation(workflowData, dispatch, schemaMapping);

    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = { pat_id: id };

      const signedCount = workflowData?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      switch (actionType) {
        case "change":
          data.approvers = workflowData.ref_tim_audit_approver;
          data.signers = workflowData.ref_tim_audit_signer;
          break;
        case "create":
          data.approvers = workflowData.ref_tim_audit_approver;
          data.signers = workflowData.ref_tim_audit_signer;
          break;
        case "reject":
          data.note = workflowData.note;
          break;
        case "approve":
          if (signedCount < 2) {
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

      if (actionType === "reject" && !workflowData.note) {
        await errorSwal(
          "Silakan berikan alasan mengapa Anda memilih untuk menolak."
        );
        return;
      }

      if (actionType === "change") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow/change`,
          data
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow/${actionType}`,
          data
        );
      }

      workflowLog.workflowMutate();
      workflowMutate();
      dispatch(resetWorkflowData());
      setShowModal(false);
    }
    workflowMutate();
  };
  // [END] Modal for approver

  return (
    <PatLandingLayout content={content} data={statusPat?.data}>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Dokumen"} />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/ringkasan-objek-audit"}
          widthDropdown={"w-56"}
        />
      </div>
      {/* Start Content */}
      <div className="flex gap-5">
        <div className="w-[15rem]">
          <div>
            <Card>
              <div className="px-3 py-1 w-full">
                <div className="text-xl">Daftar Isi</div>
                <div className="pl-2 mt-0.5">
                  {nav.map((v, i) => {
                    return (
                      <DocumentItems
                        key={i}
                        no={i + 1}
                        title={v.name}
                        handleClick={() => setActiveIndex(i)}
                        activeIndex={currentPosition}
                        count={findTotalComment(i)}
                      />
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <Card>
            <div className="overflow-y-scroll my-2 parent max-h-[40rem]">
              <CardComment
                callbackRef={ref}
                show={openCardComment}
                handleClickOutside={() => {
                  setOpenCardComment(false);
                }}
                activeIndexBab={activeIndexComment + 1}
              />
              {doc.map((v, i) => {
                return (
                  <div
                    key={i}
                    className={`page-container-a4 shrink-0 ${
                      i === activeIndex ? "active" : ""
                    }`}
                    tabIndex={i === activeIndex ? 0 : -1}
                    ref={i === activeIndex ? activeDivRef : null}
                  >
                    {v.content && (
                      <div className="px-4 h-full w-full relative page-content-a4">
                        <div className="flex justify-between">
                          <div className="font-bold text-xl">{v.key}</div>
                          <div className="flex items-center" ref={ref}>
                            <DivButton
                              handleClick={() => handleClickComment(i)}
                            >
                              <Image src={ImageChat} alt="chat" />
                            </DivButton>
                          </div>
                        </div>
                        {v.idx === 2 ? (
                          <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{
                              __html: getAuditTargetTable(v.content),
                            }}
                          />
                        ) : v.idx === 6 ? (
                          <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{
                              __html: getAuditTeamTable(v.content),
                            }}
                          />
                        ) : (
                          <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{ __html: v.content }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <DivButton
          handleClick={() => (setShowModal(true), setHitEndpointCount(7))}
          className="no-underline hover:no-underline h-auto"
        >
          <div>
            <Card>
              <div className="w-full">
                <div className="px-3">
                  <p className="text-brisma font-bold text-xl">Approval UKA</p>
                  <ApprovalItems title={"Maker"} text={workflowDetail?.maker} />
                  <ApprovalItems
                    title={"Checker"}
                    text={workflowDetail?.checker}
                    data={workflowDetail}
                  />
                  <ApprovalItems
                    title={"Signer"}
                    text={workflowDetail?.signer}
                  />
                </div>
              </div>
            </Card>
          </div>
        </DivButton>
        <ModalWorkflowEWP
          workflowData={workflowData}
          validationErrors={validationErrors}
          historyWorkflow={historyWorkflow}
          setShowModal={setShowModal}
          showModal={showModal}
          headerTitle={"Workflow"}
          handleCloseModal={handleCloseModalWorkflow}
          handleChange={handleChangeText}
          handleChangeSelect={handleChangeSelect}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleSubmit={handleSaveApproval}
        />
      </div>
      {/* End Content */}
    </PatLandingLayout>
  );
};

export default index;

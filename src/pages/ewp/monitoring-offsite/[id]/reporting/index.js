import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import {
  ApprovalItems,
  ContentDocument,
  ListContentDocument,
  ModalWorkflow,
} from "@/components/molecules/commons";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import {
  useCommentReportingEWP,
  useDocumentEWP,
} from "@/data/ewp/monitoring-offsite/reporting";
import { useSelector, useDispatch } from "react-redux";
import {
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  setWorkflowData,
  resetWorkflowData,
} from "@/slices/ewp/monitoring-offsite/reporting/documentMapaEWPMonoffSlice";
import _ from "lodash";
import {
  checkRoleApprovalLog,
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  usePostData,
  useUpdateData,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { useWorkflowDetailEWP } from "@/data/ewp";
import { timTimeplanHtml } from "@/templates/ewp/konsulting/perencanaan";
import { ukerAssessmentHtml } from "@/templates/ewp/monitoring-offsite/reporting";
import useUser from "@/data/useUser";

const index = () => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isCloseProject, setIsCloseProject] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [listContent, setListContent] = useState([]);
  const [listComment, setListComment] = useState([]);

  const listBab = [
    { idx: 1, title: "Tim Audit" },
    { idx: 2, title: "Uker Assessment" },
    { idx: 3, title: "Analisa" },
  ];

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [openCardComment, setOpenCardComment] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeIndexComment, setActiveIndexComment] = useState(1);
  const activeDivRef = useRef(null);
  const [hitEndpointCount, setHitEndpointCount] = useState(1);
  const [doc, setDoc] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [bab, setBab] = useState(1);
  const [activeIdComment, setActiveIdComment] = useState(1);

  const [params, setParams] = useState({
    kkpa_id: "",
  });

  const workflowData = useSelector(
    (state) => state.documentMapaEWPMonoff.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentMapaEWPMonoff.validationErrorsWorkflow
  );

  const { projectDetail } = useProjectDetail({ id });
  const { documentEWP, documentEWPMutate } = useDocumentEWP("reporting", bab, {
    id,
  });
  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "kkpa",
    { id }
  );
  const {
    commentReportingEWP,
    commentReportingEWPIsLoading,
    commentReportingEWPMutate,
  } = useCommentReportingEWP({
    id: params?.kkpa_id,
    bab: activeIndexComment,
  });
  const { user } = useUser();

  useEffect(() => {
    const projectInfo = projectDetail?.data?.project_info;
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Monitoring / Overview", path: "/ewp/monitoring-offsite" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Reporting`,
        path: `/ewp/monitoring-offsite/${id}/reporting`,
      },
    ]);

    setIsCloseProject(
      Boolean(
        projectInfo?.status_kode == "9" && projectInfo?.status_name == "final"
      )
    );

    setIsInitiator(Boolean(projectInfo?.initiator?.pn === user?.data?.pn));

    setIsOnProgress(
      Boolean(projectInfo?.status_persetujuan_name == "On Progress")
    );
  }, [projectDetail]);

  useEffect(() => {
    if (commentReportingEWP?.data?.length) {
      const mapping = commentReportingEWP?.data?.map((parent) => {
        const {
          id,
          create_by,
          createdAt,
          is_closed,
          deskripsi,
          child_comment,
        } = parent;
        return {
          id,
          created_by: create_by,
          created_at: createdAt,
          is_closed,
          deskripsi,
          child_comment: child_comment?.length
            ? child_comment?.map((child) => {
                const { id, create_by, createdAt, is_closed, deskripsi } =
                  child;
                return {
                  id,
                  created_by: create_by,
                  created_at: createdAt,
                  is_closed,
                  deskripsi,
                };
              })
            : [],
        };
      });
      setListComment(mapping);
    }
  }, [commentReportingEWP]);

  useEffect(() => {
    const response = documentEWP?.data?.daftar_isi;
    if (response) {
      const mapping = response?.map((bab) => {
        return {
          idx: bab?.key,
          total_comment: bab?.jumlah_comment?.filter((v) => !v.is_closed)
            .length,
          title: bab.title,
        };
      });

      const filteredResult = mapping.filter((item) => {
        return doc.some((docItem) => docItem.idx === item.idx);
      });
      setListContent(filteredResult);
    }
  }, [documentEWP, doc]);

  useEffect(() => {
    if (bab < listBab?.length && documentEWP?.data) {
      setBab((prev) => parseInt(prev) + 1);
    }
  }, [documentEWP]);

  const handleCloseModalWorkflow = () => {
    dispatch(resetWorkflowData());
    workflowDetailEWPMutate();
  };

  // [ START ] Function ini berfungsi agar setiap kali class page-container-a4 melewati class parent,
  // maka akan setter setCurrentPosition akan merubah data dan setter setHitEndpointCount
  // akan menambahkan data sebanyak +1
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

      let activeIndex = positions.findIndex((position, index) => {
        const nextPosition = positions[index + 1];
        return (
          position <= viewportTop &&
          (nextPosition ? nextPosition > viewportTop : true)
        );
      });

      setCurrentPosition(activeIndex + 1);

      const isAtBottom =
        parentContainer.scrollTop + parentContainer.clientHeight ===
        parentContainer.scrollHeight;
      if (isAtBottom && hitEndpointCount <= 10) {
        setHitEndpointCount((prev) => Math.min(prev + 1, 10));
      }
    }
  };
  // [ END ]

  // [ START ] Hook ini berfungsi untuk merubah fokus dokumen berdasarkan current active index
  // yang diklik pada bagian Navigation Document
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
  // [ END ]

  // [ START ] Hook ini berfungsi agar ketika class page-container-a4 melewati class parent, maka
  // akan memanggil function handleScrollHitEndpoint
  useEffect(() => {
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
  // [ END ]

  useEffect(() => {
    setBab(hitEndpointCount);
  }, [hitEndpointCount]);

  useEffect(() => {
    if (documentEWP?.data) {
      const findBab = listBab?.find((value) => value?.idx === bab);
      const findBabId = documentEWP?.data?.daftar_isi?.find(
        (value) => value?.key === bab
      );
      const findDoc = doc?.find((value) => value?.idx === bab);
      if (!findDoc) {
        setDoc((prev) => [
          ...prev,
          {
            idx: findBab?.idx,
            bab_id: findBabId?.id,
            title: findBab?.title,
            content: documentEWP?.data?.data,
          },
        ]);
      }
    }
  }, [documentEWP]);

  // [START] Hook ini berfungsi untuk menyimpan data workflow untuk Modal Workflow yang akan
  // digunakan sebagai payload dan juga data yang akan ditampilkan saat Modal muncul
  useEffect(() => {
    if (workflowDetailEWP?.data) {
      const workflowInfo = workflowDetailEWP?.data?.info;
      const maker = workflowDetailEWP?.data?.initiator;
      const approvers = workflowDetailEWP?.data?.approver;
      const signers = workflowDetailEWP?.data?.signer;

      const newWorkflowData = {
        ...workflowData,
        status_approver: workflowInfo?.status_persetujuan,
        on_approver: workflowInfo?.status_approver,
      };

      newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.name}`;
      newWorkflowData.maker = maker;

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
            "P.I.C": v?.from?.pn + " - " + v?.from?.nama,
            Role: checkRoleApprovalLog(v?.note, v?.is_signed),
            Alasan: v?.note,
            Status:
              v?.is_signed === true
                ? "Approved"
                : v?.is_signed === false
                ? "Rejected"
                : "",
            Tanggal: convertDate(v?.created_at, "-", "d"),
          };
        });
        setHistoryWorkflow(mapping);
      }

      setParams({
        ...params,
        kkpa_id: workflowInfo?.id,
      });

      dispatch(setWorkflowData(newWorkflowData));
    } else {
      dispatch(resetWorkflowData());
    }
  }, [workflowDetailEWP]);
  // [ END ]

  const handleClickComment = (id, index) => {
    setOpenCardComment(true);
    setActiveIdComment(id);
    setActiveIndexComment(index);
  };

  // [ START ] function untuk Modal Workflow
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowSchema,
      resetErrors: resetValidationErrorsWorkflow,
      setErrors: setValidationErrorsWorkflow,
    };
    const validate = setErrorValidation(workflowData, dispatch, schemaMapping);

    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "kkpa",
        sub_modul_id: params?.kkpa_id,
      };

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

      if (actionType === "change") {
        const response = await useUpdateData(
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/change`,
          data
        );
        if (!response.isDismissed) return;
      } else {
        await usePostData(
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/${actionType}`,
          data
        );
      }

      workflowDetailEWPMutate();
      dispatch(resetWorkflowData());
      setShowModalApproval(false);
    }
    workflowDetailEWPMutate();
  };
  // [ END ]

  // [ START ] COMMENT
  const handleCloseComment = async (e, value) => {
    e.stopPropagation();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/comment/close/${value?.parent_id}`,
      {}
    );

    commentReportingEWPMutate();
    documentEWPMutate();
    loadingSwal("close");
  };

  const handleSubmitCommentParent = async (e, value) => {
    e.stopPropagation();
    const body = {
      ref_bab_mapa_id: activeIdComment.toString(),
      deskripsi: value,
    };

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/comment/${params?.id}?ref_bab_mapa_id=${activeIdComment}`,
      body
    );

    commentReportingEWPMutate();
    documentEWPMutate();
    loadingSwal("close");
  };

  const handleSubmitCommentChild = async (e, value) => {
    e.stopPropagation();

    const body = {
      ref_bab_mapa_id: activeIdComment.toString(),
      deskripsi: value?.desc,
      parent_comment_id: value?.parent_id,
    };

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/reporting/comment/${params?.id}?ref_bab_reporting_id=${activeIdComment}`,
      body
    );

    commentReportingEWPMutate();
    loadingSwal("close");
  };
  // [ END ]

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const handleClickOpenCardComment = (value) => {
    setOpenCardComment(value);
  };

  const renderContent = (index, content) => {
    if (index === 1) {
      return timTimeplanHtml(content?.tim);
    } else if (index === 2) {
      return ukerAssessmentHtml(content);
    } else if (index === 3) {
      return content;
    }
  };

  return (
    <LandingLayoutEWPMonOff>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Reporting"} />
      </div>
      {/* Start Content */}
      <div className="flex w-full gap-6">
        <ListContentDocument
          data={listContent}
          currentPosition={currentPosition}
          handleActiveIndex={handleActiveIndex}
        />
        <div>
          <ContentDocument
            dataDoc={doc}
            dataComment={listComment}
            activeDivRef={activeDivRef}
            activeIndex={activeIndex}
            activeIndexComment={activeIndexComment}
            isOpenCardComment={openCardComment}
            isLoadingComment={commentReportingEWPIsLoading}
            isHideButton={isCloseProject || !isInitiator || !isOnProgress}
            renderContent={renderContent}
            handleClickComment={handleClickComment}
            handleIsOpenCardComment={handleClickOpenCardComment}
            handleSubmitCommentParent={handleSubmitCommentParent}
            handleSubmitCommentChild={handleSubmitCommentChild}
            handleCloseComment={handleCloseComment}
          />
        </div>
        <div>
          <DivButton
            handleClick={() => setShowModalApproval(true)}
            className="no-underline hover:no-underline w-56"
          >
            <Card>
              <div className="w-full px-3">
                <p className="text-brisma font-bold text-xl">Approval</p>
                <ApprovalItems
                  title={"P.I.C Auditor"}
                  text={
                    workflowData?.maker?.pn + " - " + workflowData?.maker?.name
                  }
                />
                <ApprovalItems
                  title={"Approver"}
                  text={workflowData?.ref_tim_audit_approver}
                  data={workflowData}
                />
                <ApprovalItems
                  title={"Signer"}
                  text={workflowData?.ref_tim_audit_signer}
                />
              </div>
            </Card>
          </DivButton>
          <ModalWorkflow
            workflowData={workflowData}
            historyWorkflow={historyWorkflow}
            validationErrors={validationErrorsWorkflow}
            showModal={showModalApproval}
            headerTitle={"Workflow & Riwayat Approval"}
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            setShowModal={setShowModalApproval}
            handleAdd={handleAdd}
            handleChangeSelect={handleChangeSelect}
            handleChangeText={handleChangeText}
            handleCloseModal={handleCloseModalWorkflow}
            withSigner
          />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPMonOff>
  );
};

export default index;

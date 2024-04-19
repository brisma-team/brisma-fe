import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import {
  PrevNextNavigation,
  ApprovalItems,
  ModalWorkflow,
  ListContentDocument,
  ContentDocument,
} from "@/components/molecules/commons";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import {
  useComment,
  useDocument,
  useLandingStatus,
} from "@/data/ewp/konsulting/peluang-peningkatan/matrix/detail";
import { useSelector, useDispatch } from "react-redux";
import {
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  setWorkflowData,
  resetWorkflowData,
} from "@/slices/ewp/konsulting/peluang-peningkatan/documentDetailPeluangKonsultingSlice";
import _ from "lodash";
import {
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useWorkflowMatrix } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { riskRekomendasiHtml } from "@/templates/ewp/konsulting/peluang-peningkatan";
import useUser from "@/data/useUser";

const routes = [
  {
    name: "Kondisi",
    slug: "kondisi",
  },
  {
    name: "Sebab",
    slug: "sebab",
  },
  { name: "Tanggapan Client", slug: "tanggapan-client" },
  { name: "Risk & Rekomendasi", slug: "risk-rekomendasi" },
  { name: "Dokumen", slug: "dokumen" },
];

const listBab = [
  { idx: 1, title: "Kondisi" },
  { idx: 2, title: "Sebab" },
  { idx: 3, title: "Tanggapan Client" },
  { idx: 4, title: "Risk & Rekomendasi" },
];

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 1,
    matrix_id: 1,
    kkpt_id: 1,
    is_approval: false,
  });

  const baseUrl = `/ewp/konsulting/${params?.id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan`;
  const pathNameOverview = `${baseUrl}/peluang-peningkatan/${params?.matrix_id}/overview`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${params?.matrix_id}/overview/${params?.kkpt_id}`;
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [listContent, setListContent] = useState([]);
  const [listComment, setListComment] = useState([]);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [openCardComment, setOpenCardComment] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeIndexComment, setActiveIndexComment] = useState(1);
  const [activeIdComment, setActiveIdComment] = useState(1);
  const activeDivRef = useRef(null);
  const [doc, setDoc] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [bab, setBab] = useState(1);
  const [selectedParentCommentId, setSelectedParentCommentId] = useState(0);

  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isAuditor, setIsAuditor] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);

  const workflowData = useSelector(
    (state) => state.documentDetailPeluangKonsulting.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentDetailPeluangKonsulting.validationErrorsWorkflow
  );

  const { landingStatus } = useLandingStatus(params?.kkpt_id);
  const { user } = useUser();

  const { projectDetail } = useProjectDetail({ id: params?.id });
  const { documentData } = useDocument(params?.kkpt_id, bab);
  const { workflowMatrixData, workflowMatrixMutate } = useWorkflowMatrix({
    type: "kkpt",
    id: params?.kkpt_id,
  });
  const { commentData, commentDataMutate, commentDataIsLoading } = useComment(
    params?.kkpt_id,
    activeIdComment
  );

  useEffect(() => {
    setShowModalApproval(params?.is_approval);
  }, [params?.is_approval]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id, matrix_id, kkpt_id, is_approval } = router.query;
    setParams({
      id,
      matrix_id,
      kkpt_id,
      is_approval,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Peluang Peningkatan`,
        path: `${pathNameBase}`,
      },
      {
        name: `Overview`,
        path: `${pathNameOverview}`,
      },
      {
        name: `Landing Peningkatan`,
        path: `${pathNameContent}`,
      },
      {
        name: `Dokumen`,
        path: `${pathNameContent}/dokumen`,
      },
    ]);

    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.realisasi?.peluang_peningkatan_real_end)
    );
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
  }, [projectDetail]);

  useEffect(() => {
    setIsAuditor(
      Boolean(landingStatus?.data?.info?.auditor?.pn == user?.data?.pn)
    );
    setIsOnProgress(
      Boolean(landingStatus?.data?.info?.status_persetujuan == "On Progress")
    );
  }, [landingStatus, user]);

  useEffect(() => {
    if (commentData?.data?.length) {
      const mapping = commentData?.data?.map((parent) => {
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
    } else {
      setListComment([]);
    }
  }, [commentData, openCardComment]);

  useEffect(() => {
    const response = documentData?.data?.daftar_isi;
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
  }, [documentData, doc]);

  useEffect(() => {
    if (bab < listBab?.length && documentData?.data) {
      setBab((prev) => parseInt(prev) + 1);
    }
  }, [documentData]);

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
    if (documentData?.data) {
      const findBab = listBab?.find((value) => value?.idx === bab);
      const findBabId = documentData?.data?.daftar_isi?.find(
        (value) => value?.key === bab
      );
      setDoc((prev) => [
        ...prev,
        {
          idx: findBab?.idx,
          bab_id: findBabId?.id,
          title: findBab?.title,
          content: documentData?.data?.data,
        },
      ]);
    }
  }, [documentData]);

  // [START] Hook ini berfungsi untuk menyimpan data workflow untuk Modal Workflow yang akan
  // digunakan sebagai payload dan juga data yang akan ditampilkan saat Modal muncul
  useEffect(() => {
    if (workflowMatrixData?.data) {
      const workflowInfo = workflowMatrixData?.data?.info;
      const maker = workflowMatrixData?.data?.initiator;
      const approvers = workflowMatrixData?.data?.approver;
      const signers = workflowMatrixData?.data?.signer;

      const newWorkflowData = {
        ...workflowData,
        status_approver: workflowInfo?.status_persetujuan,
        on_approver: workflowInfo?.status_approver,
      };

      setIsOnProgress(
        Boolean(workflowInfo?.status_persetujuan == "On Progress")
      );

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

      if (workflowMatrixData?.data?.log?.length) {
        const mapping = workflowMatrixData?.data?.log?.map((v) => {
          return {
            "P.I.C": v?.from?.pn + " - " + v?.from?.nama,
            Alasan: v?.note,
            Status:
              v?.is_signed === true
                ? "Approved"
                : v?.is_signed === false
                ? "Rejected"
                : "",
            Tanggal: convertDate(v?.createdAt, "/", "d"),
          };
        });
        setHistoryWorkflow(mapping);
      }

      dispatch(setWorkflowData(newWorkflowData));
    } else {
      dispatch(resetWorkflowData());
    }
  }, [workflowMatrixData, showModalApproval]);
  // [ END ]

  const handleClickComment = (id, index) => {
    setOpenCardComment(true);
    setActiveIdComment(id);
    setActiveIndexComment(index);
  };

  // [ START ] function untuk Modal Workflow
  const handleCloseModalWorkflow = () => {
    dispatch(resetWorkflowData());
    workflowMatrixMutate();
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
        sub_modul: "kkpt",
        sub_modul_id: params?.kkpt_id,
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
        const response = await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/change`,
          data
        );
        if (!response.isDismissed) return;
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/${actionType}`,
          data
        );
      }

      workflowMatrixMutate();
      dispatch(resetWorkflowData());
      setShowModalApproval(false);
    }
    workflowMatrixMutate();
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

    commentDataMutate();
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

    commentDataMutate();
    loadingSwal("close");
  };

  const handleSubmitCommentChild = async (e, value) => {
    e.stopPropagation();
    const body = {
      ref_bab_mapa_id: activeIdComment.toString(),
      deskripsi: value,
      parent_comment_id: selectedParentCommentId,
    };

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/comment/${params?.id}?ref_bab_mapa_id=${activeIdComment}`,
      body
    );

    commentDataMutate();
    loadingSwal("close");
  };

  const handleSelectedParentComment = (id) => {
    setSelectedParentCommentId(id);
  };
  // [ END ]

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const handleClickOpenCardComment = (value) => {
    setOpenCardComment(value);
  };

  const renderContent = (index, content) => {
    if (index === 4) {
      return riskRekomendasiHtml(content?.rekomendasi);
    } else {
      return content;
    }
  };

  return (
    <LandingLayoutEWPConsulting>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Dokumen Peluang Peningkatan"} />
        <PrevNextNavigation
          baseUrl={pathNameContent}
          routes={routes}
          prevUrl={"/risk-rekomendasi"}
          marginLeft={"-60px"}
        />
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
            isLoadingComment={commentDataIsLoading}
            isHideButton={
              isCloseSubmodule || !isOnProgress || !isInitiator || !isAuditor
            }
            renderContent={renderContent}
            handleClickComment={handleClickComment}
            handleIsOpenCardComment={handleClickOpenCardComment}
            handleSelectedParentComment={handleSelectedParentComment}
            handleSubmitCommentParent={handleSubmitCommentParent}
            handleSubmitCommentChild={handleSubmitCommentChild}
            handleCloseComment={handleCloseComment}
          />
        </div>
        <div>
          <DivButton
            handleClick={() => setShowModalApproval(true)}
            className="no-underline hover:no-underline w-56 mb-5"
          >
            <div>
              <Card>
                <div className="w-full">
                  <div className="px-3">
                    <p className="text-brisma font-bold text-xl">Approval</p>
                    <ApprovalItems
                      title={"P.I.C Auditor"}
                      text={workflowData?.maker?.name}
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
                </div>
              </Card>
            </div>
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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

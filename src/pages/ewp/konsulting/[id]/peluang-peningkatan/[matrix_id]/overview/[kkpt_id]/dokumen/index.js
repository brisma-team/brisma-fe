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
  setErrorValidation,
  usePostData,
  useUpdateData,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useWorkflowMatrix } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { riskRekomendasiHtml } from "@/templates/ewp/konsulting/peluang-peningkatan";

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

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 1,
    matrix_id: 1,
    kkpt_id: 1,
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
  const activeDivRef = useRef(null);
  const [hitEndpointCount, setHitEndpointCount] = useState(1);
  const [doc, setDoc] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [bab, setBab] = useState(1);
  const [selectedParentCommentId, setSelectedParentCommentId] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;
    const { id, matrix_id, kkpt_id } = router.query;
    setParams({
      id,
      matrix_id,
      kkpt_id,
    });
  }, [router.isReady]);
  const workflowData = useSelector(
    (state) => state.documentDetailPeluangKonsulting.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentDetailPeluangKonsulting.validationErrorsWorkflow
  );

  const { projectDetail } = useProjectDetail({ id: params?.id });
  const { documentData } = useDocument(params?.kkpt_id, bab);
  const { workflowMatrixData, workflowMatrixMutate } = useWorkflowMatrix({
    type: "kkpt",
    id: params?.kkpt_id,
  });
  const { commentData, commentDataMutate } = useComment(
    params?.kkpt_id,
    activeIndexComment
  );

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
  }, [projectDetail]);

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
    }
  }, [commentData]);

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
      setListContent(mapping);
    } else {
      setListContent([]);
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

      const isAtBottom =
        parentContainer.scrollTop + parentContainer.clientHeight ===
        parentContainer.scrollHeight;
      if (isAtBottom && hitEndpointCount <= 4) {
        setHitEndpointCount((prev) => Math.min(prev + 1, 4));
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
    if (documentData?.data && listContent?.length) {
      const findBab = listContent?.find((value) => value?.idx === bab);
      // const isFilled = doc?.find((value) => value?.idx === bab) !== undefined;
      // if (!isFilled) {
      //   setDoc((prev) => [
      //     ...prev,
      //     {
      //       idx: findBab?.idx,
      //       title: findBab?.title,
      //       content: documentData?.data?.data,
      //     },
      //   ]);
      //   if (bab <= listContent.length) {
      //     setBab(bab + 1);
      //   }
      // }
      setDoc((prev) => [
        ...prev,
        {
          idx: findBab?.idx,
          title: findBab?.title,
          content: documentData?.data?.data,
        },
      ]);
    }
  }, [documentData, listContent]);

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
  }, [workflowMatrixData]);
  // [ END ]

  const handleClickComment = (id) => {
    setOpenCardComment(true);
    setActiveIndexComment(id);
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

      workflowMatrixMutate();
      dispatch(resetWorkflowData());
      setShowModalApproval(false);
    }
    workflowMatrixMutate();
  };
  // [ END ]

  // [ START ] COMMENT
  const handleSubmitCommentParent = async (e, value) => {
    e.stopPropagation();
    const body = {
      ref_bab_mapa_id: activeIndexComment.toString(),
      deskripsi: value,
    };

    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/comment/${params?.id}?ref_bab_mapa_id=${activeIndexComment}`,
      body
    );

    commentDataMutate();
  };

  const handleSubmitCommentChild = async (e, value) => {
    e.stopPropagation();
    const body = {
      ref_bab_mapa_id: activeIndexComment.toString(),
      deskripsi: value,
      parent_comment_id: selectedParentCommentId,
    };

    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/comment/${params?.id}?ref_bab_mapa_id=${activeIndexComment}`,
      body
    );

    commentDataMutate();
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
            isOpenCardComment={openCardComment}
            renderContent={renderContent}
            handleClickComment={handleClickComment}
            handleIsOpenCardComment={handleClickOpenCardComment}
            handleSelectedParentComment={handleSelectedParentComment}
            handleSubmitCommentParent={handleSubmitCommentParent}
            handleSubmitCommentChild={handleSubmitCommentChild}
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

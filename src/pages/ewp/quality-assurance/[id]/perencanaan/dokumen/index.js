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
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useCommentEWP, useDocumentEWP } from "@/data/ewp/common/dokumen";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataWorkflow,
  setObjDataComment,
  setValidationErrorsWorkflow,
  resetObjDataWorkflow,
  resetObjDataComment,
  resetValidationErrorsWorkflow,
} from "@/slices/ewp/quality-assurance/perencanaan/dokumenPerencanaanEWPQualityAssuranceSlice";
import _ from "lodash";
import {
  checkRoleApprovalLog,
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useWorkflowDetailEWP } from "@/data/ewp";
import {
  jadwalHtml,
  timHtml,
  anggaranHtml,
  analisisPerencanaanHtml,
} from "@/templates/ewp/quality-assurance/perencanaan";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Analisa", slug: "analisa" },
  { name: "Tim", slug: "tim" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis Perencanaan", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal", slug: "jadwal" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    is_approval: false,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;
  const dispatch = useDispatch();

  const listBab = [
    { idx: 1, title: "Latar Belakang" },
    { idx: 2, title: "Tujuan" },
    { idx: 3, title: "Analisa" },
    { idx: 4, title: "Analisis Perencanaan" },
    { idx: 5, title: "Jadwal" },
    { idx: 6, title: "Tim" },
    { idx: 7, title: "Anggaran" },
  ];

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [listContent, setListContent] = useState([]);

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

  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);

  const dataWorkflow = useSelector(
    (state) => state.dokumenPerencanaanEWPQualityAssurance.objDataWorkflow
  );
  const dataComment = useSelector(
    (state) => state.dokumenPerencanaanEWPQualityAssurance.objDataComment
  );
  const validation = useSelector(
    (state) =>
      state.dokumenPerencanaanEWPQualityAssurance.validationErrorsWorkflow
  );

  const { auditInfo } = useAuditInfo({ id: params?.id, module: "qa" });
  const { documentEWP, documentEWPMutate } = useDocumentEWP({
    module: "qa",
    sub_module: "mapa",
    id: params?.id,
    bab,
  });
  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "mapa",
    { id: params?.id }
  );
  const { commentEWP, commentEWPMutate, commentEWPIsLoading } = useCommentEWP({
    module: "qa",
    sub_module: "mapa",
    id: params?.id,
    bab: activeIdComment,
  });

  useEffect(() => {
    setShowModalApproval(params?.is_approval);
  }, [params?.is_approval]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id, is_approval } = router.query;
    setParams({
      id,
      is_approval,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: `Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `Dokumen`,
        path: `${pathName}/dokumen`,
      },
    ]);
    // setUka({ kode: auditInfo?.uka_kode, name: projectInfo?.uka_name });
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
  }, [auditInfo]);

  useEffect(() => {
    if (commentEWP?.data?.length) {
      const mapping = commentEWP?.data?.map((parent) => {
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
      dispatch(setObjDataComment(mapping));
    } else {
      dispatch(resetObjDataComment());
    }
  }, [commentEWP, openCardComment]);

  useEffect(() => {
    const response = documentEWP?.data?.daftar_isi;
    if (response) {
      const mapping = response?.map((bab) => {
        return {
          idx: bab?.key,
          total_comment: bab?.jumlah_comment?.filter((v) => !v.is_closed)
            .length,
          title: bab?.title,
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
    if (activeDivRef?.current) {
      activeDivRef.current?.focus();
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
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  // [ END ]

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
        ...dataWorkflow,
        status_approver: workflowInfo?.status_persetujuan_name,
        on_approver: workflowInfo?.status_approver,
      };

      setIsOnProgress(
        Boolean(
          workflowInfo.status_persetujuan_name == "On Progress" ||
            workflowInfo.status_persetujuan_name == "On Approver"
        )
      );

      newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${maker?.nama}`;
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
            "P.I.C": v?.pn_from + " - " + v?.name_from,
            Role: checkRoleApprovalLog(v?.note, v?.is_signed),
            Alasan: v?.note,
            Status:
              v?.is_signed === true
                ? "Approved"
                : v?.is_signed === false
                ? "Rejected"
                : "",
            Tanggal: convertDate(v?.createdAt, "-", "d"),
          };
        });
        setHistoryWorkflow(mapping);
      }

      dispatch(setObjDataWorkflow(newWorkflowData));
    } else {
      dispatch(resetObjDataWorkflow());
    }
  }, [workflowDetailEWP, showModalApproval]);
  // [ END ]

  const handleClickComment = (id, index) => {
    setOpenCardComment(true);
    setActiveIdComment(id);
    setActiveIndexComment(index);
  };

  // [ START ] function untuk Modal Workflow
  const handleCloseModalWorkflow = () => {
    dispatch(resetObjDataWorkflow());
    workflowDetailEWPMutate();
  };

  const handleAdd = (property) => {
    const newData = [...dataWorkflow[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setObjDataWorkflow({ ...dataWorkflow, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = [...dataWorkflow[property]];
    newData.splice(idx, 1);
    dispatch(setObjDataWorkflow({ ...dataWorkflow, [property]: newData }));
  };

  const handleChangeText = (property, value) => {
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
        [property]: value,
      })
    );
  };

  const handleChangeSelect = (property, index, e) => {
    const newData = [...dataWorkflow[property]];
    const updated = { ...newData[index] };
    updated["pn"] = e?.value?.pn;
    updated["nama"] = e?.value?.name;
    newData[index] = updated;
    dispatch(
      setObjDataWorkflow({
        ...dataWorkflow,
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
    const validate = setErrorValidation(dataWorkflow, dispatch, schemaMapping);

    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "mapa",
        sub_modul_id: params?.id,
        url_path: `${pathName}/dokumen`,
      };

      const signedCount = dataWorkflow?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      switch (actionType) {
        case "change":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          data.signers = dataWorkflow.ref_tim_audit_signer;
          break;
        case "create":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          data.signers = dataWorkflow.ref_tim_audit_signer;
          break;
        case "reject":
          data.note = dataWorkflow.note;
          break;
        case "approve":
          if (
            signedCount ===
            dataWorkflow?.ref_tim_audit_approver?.length - 1
          ) {
            data.doc_name = `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}-MAPA`;
            data.data = "test";
          }
          data.note = dataWorkflow.note;
          break;
      }

      loadingSwal();
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

      workflowDetailEWPMutate();
      dispatch(resetObjDataWorkflow());
      setShowModalApproval(false);
      loadingSwal("close");
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/comment/close/${value?.parent_id}`,
      {}
    );

    commentEWPMutate();
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

    commentEWPMutate();
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/comment/${params?.id}?ref_bab_mapa_id=${activeIdComment}`,
      body
    );

    commentEWPMutate();
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
    if (index === 4) {
      return analisisPerencanaanHtml(content?.analisis_perencanaan);
    } else if (index === 5) {
      const response = content?.jadwal;
      const mapping = [
        {
          keterangan: "Perencanaan (MAR)",
          start: response?.penyusunan_mapa_plan_start,
          end: response?.penyusunan_mapa_plan_end,
        },
        {
          keterangan: "Pelaksanaan",
          start: response?.pelaksanaan_audit_plan_start,
          end: response?.pelaksanaan_audit_plan_end,
        },
        {
          keterangan: "Reporting",
          start: response?.monitoring_plan_start,
          end: response?.monitoring_plan_end,
        },
        {
          keterangan: "Wrap-up Meeting",
          start: response?.Wrapup_Meeting_plan_start,
          end: response?.Wrapup_Meeting_plan_end,
        },
      ];
      return jadwalHtml(mapping);
    } else if (index === 6) {
      return timHtml(content?.tim);
    } else if (index === 7) {
      return anggaranHtml(content?.anggaran);
    } else {
      return content;
    }
  };

  return (
    <LandingLayoutEWPQualityAssurance>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Dokumen"} />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/anggaran"}
          marginLeft={"-70px"}
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
            dataComment={dataComment}
            activeDivRef={activeDivRef}
            activeIndex={activeIndex}
            activeIndexComment={activeIndexComment}
            isOpenCardComment={openCardComment}
            isLoadingComment={commentEWPIsLoading}
            isHideButton={isCloseSubmodule || !isOnProgress}
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
                    dataWorkflow?.maker?.pn + " - " + dataWorkflow?.maker?.nama
                  }
                />
                <ApprovalItems
                  title={"Approver"}
                  text={dataWorkflow?.ref_tim_audit_approver}
                  data={dataWorkflow}
                />
                <ApprovalItems
                  title={"Signer"}
                  text={dataWorkflow?.ref_tim_audit_signer}
                />
              </div>
            </Card>
          </DivButton>
          <ModalWorkflow
            workflowData={dataWorkflow}
            historyWorkflow={historyWorkflow}
            validationErrors={validation}
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

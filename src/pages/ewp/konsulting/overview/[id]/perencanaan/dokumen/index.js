import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import {
  PrevNextNavigation,
  ApprovalItems,
  ModalComment,
  ModalWorkflow,
} from "@/components/molecules/commons";
import { NavigationDocument } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageChat } from "@/helpers/imagesUrl";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
// import {
//   useAuditorEWP,
//   useDocumentEWP,
//   useWorkflowDetailEWP,
// } from "@/data/ewp/konvensional";
import {
  useCommentMapaEWP,
  useDocumentEWP,
} from "@/data/ewp/konsulting/perencanaan/dokumen";
import { useSelector, useDispatch } from "react-redux";
import {
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  setWorkflowData,
  resetWorkflowData,
} from "@/slices/ewp/konsulting/perencanaan/documentMapaEWPKonsultingSlice";
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
import { useWorkflowDetailEWP } from "@/data/ewp";

const routes = [
  {
    name: "Sumber Informasi",
    slug: "sumber-informasi",
  },
  {
    name: "Tim & Timeplan",
    slug: "tim-timeplan",
  },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Program Kerja", slug: "program-kerja" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/perencanaan`;
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [listContent, setListContent] = useState([
    { idx: 1, total_comment: 0, title: "Sumber Informasi" },
    { idx: 2, total_comment: 0, title: "Tim & Timeplan" },
    { idx: 3, total_comment: 0, title: "Anggaran" },
    { idx: 4, total_comment: 0, title: "Program Kerja" },
  ]);
  const [listComment, setListComment] = useState([]);

  const ref = useRef(null);
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

  const workflowData = useSelector(
    (state) => state.documentMapaEWPKonsulting.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentMapaEWPKonsulting.validationErrorsWorkflow
  );

  const { projectDetail } = useProjectDetail({ id });
  const { documentEWP } = useDocumentEWP("mapa", bab, { id });
  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "mapa",
    { id }
  );
  const { commentMapaEWP, commentMapaEWPMutate } = useCommentMapaEWP({
    id,
    bab: activeIndexComment,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Perencanaan Kegiatan`,
        path: baseUrl,
      },
      {
        name: `Dokumen`,
        path: `${baseUrl}/perencanaan/dokumen`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (commentMapaEWP?.data?.length) {
      const mapping = commentMapaEWP?.data?.map((parent) => {
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
  }, [commentMapaEWP]);

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
      setListContent(mapping);
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
    if (documentEWP?.data && listContent?.length) {
      const findBab = listContent?.find((value) => value?.idx === bab);
      console.log(findBab);
      setDoc((prev) => [
        ...prev,
        {
          idx: findBab?.idx,
          title: findBab?.title,
          content: documentEWP?.data?.data,
        },
      ]);
    }
  }, [documentEWP, listContent]);

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
        status_approver: workflowInfo?.status_persetujuan_name,
        on_approver: workflowInfo?.status_approver,
      };

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

      dispatch(setWorkflowData(newWorkflowData));
    } else {
      dispatch(resetWorkflowData());
    }
  }, [workflowDetailEWP]);
  // [ END ]

  const handleClickComment = (babIdx) => {
    setOpenCardComment(true);
    setActiveIndexComment(babIdx);
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
        sub_modul: "mapa",
        sub_modul_id: id,
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
  const handleSubmitCommentParent = async (e, value) => {
    e.stopPropagation();
    const body = {
      ref_bab_mapa_id: activeIndexComment.toString(),
      deskripsi: value,
    };

    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/comment/${id}?ref_bab_mapa_id=${activeIndexComment}`,
      body
    );

    commentMapaEWPMutate();
  };

  const handleSubmitCommentChild = async (e, value) => {
    e.stopPropagation();
    const body = {
      ref_bab_mapa_id: activeIndexComment.toString(),
      deskripsi: value,
      parent_comment_id: selectedParentCommentId,
    };

    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/comment/${id}?ref_bab_mapa_id=${activeIndexComment}`,
      body
    );

    commentMapaEWPMutate();
  };

  const handleSelectedParentComment = (id) => {
    setSelectedParentCommentId(id);
  };
  // [ END ]

  return (
    <LandingLayoutEWPConsulting>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Dokumen"} />
        <PrevNextNavigation
          baseUrl={PrevNextNavigation}
          routes={routes}
          prevUrl={"/program-kerja"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="flex w-full gap-6">
        <div className="w-64">
          <div>
            <Card>
              <div className="px-3 py-1 w-full">
                <div className="text-xl">Daftar Isi</div>
                <div className="pl-2 mt-0.5">
                  {listContent.map((v, i) => {
                    return (
                      <NavigationDocument
                        key={i}
                        no={i + 1}
                        title={v.title}
                        handleClick={() => setActiveIndex(v.idx)}
                        activeIndex={currentPosition}
                        count={v.total_comment}
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
              <ModalComment
                callbackRef={ref}
                show={openCardComment}
                handleClickOutside={() => setOpenCardComment(false)}
                handleSubmitParent={handleSubmitCommentParent}
                handleSubmitChild={handleSubmitCommentChild}
                handleSelectedParentComment={handleSelectedParentComment}
                data={listComment}
              />
              {doc.map((v, i) => {
                return (
                  <div
                    key={i}
                    className={`page-container-a4 shrink-0 ${
                      i + 1 === activeIndex ? "active" : ""
                    }`}
                    tabIndex={i + 1 === activeIndex ? 0 : -1}
                    ref={i + 1 === activeIndex ? activeDivRef : null}
                  >
                    {v.content && (
                      <div className="px-4 h-full w-full relative page-content-a4">
                        <div className="flex justify-between">
                          <div className="font-bold text-xl">{v.title}</div>
                          <div className="flex items-center" ref={ref}>
                            <DivButton
                              handleClick={() => handleClickComment(v.idx)}
                            >
                              <Image src={ImageChat} alt="chat" />
                            </DivButton>
                          </div>
                        </div>
                        <div
                          className="mt-4"
                          dangerouslySetInnerHTML={{ __html: v.content }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <div>
          <DivButton
            handleClick={() => setShowModalApproval(true)}
            className="no-underline hover:no-underline w-56"
          >
            <div>
              <Card>
                <div className="w-full">
                  <div className="px-3">
                    <p className="text-brisma font-bold text-xl">Approval</p>
                    <ApprovalItems
                      title={"P.I.C Auditor"}
                      text={workflowData?.maker?.nama}
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
            withSigner
          />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

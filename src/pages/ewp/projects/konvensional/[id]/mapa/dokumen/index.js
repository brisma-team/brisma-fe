import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import {
  PrevNextNavigation,
  ApprovalItems,
} from "@/components/molecules/commons";
import { NavigationDocument } from "@/components/molecules/commons";
import { CardCommentMAPA } from "@/components/molecules/ewp/konvensional/mapa/dokumen";
import { ModalWorkflowEWP } from "@/components/molecules/ewp/konvensional/common";
import Image from "next/image";
import { ImageChat } from "@/helpers/imagesUrl";
import { useRef, useState, useEffect } from "react";
import { useCommentPAT, useDocument } from "@/data/pat";
import { useRouter } from "next/router";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useAuditorEWP, useWorkflowDetailEWP } from "@/data/ewp/konvensional";
import { useSelector, useDispatch } from "react-redux";
import {
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  setWorkflowData,
  resetWorkflowData,
} from "@/slices/ewp/konvensional/mapa/documentMapaEWPSlice";
import _ from "lodash";
import {
  confirmationSwal,
  convertDate,
  setErrorValidation,
  usePostData,
  useUpdateData,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";

const sample = {
  data: '<figure class="image"><img src="http://139.59.104.214:9000/pat/1696921137696-LOGO_BRISMA_UNTUK_202_(1).png" alt="LOGO BRISMA UNTUK 202 (1).png"></figure><h2 style="margin-left:28.8px;">What is Lorem Ipsum?</h2><p style="text-align:justify;margin-left:28.8px;"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h2 style="margin-left:14.4px;">Why do we use it?</h2><p style="text-align:justify;margin-left:14.4px;">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><h2 style="margin-left:28.8px;">Where does it come from?</h2><p style="text-align:justify;margin-left:28.8px;">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p><p style="text-align:justify;margin-left:28.8px;">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p><h2 style="margin-left:14.4px;">Where can I get some?</h2><p style="text-align:justify;margin-left:14.4px;">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>',
  comment: 0,
};

const index = () => {
  const { id, kkpa_id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/kkpa`;
  const dispatch = useDispatch();

  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id}`,
      path: `${baseUrl}`,
    },
    {
      name: "Detail KKPA",
      path: `${baseUrl}/audited/${kkpa_id}/detail`,
    },
  ];

  const nav = [
    { idx: 1, name: "Latar Belakang", url: "lb" },
    { idx: 2, name: "Tujuan", url: "tujuan" },
    { idx: 3, name: "Sumber Informasi", url: "si" },
    { idx: 4, name: "Pemetaan Prioritas", url: "pemetaan" },
    { idx: 5, name: "Tim Audit", url: "tim_audit" },
    { idx: 6, name: "UKER Assessment", url: "uker_assessment" },
    {
      idx: 7,
      name: "Analisis Perencanaan",
      url: "analisis",
    },
    {
      idx: 8,
      name: "Penugasan",
      url: "penugasan",
    },
    {
      idx: 9,
      name: "Jadwal Audit",
      url: "jadwal_audit",
    },
    {
      idx: 10,
      name: "Anggaran",
      url: "anggaran",
    },
    {
      idx: 11,
      name: "Dokumen",
      url: "dokumen",
    },
  ];

  const ref = useRef(null);
  const [showModalApproval, setShowModalApproval] = useState(false);
  const [openCardComment, setOpenCardComment] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeIndexComment, setActiveIndexComment] = useState(1);
  const activeDivRef = useRef(null);
  const [hitEndpointCount, setHitEndpointCount] = useState(0);
  const [doc, setDoc] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [totalComment, setTotalComment] = useState([]);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);

  const workflowData = useSelector(
    (state) => state.documentMapaEWP.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentMapaEWP.validationErrorsWorkflow
  );

  const [type, setType] = useState("ltb");
  const { documentPAT, documentPATMutate } = useDocument(type, { id });
  const { commentPAT } = useCommentPAT("total", { id });
  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "mapa",
    { id }
  );

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
      if (isAtBottom && hitEndpointCount < nav.length) {
        setHitEndpointCount((prev) => Math.min(prev + 1, nav.length));
      }
    }
  };
  // [ END ]

  // [ START ] Hook ini berfungsi untuk menghitung total comment berdasarkan masing-masing
  // BAB pada dokumen
  useEffect(() => {
    if (commentPAT?.data?.length) {
      const mappingTotalComment = commentPAT?.data?.map((v) => {
        const bab = v?.ref_bab_pat_kode;
        const total = v?.data?.filter((item) => !item?.is_closed).length;
        return { bab, total };
      });

      setTotalComment(mappingTotalComment);
    }
  }, [commentPAT]);
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
    // Data dummy
    if (hitEndpointCount < nav.length) {
      setDoc((prev) => [
        ...prev,
        {
          idx: hitEndpointCount,
          key: nav[hitEndpointCount].name,
          content: sample.data,
          comment: sample.comment,
        },
      ]);
      setTotalComment((prev) => [...prev, { bab: currentPosition, total: 2 }]);
    }

    // Yang benar ini
    // setType(nav[hitEndpointCount].url);
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

  // [START] Hook ini berfungsi untuk menyimpan data workflow untuk Modal Workflow yang akan
  // digunakan sebagai payload dan juga data yang akan ditampilkan saat Modal muncul
  useEffect(() => {
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
  }, [workflowDetailEWP]);
  // [ END ]

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

  return (
    <LandingLayoutEWP>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Detail K.K.P.A"} />
        <PrevNextNavigation baseUrl={baseUrl} prevUrl={"/"} />
      </div>
      {/* Start Content */}
      <div className="flex w-full gap-6">
        <div className="w-64">
          <div>
            <Card>
              <div className="px-3 py-1 w-full">
                <div className="text-xl">Daftar Isi</div>
                <div className="pl-2 mt-0.5">
                  {nav.map((v, i) => {
                    return (
                      <NavigationDocument
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
              <CardCommentMAPA
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
                        <div
                          className="mt-4"
                          dangerouslySetInnerHTML={{ __html: v.content }}
                        />
                        {/* {v.idx === 2 ? (
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
                        )} */}
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
                    <p className="text-brisma font-bold text-xl">
                      Approval K.K.P.A
                    </p>
                    <ApprovalItems
                      title={"P.I.C"}
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
          <ModalWorkflowEWP
            workflowData={workflowData}
            historyWorkflow={historyWorkflow}
            validationErrors={validationErrorsWorkflow}
            setShowModal={setShowModalApproval}
            showModal={showModalApproval}
            headerTitle={"Approval K.K.P.A"}
            handleChange={handleChangeText}
            handleChangeSelect={handleChangeSelect}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;

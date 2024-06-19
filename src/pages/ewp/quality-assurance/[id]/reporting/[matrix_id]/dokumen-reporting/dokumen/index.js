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
import { useDocumentEWP } from "@/data/ewp/common/dokumen";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataWorkflow,
  setValidationErrorsWorkflow,
  resetObjDataWorkflow,
  resetValidationErrorsWorkflow,
} from "@/slices/ewp/quality-assurance/reporting/dokumenReportingEWPQualityAssuranceSlice";
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
import rencanaPerbaikanHtml from "@/templates/ewp/quality-assurance/reporting/rencanaPerbaikan";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Standar Review", slug: "standar-review" },
  { name: "Ruang Lingkup", slug: "ruang-lingkup" },
  { name: "Metode Penilaian", slug: "metode-penilaian" },
  { name: "Hasil Review Kualitas", slug: "hasil-review" },
  { name: "Peluang Peningkatan Kualitas", slug: "peluang-peningkatan" },
  { name: "Rencana Perbaikan", slug: "rencana-perbaikan" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    matrix_id: 0,
    is_approval: false,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/reporting/${params?.matrix_id}/dokumen-reporting`;
  const dispatch = useDispatch();

  const listBab = [
    { idx: 1, title: "Latar Belakang" },
    { idx: 2, title: "Tujuan" },
    { idx: 3, title: "Standar Review" },
    { idx: 4, title: "Ruang Lingkup" },
    { idx: 5, title: "Metode Penilaian" },
    { idx: 6, title: "Hasil Review Kualitas" },
    { idx: 7, title: "Peluang Peningkatan Kualitas" },
    { idx: 8, title: "Rencana Perbaikan" },
  ];

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [listContent, setListContent] = useState([]);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const activeDivRef = useRef(null);
  const [doc, setDoc] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [bab, setBab] = useState(1);

  //   const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  //   const [isOnProgress, setIsOnProgress] = useState(false);

  const dataWorkflow = useSelector(
    (state) => state.dokumenReportingEWPQualityAssurance.objDataWorkflow
  );
  const validation = useSelector(
    (state) =>
      state.dokumenReportingEWPQualityAssurance.validationErrorsWorkflow
  );

  const { auditInfo } = useAuditInfo({ id: params?.id, module: "qa" });
  const { documentEWP } = useDocumentEWP({
    module: "qa",
    sub_module: "reporting",
    id: params?.matrix_id,
    bab,
  });
  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "lha",
    { id: params?.matrix_id }
  );

  useEffect(() => {
    setShowModalApproval(params?.is_approval);
  }, [params?.is_approval]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id, matrix_id, is_approval } = router.query;
    setParams({
      id,
      matrix_id,
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
      { name: "Reporting", path: `${baseUrl}/reporting` },
      {
        name: "Dokumen Reporting",
        path: pathName,
      },
      {
        name: "Dokumen",
        path: `${pathName}/dokumen`,
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    const response = documentEWP?.data?.daftar_isi;
    if (response) {
      const mapping = response?.map((bab) => {
        return {
          idx: bab?.bab,
          total_comment: 0,
          title: bab?.title,
        };
      });

      const filteredResult = mapping.filter((item) => {
        return doc.some((docItem) => docItem.idx == item.idx);
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
      const findBab = listBab?.find((value) => value?.idx == bab);
      const findBabId = documentEWP?.data?.daftar_isi?.find(
        (value) => value?.key == bab
      );
      const findDoc = doc?.find((value) => value?.idx == bab);
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
        status_approver: workflowInfo?.status_persetujuan,
        on_approver: workflowInfo?.status_approver,
      };

      //   setIsOnProgress(
      //     Boolean(
      //       workflowInfo.status_persetujuan == "On Progress" ||
      //         workflowInfo.status_persetujuan == "On Approver"
      //     )
      //   );

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

      dispatch(setObjDataWorkflow(newWorkflowData));
    } else {
      dispatch(resetObjDataWorkflow());
    }
  }, [workflowDetailEWP, showModalApproval]);
  // [ END ]

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
        sub_modul: "lha",
        sub_modul_id: params?.matrix_id,
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

      await fetchApi(
        actionType === "change" ? "PATCH" : "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow/${actionType}`,
        data
      );

      workflowDetailEWPMutate();
      dispatch(resetObjDataWorkflow());
      setShowModalApproval(false);
      loadingSwal("close");
    }
    workflowDetailEWPMutate();
  };
  // [ END ]

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const renderContent = (index, content) => {
    if (index === 8) {
      const contentData = {
        uraian: content?.uraian ? content?.uraian : "",
        rekomendasi: content?.kkpt ? content?.kkpt : "",
      };
      return rencanaPerbaikanHtml(contentData);
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
          prevUrl={"/rencana-perbaikan"}
          marginLeft={"-100px"}
          widthDropdown={"w-[15rem]"}
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
            activeDivRef={activeDivRef}
            activeIndex={activeIndex}
            // isHideButton={isCloseSubmodule || !isOnProgress}
            renderContent={renderContent}
            withoutComment
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

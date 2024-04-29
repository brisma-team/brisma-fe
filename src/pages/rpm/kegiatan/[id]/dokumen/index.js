import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import {
  ApprovalItems,
  ContentDocument,
  ListContentDocument,
  ModalWorkflow,
} from "@/components/molecules/commons";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDocument, useWorkflow } from "@/data/rpm/kegiatan";
import { useSelector, useDispatch } from "react-redux";
import {
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  setWorkflowData,
  resetWorkflowData,
} from "@/slices/rpm/kegiatan/documentRPMKegiatanSlice";
import {
  checkRoleApprovalLog,
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
import { dokumenRPMDoc } from "@/templates/rpm/konsulting";
import _ from "lodash";

const listBab = [{ idx: 1, title: "Monitoring" }];

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 1,
    matrix_id: 1,
    kkpt_id: 1,
  });

  const baseUrl = `/rpm/kegiatan/${params?.id}`;
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const activeDivRef = useRef(null);
  const [doc, setDoc] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);

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
    (state) => state.documentRPMKegiatan.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentRPMKegiatan.validationErrorsWorkflow
  );

  const { documentData } = useDocument(params?.id, 1);
  const { workflowRPMData, workflowRPMMutate } = useWorkflow({
    type: "project_rpm",
    id: params?.id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Kegiatan Overview", path: "/rpm/kegiatan" },
      {
        name: `Landing Monitoring`,
        path: `${baseUrl}`,
      },
      {
        name: `Dokumen`,
        path: `${baseUrl}/dokumen`,
      },
    ]);
  }, [params?.id]);

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
      const mappingData = documentData?.data?.kkpts?.map((v) => {
        const rekomendasi = v?.rpm_action_plan?.length
          ? v?.rpm_action_plan?.map((rekomendasi) => {
              return {
                deadline: rekomendasi?.batas_waktu,
                desc: rekomendasi?.rekomendasi_kkpt?.description,
                lampiran: rekomendasi?.lampiran?.length
                  ? rekomendasi?.lampiran?.map((lampiran) => {
                      return _.pick(lampiran, ["file_url", "file_name"]);
                    })
                  : [],
                status: rekomendasi?.status_complete,
                tanggapan: rekomendasi?.desc_tanggapan,
              };
            })
          : [];
        return {
          ..._.pick(v?.kkpt_ewp?.kkpt, [
            "kondisi",
            "sebab",
            "tanggapan_manajemen",
          ]),
          judul: v?.nama_kkpt,
          rekomendasi,
        };
      });

      setDoc((prev) => [
        ...prev,
        {
          idx: 1,
          bab_id: 1,
          title: "Monitoring",
          content: mappingData,
        },
      ]);
    }
  }, [documentData]);

  // [START] Hook ini berfungsi untuk menyimpan data workflow untuk Modal Workflow yang akan
  // digunakan sebagai payload dan juga data yang akan ditampilkan saat Modal muncul
  useEffect(() => {
    if (workflowRPMData?.data) {
      const workflowInfo = workflowRPMData?.data?.info;
      const maker = workflowRPMData?.data?.initiator;
      const approvers = workflowRPMData?.data?.approver;
      const signers = workflowRPMData?.data?.signer;

      const newWorkflowData = {
        ...workflowData,
        status_approver: workflowInfo?.status_persetujuan,
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

      if (workflowRPMData?.data?.log?.length) {
        const mapping = workflowRPMData?.data?.log?.map((v) => {
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
            Tanggal: convertDate(v?.createdAt, "/", "d"),
          };
        });
        setHistoryWorkflow(mapping);
      }

      dispatch(setWorkflowData(newWorkflowData));
    } else {
      dispatch(resetWorkflowData());
    }
  }, [workflowRPMData]);
  // [ END ]

  // [ START ] function untuk Modal Workflow
  const handleCloseModalWorkflow = () => {
    dispatch(resetWorkflowData());
    workflowRPMMutate();
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
        sub_modul: "project_rpm",
        sub_modul_id: params?.id,
        url_path: `${baseUrl}/dokumen`,
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

      loadingSwal();
      if (actionType === "change") {
        const response = await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/change`,
          data
        );
        if (!response.isDismissed) return;
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/${actionType}`,
          data
        );
      }

      workflowRPMMutate();
      dispatch(resetWorkflowData());
      setShowModalApproval(false);
      loadingSwal("close");
    }
    workflowRPMMutate();
  };
  // [ END ]

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const renderContent = (index, content) => {
    return content?.length
      ? content
          .map((data, index_data) => {
            return dokumenRPMDoc(data, index_data);
          })
          .join("")
      : "";
  };

  return (
    <LandingLayoutRPMKegiatan>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Dokumen Monitoring"} />
      </div>
      {/* Start Content */}
      <div className="flex w-full gap-6">
        <ListContentDocument
          data={listBab}
          currentPosition={currentPosition}
          handleActiveIndex={handleActiveIndex}
        />
        <div>
          <ContentDocument
            dataDoc={doc}
            activeDivRef={activeDivRef}
            activeIndex={activeIndex}
            renderContent={renderContent}
            withoutComment
            overflowScrollX
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
                    workflowData?.maker?.pn + " - " + workflowData?.maker?.nama
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
    </LandingLayoutRPMKegiatan>
  );
};

export default index;

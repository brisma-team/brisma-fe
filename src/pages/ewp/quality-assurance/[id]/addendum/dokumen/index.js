import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ApprovalItems, ModalWorkflow } from "@/components/molecules/commons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import {
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  setWorkflowData,
  resetWorkflowData,
} from "@/slices/ewp/konsulting/peluang-peningkatan/documentDetailPeluangKonsultingSlice";
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
import { useRingkasan } from "@/data/ewp/konsulting/addendum/lain";
import { useAddendumStatus, useWorkflow } from "@/data/ewp/konsulting/addendum";
import { addendumDocs } from "@/templates/ewp/konsulting";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPAddendum } from "@/layouts/ewp";

const section = {
  latar_belakang: "Latar Belakang",
  anggaran: "Anggaran",
  tujuan: "Tujuan",
  analisa: "Analisa",
  jadwal: "Jadwal",
  tim: "Tim",
  uker: "Uker Assessment",
  mapa_project: "Project",
};

const index = () => {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [params, setParams] = useState({
    id: 0,
    addendum_id: 0,
    is_approval: false,
  });

  const baseUrl = `/ewp/quality-assurance/${params?.id}/addendum`;
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [uka, setUka] = useState({
    kode: "",
    name: "",
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

  const workflowData = useSelector(
    (state) => state.documentDetailPeluangKonsulting.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentDetailPeluangKonsulting.validationErrorsWorkflow
  );

  const { ringkasan } = useRingkasan({ id: params?.id, type: "" });
  const { status } = useAddendumStatus({
    id: params?.id,
  });
  const { workflowAddendumData, workflowAddendumMutate } = useWorkflow({
    type: "adendum",
    id: params?.addendum_id,
  });
  const { projectDetail } = useProjectDetail({ id: params?.id });

  useEffect(() => {
    if (status !== undefined) {
      setParams({
        ...params,
        addendum_id: status?.data?.addendumInfo?.id,
      });
    }
  }, [status, params?.id]);

  useEffect(() => {
    if (ringkasan !== undefined) {
      setContent(ringkasan?.data);
    }
  }, [ringkasan]);

  useEffect(() => {
    const projectInfo = projectDetail?.data?.project_info;
    setUka({ kode: projectInfo?.uka_kode, name: projectInfo?.uka_name });
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/quality-assurance/${params?.id}/info`,
      },
      {
        name: "Addendum Perencanaan",
        path: `/ewp/quality-assurance/${params?.id}/addendum`,
      },
      {
        name: "Dokumen",
        path: `/ewp/quality-assurance/${params?.id}/addendum/dokumen`,
      },
    ]);
  }, [projectDetail]);

  // [START] Hook ini berfungsi untuk menyimpan data workflow untuk Modal Workflow yang akan
  // digunakan sebagai payload dan juga data yang akan ditampilkan saat Modal muncul
  useEffect(() => {
    if (workflowAddendumData?.data) {
      const workflowInfo = workflowAddendumData?.data?.info;
      const maker = workflowAddendumData?.data?.initiator;
      const approvers = workflowAddendumData?.data?.approver;
      const signers = workflowAddendumData?.data?.signer;

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

      if (workflowAddendumData?.data?.log?.length) {
        const mapping = workflowAddendumData?.data?.log?.map((v) => {
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
  }, [workflowAddendumData, showModalApproval]);
  // [ END ]

  // [ START ] function untuk Modal Workflow
  const handleCloseModalWorkflow = () => {
    dispatch(resetWorkflowData());
    workflowAddendumMutate();
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
        sub_modul: "adendum",
        sub_modul_id: params?.addendum_id,
        url_path: `${baseUrl}/dokumen`,
      };

      const signedCount = workflowData?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      if (actionType === "" || actionType === undefined) {
        return;
      }

      const totalSigner = workflowData?.ref_tim_audit_approver?.length;

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
          if (
            signedCount ===
            workflowData?.ref_tim_audit_approver?.length - 1
          ) {
            data.doc_name = `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}-Addendum_Ke-${
              projectDetail?.data?.project_info?.number_adendum + 1 || 0
            }`;
            data.data = addendumDocs(uka, content);
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
        if (totalSigner - signedCount == 1 && actionType === "approve") {
          router.push(`/ewp/quality-assurance/${params?.id}/info`);
        }
      }

      workflowAddendumMutate();
      dispatch(resetWorkflowData());
      setShowModalApproval(false);
      loadingSwal("close");
    }
    workflowAddendumMutate();
  };
  // [ END ]

  return (
    <LandingLayoutEWPAddendum type="quality-assurance">
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle className={"text-atlasian-red"} text={"Dokumen Addendum"} />
      </div>
      {/* Start Content */}
      <div className="flex w-full gap-6">
        <div>
          <Card>
            <div className="overflow-y-scroll my-2 parent max-h-[40rem]">
              <div className={`page-container-a4 shrink-0`}>
                <div className="px-4 h-full w-full relative page-content-a4">
                  <div className="flex justify-between">
                    <div className="font-bold text-xl">{"Detail Addendum"}</div>
                  </div>
                  <div className="mt-4">
                    <div className="dataTables-custom">
                      <TableTree>
                        <Headers>
                          <Header className="!hidden" />
                          <Header
                            width="28%"
                            className="border-t border-x cell-custom-dataTables"
                          >
                            Section
                          </Header>
                          <Header
                            width="18%"
                            className="border-t border-r cell-custom-dataTables"
                          >
                            Keterangan
                          </Header>
                          <Header
                            width="18%"
                            className="border-t border-r cell-custom-dataTables"
                          >
                            Sebelum
                          </Header>
                          <Header
                            width="18%"
                            className="border-t border-r cell-custom-dataTables"
                          >
                            Sesudah
                          </Header>
                          <Header
                            width="18%"
                            className="border-t border-r cell-custom-dataTables"
                          >
                            Alasan
                          </Header>
                        </Headers>
                        <Rows
                          items={content}
                          render={({
                            part,
                            note_sebelum,
                            note_sesudah,
                            keterangan,
                            alasan,
                          }) => (
                            <Row>
                              <Cell className="!hidden" />
                              <Cell
                                width="28%"
                                className="border-r border-l cell-custom-dataTables text-sm overflow-hidden text-ellipsis break-words"
                              >
                                {section[part] || "-"}
                              </Cell>
                              <Cell
                                width="18%"
                                className="border-r cell-custom-dataTables text-xs overflow-hidden text-ellipsis break-words"
                              >
                                {keterangan || "-"}
                              </Cell>
                              <Cell
                                width="18%"
                                className="border-r cell-custom-dataTables text-xs overflow-hidden text-ellipsis break-words"
                              >
                                {note_sebelum || "-"}
                              </Cell>
                              <Cell
                                width="18%"
                                className="border-r cell-custom-dataTables text-xs overflow-hidden text-ellipsis break-words"
                              >
                                {note_sesudah || "-"}
                              </Cell>
                              <Cell
                                width="18%"
                                className="border-r cell-custom-dataTables text-xs overflow-hidden text-ellipsis break-words"
                              >
                                {alasan || "-"}
                              </Cell>
                            </Row>
                          )}
                        />
                      </TableTree>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
                      text={
                        workflowData?.maker?.pn +
                        " - " +
                        workflowData?.maker?.nama
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
    </LandingLayoutEWPAddendum>
  );
};

export default index;

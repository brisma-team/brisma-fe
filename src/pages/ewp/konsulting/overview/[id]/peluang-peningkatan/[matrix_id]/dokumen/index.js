import {
  Breadcrumbs,
  ButtonField,
  Card,
  DivButton,
  PageTitle,
} from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ApprovalItems,
  AttachmentClipping,
  CardHistory,
  ImageClipping,
  ModalWorkflow,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import {
  resetValidationErrorsWorkflow,
  setValidationErrorsWorkflow,
  setWorkflowData,
  resetWorkflowData,
} from "@/slices/ewp/konsulting/peluang-peningkatan/documentMatrixPeluangKonsultingSlice";
import {
  confirmationSwal,
  convertDate,
  setErrorValidation,
  usePostData,
  useUpdateData,
  fetchApi,
  loadingSwal,
  usePostFileData,
} from "@/helpers";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import {
  useMatrixDocument,
  useWorkflowMatrix,
} from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Header",
    slug: "header",
  },
  {
    name: "Peluang Peningkatan",
    slug: "overview",
  },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id, matrix_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan/`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${matrix_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [content, setContent] = useState("");
  const [typeUpload, setTypeUpload] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [documentLog, setDocumentLog] = useState([]);

  //workflow
  const [historyWorkflow, setHistoryWorkflow] = useState([]);
  const [showModalApproval, setShowModalApproval] = useState(false);

  const { projectDetail } = useProjectDetail({ id });
  const { matrixDocument, matrixDocumentMutate } = useMatrixDocument({
    id: matrix_id,
  });
  const workflowData = useSelector(
    (state) => state.documentMatrixPeluangKonsulting.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.documentMatrixPeluangKonsulting.validationErrorsWorkflow
  );

  const { workflowMatrixData, workflowMatrixMutate } = useWorkflowMatrix({
    type: "matrix_peluang_peningkatan",
    id: matrix_id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Peluang Peningkatan`,
        path: `${pathNameBase}`,
      },
      {
        name: `Document Matrix`,
        path: `${pathNameContent}`,
      },
    ]);
  }, [projectDetail]);

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

      if (workflowMatrixData?.data?.log?.length) {
        const mapping = workflowMatrixData?.data?.log?.map((v) => {
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
  }, [workflowMatrixData]);
  // [ END ]

  useEffect(() => {
    if (!isReset) {
      setContent(matrixDocument?.data?.doc || "");
    }
    const logs = matrixDocument?.data?.log_perubahan_matrix?.map(
      (val, index) => {
        return {
          id: index,
          date: convertDate(val?.createdAt, "/", "d"),
          subject: val?.pn + " - " + val?.nama,
          description: "Mengubah Document",
        };
      }
    );
    setDocumentLog(logs);
  }, [matrixDocument, isReset]);

  const handleClickUploadAttachment = () => {
    setTypeUpload("attachment");
  };

  const handleClickUploadImage = () => {
    setTypeUpload("image");
  };

  const handleUploadFile = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const handleSubmit = async () => {
    loadingSwal();
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk menyimpan perubahan?"
    );

    if (!confirm.value) {
      return;
    }
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/matrix/doc`,
      { matrix_id, doc: content }
    );
    setIsReset(false);
    matrixDocumentMutate();
    loadingSwal("close");
  };

  const handleAsync = async () => {
    loadingSwal();
    const confirm = await confirmationSwal(
      "Konten akan direset sesuai sumber. Apakah Anda yakin?"
    );

    if (!confirm.value) {
      return;
    }
    setIsReset(true);
    const { data } = await fetchApi(
      "GET",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/matrix/doc/async/${matrix_id}`
    );
    setContent(renderDocument(data));
    loadingSwal("close");
  };

  const renderDocument = (data) => {
    return `<div>
        <div>${data?.info_header}</div>
        <div>${data?.peluang_peningkatan[0]?.kondisi || "N/A"}</div>
        <div>${data?.peluang_peningkatan[0]?.sebab || "N/A"}</div>
        <div>${data?.peluang_peningkatan[0]?.tanggapan_manajemen || "N/A"}</div>
      </div>`;
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

  const handleSubmitWorkFlow = async (e) => {
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
        sub_modul: "matrix_peluang_peningkatan",
        sub_modul_id: matrix_id,
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

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Matrix Document" />
        <PrevNextNavigation
          baseUrl={pathNameContent}
          routes={routes}
          prevUrl={"/overview"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        <div className="w-64 flex flex-col gap-4">
          <ImageClipping
            data={imageClipList}
            handleChange={handleUploadFile}
            handleClick={handleClickUploadImage}
          />
          <AttachmentClipping
            data={attachmentClipList}
            handleChange={handleUploadFile}
            handleClick={handleClickUploadAttachment}
          />
        </div>
        <div>
          <div className="ckeditor-latar-belakang-mapa-ewp">
            <Editor
              contentData={content}
              disabled={false}
              ready={true}
              onChange={(value) => setContent(value)}
            />
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <div
              className={`w-[7.75rem] ${
                isReset == true ? "bg-atlasian-gray-dark" : "bg-atlasian-yellow"
              } rounded`}
            >
              <ButtonField
                text={"Reset"}
                disabled={isReset}
                handler={handleAsync}
              />
            </div>
            <div className="w-[7.75rem] bg-atlasian-green rounded">
              <ButtonField text={"Simpan"} handler={handleSubmit} />
            </div>
          </div>
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
          <div>
            <CardHistory data={documentLog} />
          </div>
          <ModalWorkflow
            workflowData={workflowData}
            historyWorkflow={historyWorkflow}
            validationErrors={validationErrorsWorkflow}
            showModal={showModalApproval}
            headerTitle={"Workflow & Riwayat Approval"}
            handleDelete={handleDelete}
            handleSubmit={handleSubmitWorkFlow}
            setShowModal={setShowModalApproval}
            handleAdd={handleAdd}
            handleChangeSelect={handleChangeSelect}
            handleChangeText={handleChangeText}
            withSigner={true}
          />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

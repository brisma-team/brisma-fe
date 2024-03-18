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
  AttachmentClipping,
  ImageClipping,
  PrevNextNavigation,
  ModalWorkflow,
  ApprovalItems,
} from "@/components/molecules/commons";
import {
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";
import { useMeetingDetail, useNotulen } from "@/data/ewp/konsulting/meeting";
import { useSelector, useDispatch } from "react-redux";
import {
  setWorkflowData,
  setHistoryWorkflowData,
  setValidationErrorsWorkflow,
  resetWorkflowData,
  resetHistoryWorkflowData,
  resetValidationErrorsWorkflow,
} from "@/slices/ewp/konsulting/meeting/notulenMeetingEWPKonsultingSlice";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import { useWorkflowDetailEWP } from "@/data/ewp";
import _ from "lodash";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});
const routes = [
  {
    name: "Daftar Kehadiran",
    slug: `attendance`,
  },
  {
    name: "Notulen",
    slug: `notulen`,
  },
  {
    name: "Berita Acara",
    slug: `berita-acara`,
  },
];

const index = () => {
  const dispatch = useDispatch();
  const { id, meeting_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameSubModulMeeting = `${baseUrl}/meeting`;
  const pathNameLanding = `${baseUrl}/meeting/${meeting_id}`;

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [selectedNotulenId, setSelectedNotulenId] = useState(0);
  const [content, setContent] = useState("");
  const [typeUpload, setTypeUpload] = useState("");

  const workflowData = useSelector(
    (state) => state.notulenMeetingEWPKonsulting.objWorkflowData
  );
  const historyWorkflowData = useSelector(
    (state) => state.notulenMeetingEWPKonsulting.objHistoryWorkflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.notulenMeetingEWPKonsulting.validationErrorsWorkflow
  );

  const { projectDetail } = useProjectDetail({ id });
  const { meetingDetail } = useMeetingDetail({ id: meeting_id });
  const { notulen, notulenMutate } = useNotulen({ id: selectedNotulenId });
  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "entrance_notulen",
    { id: selectedNotulenId }
  );

  useEffect(() => {
    setSelectedNotulenId(meetingDetail?.data?.notulen?.id || 0);
  }, [meetingDetail]);

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
        name: `Meeting`,
        path: pathNameSubModulMeeting,
      },
      {
        name: `Entrance`,
        path: pathNameLanding,
      },
      {
        name: `Notulen`,
        path: `${pathNameLanding}/notulen`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    setContent(notulen?.data?.notulen_info?.content || "");
  }, [notulen]);

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
        dispatch(setHistoryWorkflowData(mapping));
      } else {
        dispatch(resetHistoryWorkflowData());
      }

      dispatch(setWorkflowData(newWorkflowData));
    } else {
      dispatch(resetWorkflowData());
    }
  }, [workflowDetailEWP]);

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

  const handleSubmitContent = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/notulen`,
      { notulen_id: selectedNotulenId, content }
    );
    notulenMutate();
    loadingSwal("close");
  };

  // [ START ] handler for modal workflow
  const handleAddApprover = (property) => {
    const newData = [...workflowData[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
  };

  const handleDeleteApprover = (property, idx) => {
    const newData = [...workflowData[property]];
    newData.splice(idx, 1);
    dispatch(setWorkflowData({ ...workflowData, [property]: newData }));
  };

  const handleChangeTextWorkflow = (property, value) => {
    dispatch(
      setWorkflowData({
        ...workflowData,
        [property]: value,
      })
    );
  };

  const handleChangeSelectWorkflow = (property, index, e) => {
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

  const handleSubmitApproval = async (e) => {
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
        sub_modul: "entrance_notulen",
        sub_modul_id: selectedNotulenId,
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
            data.data = content;
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

      workflowDetailEWPMutate();
      dispatch(resetWorkflowData());
      setShowModalApproval(false);
    }
    workflowDetailEWPMutate();
  };
  // [ END ] handler for modal workflow

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Notulen" />
        <PrevNextNavigation
          baseUrl={pathNameLanding}
          routes={routes}
          prevUrl={"/attendance"}
          nextUrl={"/berita-acara"}
          marginLeft={"-55px"}
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
              onChange={(value) => setContent(value)}
              ready
            />
          </div>
          <div className="mt-3 flex justify-end">
            <div className="w-[7.75rem] bg-atlasian-green rounded">
              <ButtonField text={"Simpan"} handler={handleSubmitContent} />
            </div>
          </div>
        </div>
        <DivButton
          handleClick={() => setShowModalApproval(true)}
          className="no-underline hover:no-underline w-56 h-fit"
        >
          <div>
            <Card>
              <div className="w-full">
                <div className="px-3">
                  <p className="text-brisma font-bold text-xl">Approval</p>
                  <ApprovalItems
                    title={"Proposer"}
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
      </div>
      <ModalWorkflow
        workflowData={workflowData}
        historyWorkflow={historyWorkflowData}
        validationErrors={validationErrorsWorkflow}
        showModal={showModalApproval}
        headerTitle={"Workflow & Riwayat Approval"}
        handleDelete={handleDeleteApprover}
        handleSubmit={handleSubmitApproval}
        setShowModal={setShowModalApproval}
        handleAdd={handleAddApprover}
        handleChangeSelect={handleChangeSelectWorkflow}
        handleChangeText={handleChangeTextWorkflow}
        withSigner
        isProposer
      />
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

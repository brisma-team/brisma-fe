import { LandingLayoutEWP } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  DivButton,
  PageTitle,
  UploadButton,
} from "@/components/atoms";
import { useAuditorEWP, useWorkflowDetailEWP } from "@/data/ewp/konvensional";
import { useRouter } from "next/router";
import {
  PopupKlipping,
  PrevNextNavigation,
  ApprovalItems,
} from "@/components/molecules/commons";
import dynamic from "next/dynamic";
import {
  confirmationSwal,
  convertDate,
  copyToClipboard,
  errorSwal,
  loadingSwal,
  setErrorValidation,
  usePostData,
  usePostFileData,
  useUpdateData,
} from "@/helpers";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ModalWorkflowEWP } from "@/components/molecules/ewp/konvensional/common";
import { useLandingEntranceEWP } from "@/data/ewp/konvensional/entrance";
import { useBeritaAcaraEntranceEWP } from "@/data/ewp/konvensional/entrance/berita-acara";
import { useSelector } from "react-redux";
import {
  resetValidationErrorsWorkflow,
  resetWorkflowData,
  setValidationErrorsWorkflow,
  setWorkflowData,
} from "@/slices/ewp/konvensional/entrance/beritaAcaraEntranceEWPSlice";
import { useDispatch } from "react-redux";
import { workflowSchema } from "@/helpers/schemas/pat/documentSchema";
import _ from "lodash";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Daftar Kehadiran",
    slug: "attendance",
  },
  {
    name: "Notulen",
    slug: "notulen",
  },
  { name: "Berita Acara", slug: "berita-acara" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const pathName = `/ewp/projects/konvensional/${id}/entrance`;
  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Entrance`,
      path: pathName,
    },
    {
      name: `Berita Acara`,
      path: `${pathName}/berita-acara`,
    },
  ];

  const { landingEntranceEWP } = useLandingEntranceEWP({ id });
  const { beritaAcaraEntranceEWP } = useBeritaAcaraEntranceEWP({
    ba_id: landingEntranceEWP?.data?.ba_id,
  });

  const { workflowDetailEWP, workflowDetailEWPMutate } = useWorkflowDetailEWP(
    "entrance_ba",
    { id: landingEntranceEWP?.data?.ba_id }
  );

  const [content, setContent] = useState("");
  const [imageClipList, setImageClipList] = useState([]);
  const [showModalApproval, setShowModalApproval] = useState(false);
  const [historyWorkflow, setHistoryWorkflow] = useState([]);

  const workflowData = useSelector(
    (state) => state.beritaAcaraEntranceEWP.workflowData
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.beritaAcaraEntranceEWP.validationErrorsWorkflow
  );

  // [START] Hook ini berfungsi untuk menyimpan data workflow untuk Modal Workflow yang akan
  // digunakan sebagai payload dan juga data yang akan ditampilkan saat Modal muncul
  useEffect(() => {
    const workflowInfo = workflowDetailEWP?.data?.info;
    const maker = workflowDetailEWP?.data?.initiator;
    const approvers = workflowDetailEWP?.data?.approver;
    const signers = workflowDetailEWP?.data?.signer;

    const newWorkflowData = {
      ...workflowData,
      status_approver:
        workflowInfo?.status_persetujuan_name ||
        workflowInfo?.status_persetujuan,
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
      setHistoryWorkflow(mapping);
    }

    dispatch(setWorkflowData(newWorkflowData));
  }, [workflowDetailEWP]);

  useEffect(() => {
    setContent(beritaAcaraEntranceEWP?.data?.berita_acara_info?.content || "");
  }, [beritaAcaraEntranceEWP]);
  // [ END ]

  const openModalApproval = () => {
    setShowModalApproval(true);
  };

  const handleUpload = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      setImageClipList((prev) => [
        ...prev,
        { url: response.url[0], name: e.target.files[0].name },
      ]);
    }
    loadingSwal("close");
  };

  const handleSubmit = async () => {
    loadingSwal();
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/entrance/ba`,
      { content, ba_id: landingEntranceEWP?.data?.ba_id }
    );
    loadingSwal("close");
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

  const handleSaveApproval = async (e) => {
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
        sub_modul: "entrance_ba",
        sub_modul_id: landingEntranceEWP?.data?.ba_id,
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

      if (actionType === "reject" && !workflowData.note) {
        await errorSwal(
          "Silakan berikan alasan mengapa Anda memilih untuk menolak."
        );
        return;
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
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Berita Acara" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/attendance"}
          nextUrl={"/berita-acara"}
          marginLeft={"-55px"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex justify-between">
        <div className="flex gap-6">
          <div className="w-64">
            <div>
              <Card>
                <div className="w-full px-4 -ml-1">
                  <div className="flex justify-between">
                    <p className="text-xl font-semibold">Kliping Gambar</p>
                    <PopupKlipping />
                  </div>
                  {/* Start Kliping Gambar */}
                  <div
                    className="grid grid-cols-2 -mx-1 mt-2 overflow-scroll overflow-x-hidden"
                    style={{ maxHeight: "37rem" }}
                  >
                    {imageClipList.length
                      ? imageClipList?.map((v, i) => {
                          return (
                            <button
                              key={i}
                              className="m-2 border-2 shadow-sm rounded-lg p-3"
                              style={{ width: "6.25rem", height: "6.25rem" }}
                              onClick={() => copyToClipboard(v?.url)}
                            >
                              <Image
                                src={v?.url}
                                alt={v?.name}
                                width={200}
                                height={200}
                              />
                            </button>
                          );
                        })
                      : ""}
                  </div>
                  <div className="mt-4 py-2 bg-none w-full justify-start">
                    <UploadButton
                      text={"Tambah Kliping +"}
                      fileAccept={"image/png, image/gif, image/jpeg"}
                      className={"text-atlasian-purple text-sm"}
                      handleUpload={handleUpload}
                    />
                  </div>
                  {/* End Kliping Gambar */}
                </div>
              </Card>
            </div>
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
            <div className="mt-3 flex justify-end">
              <div className="flex justify-between gap-4">
                <div className="w-[7.75rem] bg-atlasian-yellow rounded">
                  <ButtonField text={"Template"} />
                </div>
                <div className="w-[7.75rem] bg-atlasian-green rounded">
                  <ButtonField text={"Simpan"} handler={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <DivButton
            handleClick={openModalApproval}
            className="no-underline hover:no-underline w-56"
          >
            <Card>
              <div className="w-full">
                <div className="px-3">
                  <p className="text-brisma font-bold text-xl">
                    Approval Berita Acara
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
          </DivButton>
        </div>
        <ModalWorkflowEWP
          workflowData={workflowData}
          historyWorkflow={historyWorkflow}
          validationErrors={validationErrorsWorkflow}
          setShowModal={setShowModalApproval}
          showModal={showModalApproval}
          headerTitle={"Approval Berita Acara"}
          handleChange={handleChangeText}
          handleChangeSelect={handleChangeSelect}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
          handleSubmit={handleSaveApproval}
        />
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;

import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useWorkflowDetailEWP } from "@/data/ewp";
import { useTujuan } from "@/data/ewp/quality-assurance/perencanaan/tujuan";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AttachmentClipping,
  ContentView,
  ImageClipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { fetchApi, loadingSwal, usePostFileData } from "@/helpers";
import useUser from "@/data/useUser";
// import { useTimTimeplan } from "@/data/ewp/konsulting/perencanaan/tim-timeplan";
import { useLandingStatus } from "@/data/ewp/common";
import { useAuditInfo } from "@/data/ewp/common/info";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

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
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");
  const [content, setContent] = useState("");

  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(true);
  const [isInitiator, setIsInitiator] = useState(true);
  const [isAuditor, setIsAuditor] = useState(false);

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { landingStatus } = useLandingStatus({ type: "mapa", id: params?.id });
  const { tujuan, tujuanMutate } = useTujuan({
    id: params?.id,
  });
  //   const { timTimeplan } = useTimTimeplan({
  //     id: params?.id,
  //   });
  const { workflowDetailEWP } = useWorkflowDetailEWP("mapa", {
    id: params?.id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
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
        name: `Tujuan`,
        path: `${baseUrl}/perencanaan/tujuan`,
      },
    ]);

    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

  //   useEffect(() => {
  //     const auditor = timTimeplan?.data?.tim_audit?.auditor;
  //     if (auditor?.length) {
  //       const foundAuditor = auditor?.find((v) => v?.pn === user?.data?.pn);
  //       setIsAuditor(Boolean(foundAuditor));
  //     } else {
  //       setIsAuditor(false);
  //     }
  //   }, [timTimeplan, user]);

  useEffect(() => {
    setIsCloseSubmodule(
      Boolean(
        workflowDetailEWP?.data?.info?.status_persetujuan_name === "Final"
      )
    );
  }, [workflowDetailEWP]);

  useEffect(() => {
    setContent(tujuan?.data || "");
  }, [tujuan]);

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
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/tujuan`,
      { tujuan: content, id: params?.id }
    );
    tujuanMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Tujuan" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/latar-belakang"}
          nextUrl={"/analisa"}
          marginLeft={"-70px"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress && (
          <div className="w-64 flex flex-col gap-4">
            <ImageClipping
              data={imageClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadImage}
              isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
            />
            <AttachmentClipping
              data={attachmentClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadAttachment}
              isHideButton={!((isInitiator || isAuditor) && !isCloseSubmodule)}
            />
          </div>
        )}
        <div>
          {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress ? (
            <div className="ckeditor-latar-belakang-mapa-ewp">
              <Editor
                contentData={content}
                ready={true}
                onChange={(value) => setContent(value)}
              />
            </div>
          ) : (
            <ContentView dataDoc={content} />
          )}

          {(isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress ? (
            <div className="mt-3 flex justify-end">
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField text={"Simpan"} handler={handleSubmit} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;

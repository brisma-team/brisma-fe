import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
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
import { useResume } from "@/data/ewp/konsulting/analisa/lingkup/resume";
import { useLandingStatus } from "@/data/ewp/konsulting/landing";
import useUser from "@/data/useUser";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});
const routes = [
  {
    name: "Analisa Data",
    slug: "analisa-data",
  },
  {
    name: "Resume",
    slug: "resume",
  },
  { name: "Hasil Analisa", slug: "hasil-analisa" },
  { name: "Rekomendasi", slug: "rekomendasi" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const { id, kkpa_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathNameSubModulAnalisa = `${baseUrl}/analisa`;
  const pathNameLandingPage = `${pathNameSubModulAnalisa}/${kkpa_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [content, setContent] = useState("");
  const [typeUpload, setTypeUpload] = useState("");
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isAuditor, setIsAuditor] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);

  const { projectDetail } = useProjectDetail({ id });
  const { resume, resumeMutate } = useResume({ id: kkpa_id });
  const { landingStatus } = useLandingStatus({ type: "kkpa", id: kkpa_id });
  const { user } = useUser();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Analisa Lingkup Konsulting`,
        path: pathNameSubModulAnalisa,
      },
      {
        name: `Kertas Kerja`,
        path: `${pathNameLandingPage}`,
      },
      {
        name: `Resume`,
        path: `${pathNameLandingPage}/resume`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.realisasi?.pelaksanaan_audit_real_end)
    );
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
  }, [projectDetail, user]);

  useEffect(() => {
    setContent(resume?.data?.resume || "");
  }, [resume]);

  useEffect(() => {
    setIsAuditor(landingStatus?.data?.info?.auditor?.pn == user?.data?.pn);
    setIsOnProgress(
      Boolean(landingStatus?.data?.info?.status_persetujuan == "On Progress")
    );
  }, [landingStatus, user]);

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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/resume/${kkpa_id}`,
      { resume: content }
    );
    resumeMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Resume" />
        <PrevNextNavigation
          baseUrl={pathNameLandingPage}
          routes={routes}
          prevUrl={"/analisa-data"}
          nextUrl={"/hasil-analisa"}
          marginLeft={"-45px"}
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
            />
            <AttachmentClipping
              data={attachmentClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadAttachment}
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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

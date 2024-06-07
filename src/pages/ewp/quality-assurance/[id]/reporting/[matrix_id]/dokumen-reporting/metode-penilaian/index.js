import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
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
import { useAuditInfo } from "@/data/ewp/common/info";
import { useDokumenReporting } from "@/data/ewp/quality-assurance/reporting";
import useUser from "@/data/useUser";
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
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/reporting/${params?.matrix_id}/dokumen-reporting`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(true);

  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");
  const [content, setContent] = useState("");

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { dokumenReporting, dokumenReportingMutate } = useDokumenReporting({
    id: params?.matrix_id,
    page_type: "metode_penilaian",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, matrix_id } = router.query;
    setParams({
      id,
      matrix_id,
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
        name: "Metode Penilaian",
        path: `${pathName}/metode-penilaian`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.pelaksanaan_audit_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

  useEffect(() => {
    setContent(dokumenReporting?.data || "");
  }, [dokumenReporting]);

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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/metode_penilaian`,
      { metode_penilaian: content, id: params?.matrix_id }
    );
    dokumenReportingMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Metode Penilaian" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/ruang-lingkup"}
          nextUrl={"/hasil-review"}
          marginLeft={"-100px"}
          widthDropdown={"w-[15rem]"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        {isInitiator && !isCloseSubmodule ? (
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
        ) : (
          ""
        )}
        <div>
          {isInitiator && !isCloseSubmodule ? (
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

          {isInitiator && !isCloseSubmodule ? (
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

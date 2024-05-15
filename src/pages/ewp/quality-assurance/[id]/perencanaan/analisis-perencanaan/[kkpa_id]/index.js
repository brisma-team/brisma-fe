import {
  Breadcrumbs,
  ButtonField,
  ButtonIconBack,
  PageTitle,
} from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AttachmentClipping,
  ImageClipping,
} from "@/components/molecules/commons";
import { fetchApi, loadingSwal, usePostFileData } from "@/helpers";
import useUser from "@/data/useUser";
import { useLandingStatus } from "@/data/ewp/common";
import { useKertasKerjaAnalisa } from "@/data/ewp/quality-assurance/perencanaan/analisis-perencanaan";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpa_id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/${params?.kkpa_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [content, setContent] = useState("");
  const [typeUpload, setTypeUpload] = useState("");

  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [isPIC, setIsPIC] = useState(false);

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { user } = useUser();
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id: params?.id,
  });
  const { kertasKerjaAnalisa, kertasKerjaAnalisaMutate } =
    useKertasKerjaAnalisa({ id: params?.kkpa_id });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, kkpa_id } = router.query;
    setParams({
      id,
      kkpa_id,
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
        name: `Analisis Perencanaan`,
        path: `${pathName}/analisis-perencanaan`,
      },
      {
        name: `Kertas Kerja Analisa`,
        path: `${pathName}/analisis-perencanaan/${params?.kkpa_id}`,
      },
    ]);

    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
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

  useEffect(() => {
    setContent(kertasKerjaAnalisa?.data?.analisa || "");
    setIsPIC(Boolean(kertasKerjaAnalisa?.data?.pn_pic == user?.data?.pn));
  }, [kertasKerjaAnalisa, user]);

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
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/analisis_perencanaan/project/${params?.kkpa_id}`,
      { analisa: content }
    );
    kertasKerjaAnalisaMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack
          backUrl={`/ewp/quality-assurance/${params?.id}/perencanaan/analisis-perencanaan`}
        />
        <PageTitle text="Kertas Kerja Analisa" />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        <div className="w-64 flex flex-col gap-4">
          <ImageClipping
            data={imageClipList}
            handleChange={handleUploadFile}
            handleClick={handleClickUploadImage}
            isHideButton={
              !((isInitiator || isPIC) && !isCloseSubmodule && isOnProgress)
            }
          />
          <AttachmentClipping
            data={attachmentClipList}
            handleChange={handleUploadFile}
            handleClick={handleClickUploadAttachment}
            isHideButton={
              !((isInitiator || isPIC) && !isCloseSubmodule && isOnProgress)
            }
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
          {(isInitiator || isPIC) && !isCloseSubmodule && isOnProgress ? (
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

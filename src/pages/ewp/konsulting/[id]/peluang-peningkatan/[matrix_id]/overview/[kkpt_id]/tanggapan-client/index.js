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
import { useDetailTanggapanClient } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { useLandingStatus } from "@/data/ewp/konsulting/peluang-peningkatan/matrix/detail";
import useUser from "@/data/useUser";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});
const routes = [
  {
    name: "Kondisi",
    slug: "kondisi",
  },
  {
    name: "Sebab",
    slug: "sebab",
  },
  { name: "Tanggapan Client", slug: "tanggapan-client" },
  { name: "Risk & Rekomendasi", slug: "risk-rekomendasi" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const { id, matrix_id, kkpt_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan`;
  const pathNameOverview = `${baseUrl}/peluang-peningkatan/${matrix_id}/overview`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${matrix_id}/overview/${kkpt_id}`;

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
  const { tanggapanClientData, tanggapanClientDataMutate } =
    useDetailTanggapanClient({
      id: kkpt_id,
    });
  const { landingStatus } = useLandingStatus(kkpt_id);
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
        name: `Peluang Peningkatan`,
        path: `${pathNameBase}`,
      },
      {
        name: `Overview`,
        path: `${pathNameOverview}`,
      },
      {
        name: `Landing Peluang Peningkatan`,
        path: `${pathNameContent}`,
      },
      {
        name: `Tanggapan Client`,
        path: `${pathNameContent}/tanggapan-client`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.realisasi?.peluang_peningkatan_real_end)
    );
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
  }, [projectDetail, user]);

  useEffect(() => {
    setContent(tanggapanClientData?.data?.tanggapan_manajemen || "");
  }, [tanggapanClientData]);

  useEffect(() => {
    setIsAuditor(
      Boolean(landingStatus?.data?.info?.auditor?.pn == user?.data?.pn)
    );
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/tanggapan`,
      { kkpt_id, tanggapan_manajemen: content }
    );
    tanggapanClientDataMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Tanggapan Client" />
        <PrevNextNavigation
          baseUrl={pathNameContent}
          routes={routes}
          prevUrl={"/sebab"}
          nextUrl={"/risk-rekomendasi"}
          marginLeft={"-60px"}
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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

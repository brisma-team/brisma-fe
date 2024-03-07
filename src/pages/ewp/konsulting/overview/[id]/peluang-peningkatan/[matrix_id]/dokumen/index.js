import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AttachmentClipping,
  ImageClipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { fetchApi, loadingSwal, usePostFileData } from "@/helpers";
import { useMatrixDocument } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
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

  const { projectDetail } = useProjectDetail({ id });
  const { matrixDocument, matrixDocumentMutate } = useMatrixDocument({
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

  useEffect(() => {
    if (!isReset) {
      setContent(matrixDocument?.data?.doc || "");
    }
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
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;

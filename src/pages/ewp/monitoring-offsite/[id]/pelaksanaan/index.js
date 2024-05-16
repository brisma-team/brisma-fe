import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { useAnalisa } from "@/data/ewp/monitoring-offsite/pelaksanaan";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AttachmentClipping,
  ImageClipping,
  // PrevNextNavigation,
} from "@/components/molecules/commons";
import { fetchApi, loadingSwal, usePostFileData } from "@/helpers";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const index = () => {
  const { id } = useRouter().query;
  const router = useRouter();
  const baseUrl = `/ewp/monitoring-offsite/${id}`;
  const pathName = `${baseUrl}/pelaksanaan`;

  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [content, setContent] = useState("");
  const [typeUpload, setTypeUpload] = useState("");

  const { projectDetail } = useProjectDetail({ id });
  const { analisa, analisaMutate } = useAnalisa({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Monitoring Offsite / Overview", path: "/ewp/monitoring-offsite" },
    {
      name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Pelaksanaan`,
      path: baseUrl,
    },
  ];

  useEffect(() => {
    setContent(analisa?.data?.analisa_data || "");
    console.log(analisa);
  }, [analisa]);

  const handleUpload = async (e) => {
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
    loadingSwal("close");
  };

  const handleSubmit = async () => {
    loadingSwal();
    const upload = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/kkpa/analisa`,
      { analisa_data: content, id }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    analisaMutate();
    loadingSwal("close");
  };

  const handleClickUploadAttachment = () => {
    setTypeUpload("attachment");
  };

  const handleClickUploadImage = () => {
    setTypeUpload("image");
  };

  return (
    <LandingLayoutEWPMonOff>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7 w-[1076px]">
        <PageTitle text="Analisa" />
        {/* <PrevNextNavigation baseUrl={pathName} marginLeft={"-60px"} /> */}
      </div>
      {/* Start Content */}
      <div className="my-4 flex justify-between">
        <div className="flex gap-6">
          <div className="w-64 flex flex-col gap-4">
            <ImageClipping
              data={imageClipList}
              handleChange={handleUpload}
              handleClick={handleClickUploadImage}
            />
            <AttachmentClipping
              data={attachmentClipList}
              handleChange={handleUpload}
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
            <div className="mt-3 flex justify-end">
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField text={"Simpan"} handler={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPMonOff>
  );
};

export default index;

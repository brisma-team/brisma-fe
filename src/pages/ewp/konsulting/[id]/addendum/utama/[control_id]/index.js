import {
  Breadcrumbs,
  ButtonField,
  ButtonIconBack,
  PageTitle,
} from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AttachmentClipping,
  ContentView,
  ImageClipping,
} from "@/components/molecules/commons";
import { useControlDetail } from "@/data/ewp/konsulting/addendum/utama";
import LandingLayoutEWPSBPAddendum from "@/layouts/ewp/LandingLayoutEWPSBPAddendum";
import { fetchApi, loadingSwal, usePostFileData } from "@/helpers";
import useUser from "@/data/useUser";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const index = () => {
  const { id, control_id } = useRouter().query;
  const router = useRouter();
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathName = `${baseUrl}/addendum/utama`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [content, setContent] = useState("");
  const [pic, setPic] = useState({
    pn_pic: "",
    nama_pic: "",
  });
  const [typeUpload, setTypeUpload] = useState("");

  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [isPIC, setIsPIC] = useState(false);

  const { projectDetail } = useProjectDetail({ id });
  const { controlDetail, controlDetailMutate } = useControlDetail({
    id: control_id,
  });
  const { user } = useUser();
  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl,
      },
      {
        name: "Addendum Perencanaan Kegiatan",
        path: `${baseUrl}/addendum`,
      },
      {
        name: "Utama",
        path: pathName,
      },
      {
        name: "Uraian",
        path: `${pathName}/${control_id}`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.project_info?.status_name !== "addendum")
    );
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
    setIsOnProgress(
      Boolean(
        projectDetail?.data?.project_info?.status_persetujuan_name ==
          "On Progress"
      )
    );
  }, [projectDetail, user]);

  useEffect(() => {
    setContent(controlDetail?.data?.uraian || "");
    setPic({
      pn_pic: controlDetail?.data?.pn_pic,
      nama_pic: controlDetail?.data?.nama_pic,
    });
    setIsPIC(Boolean(controlDetail?.data?.pn_pic == user?.data?.pn));
  }, [controlDetail, user]);

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
    const upload = await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/control/update/${control_id}`,
      { uraian: content, pn_pic: pic?.pn_pic, nama_pic: pic?.nama_pic }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    controlDetailMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPSBPAddendum>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack
          backUrl={`/ewp/konsulting/${id}/addendum/utama?stage=2`}
        />
        <PageTitle
          text="Perubahan Uraian Lingkup Pemeriksaan"
          className={"text-atlasian-red"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        {(isInitiator || isPIC) && !isCloseSubmodule && isOnProgress && (
          <div className="w-64 flex flex-col gap-4">
            <ImageClipping
              data={imageClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadImage}
              isHideButton={!((isInitiator || isPIC) && !isCloseSubmodule)}
            />
            <AttachmentClipping
              data={attachmentClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadAttachment}
              isHideButton={!((isInitiator || isPIC) && !isCloseSubmodule)}
            />
          </div>
        )}
        <div>
          {(isInitiator || isPIC) && !isCloseSubmodule && isOnProgress ? (
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
    </LandingLayoutEWPSBPAddendum>
  );
};

export default index;

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PatLandingLayout } from "@/layouts/pat";
import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import {
  AttachmentClipping,
  ContentView,
  ImageClipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { usePostFileData, loadingSwal, convertDate, fetchApi } from "@/helpers";
import { useStatusPat, useSumberInformasiPAT } from "@/data/pat";

const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Latar Belakang dan Tujuan",
    slug: "latar-belakang-dan-tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
  { name: "Jadwal Lainnya", slug: "jadwal-lainnya" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: "",
  });
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");

  const pathName = `/pat/projects/${params?.id}`;
  const [isDisabled, setIsDisabled] = useState(false);
  const [content, setContent] = useState("");
  const [contentDoc, setContentDoc] = useState("");

  const { sumberInformasiPAT, sumberInformasiPATMutate } =
    useSumberInformasiPAT(params?.id);
  const { statusPat } = useStatusPat(params?.id);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${params?.id}` },
    {
      name: "Sumber Informasi",
      path: `/pat/projects/${params?.id}/sumber-informasi`,
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  const handleSubmit = async () => {
    loadingSwal();
    const upload = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/si`,
      { sumber_informasi: contentDoc, pat_id: params?.id }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    sumberInformasiPATMutate();
    loadingSwal("close");
  };

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

  useEffect(() => {
    setContent([
      {
        title: "Initiator",
        value: statusPat?.data?.create_by?.nama,
      },
      {
        title: "Tanggal Inisiasi",
        value: convertDate(statusPat?.data?.createdAt, "/", "d"),
      },
      { title: "Document Status", value: statusPat?.data?.status_pat },
    ]);
    setIsDisabled(statusPat?.data?.status_pat !== "On Progress");
  }, [statusPat]);

  useEffect(() => {
    setContentDoc(sumberInformasiPAT?.data?.sumber_informasi || "");
  }, [sumberInformasiPAT]);

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Sumber Informasi"} className="w-full" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/latar-belakang-dan-tujuan"}
          nextUrl={"/tim-audit"}
          marginLeft={"-90px"}
          widthDropdown={"w-56"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        {!isDisabled && (
          <div className="w-64 flex flex-col gap-4">
            <ImageClipping
              data={imageClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadImage}
              isHideButton={isDisabled}
            />
            <AttachmentClipping
              data={attachmentClipList}
              handleChange={handleUploadFile}
              handleClick={handleClickUploadAttachment}
              isHideButton={isDisabled}
            />
          </div>
        )}

        <div>
          {!isDisabled ? (
            <div className="ckeditor-latar-belakang-mapa-ewp">
              <Editor
                contentData={contentDoc}
                ready={true}
                onChange={(value) => setContentDoc(value)}
              />
            </div>
          ) : (
            <ContentView dataDoc={contentDoc} />
          )}

          {!isDisabled ? (
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
    </PatLandingLayout>
  );
};

export default index;

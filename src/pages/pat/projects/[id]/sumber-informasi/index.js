import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PatLandingLayout } from "@/layouts/pat";
import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import {
  AttachmentClipping,
  CardHistory,
  ImageClipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import {
  usePostData,
  usePostFileData,
  loadingSwal,
  convertDate,
} from "@/helpers";
import { useStatusPat, useSumberInformasiPAT } from "@/data/pat";

import { setHistoryList } from "@/slices/pat/sumberInformasiSlice";

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
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const index = () => {
  const dispatch = useDispatch();

  const historyList = useSelector((state) => state.sumberInformasi.historyList);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");

  const { id } = useRouter().query;
  const baseUrl = `/pat/projects/${id}`;
  const { statusPat } = useStatusPat(id);
  const [isDisabled, setIsDisabled] = useState(false);
  const [content, setContent] = useState(null);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    {
      name: "Sumber Informasi",
      path: `/pat/projects/${id}/sumber-informasi`,
    },
  ];

  const { sumberInformasiPAT } = useSumberInformasiPAT(id);

  const [data, setData] = useState({
    pat_id: id,
    sumber_informasi: "",
  });

  const handlePost = async () => {
    try {
      dispatch(
        setHistoryList([
          ...historyList,
          {
            date: convertDate(new Date(), "-"),
            name: "",
            note: "",
          },
        ])
      );
      return await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/si`,
        data
      );
    } catch (e) {
      throw new Error(e);
    }
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
    setIsDisabled(statusPat?.data?.status_pat !== "On Progress");
  }, [statusPat]);

  useEffect(() => {
    setContent([
      {
        title: "Initiator",
        value: statusPat?.data?.create_by?.nama,
      },
      {
        title: "Created Date",
        value: convertDate(statusPat?.data?.lb_created_at, "-", "d", true),
      },
      { title: "Document Status", value: statusPat?.data?.status_pat },
      { title: "Document Status", value: statusPat?.data?.status_pat },
    ]);

    setData({
      ...data,
      sumber_informasi: sumberInformasiPAT?.data?.sumber_informasi || "",
    });
  }, [sumberInformasiPAT]);

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Sumber Informasi"} className="w-full" />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/latar-belakang-dan-tujuan"}
          nextUrl={"/tim-audit"}
          marginLeft={"-90px"}
          widthDropdown={"w-56"}
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
        <div className="ckeditor-sumber-informasi-pat overflow-x-hidden">
          <Editor
            contentData={data.sumber_informasi}
            disabled={false}
            ready={true}
            onChange={(value) =>
              setData({
                ...data,
                sumber_informasi: value,
              })
            }
          />
        </div>

        <CardHistory />
      </div>
      {!isDisabled ? (
        <div className="mt-3 flex justify-end">
          <div className="w-[7.75rem] bg-atlasian-green rounded flex items-center">
            <ButtonField text={"Simpan"} handler={handlePost} />
          </div>
        </div>
      ) : (
        ""
      )}
      {/* End Content */}
    </PatLandingLayout>
  );
};

export default index;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PatLandingLayout } from "@/layouts/pat";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  UploadButton,
} from "@/components/atoms";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { IconInfo } from "@/components/icons";
import {
  usePostData,
  usePostFileData,
  loadingSwal,
  copyToClipboard,
} from "@/helpers";
import { useStatusPat, useSumberInformasiPAT } from "@/data/pat";

import { setImageClipList } from "@/slices/pat/sumberInformasiSlice";

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

  const imageClipList = useSelector(
    (state) => state.sumberInformasi.imageClipList
  );
  const { id } = useRouter().query;
  const baseUrl = `/pat/projects/${id}`;
  const { statusPat } = useStatusPat(id);
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
      return await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/si`,
        data
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleUpload = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "pat",
      });
      dispatch(
        setImageClipList([
          ...imageClipList,
          { url: response.url[0], name: e.target.files[0].name },
        ])
      );
    }
    loadingSwal("close");
  };

  useEffect(() => {
    setContent([
      {
        title: "Maker Sumber Informasi",
        value: sumberInformasiPAT?.data?.pic_sumber_informasi,
      },
      {
        title: "Created",
        value: sumberInformasiPAT?.data?.si_created_at,
      },
      {
        title: "Last Modified",
        value: sumberInformasiPAT?.data?.si_updated_at,
      },
    ]);

    setData({
      ...data,
      sumber_informasi: sumberInformasiPAT?.data?.sumber_informasi,
    });
  }, [sumberInformasiPAT]);

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
      <div className="pr-16">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Sumber Informasi"} />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/latar-belakang-dan-tujuan"}
            nextUrl={"/tim-audit"}
          />
        </div>
        {/* Start Content */}
        <div className="my-4 flex">
          <div className="w-64 mr-6">
            <div>
              <Card>
                <div className="w-full px-4 -ml-1">
                  <div className="flex justify-between">
                    <p className="text-xl font-semibold">Kliping Gambar</p>
                    <div className="text-atlasian-yellow  items-center flex">
                      <IconInfo />
                    </div>
                  </div>
                  {/* Start Kliping Gambar */}
                  <div
                    className="grid grid-cols-2 -mx-1 mt-2 overflow-scroll overflow-x-hidden"
                    style={{ maxHeight: "37rem" }}
                  >
                    {imageClipList.map((v, i) => {
                      return (
                        <button
                          key={i}
                          className="m-2 border-2 shadow-sm rounded-lg p-3"
                          style={{ width: "6.25rem", height: "6.25rem" }}
                          onClick={() => copyToClipboard(v.url.src)}
                        >
                          <Image
                            src={v.url}
                            alt={v.name}
                            width={200}
                            height={200}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 px-8 py-2 bg-none w-full justify-center">
                    <UploadButton
                      text={"Tambah Kliping +"}
                      fileAccept={"image/png, image/gif, image/jpeg"}
                      handleUpload={handleUpload}
                    />
                  </div>
                  {/* End Kliping Gambar */}
                </div>
              </Card>
            </div>
          </div>
          <div>
            <Editor
              contentData={data.sumber_informasi}
              disabled={false}
              ready={true}
              onChange={(value) =>
                setData({ ...data, sumber_informasi: value })
              }
            />
            <div className="mt-3 flex justify-end">
              <div className="w-[7.75rem] h-10 bg-atlasian-green rounded flex items-center">
                <ButtonField text={"Simpan"} handler={handlePost} />
              </div>
            </div>
          </div>
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;

import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  UploadButton,
} from "@/components/atoms";
import Image from "next/image";
import { IconInfo } from "@/components/icons";
import dynamic from "next/dynamic";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useRouter } from "next/router";
import {
  copyToClipboard,
  loadingSwal,
  usePostData,
  usePostFileData,
} from "@/helpers";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
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
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis", slug: "analisis" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokument" },
];

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;
  const [data, setData] = useState({
    id,
    latar_belakang: "",
  });
  const [imageClipList, setImageClipList] = useState([]);

  const { auditorEWP } = useAuditorEWP({ id });
  const { mapaEWP } = useMapaEWP("ltb", { id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `${baseUrl}`,
    },
    {
      name: "Latar Belakang",
      path: `${baseUrl}/latar-belakang`,
    },
  ];

  useEffect(() => {
    setData({
      ...data,
      latar_belakang: mapaEWP?.data ? mapaEWP?.data : "",
    });
  }, [mapaEWP]);

  const handlePost = async () => {
    try {
      return await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/ltb`,
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
        modul: "ewp",
      });

      setImageClipList((prev) => [
        ...prev,
        { url: response.url[0], name: e.target.files[0].name },
      ]);
    }

    loadingSwal("close");
  };

  return (
    <LandingLayoutEWP>
      <div className="pr-16">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Latar Belakang"} />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={false}
            nextUrl={"/tujuan"}
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
                    {imageClipList.length
                      ? imageClipList?.map((v, i) => {
                          return (
                            <button
                              key={i}
                              className="m-2 border-2 shadow-sm rounded-lg p-3"
                              style={{ width: "6.25rem", height: "6.25rem" }}
                              onClick={() => copyToClipboard(v?.url)}
                            >
                              <Image
                                src={v?.url}
                                alt={v?.name}
                                width={200}
                                height={200}
                              />
                            </button>
                          );
                        })
                      : ""}
                  </div>
                  <div className="my-4">
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
              contentData={data.latar_belakang}
              disabled={false}
              ready={true}
              onChange={(value) => setData({ ...data, latar_belakang: value })}
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
    </LandingLayoutEWP>
  );
};

export default index;
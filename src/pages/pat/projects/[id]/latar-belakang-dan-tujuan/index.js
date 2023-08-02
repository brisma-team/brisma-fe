import React, { useState, useEffect } from "react";
import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import Image from "next/image";
import { IconInfo, IconPlus } from "@/components/icons";
import dynamic from "next/dynamic";
import { ImageBrismaHorizontal } from "@/helpers/imagesUrl";
import { PrevNextNavigation } from "@/components/molecules/commons";
import useLatarBelakangTujuanPat from "@/data/pat/useLatarBelakangTujuanPat";
import { useRouter } from "next/router";
import { usePostData } from "@/helpers";
import { useStatusPat } from "@/data/pat";

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
      name: "Latar Belakang",
      path: `/pat/projects/${id}/latar-belakang-dan-tujuan`,
    },
  ];

  const { latarBelakangTujuanPat } = useLatarBelakangTujuanPat(id);

  const [data, setData] = useState({
    pat_id: id,
    latar_belakang: "",
  });

  const pictures = [
    {
      alt: "brisma",
      url: ImageBrismaHorizontal,
    },
  ];

  const handlePost = async () => {
    try {
      return await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/ltb`,
        data
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    setContent([
      {
        title: "Maker Latar Belakang",
        value: latarBelakangTujuanPat?.data?.pic_latar_belakang_tujuan,
      },
      {
        title: "Created",
        value: latarBelakangTujuanPat?.data?.lb_created_at,
      },
      {
        title: "Last Modified",
        value: latarBelakangTujuanPat?.data?.lb_updated_at,
      },
    ]);

    setData({
      ...data,
      latar_belakang: latarBelakangTujuanPat?.data?.latar_belakang,
    });
  }, [latarBelakangTujuanPat]);

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
      <div className="pr-16">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Latar Belakang dan Tujuan"} />
          <PrevNextNavigation baseUrl={baseUrl} routes={routes} />
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
                    {pictures.map((v, i) => {
                      return (
                        <div
                          key={i}
                          className="m-1"
                          style={{ width: "6.25rem", height: "6.25rem" }}
                        >
                          <Image src={v.url} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="py-2 bg-none w-40">
                    <Button
                      iconAfter={<IconPlus size="medium" />}
                      shouldFitContainer
                      style={{ color: "yellow" }}
                    >
                      Tambah Kliping
                    </Button>
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
    </PatLandingLayout>
  );
};

export default index;

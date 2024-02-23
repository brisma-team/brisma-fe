import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  UploadButton,
} from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useSumberInformasi } from "@/data/ewp/konsulting/perencanaan/sumber-informasi";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  PopupKlipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import {
  copyToClipboard,
  fetchApi,
  loadingSwal,
  usePostFileData,
} from "@/helpers";
import Image from "next/image";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Sumber Informasi",
    slug: "sumber-informasi",
  },
  {
    name: "Tim & Timeplan",
    slug: "tim-timeplan",
  },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Program Kerja", slug: "program-kerja" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const { id } = useRouter().query;
  const router = useRouter();
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [imageClipList, setImageClipList] = useState([]);
  const [content, setContent] = useState("");

  const { projectDetail } = useProjectDetail({ id });
  const { sumberInformasi, sumberInformasiMutate } = useSumberInformasi({ id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Perencanaan Kegiatan`,
        path: baseUrl,
      },
      {
        name: `Sumber Informasi`,
        path: `${baseUrl}/perencanaan/sumber-informasi`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    setContent(sumberInformasi?.data || "");
  }, [sumberInformasi]);

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

  const handleSubmit = async () => {
    loadingSwal();
    const upload = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/si`,
      { sumber_informasi: content, id }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    sumberInformasiMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Sumber Informasi" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          nextUrl={"/tim-timeplan"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex justify-between">
        <div className="flex gap-6">
          <div className="w-64">
            <div>
              <Card>
                <div className="w-full px-4 -ml-1">
                  <div className="flex justify-between">
                    <p className="text-xl font-semibold">Kliping Gambar</p>
                    <PopupKlipping />
                  </div>
                  {/* Start Kliping Gambar */}
                  <div
                    className="grid grid-cols-2 -mx-1 mt-2 overflow-scroll overflow-x-hidden"
                    style={{ maxHeight: "37rem" }}
                  >
                    {imageClipList?.length
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
                  <div className="mt-4 py-2 bg-none w-full justify-start">
                    <UploadButton
                      text={"Tambah Kliping +"}
                      fileAccept={"image/png, image/gif, image/jpeg"}
                      className={"text-atlasian-purple text-sm"}
                      handleUpload={handleUpload}
                    />
                  </div>
                  {/* End Kliping Gambar */}
                </div>
              </Card>
            </div>
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
    </LandingLayoutEWPConsulting>
  );
};

export default index;

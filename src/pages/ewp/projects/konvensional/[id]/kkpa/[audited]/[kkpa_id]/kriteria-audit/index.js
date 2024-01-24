import { LandingLayoutEWP } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  UploadButton,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useRouter } from "next/router";
import {
  PopupKlipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import dynamic from "next/dynamic";
import {
  convertDate,
  copyToClipboard,
  loadingSwal,
  usePostFileData,
  useUpdateData,
} from "@/helpers";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useKriteriaAuditKKPA } from "@/data/ewp/konvensional/kkpa/kriteria-audit";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Program Audit",
    slug: "program-audit",
  },
  {
    name: "Kriteria Audit",
    slug: "kriteria-audit",
  },
  { name: "Ruang Lingkup", slug: "ruang-lingkup" },
  { name: "Pengujian Sample", slug: "pengujian-sample" },
  { name: "Pengujian Kontrol", slug: "pengujian-kontrol" },
  { name: "Kesimpulan", slug: "kesimpulan" },
  { name: "Dokumen K.K.P.A", slug: "dokumen" },
];

const index = () => {
  const { id, kkpa_id } = useRouter().query;
  const router = useRouter();
  const pathName = `/ewp/projects/konvensional/${id}/kkpa/audited/${kkpa_id}`;
  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / KKPA`,
      path: pathName,
    },
    {
      name: "Kriteria Audit",
      path: `${pathName}/kriteria-audit`,
    },
  ];

  const { kriteriaAuditKKPA, kriteriaAuditKKPAMutate } = useKriteriaAuditKKPA({
    kkpa_id,
  });

  const [content, setContent] = useState("");
  const [imageClipList, setImageClipList] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (kriteriaAuditKKPA?.data) {
      setContent(kriteriaAuditKKPA?.data?.kriteria || "");
      setHistory(kriteriaAuditKKPA?.data?.history);
    }
  }, [kriteriaAuditKKPA]);
  // [ END ]

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
    const upload = await useUpdateData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kkpa/kriteria/update`,
      { kriteria: content, kkpa_id }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    kriteriaAuditKKPAMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Kriteria Audit" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/program-audit"}
          nextUrl={"/ruang-lingkup"}
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
        <div className="w-56 h-fit">
          <Card>
            <div className="w-full py-1">
              <div className="px-3">
                <p className="text-brisma font-bold text-xl">Riwayat</p>
              </div>
              <div className="flex flex-col gap-3 px-3 mt-4 max-h-[35rem] overflow-y-scroll">
                {history?.length
                  ? history.map((v, i) => {
                      return (
                        <div key={i}>
                          <div className="font-semibold">
                            Disunting {convertDate(v.log_updated_at, "/", "d")}
                          </div>
                          <div className="font-medium">
                            {v.pn} - {v.nama}
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;

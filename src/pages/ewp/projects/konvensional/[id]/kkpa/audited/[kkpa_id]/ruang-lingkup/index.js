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
import { useProgramAuditKKPA } from "@/data/ewp/konvensional/kkpa/program-audit";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Program Audit",
    slug: "program-audit",
  },
  {
    name: "Kriteria",
    slug: "kriteria",
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
      name: "Ruang Lingkup",
      path: `${pathName}/ruang-lingkup`,
    },
  ];

  const { programAuditKKPA, programAuditKKPAMutate } = useProgramAuditKKPA({
    kkpa_id,
  });

  const [content, setContent] = useState("");
  const [imageClipList, setImageClipList] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (programAuditKKPA?.data) {
      setContent(programAuditKKPA?.data?.program_audit || "");
      setHistory(programAuditKKPA?.data?.history);
    }
  }, [programAuditKKPA]);
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kkpa/program-audit/update`,
      { program_audit: content, kkpa_id }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    programAuditKKPAMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Ruang Lingkup" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/kriteria-audit"}
          nextUrl={"/pengujian-sample"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="flex flex-col w-10/12 gap-3">
        <Card>
          <div className="px-3 py-1">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Kliping Gambar</p>
              <PopupKlipping />
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
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;

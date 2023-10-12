import { LandingLayoutEWP } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  DivButton,
  PageTitle,
  UploadButton,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useRouter } from "next/router";
import {
  PopupKlipping,
  PrevNextNavigation,
  ApprovalItems,
} from "@/components/molecules/commons";
import dynamic from "next/dynamic";
import { copyToClipboard } from "@/helpers";
import Image from "next/image";
import { useState } from "react";
import { ModalWorkflowEWP } from "@/components/molecules/ewp/konvensional/common";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Daftar Kehadiran",
    slug: "attendance",
  },
  {
    name: "Notulen",
    slug: "notulen",
  },
  { name: "Berita Acara", slug: "berita-acara" },
];

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/entrance`;
  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Entrance Meeting`,
      path: `/ewp/projects/konvensional/${id}/entrance`,
    },
  ];

  const [data, setData] = useState({ notulen: "" });
  const [imageClipList, setImageClipList] = useState([]);
  const [showModalApproval, setShowModalApproval] = useState(false);

  const openModalApproval = () => {
    setShowModalApproval(true);
  };

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Notulen" />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/attendance"}
          nextUrl={"/berita-acara"}
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
                contentData={data.notulen}
                disabled={false}
                ready={true}
                onChange={(value) => setData({ ...data, notulen: value })}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <div className="flex justify-between gap-4">
                <div className="w-[7.75rem] bg-atlasian-yellow rounded">
                  <ButtonField text={"Template"} />
                </div>
                <div className="w-[7.75rem] bg-atlasian-green rounded">
                  <ButtonField text={"Simpan"} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <DivButton
            handleClick={openModalApproval}
            className="no-underline hover:no-underline w-56"
          >
            <Card>
              <div className="w-full">
                <div className="px-3">
                  <p className="text-brisma font-bold text-xl">
                    Approval Notulen Entrance
                  </p>
                  <ApprovalItems title={"Maker"} text={"Annisa"} />
                  <ApprovalItems
                    title={"Checker"}
                    text={[{ nama: "Dandy" }, { nama: "Putra" }]}
                    data={{ nama: "Bahrul Ulum" }}
                  />
                </div>
              </div>
            </Card>
          </DivButton>
        </div>
        <ModalWorkflowEWP
          showModal={showModalApproval}
          setShowModal={setShowModalApproval}
          headerTitle={"Approval Notulen Entrance"}
        />
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;

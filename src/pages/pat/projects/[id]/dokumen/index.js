import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { PrevNextNavigation } from "@/components/molecules/commons";
import {
  ModalWorkflow,
  CardComment,
  ApprovalUkaItems,
  DocumentItems,
} from "@/components/molecules/pat/dokumen";
import Image from "next/image";
import { ImageChat } from "@/helpers/imagesUrl";
import { PatLandingLayout } from "@/layouts/pat";
import Link from "next/link";
import { useRef, useState } from "react";

const baseUrl = "/pat/projects/123";
const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  { name: "Tujuan", slug: "tujuan" },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatnan", slug: "jadwal-kegiatan" },
];

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
  { name: "PAT AIW BANTEN", path: "/pat/projects/123" },
  {
    name: "Dokumen",
    path: "/pat/projects/123/dokumen",
  },
];

const index = () => {
  const [showModal, setShowModal] = useState(false);
  const [openCardComment, setOpenCardComment] = useState(false);
  const ref = useRef(null);

  return (
    <PatLandingLayout>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen"} />
          <PrevNextNavigation baseUrl={baseUrl} routes={routes} />
        </div>
        {/* Start Content */}
        <div className="flex w-full gap-6">
          <div className="w-[15rem]">
            <div>
              <Card>
                <div className="px-3 py-1 w-full">
                  <div className="text-xl">Daftar Isi</div>
                  <div className="pl-2">
                    <DocumentItems no={"1"} title={"Latar Belakang"} />
                    <DocumentItems no={"2"} title={"Tujuan"} />
                    <DocumentItems
                      no={"3"}
                      title={"Sumber Informasi"}
                      count={2}
                    />
                    <DocumentItems no={"4"} title={"Ruang Lingkup"} />
                    <DocumentItems no={"5"} title={"Jadwal Kegiatan"} />
                    <DocumentItems no={"6"} title={"Jadwal Konsulting"} />
                    <DocumentItems
                      no={"7"}
                      title={"Jadwal Lainnya"}
                      count={"2"}
                    />
                    <DocumentItems
                      no={"8"}
                      title={"Susunan Tim Audit, Unit Kerja, Binaan & Auditor"}
                    />
                    <DocumentItems
                      no={"9"}
                      title={"Anggaran Audit"}
                      count={"9+"}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="w-[58.375rem] shrink-0">
            <Card>
              <CardComment
                callbackRef={ref}
                onClickOutside={() => setOpenCardComment(false)}
                show={openCardComment}
              />
              <div className="px-4 h-full w-full relative">
                <div className="flex justify-between">
                  <div className="font-bold text-xl">LATAR BELAKANG</div>
                  <div className="flex items-center" ref={ref}>
                    <Link href={"#"} onClick={() => setOpenCardComment(true)}>
                      <Image src={ImageChat} />
                    </Link>
                  </div>
                </div>
                <div className="mt-4">
                  <div
                    className="text-base font-semibold tracking-0125"
                    style={{ lineHeight: "1.125rem" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum vestibulum lectus eu ipsum tincidunt varius ac et
                    quam. Curabitur aliquet mattis tortor ac pellentesque.
                    Nullam vel faucibus nunc. Fusce interdum venenatis
                    fermentum. Curabitur dapibus, orci eget vehicula luctus,
                    arcu mauris tempus neque, eget ultrices diam est sit amet
                    lacus. Fusce in quam ac erat sodales rutrum vitae ut risus.
                    Proin viverra nisi tempus, mattis ex eu, fringilla nunc.
                    Fusce ut bibendum turpis, non bibendum mauris.
                    <br />
                    Donec sapien nulla, suscipit eget nisi vel, luctus aliquet
                    ligula. Duis bibendum elit sit amet porta lacinia. Ut congue
                    mi dui, sit amet varius augue commodo ornare. Vestibulum
                    suscipit eu orci vel cursus. Sed vel congue felis. Morbi
                    blandit leo at mauris fringilla, convallis vestibulum metus
                    aliquet. Integer sed nisl ex. Fusce volutpat lectus at felis
                    volutpat aliquet. Integer augue ante, eleifend at felis
                    semper, efficitur tincidunt sem. Pellentesque sit amet nisi
                    quis dui semper faucibus. Morbi vitae consectetur lorem, ut
                    cursus lectus. Quisque fringilla efficitur lectus in
                    efficitur. Curabitur eu mollis mi. Phasellus porttitor
                    tellus arcu, vel egestas lacus lacinia in. Fusce et lorem a
                    justo scelerisque accumsan id at risus.
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-[11rem]">
            <Link
              href={"#"}
              onClick={() => setShowModal(true)}
              className="no-underline hover:no-underline h-auto"
            >
              <div>
                <Card>
                  <div className="w-full">
                    <div className="px-3">
                      <p className="text-brisma font-bold text-xl">
                        Approval UKA
                      </p>
                      <ApprovalUkaItems
                        title={"Maker"}
                        text={"Annisa Damayana"}
                      />
                      <ApprovalUkaItems
                        title={"Checker"}
                        text={["Dandy", "Iqbal"]}
                      />
                      <ApprovalUkaItems
                        title={"Signer"}
                        text={"M. Firli Ismail"}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </Link>
            <ModalWorkflow setShowModal={setShowModal} showModal={showModal} />
          </div>
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;

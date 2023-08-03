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
import { useEffect } from "react";
import { useDocument } from "@/data/pat";
import { useRouter } from "next/router";

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
  const { id } = useRouter().query;
  const [doc, setDoc] = useState([
    {
      idx: 0,
      key: "Latar Belakang dan Tujuan",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis urna et bibendum sagittis. Sed euismod mauris nec quam commodo, eu congue tellus consectetur. Nam eu ligula massa. Sed mauris velit, maximus vel tincidunt vel, pretium nec arcu. Pellentesque fermentum, leo ac tincidunt fringilla, magna mauris facilisis nisl, eu porttitor massa felis nec arcu. Phasellus consequat tincidunt malesuada. Quisque rhoncus magna vitae fermentum porta. Etiam pulvinar risus eget quam ullamcorper, vestibulum tincidunt neque egestas. Vestibulum tincidunt turpis quis dignissim gravida. Proin mollis iaculis ligula, vitae accumsan sem gravida non. Proin pharetra nulla non neque finibus pharetra. Cras pretium cursus magna sed mattis. Aenean facilisis risus tincidunt ex fringilla ornare. Etiam convallis, massa ac posuere efficitur, nunc lacus faucibus ante, vehicula mollis sem dolor nec nunc. Nulla malesuada vitae elit in tristique. Nam pretium vel est quis cursus. Curabitur imperdiet vulputate erat, eget placerat lectus bibendum quis. Nullam euismod magna a interdum interdum. Etiam non ante velit. Mauris vestibulum justo nulla, et tristique urna fermentum ac. Cras malesuada, purus at ullamcorper fermentum, eros justo blandit eros, eget scelerisque eros mi facilisis neque. In malesuada vitae sem sit amet volutpat. Morbi ac elit vulputate arcu dapibus auctor. Vivamus tempus tristique leo, sed laoreet sem sagittis ac. Proin sollicitudin eros non ipsum egestas, a suscipit nisl bibendum. Suspendisse potenti. In tempus erat non pellentesque rutrum. Praesent hendrerit aliquet lobortis. Donec feugiat porta luctus. Maecenas ut elit maximus, malesuada magna viverra, auctor nulla. Aliquam porta metus vitae purus pellentesque, id imperdiet odio sodales. Integer id arcu pretium, pulvinar arcu sed, consectetur felis. Suspendisse erat nibh, euismod in eros non, commodo molestie sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis urna et bibendum sagittis. Sed euismod mauris nec quam commodo, eu congue tellus consectetur. Nam eu ligula massa. Sed mauris velit, maximus vel tincidunt vel, pretium nec arcu. Pellentesque fermentum, leo ac tincidunt fringilla, magna mauris facilisis nisl, eu porttitor massa felis nec arcu. Phasellus consequat tincidunt malesuada. Quisque rhoncus magna vitae fermentum porta. Etiam pulvinar risus eget quam ullamcorper, vestibulum tincidunt neque egestas. Vestibulum tincidunt turpis quis dignissim gravida. Proin mollis iaculis ligula, vitae accumsan sem gravida non. Proin pharetra nulla non neque finibus pharetra. Cras pretium cursus magna sed mattis. Aenean facilisis risus tincidunt ex fringilla ornare. Etiam convallis, massa ac posuere efficitur, nunc lacus faucibus ante, vehicula mollis sem dolor nec nunc. Nulla malesuada vitae elit in tristique. Nam pretium vel est quis cursus. Curabitur imperdiet vulputate erat, eget placerat lectus bibendum quis. Nullam euismod magna a interdum interdum. Etiam non ante velit. Mauris vestibulum justo nulla, et tristique urna fermentum ac. Cras malesuada, purus at ullamcorper fermentum, eros justo blandit eros, eget scelerisque eros mi facilisis neque. In malesuada vitae sem sit amet volutpat. Morbi ac elit vulputate arcu dapibus auctor. Vivamus tempus tristique leo, sed laoreet sem sagittis ac. Proin sollicitudin eros non ipsum egestas, a suscipit nisl bibendum. Suspendisse potenti. In tempus erat non pellentesque rutrum. Praesent hendrerit aliquet lobortis. Donec feugiat porta luctus. Maecenas ut elit maximus, malesuada magna viverra, auctor nulla. Aliquam porta metus vitae purus pellentesque, id imperdiet odio sodales. Integer id arcu pretium, pulvinar arcu sed, consectetur felis. Suspendisse erat nibh, euismod in eros non, commodo molestie sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis urna et bibendum sagittis. Sed euismod mauris nec quam commodo, eu congue tellus consectetur. Nam eu ligula massa. Sed mauris velit, maximus vel tincidunt vel, pretium nec arcu. Pellentesque fermentum, leo ac tincidunt fringilla, magna mauris facilisis nisl, eu porttitor massa felis nec arcu. Phasellus consequat tincidunt malesuada. Quisque rhoncus magna vitae fermentum porta. Etiam pulvinar risus eget quam ullamcorper, vestibulum tincidunt neque egestas. Vestibulum tincidunt turpis quis dignissim gravida. Proin mollis iaculis ligula, vitae accumsan sem gravida non. Proin pharetra nulla non neque finibus pharetra. Cras pretium cursus magna sed mattis. Aenean facilisis risus tincidunt ex fringilla ornare. Etiam convallis, massa ac posuere efficitur, nunc lacus faucibus ante, vehicula mollis sem dolor nec nunc. Nulla malesuada vitae elit in tristique. Nam pretium vel est quis cursus. Curabitur imperdiet vulputate erat, eget placerat lectus bibendum quis. Nullam euismod magna a interdum interdum. Etiam non ante velit. Mauris vestibulum justo nulla, et tristique urna fermentum ac. Cras malesuada, purus at ullamcorper fermentum, eros justo blandit eros, eget scelerisque eros mi facilisis neque. In malesuada vitae sem sit amet volutpat. Morbi ac elit vulputate arcu dapibus auctor. Vivamus tempus tristique leo, sed laoreet sem sagittis ac. Proin sollicitudin eros non ipsum egestas, a suscipit nisl bibendum. Suspendisse potenti. In tempus erat non pellentesque rutrum. Praesent hendrerit aliquet lobortis. Donec feugiat porta luctus. Maecenas ut elit maximus, malesuada magna viverra, auctor nulla. Aliquam porta metus vitae purus pellentesque, id imperdiet odio sodales. Integer id arcu pretium, pulvinar arcu sed, consectetur felis. Suspendisse erat nibh, euismod in eros non, commodo molestie sapien. ",
    },
    {
      idx: 2,
      key: "Ruang Lingkup",
      content: "TEST",
    },
  ]);

  const nav = [
    { idx: 0, name: "Latar Belakang dan Tujuan 123", url: "ltb" },
    { idx: 1, name: "Sumber Informasi", url: "si" },
    { idx: 2, name: "Ruang Lingkup", url: "target_audit" },
    { idx: 3, name: "Jadwal Kegiatan", url: "jadwal_audit" },
    { idx: 4, name: "Jadwal Konsulting", url: "jadwal_sbp" },
    { idx: 5, name: "Jadwal Lainnya", url: "kegiatan_lain" },
    {
      idx: 6,
      name: "Susunan Tim Audit, Unit Kerja, Binaan & Auditor",
      url: "tim_audit",
    },
    { idx: 7, name: "Anggaran Audit", url: "anggaran" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [openCardComment, setOpenCardComment] = useState(false);
  const ref = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeDivRef = useRef(null);

  const [hitEndpointCount, setHitEndpointCount] = useState(0);
  const [type, setType] = useState("ltb");
  const { documentPAT } = useDocument(type, { id });

  useEffect(() => {
    for (let i = 0; i <= hitEndpointCount; i++) {
      const isDocExist = doc.some((item) => item.idx === i);
      if (!isDocExist) {
        setType(nav[i].url);
        setDoc((prev) => [
          ...prev,
          {
            idx: nav[i].idx,
            key: nav[i].name,
            content: documentPAT?.data,
          },
        ]);
      }
    }
  }, [hitEndpointCount]);

  // useEffect(() => {
  //   documentPATMutate;
  // }, [type]);

  useEffect(() => {
    console.log("DOC => ", doc);
  }, [doc]);

  // useEffect(() => {
  //   console.log("DOC PAT => ", documentPAT);
  // }, [documentPAT]);

  // useEffect(() => {
  //   console.log("TEST => ", test);
  // }, [test]);

  useEffect(() => {
    if (activeDivRef.current) {
      activeDivRef.current.focus();
      const parentContainer = activeDivRef.current.closest(".parent");
      if (parentContainer) {
        const topOffset = activeDivRef.current.offsetTop - 220;
        console.log("topOffset => ", topOffset);
        parentContainer.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  const handleScroll = () => {
    const parentContainer = document.querySelector(".parent");
    if (parentContainer) {
      const isAtBottom =
        parentContainer.scrollTop + parentContainer.clientHeight ===
        parentContainer.scrollHeight;
      if (isAtBottom && hitEndpointCount < 7) {
        setHitEndpointCount((prev) => Math.min(prev + 1, 7));
      }
    }
  };

  useEffect(() => {
    const parentContainer = document.querySelector(".parent");
    if (parentContainer) {
      parentContainer.addEventListener("scroll", handleScroll);
      return () => {
        parentContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [activeIndex]);

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
                    {nav.map((v, i) => {
                      return (
                        <DocumentItems
                          key={i}
                          no={i + 1}
                          title={v.name}
                          handleClick={() => setActiveIndex(i)}
                        />
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div>
            <Card>
              <div
                className="overflow-y-scroll my-2 parent"
                style={{ maxHeight: "40rem" }}
              >
                {doc.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className={`page-container-a4 shrink-0  ${
                        i === activeIndex ? "active" : ""
                      }`}
                      tabIndex={i === activeIndex ? 0 : -1} // Tambahkan atribut `tabIndex` agar elemen div bisa menerima fokus
                      ref={i === activeIndex ? activeDivRef : null}
                    >
                      <CardComment
                        callbackRef={ref}
                        onClickOutside={() => setOpenCardComment(false)}
                        show={openCardComment}
                      />
                      <div className="px-4 h-full w-full relative page-content-a4">
                        <div className="flex justify-between">
                          <div className="font-bold text-xl">{v.key}</div>
                          <div className="flex items-center" ref={ref}>
                            <Link
                              href={"#"}
                              onClick={() => setOpenCardComment(true)}
                            >
                              <Image src={ImageChat} />
                            </Link>
                          </div>
                        </div>
                        <div className="mt-4">{v.content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          <div className="w-[11rem]">
            <Link
              href={"#"}
              onClick={() => (setShowModal(true), setHitEndpointCount(7))}
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

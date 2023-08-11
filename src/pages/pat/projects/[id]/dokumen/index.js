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
import { useRef, useState, useEffect } from "react";
import { useDocument, useStatusPat } from "@/data/pat";
import { useRouter } from "next/router";
import { getAuditTeamTable } from "@/helpers/templates/auditTeam";
import { getAuditTargetTable } from "@/helpers/templates/auditTarget";

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
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    { name: "Dokumen", path: `/pat/projects/${id}/dokumen` },
  ];
  const nav = [
    { idx: 0, name: "Latar Belakang dan Tujuan", url: "ltb" },
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

  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [openCardComment, setOpenCardComment] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDivRef = useRef(null);
  const [hitEndpointCount, setHitEndpointCount] = useState(0);
  const [doc, setDoc] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);

  const [type, setType] = useState("ltb");
  const { documentPAT } = useDocument(type, { id });

  const handleScrollHitEndpoint = () => {
    const parentContainer = document.querySelector(".parent");
    if (parentContainer) {
      const elements = Array.from(
        parentContainer.querySelectorAll(".page-container-a4")
      );
      const positions = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + parentContainer.scrollTop;
      });

      const viewportTop = parentContainer.scrollTop + 235;
      const viewportBottom = viewportTop + parentContainer.clientHeight + 235;

      let activeIndex = positions.findIndex(
        (position) => position >= viewportTop && position < viewportBottom
      );

      if (activeIndex === -1) {
        activeIndex = positions.findIndex(
          (position) => position >= viewportBottom
        );
      }

      setCurrentPosition(activeIndex);

      const isAtBottom =
        parentContainer.scrollTop + parentContainer.clientHeight ===
        parentContainer.scrollHeight;
      if (isAtBottom && hitEndpointCount < 7) {
        setHitEndpointCount((prev) => Math.min(prev + 1, 7));
      }
    }
  };

  useEffect(() => {
    if (activeDivRef.current) {
      activeDivRef.current.focus();
      const parentContainer = activeDivRef.current.closest(".parent");
      if (parentContainer) {
        const topOffset = activeDivRef.current.offsetTop - 220;
        parentContainer.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const addScrollListener = () => {
      const parentContainer = document.querySelector(".parent");
      console.log("parentContainer => ", parentContainer);
      if (parentContainer) {
        parentContainer.addEventListener("scroll", handleScrollHitEndpoint);
        return () => {
          parentContainer.removeEventListener(
            "scroll",
            handleScrollHitEndpoint
          );
        };
      }
    };

    const timeoutId = setTimeout(() => {
      addScrollListener();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setType(nav[hitEndpointCount].url);
  }, [hitEndpointCount]);

  useEffect(() => {
    if (documentPAT) {
      setDoc((prev) => [
        ...prev,
        {
          idx: hitEndpointCount,
          key: nav[hitEndpointCount].name,
          content: documentPAT?.data,
        },
      ]);
    }
  }, [documentPAT]);

  useEffect(() => {
    console.log("DOC => ", doc);
  }, [doc]);

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
                          activeIndex={currentPosition}
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
                      className={`page-container-a4 shrink-0 ${
                        i === activeIndex ? "active" : ""
                      }`}
                      tabIndex={i === activeIndex ? 0 : -1}
                      ref={i === activeIndex ? activeDivRef : null}
                    >
                      <CardComment
                        callbackRef={ref}
                        onClickOutside={() => setOpenCardComment(false)}
                        show={openCardComment}
                      />
                      {v.content && (
                        <div className="px-4 h-full w-full relative page-content-a4">
                          <div className="flex justify-between">
                            <div className="font-bold text-xl">{v.key}</div>
                            <div className="flex items-center" ref={ref}>
                              <Link
                                href={"#"}
                                onClick={() => setOpenCardComment(true)}
                              >
                                <Image src={ImageChat} alt="chat" />
                              </Link>
                            </div>
                          </div>
                          {v.idx === 2 ? (
                            <div
                              className="mt-4"
                              dangerouslySetInnerHTML={{
                                __html: getAuditTargetTable(v.content),
                              }}
                            />
                          ) : v.idx === 6 ? (
                            <div
                              className="mt-4"
                              dangerouslySetInnerHTML={{
                                __html: getAuditTeamTable(v.content),
                              }}
                            />
                          ) : (
                            <div
                              className="mt-4"
                              dangerouslySetInnerHTML={{ __html: v.content }}
                            />
                          )}
                        </div>
                      )}
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
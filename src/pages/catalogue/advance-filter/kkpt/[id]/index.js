import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { DocumentItems } from "@/components/molecules/pat/dokumen";
import { MainLayout } from "@/layouts";
import { useRef, useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";

const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    {
      name: "Pencarian Dokumen KKPT",
      path: "/catalogue/advance-filter/kkpt",
    },
    {
      name: "Detail Dokumen",
      path: "/catalogue/advance-filter/kkpt/1",
    },
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

  const [activeIndex, setActiveIndex] = useState(0);
  const activeDivRef = useRef(null);
  const [hitEndpointCount, setHitEndpointCount] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

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
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen"} />
        </div>
        {/* Start Content */}
        <div className="flex w-full gap-6">
          <div className="w-[15rem]">
            <div>
              <Card>
                <div className="pl-8 py-3 w-full">
                  <div className="text-xl">Daftar Isi</div>
                  <div className="pl-2 mt-0.5">
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
              <div className="overflow-y-scroll my-2 parent max-h-[40rem]">
                <div className={`page-container-a4 shrink-0`}>
                  <div className="h-full w-full relative page-content-a4">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">
                      <Viewer fileUrl={"/kkpt.pdf"} />
                    </Worker>
                    {/* <div
                      className="mt-4"
                      dangerouslySetInnerHTML={{
                        __html:
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet lacus elit. Quisque elementum, dui vitae gravida egestas, magna diam tincidunt ipsum, a interdum odio nulla sed ante. Vivamus sit amet convallis tellus. Suspendisse imperdiet mattis porta. Sed non arcu tempor, consectetur purus ut, mollis mi. Sed congue vestibulum nibh vel pharetra. Praesent pulvinar sapien eget ante pharetra, a dapibus libero ullamcorper. Aenean rutrum fringilla lectus, et tempus tellus fermentum id. Sed sed urna at eros venenatis iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* End Content */}
      </div>
    </MainLayout>
  );
};

export default index;

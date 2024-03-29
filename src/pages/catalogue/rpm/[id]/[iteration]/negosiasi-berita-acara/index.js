import { useState, useEffect, Suspense } from "react";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import negoBaHtml from "@/templates/catalog/rpm/negosiasi-berita-acara";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState();
  const [selectedEvaluasi, setEvaluasi] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    const { id, iteration } = router.query;
    setSelectedId(id);
    setEvaluasi(iteration);
  }, [router.isReady]);

  const baseUrl = "/catalogue/rpm";
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: baseUrl },
    { name: "Daftar Evaluasi", path: baseUrl + "/" + selectedId },
    {
      name: "Daftar Dokumen",
      path: baseUrl + "/" + selectedId + "/" + selectedEvaluasi,
    },
    {
      name: "Negosiasi Berita Acara",
      path:
        baseUrl +
        "/" +
        selectedId +
        "/" +
        selectedEvaluasi +
        "/negosiasi-berita-acara",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen Negosiasi Berita Acara"} />
        </div>
        <ProjectInfo type="rpm" id={selectedId} />
        <Suspense fallback={<p>Loading....</p>}>
          <DocumentViewer
            documentTitle="Negosiasi Berita Acara"
            documentHtml={negoBaHtml(selectedId, selectedEvaluasi)}
          />
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default index;

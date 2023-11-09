import { useState, useEffect, useMemo, Suspense } from "react";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import sheHtml from "@/templates/catalog/rpm/she";
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
  const breadcrumbs = useMemo(() => {
    if (!selectedId) return [];

    return [
      { name: "Menu", path: "/dashboard" },
      { name: "Catalogue", path: "/catalogue" },
      { name: "R.P.M", path: baseUrl },
      { name: "Daftar Dokumen", path: `${baseUrl}/${selectedId}` },
      {
        name: "Dokumen Surat Hasil Tindak Lanjut",
        path: `${baseUrl}/${selectedId}/surat-hasil-evaluasi`,
      },
    ];
  }, [selectedId, baseUrl]);

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen Surat Hasil Evaluasi"} />
        </div>
        <ProjectInfo type="rpm" id={selectedId} />
        <Suspense fallback={<div>Loading...</div>}>
          <DocumentViewer
            documentTitle="Surat Hasil Evaluasi"
            documentHtml={sheHtml(selectedId, selectedEvaluasi)}
          />
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default index;

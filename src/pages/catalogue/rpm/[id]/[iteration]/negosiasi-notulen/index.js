import { useState, useEffect } from "react";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import negoNotHtml from "@/templates/catalog/rpm/negosiasi-notulen";
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
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + selectedId },
    {
      name: "Dokumen Negosiasi Notulen",
      path: baseUrl + "/" + selectedId + "/negosiasi-notulen",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen Negosiasi Notulen"} />
        </div>
        <ProjectInfo type="rpm" id={selectedId} />
        <DocumentViewer
          documentTitle="Negosiasi Notulen"
          documentHtml={negoNotHtml(selectedId, selectedEvaluasi)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

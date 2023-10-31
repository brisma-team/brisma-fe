import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { mapaHtml } from "@/templates/catalog/ewp";
import { useState, useEffect } from "react";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [params, setParams] = useState({
    year: 2023,
    source: 2,
    id: 1,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      source: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
    });
  }, [router.isReady]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + params.id },
    { name: "Dokumen MAPA", path: baseUrl + "/" + params.id + "/mapa" },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"MAPA Dokumen"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.source}
        />
        <DocumentViewer
          documentTitle="MAPA"
          documentHtml={mapaHtml(params.year, params.source, params.id)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

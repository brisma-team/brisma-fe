import { useState, useEffect } from "react";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { entBaHtml } from "@/templates/catalog/ewp";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const { id } = useRouter().query;

  const [params, setParams] = useState({
    year: 2023,
    source: 2,
    id: 1,
  });

  useEffect(() => {
    if (id !== undefined) {
      setParams({
        year: id.split("x1c-")[2],
        source: id.split("x1c-")[0],
        id: id.split("x1c-")[1],
      });
    }
  }, [id]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + id },
    {
      name: "Dokumen Entrance BA",
      path: baseUrl + "/" + id + "/entrance-berita-acara",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Entrance BA Dokumen"} />
        </div>
        <ProjectInfo type="ewp" id={params.id} />
        <DocumentViewer
          documentTitle="Entrance BA"
          documentHtml={entBaHtml(params.year, params.source, params.id)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { shaHtml } from "@/templates/catalog/ewp";
import { DocumentViewer } from "@/components/molecules/catalog";

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
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + id },
    {
      name: "Dokumen LHA-SHA",
      path: baseUrl + "/" + id + "/lha/sha",
    },
  ];
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"LHA-SHA"} />
        </div>
        <DocumentViewer
          documentTitle="LHA-SHA"
          documentHtml={shaHtml(params.year, params.source, params.id)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

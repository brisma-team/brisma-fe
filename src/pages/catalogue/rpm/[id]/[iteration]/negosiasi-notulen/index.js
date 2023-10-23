import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { negoNotHtml } from "@/templates/catalog/rpm/negosiasi-notulen";
import DocumentViewer from "@/components/molecules/catalog/DocumentViewer";

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

  const baseUrl = "/catalogue/rpm";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + id },
    {
      name: "Negosiasi Notulen",
      path: baseUrl + "/" + id + "/negosiasi-notulen",
    },
  ];
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen Negosiasi Notulen"} />
        </div>
        <DocumentViewer
          documentTitle="Negosiasi Notulen"
          documentHtml={negoNotHtml(params.year, params.source, params.id)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

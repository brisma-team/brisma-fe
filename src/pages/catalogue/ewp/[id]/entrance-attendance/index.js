import { useState, useEffect } from "react";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { entAttHtml } from "@/templates/catalog/ewp";
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
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + id },
    {
      name: "Dokumen Entrance Attendance",
      path: baseUrl + "/" + id + "/entrance-attendance",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Entrance Attendance Dokumen"} />
        </div>
        <ProjectInfo type="ewp" id={params.id} />
        <DocumentViewer
          documentTitle="Entrance Attendance"
          documentHtml={entAttHtml(params.year, params.source, params.id)}
        />
      </div>
    </MainLayout>
  );
};

export default index;
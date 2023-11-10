import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addendumPatHtml } from "@/templates/catalog/pat/addendum-pat";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const { id, addendum } = useRouter().query;

  const [params, setParams] = useState({
    year: "2023",
    source: "2",
    id: 1,
    addendum: 1,
  });

  useEffect(() => {
    if (id !== undefined) {
      setParams({
        ...params,
        id: id,
        addendum: addendum,
      });
    }
  }, [id]);

  const baseUrl = "/catalogue/pat";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + id },
    {
      name: "Dokumen Addendum PAT",
      path: baseUrl + "/" + id + "/addendum-pat",
    },
  ];
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen Addendum PAT"} />
        </div>
        <ProjectInfo type="pat" id={params.id} />
        <DocumentViewer
          documentTitle="Addendum PAT"
          documentStyle={`* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          table,
          th,
          td {
            border: 1px solid black;
            border-collapse: collapse;
            // text-align: center;
          }
          th {
            background-color: #3C64B1;
            color: white;
          }
          html {
            font-size: 11px;
            font-family: Arial, Helvetica, sans-serif;
          }
          /* body {
                padding: 5rem 10%;
              } */
          /* main {
                border: 1px solid black;
              } */
          article {
            display: grid;
            grid-template-columns: 25px 1fr;
            margin-bottom: 1em;
          }
          .footerHandSign {
            display: flex; 
            justify-content: end; 
            margin: 5rem 20px;
          }
          article > p {
            margin: 0;
          }
          section > h4 {
            margin-bottom: 0.5em;
          }
          section > p {
            line-height: 1.5;
            text-align: justify;
          }
          header {
            display: flex;
            justify-content: center;
            text-align: center;
            margin-bottom: 1em;
          }
          .header {
            position: relative;
          }
          .footerDiv {
            display: flex; 
            justify-content: end; 
            margin: 5rem 75px;
            align-items: center;
          }
          header img {
            width: 110px;
            height: 40px;
            position: absolute;
            left: 0;
          }`}
          documentHtml={addendumPatHtml(params.year, params.addendum)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addendumMapaHtml } from "@/templates/catalog/ewp";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    uri: "",
    addendum: 1,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, addendum } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      addendum: addendum,
      uri: id,
    });
  }, [router.isReady]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + params.uri },
    {
      name: "Daftar Dokumen Addendum MAPA",
      path: "/catalogue/ewp/" + params.uri + "/addendum-mapa",
    },
    {
      name: "Dokumen Addendum MAPA",
      path:
        "/catalogue/ewp/" + params.uri + "/addendum-mapa/" + params.addendum,
    },
  ];
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen Addendum MAPA"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          source={params.type}
          year={params.year}
        />
        <DocumentViewer
          documentTitle="Addendum MAPA"
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
          documentHtml={addendumMapaHtml(params.year, params.addendum)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

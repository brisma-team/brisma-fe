import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { patHtml } from "@/templates/catalog/pat/pat";
import { useState, useEffect } from "react";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const [selectedId, setSelectedId] = useState();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setSelectedId(id);
  }, [router.isReady]);

  const baseUrl = "/catalogue/pat";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + selectedId },
    {
      name: "Overview P.A.T",
      path: baseUrl + "/" + selectedId + "/overview",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"P.A.T Dokumen"} />
        </div>
        <ProjectInfo type="pat" id={selectedId} />
        <DocumentViewer
          documentTitle="Dokumen P.A.T"
          documentStyle={`.leader {
            position: relative;
            overflow: hidden;
            z-index: 0;
          }
          .leader > span {
            background-color: white;
          }
          .leader > span:first-child:after,
          .leader > span:last-child:before {
            position: absolute;
            background-color: white;
            z-index: -1;
            content: "................................................................"
              "................................................................"
              "................................................................"
              "................................................................"
              "................................................................"
              "................................................................"
              "................................................................"
              "................................................................";
            letter-spacing: 0.25em;
            cursor: default;
          }
          .leader > span:last-child {
            float: right;
            background-color: white;
            text-align: right;
          }
          .leader > span:last-child:before {
            left: 0;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          table,
          th,
          td {
            border: 1px solid black;
            border-collapse: collapse;
            text-align: center;
          }
          th {
            background-color: #3C64B1;
            color: white;
          }
          html {
            font-size: 16px;
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
          header img {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 0;
          }
          .keterangan_si {
            display: grid;
            grid-template-columns: 25px 100px 1fr;
          }
          .keterangan_reg_aud {
            display: grid;
            grid-template-columns: 100px 1fr;
          }
          .keterangan_spc_aud {
            display: grid;
            grid-template-columns: 150px 1fr;
          }
          .sub_section_ruang_lingkup {
            display: grid;
            grid-template-columns: 25px 1fr;
            margin-bottom: 1rem;
          }
          .keterangan_jadwal_aud {
            display: grid;
            grid-template-columns: 25px 150px 1fr;
          }
          .keterangan_susunan_tim {
            display: grid;
            grid-template-columns: 25px 150px 1fr;
          }
          .biaya_anggaran {
            display: grid;
            grid-template-columns: 25px 1fr;
          }
          .sub_biaya_anggaran {
            padding-left: 25px;
            display: grid;
            grid-template-columns: 25px 1fr;
            padding-right: 20%;
          }
          .keterangan_biaya_dinas {
            display: grid;
            grid-template-columns: 25px 1fr;
          }
          .sub_keterangan_biaya_dinas {
            padding-left: 25px;
            display: grid;
            grid-template-columns: 25px 1fr;
          }
          .keterangan_biaya_lainnya {
            display: grid;
            grid-template-columns: 25px 400px 1fr;
          }`}
          documentHtml={patHtml(selectedId)}
        />
      </div>
    </MainLayout>
  );
};

export default index;

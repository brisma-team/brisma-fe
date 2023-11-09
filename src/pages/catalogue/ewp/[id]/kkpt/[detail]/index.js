import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import kkptHtml from "@/templates/catalog/ewp/kkpt";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    uri: "",
    kkptid: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, detail } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
      kkptid: detail,
    });
  }, [router.isReady]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.uri },
    { name: "Riwayat KKPT", path: "/catalogue/ewp/" + params.uri + "/kkpt" },
    {
      name: "Dokumen KKPT",
      path: "/catalogue/ewp/" + params.uri + "/kkpt/" + params.kkptid,
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"KKPT Dokumen"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <DocumentViewer
          documentTitle="Kertas Kerja Pengawasan Temuan"
          documentHtml={kkptHtml(params.year, params.type, params.kkptid)}
        />
        {/* Start Content */}
        {/* <div className="w-[70rem] gap-6">
          <div>
            <Card>
              <div
                className={`overflow-y-scroll my-2 ${
                  isLoading ? "blur-sm" : ""
                }`}
              >
                <div>
                  <div className="h-full w-full ">
                    <iframe
                      title="frame document"
                      id="content-doc"
                      className="content-doc w-[70rem]"
                      srcDoc={`<!DOCTYPE html>
                      <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width,initial-scale=1">
                          <style>
                            body:before {
                              content: '${watermark.join(" ")}';
                              position: fixed;
                              top: 0;
                              bottom: 0;
                              left: 0;
                              right: 0;
                              z-index: -1;
                              
                              text-align: justify;
                              line-height: 50px;
                              color: #aaaaaa;
                              font-weight: 500px;
                              opacity: 0.2;
                            }
                            table,
                            td,
                            th {
                              border: 1px solid #000;
                              border-collapse: collapse;
                              text-align: center;
                              word-wrap: break-word;
                              padding: 10px
                            }
                      
                            th {
                              background-color: #3c64b1;
                              color: #fff;
                              padding: 10px
                            }
                      
                            body {
                              padding-left: 20px;
                              padding-right: 20px
                            }
                          </style>
                          <title>KKPT DOKUMEN</title>
                        </head>
                        <body class="watermark">
                          
                        </body>
                      </html>`}
                      style={{ minHeight: "29.7cm" }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div> */}
        {/* End Content */}
      </div>
    </MainLayout>
  );
};

export default index;

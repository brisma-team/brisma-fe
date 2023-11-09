import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ltminorHtml } from "@/templates/catalog/ewp";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";
import rtaHtml from "@/templates/catalog/ewp/rta";
import { useRTAById } from "@/data/catalog";

const index = () => {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
    });
  }, [router.isReady]);

  const { rtaDetail } = useRTAById(
    params.year,
    params.type,
    params.id,
    "temuan-minor"
  );

  useEffect(() => {
    if (rtaDetail !== undefined) {
      setList(rtaDetail.data.kkpt);
    }
  }, [rtaDetail]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + params.uri },
    {
      name: "Dokumen Laporan Temuan Minor",
      path: baseUrl + "/" + params.uri + "/berita-acara-temuan-minor",
    },
  ];
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Berita Acara Temuan Minor"} />
        </div>
        <ProjectInfo
          type="ewp"
          year={params.year}
          source={params.type}
          id={params.id}
        />
        <div className="mt-5 mr-40">
          <div className="w-full flex ">
            <div className="w-1/3 gap-6 mr-5">
              <div className="mb-5">
                <Card>
                  <div className="w-full h-full px-3 p-5">
                    <u className="font-bold text-base">Dokumen</u>
                    {["Berita Acara Temuan Minor", "RTA Minor"].map(
                      (data, i) => {
                        return (
                          <p className="text-base" key={i}>
                            {i + 1 + ". " + data}
                          </p>
                        );
                      }
                    )}
                  </div>
                </Card>
              </div>
              <div>
                <Card>
                  <div className="w-full h-full px-3 p-5">
                    <u className="font-bold text-base">Kumpulan KKPT</u>
                    {list.length == 0 ? (
                      <p className="text-base">
                        Tidak Ada Dokumen Temuan Minor
                      </p>
                    ) : (
                      ""
                    )}
                    {list?.map((data, i) => {
                      return (
                        <p className="text-base" key={i}>
                          {data.KKPTID + " - " + data.KKPTTitle}
                        </p>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
            <div className="w-2/3">
              <h2 className="mb-5 font-bold">Berita Acara Temuan Minor</h2>
              <DocumentViewer
                documentTitle="Berita Acara Temuan Major"
                documentHtml={ltminorHtml(params.year, params.type, params.id)}
                withNoHeader={true}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 mr-40">
          <div className="w-full flex ">
            <div className="w-1/3 gap-6 mr-5"></div>
            <div className="w-2/3">
              {list.length > 0 ? (
                <h2 className="mb-5 font-bold">RTA Minor</h2>
              ) : (
                ""
              )}
              {list?.map((data, i) => {
                return (
                  <div className="mb-4" key={i}>
                    <h5 className="mb-5 font-bold">
                      {data.KKPTID + " - " + data.KKPTTitle}
                    </h5>
                    <DocumentViewer
                      documentTitle="Kertas Kerja Pengawasan Temuan"
                      documentHtml={rtaHtml(data)}
                      withNoHeader={true}
                    />
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

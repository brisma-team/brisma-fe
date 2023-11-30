import { Breadcrumbs, PageTitle, Card } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";
import rtaHtml from "@/templates/catalog/ewp/rta";
import { useRTAById } from "@/data/catalog";
import { loadingSwal } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    uri: "",
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

  const { rtaDetail, rtaDetailIsLoading } = useRTAById(
    params.year,
    params.type,
    params.id,
    "all",
    5
  );

  useEffect(() => {
    if (rtaDetail !== undefined) {
      setList(rtaDetail.data.kkpt);
    }
  }, [rtaDetail]);

  useEffect(() => {
    rtaDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [rtaDetailIsLoading]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + params.uri },
    {
      name: "Daftar Dokumen LHA",
      path: baseUrl + "/" + params.uri + "/lha",
    },
    {
      name: "Dokumen LHA-Rincian Temuan Audit",
      path: baseUrl + "/" + params.uri + "/lha/rta",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Rincian Temuan Audit"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <div className="mt-5 mr-40">
          <div className="w-full flex ">
            <div className="w-1/3 gap-6 mr-5">
              <div>
                <Card>
                  <div className="w-full h-full px-3 p-5">
                    <u className="font-bold text-base">Kumpulan KKPT</u>
                    {rtaDetailIsLoading ? (
                      <p>Loading data...</p>
                    ) : (
                      list?.map((data, i) => {
                        return (
                          <p className="text-base" key={i}>
                            {data.KKPTID + " - " + data.KKPTTitle}
                          </p>
                        );
                      })
                    )}
                  </div>
                </Card>
              </div>
            </div>
            <div className="w-2/3">
              {list?.map((data, i) => {
                return (
                  <div className="mb-4" key={i}>
                    <DocumentViewer
                      documentTitle="Kertas Kerja Pengawasan Temuan"
                      documentHtml={rtaHtml(data)}
                      withNoHeader={true}
                    />
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

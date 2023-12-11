import { Breadcrumbs, PageTitle, Card, ButtonField } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";
import rtaHtml from "@/templates/catalog/ewp/rta";
import { useRTAById } from "@/data/catalog";
import { loadingSwal } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(7);
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

  const { rtaDetail, rtaDetailIsLoading, rtaDetailIsValidating } = useRTAById(
    params.year,
    params.type,
    params.id,
    "all",
    limit
  );

  useEffect(() => {
    if (rtaDetail !== undefined) {
      setList(rtaDetail.data.kkpt);
    }
  }, [rtaDetail]);

  useEffect(() => {
    rtaDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [rtaDetailIsLoading]);

  const handleClickLoadMore = useCallback(() => {
    setLimit((prev) => prev + 7);
  }, []);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
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
                    <u className="font-bold text-base">Kumpulan KKPT</u>(
                    {!rtaDetailIsLoading
                      ? limit > rtaDetail?.data?.total_data
                        ? rtaDetail?.data?.total_data +
                          "/" +
                          rtaDetail?.data?.total_data
                        : limit + " / " + rtaDetail?.data?.total_data + " Docs"
                      : "-"}
                    )
                    {rtaDetailIsLoading ? (
                      <p>Loading data...</p>
                    ) : (
                      list?.map((data, i) => {
                        return (
                          <button
                            className="text-sm hover:underline text-left justify-normal mb-1 p-2"
                            onClick={() =>
                              router.push(
                                baseUrl +
                                  "/" +
                                  params.uri +
                                  "/lha/rta" +
                                  "#kkpt" +
                                  (i + 1)
                              )
                            }
                            key={i}
                          >
                            {i + 1 + ". " + data.KKPTTitle}
                          </button>
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
                    <h5 className="mb-5 font-bold" id={"kkpt" + (i + 1)}>
                      {i + 1 + ". " + data.KKPTTitle}
                    </h5>
                    <DocumentViewer
                      documentTitle="Kertas Kerja Pengawasan Temuan"
                      documentHtml={rtaHtml(data)} //
                      withNoHeader={true}
                    />
                  </div>
                );
              })}
              {!rtaDetailIsValidating ? (
                limit < rtaDetail?.data?.total_data ? (
                  <div className="w-[59rem] bg-blue-800 rounded-md hover:bg-brisma">
                    <ButtonField
                      text={"Load More"}
                      handler={handleClickLoadMore}
                    />
                  </div>
                ) : (
                  ""
                )
              ) : (
                <h4 className="text-center my-8">
                  Loading data, mohon tunggu...
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

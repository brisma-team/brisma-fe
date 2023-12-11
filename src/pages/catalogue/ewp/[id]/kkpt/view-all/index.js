import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";
import { useRTAById } from "@/data/catalog";
import { loadingSwal } from "@/helpers";
import { MainLayout } from "@/layouts";
import rtaHtml from "@/templates/catalog/ewp/rta";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
const index = () => {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(5);
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    uri: "",
    kkpttitle: "",
    uker: "",
    activity: "",
    subactivity: "",
    submajor: "",
    riskissue: "",
    auditor: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const {
      id,
      kkpttitle,
      uker,
      activity,
      subactivity,
      submajor,
      riskissue,
      auditor,
    } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
      kkpttitle: kkpttitle,
      uker: uker,
      activity: activity,
      subactivity: subactivity,
      submajor: submajor,
      riskissue: riskissue,
      auditor: auditor,
    });
  }, [router.isReady]);

  const { rtaDetail, rtaDetailIsLoading, rtaDetailIsValidating } = useRTAById(
    params.year,
    params.type,
    params.id,
    "all",
    limit,
    params.kkpttitle,
    params.uker,
    params.activity,
    params.subactivity,
    params.submajor,
    params.riskissue,
    params.auditor
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
    setLimit((prev) => prev + 5);
  }, []);

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.uri },
    { name: "Riwayat KKPT", path: "/catalogue/ewp/" + params.uri + "/kkpt" },
    {
      name: "Lihat Seluruh Dokumen KKPT",
      path: "/catalogue/ewp/" + params.uri + "/kkpt/view-all",
    },
  ];

  // const handlePrint = useCallback(() => {
  //   const contentElement = document.getElementById("content-rta");
  //   const styleLinks = document.querySelectorAll('link[rel="stylesheet"]');

  //   if (contentElement) {
  //     const contentWindow = window.open("", "_blank");
  //     contentWindow.document.write("<html><head><title>Print</title>");

  //     // Include stylesheets
  //     styleLinks.forEach((styleLink) => {
  //       contentWindow.document.write(styleLink.outerHTML);
  //     });

  //     contentWindow.document.write("</head><body>");
  //     contentWindow.document.write(contentElement.innerHTML);
  //     contentWindow.document.write("</body></html>");
  //     contentWindow.document.close();

  //     // Set the width of the print window to match the document body's scroll width
  //     const bodyWidth = document.body.scrollWidth || document.body.offsetWidth;
  //     contentWindow.document.body.style.width = `${bodyWidth}px`;

  //     contentWindow.print();
  //   } else {
  //     console.error('Element with ID "content-rta" not found.');
  //   }
  // }, []);

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Lihat Semua Dokumen KKPT"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <div className="mt-5 mr-40">
          <div className="w-full flex">
            <div className="w-1/5 gap-2 mr-5">
              <div>
                <Card>
                  <div className="w-full h-full px-3 p-5">
                    <u className="font-bold text-base">Kumpulan KKPT</u> (
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
                          <p className="text-sm" key={i}>
                            {`${i + 1}. ${data.KKPTTitle}`}
                          </p>
                        );
                      })
                    )}
                  </div>
                </Card>
              </div>
            </div>
            <div className="w-2/3" id="content-rta">
              {list?.map((data, i) => {
                return (
                  <>
                    <div className="mb-4" key={i}>
                      <p className="font-bold text-base mb-4">{`${i + 1}.  ${
                        data.KKPTTitle
                      }`}</p>
                      <DocumentViewer
                        documentTitle="Kertas Kerja Pengawasan Temuan"
                        documentHtml={rtaHtml(data)}
                        withNoHeader={true}
                      />
                    </div>
                  </>
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

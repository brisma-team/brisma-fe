import { Breadcrumbs, PageTitle, Card } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";
import { useRTAById, useRTEById } from "@/data/catalog";
import rteHtml from "@/templates/catalog/rpm/rincian-tindak-lanjut-evaluasi";
import { loadingSwal } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [lists, setLists] = useState([]);
  const [kkptId, setKkptId] = useState(0);
  const [kkptinfo, setKkptinfo] = useState({});
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    iteration: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, iteration } = router.query;
    setParams({
      ...params,
      year: id.slice(0, 4),
      id: id,
      iteration: iteration,
    });
  }, [router.isReady]);

  const { rtaDetail, rtaDetailIsLoading } = useRTAById(
    params.year,
    params.type,
    params.id,
    "all",
    5
  );
  const { rteDetail } = useRTEById(kkptId, 1);

  useEffect(() => {
    if (rteDetail !== undefined) {
      setKkptinfo(rteDetail.data.rteDetail);
      setLists(rteDetail.data.rteActionPlan);
    }
  }, [rteDetail]);

  useEffect(() => {
    if (rtaDetail !== undefined) {
      setList(rtaDetail.data.kkpt);
    }
  }, [rtaDetail]);

  const handleKkptId = useCallback((selected) => {
    setKkptId(selected);
  }, []);

  useEffect(() => {
    rtaDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [rtaDetailIsLoading]);

  const baseUrl = "/catalogue/rpm";
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "R.P.M", path: baseUrl },
    { name: "Daftar Evaluasi", path: baseUrl + "/" + params.id },
    {
      name: "Daftar Dokumen",
      path: baseUrl + "/" + params.id + "/" + params.iteration,
    },
    {
      name: "Rincian Tindak Lanjut dan Evaluasi",
      path:
        baseUrl +
        "/" +
        params.id +
        "/" +
        params.iteration +
        "/rincian-tindak-lanjut-evaluasi",
    },
  ];
  return (
    <MainLayout>
      <div className="px-5 overflow-x-scroll max-w-screen">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Rincian Tindak Lanjut dan Evaluasi"} />
        </div>
        <ProjectInfo
          type="rpm"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <div className="mt-5 mr-40">
          <div className="w-full flex ">
            <div className="w-1/3 gap-6 mr-5">
              <div>
                <Card>
                  <u className="font-bold text-base my-2">Kumpulan KKPT</u>
                  <div className="w-full h-full px-3 p-5">
                    {rtaDetailIsLoading ? (
                      <p className="p-2">Loading Data...</p>
                    ) : (
                      list?.map((data, i) => {
                        return (
                          <button
                            className="text-base hover:underline text-left justify-normal mb-3 p-2"
                            onClick={() => handleKkptId(data.KKPTID)}
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
            <div className="w-2/3 mr-5">
              {/* {list?.map((data, i) => {
                return ( */}
              <div className="mb-4 pr-5">
                {kkptId == 0 ? (
                  <h5>Silahkan Pilih KKPT terlebih dahulu</h5>
                ) : (
                  <DocumentViewer
                    documentTitle="Kertas Kerja Pengawasan Temuan"
                    documentHtml={
                      rtaDetailIsLoading
                        ? `<p>Loading data...</p>`
                        : rteHtml(kkptinfo, lists)
                    }
                    withNoHeader={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

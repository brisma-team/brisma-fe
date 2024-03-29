import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";
import { useViewAllKKPA } from "@/data/catalog";
import { loadingSwal } from "@/helpers";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import dateLocaleString from "@/helpers/dateLocaleString";
const index = () => {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(5);
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
    uri: "",
    activity: "",
    subactivity: "",
    submajor: "",
    riskissue: "",
    auditor: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, activity, subactivity, submajor, riskissue, auditor } =
      router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
      activity: activity,
      subactivity: subactivity,
      submajor: submajor,
      riskissue: riskissue,
      auditor: auditor,
    });
  }, [router.isReady]);

  const { kkpaAllDetail, kkpaAllDetailIsLoading } = useViewAllKKPA(
    params.year,
    params.type,
    params.id,
    limit,
    params.activity,
    params.subactivity,
    params.submajor,
    params.riskissue,
    params.auditor
  );

  useEffect(() => {
    if (kkpaAllDetail !== undefined) {
      setList(kkpaAllDetail.data.kkpa);
    }
  }, [kkpaAllDetail]);

  useEffect(() => {
    kkpaAllDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [kkpaAllDetailIsLoading]);

  const handleClickLoadMore = useCallback(() => {
    setLimit((prev) => prev + 5);
  }, []);

  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.uri },
    { name: "Riwayat KKPA", path: "/catalogue/ewp/" + params.uri + "/kkpa" },
    {
      name: "Lihat Seluruh Dokumen KKPA",
      path: "/catalogue/ewp/" + params.uri + "/kkpa/view-all",
    },
  ];

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Lihat Semua Dokumen KKPA"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <div className="mt-5 mr-40">
          <div className="w-full flex ">
            {/* <div className="w-1/3 gap-6 mr-5">
              <div>
                <Card>
                  <div className="w-full h-full px-3 p-5">
                    <u className="font-bold text-base">Kumpulan KKPT</u>
                    {kkpaAllDetailIsLoading ? (
                      <p>Loading data...</p>
                    ) : (
                      list?.map((data, i) => {
                        return (
                          <p className="text-base" key={i}>
                            {data.KKPAID + " - " + data.KKPANAME}
                          </p>
                        );
                      })
                    )}
                  </div>
                </Card>
              </div>
            </div> */}
            <div className="w-2/3">
              {list?.map((data, i) => {
                return (
                  <div className="mb-4" key={i}>
                    <DocumentViewer
                      documentTitle="Kertas Kerja Pengawasan Temuan"
                      documentHtml={
                        kkpaAllDetailIsLoading
                          ? `<p>Loading data...</p>`
                          : `<header>
                    <div  class="header">
                      <div style="text-align: center">
                        <h2 style="color: black">KERTAS KERJA PELAKSANAAN AUDIT</h2>
                        <h2 style="color: black">
                          ${
                            data?.JenisAudit
                              ? data?.JenisAudit.toUpperCase()
                              : ""
                          } 
                        </h2>
                        <h2 style="color: black">
                        ${
                          data?.AuditeeBranchName ? data?.AuditeeBranchName : ""
                        }
                        </h2>
                        <h2 style="color: black">PERIODE AUDIT 
                          ${data?.Year ? data?.Year : "**"}
                        </h2>
                      </div>
                      <div style="text-align: center">
                        <h3 style="color: black">
                          Ref No: ${
                            data?.AuditeeBranchCode
                              ? data?.AuditeeBranchCode
                              : "**"
                          } - ${
                              data?.MCAuditProjectCode
                                ? data?.MCAuditProjectCode
                                : "**"
                            } - ${
                              data?.RiskIssueCode ? data?.RiskIssueCode : "**"
                            }
                        </h3>
                      </div>
                      <hr
                        style="
                          height: 1px;
                          border-width: 0;
                          color: gray;
                          background-color: black;
                        "
                      />
                    </div>
                  </header>
                  <main>
                  <h3 style="font-weight: bold;margin-bottom:10px;margin-top:10px;">AKTIVITAS</h3>
                  <div><p>${
                    data?.Activity
                      ? data?.Activity
                      : "<i><b>Data tidak ditemukan.</b></i>"
                  }</p></div>
                  <h3 style="font-weight: bold;margin-bottom:10px;">SUB AKTIVITAS</h3>
                  <div><p>${
                    data?.SubActivity
                      ? data?.SubActivity
                      : "<i><b>Data tidak ditemukan.</b></i>"
                  }</p></div>
                  <br/>
                  <h3 style="font-weight: bold;margin-bottom:10px;">I. RISK ISSUE</h3>
                  ${
                    data?.RiskIssueCode && data?.RiskIssueName
                      ? `<div><p style="text-align: justify;">${data?.RiskIssueCode}</p></div>
                  ${data?.RiskIssueName}`
                      : "<i><b>Data tidak ditemukan.</b></i>"
                  }
                  <br/>
                  <h3 style="font-weight: bold;margin-bottom:10px;">II. CONTROL</h3>
                  <div>
                  <h4>Keterangan</h4>
                  <p>
                  ${
                    data?.PengujianControlDesc
                      ? data?.PengujianControlDesc
                      : "<i><b>Data tidak ditemukan.</b></i>"
                  }
                  </p>
                  </br>
                  <h4>List Kontrol</h4>
                  <table>
                      <thead>
                          <th style="background-color: #3C64B1; color: white;">Kode</th>
                          <th style="background-color: #3C64B1; color: white;">Keterangan</th>
                          <th style="background-color: #3C64B1; color: white;">Kritikal Kode</th>
                      </thead>
                      <tbody>
                          <tr>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                      </tr>
                      </tbody>
                  </table>
                  </div>
                  <br/>
                  <h3 style="font-weight: bold;margin-bottom:10px;">III. PROGRAM AUDIT</h3>
                  <div>
                  ${
                    data?.ProgramAudit
                      ? data?.ProgramAudit
                      : "<i><b>Data tidak ditemukan.</b></i>"
                  }
                  </div>
                  <br/>
                  <h3 style="font-weight: bold;margin-bottom:10px;">IV. RUANG LINGKUP</h3>
                  
                  ${
                    params.type == "1"
                      ? data?.RuangLingkup
                        ? data.RuangLingkup
                        : "<i><b>Data tidak ditemukan.</b></i>"
                      : `<div><table style="height: 160px; width: 100%; border-collapse: collapse;" border="0">
                      <tbody>
                      <tr>
                      <td style="width: 33.3333%;">Sumber Informasi</td>
                      <td style="width: 3.9593%;">:</td>
                      <td style="width: 62.7073%;">${
                        data?.SumberInformasi
                          ? data?.SumberInformasi
                          : "<i><b>Data tidak ditemukan.</b></i>"
                      }</td>
                      </tr>
                      <tr>
                      <td style="width: 33.3333%;">Periode Populasi</td>
                      <td style="width: 3.9593%;">:</td>
                      <td style="width: 62.7073%;">
                        ${
                          data?.PeriodeStart
                            ? dateLocaleString(data?.PeriodeStart, true)
                            : "**"
                        }` +
                        " - " +
                        `${
                          data?.PeriodeEnd
                            ? dateLocaleString(data?.PeriodeEnd, true)
                            : "**"
                        }</td>
                      </tr>
                      <tr>
                      <td style="width: 33.3333%;">Jumlah Populasi</td>
                      <td style="width: 3.9593%;">:</td>
                      <td style="width: 62.7073%;">${
                        data?.JumlahPopulasi ? data?.JumlahPopulasi : "**"
                      }</td>
                      </tr>
                      <tr>
                      <td style="width: 33.3333%;">Jumlah Sample Pengujian</td>
                      <td style="width: 3.9593%;">:</td>
                      <td style="width: 62.7073%;">${
                        data?.JumlahSample ? data?.JumlahSample : "**"
                      }</td>
                      </tr>
                      <tr>
                      <td style="width: 33.3333%;">Teknik Sampling</td>
                      <td style="width: 3.9593%;">:</td>
                      <td style="width: 62.7073%;">${
                        data?.TeknikSamplingDesc
                          ? data?.TeknikSamplingDesc
                          : "**"
                      }</td>
                      </tr>
                      <tr>
                      <td style="width: 33.3333%;">Keterangan</td>
                      <td style="width: 3.9593%;">:</td>
                      <td style="width: 62.7073%;">${
                        data?.UraianSample ? data?.UraianSample : "**"
                      }</td>
                      </tr>
                      </tbody>
                      </table></div>`
                  }
                  <br/>
                  <h3 style="font-weight: bold;margin-bottom:10px;">V. KRITERIA</h3>
                  <div>
                  ${
                    data?.KriteriaAudit
                      ? data?.KriteriaAudit
                      : "<i><b>Data tidak ditemukan.</b></i>"
                  }
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <h3 style="font-weight: bold;margin-bottom:10px;">VI. HASIL PENGUJIAN SAMPLE</h3>
                  <div>
                      <style>
                  table, th, td {
                    border: 1px solid;
                    padding: 3px;
                  }
                  </style>
                      <body>
                      ${
                        params.type == "1"
                          ? data?.HasilPengujian
                            ? data.HasilPengujian
                            : "<i><b>Data tidak ditemukan.</b></i>"
                          : `
                          <div>
                          <p>Sample</p>
                          <table>
                              <thead>
                                  <th style="background-color: #3C64B1; color: white;">No</th>
                                  <th style="background-color: #3C64B1; color: white;">Nama File</th>
                                  <th style="background-color: #3C64B1; color: white;">Keterangan</th>
                                  <th style="background-color: #3C64B1; color: white;">Keterangan Kelemahan Kontrol</th>
                              </thead>
                              <tbody>
                                  <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                              </tr>
                              </tbody>
                          </table>
                          </div>
                          `
                      }
                      </body>
                  <div>
                  <br/>
                  <h3 style="font-weight: bold;margin-bottom:10px;">VII. KESIMPULAN</h3>
                  <div>
                  ${
                    params.type == "1"
                      ? data?.Kesimpulan
                        ? data.Kesimpulan
                        : "<i><b>Data tidak ditemukan.</b></i>"
                      : `<p> TIDAK EFEKTIF </p>`
                  }
                  <div>
                  </main>`
                      }
                      withNoHeader={true}
                    />
                  </div>
                );
              })}
              {!kkpaAllDetailIsLoading ? (
                limit < kkpaAllDetail?.data?.total_data ? (
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

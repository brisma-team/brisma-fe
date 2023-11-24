import { Breadcrumbs, PageTitle } from "@/components/atoms";
import useKKPAById from "@/data/catalog/useKKPAById";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { DocumentViewer, ProjectInfo } from "@/components/molecules/catalog";
import dateLocaleString from "@/helpers/dateLocaleString";
import { loadingSwal } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [data, setData] = useState({});
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, detail } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      kkpaId: detail.toUpperCase(),
      uri: id,
    });
  }, [router.isReady]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + params.uri },
    { name: "Riwayat KKPA", path: "/catalogue/ewp/" + params.uri + "/kkpa" },
    {
      name: "Dokumen KKPA",
      path: "/catalogue/ewp/" + params.uri + "/kkpa/" + params.kkpaId,
    },
  ];

  const { kkpaDetail, kkpaDetailIsLoading } = useKKPAById(
    params.year,
    params.type,
    params.kkpaId
  );

  useEffect(() => {
    if (kkpaDetail !== undefined) {
      setData(kkpaDetail.data.kkpa);
    }
  }, [kkpaDetail]);

  useEffect(() => {
    kkpaDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [kkpaDetailIsLoading]);
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"KKPA Dokumen"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={params.id}
          year={params.year}
          source={params.type}
        />
        <DocumentViewer
          documentTitle="KKPA"
          documentStyle={`table,
              th,
              td {
                border: 1px solid black;
                border-collapse: collapse;
                text-align: center;
                word-wrap:break-word;
                padding:10px;
              }
              th {
                background-color: #3c64b1;
                color: white;
                padding:10px;
              }
            `}
          documentHtml={
            kkpaDetailIsLoading
              ? `<p>Loading data...</p>`
              : `<header>
          <div  class="header">
            <div style="text-align: center">
              <h2 style="color: black">KERTAS KERJA PELAKSANAAN AUDIT</h2>
              <h2 style="color: black">
                ${data?.JenisAudit ? data?.JenisAudit.toUpperCase() : ""} 
              </h2>
              <h2 style="color: black">
              ${data?.AuditeeBranchName ? data?.AuditeeBranchName : ""}
              </h2>
              <h2 style="color: black">PERIODE AUDIT 
                ${data?.Year ? data?.Year : "**"}
              </h2>
            </div>
            <div style="text-align: center">
              <h3 style="color: black">
                Ref No: ${
                  data?.AuditeeBranchCode ? data?.AuditeeBranchCode : "**"
                } - ${
                  data?.MCAuditProjectCode ? data?.MCAuditProjectCode : "**"
                } - ${data?.RiskIssueCode ? data?.RiskIssueCode : "**"}
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
              data?.TeknikSamplingDesc ? data?.TeknikSamplingDesc : "**"
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
        />
      </div>
    </MainLayout>
  );
};

export default index;

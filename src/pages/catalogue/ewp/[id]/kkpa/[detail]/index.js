import { Breadcrumbs, PageTitle } from "@/components/atoms";
import useKKPAById from "@/data/catalog/useKKPAById";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DocumentViewer from "@/components/molecules/catalog/DocumentViewer";

const index = () => {
  const kkpaid = useRouter().query.detail;
  const projectid = useRouter().query.id;

  const [projectId, setProjectId] = useState("");
  const [kkpaId, setKkpaId] = useState("");
  const [data, setData] = useState({});

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + projectId },
    { name: "Riwayat KKPA", path: "/catalogue/ewp/" + projectId + "/kkpa" },
    {
      name: "Dokumen KKPA",
      path: "/catalogue/ewp/" + projectId + "/kkpa/" + kkpaId,
    },
  ];

  useEffect(() => {
    if (kkpaid !== undefined) setKkpaId(kkpaid);
  }, [kkpaid]);

  useEffect(() => {
    if (projectid !== undefined) setProjectId(projectid);
  }, [projectid]);

  const { kkpaDetail } = useKKPAById(
    projectId.split("x1c-")[2],
    projectId.split("x1c-")[0],
    kkpaId
  );

  useEffect(() => {
    if (kkpaDetail !== undefined) {
      console.log(kkpaDetail);
      setData(kkpaDetail.data.kkpa);
    }
  }, [kkpaDetail]);

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"KKPA Dokumen"} />
        </div>
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
            `<header>
          <div  class="header">
            <div style="text-align: center">
              <h2 style="color: black">KERTAS KERJA PELAKSANAAN AUDIT</h2>
              <h2 style="color: black">
                ${data?.JenisAudit ? data?.JenisAudit : "**"} AUDIT
              </h2>
              <h2 style="color: black">
              ${data?.AuditeeBranchName ? data?.AuditeeBranchName : "**"}
              </h2>
              <h2 style="color: black">PERIODE AUDIT 
                ${data?.Year ? data?.Year : "**"}
              </h2>
            </div>
            <div style="text-align: center">
              <h3 style="color: black">
                Ref No: ${
                  data?.AuditeeBranchCode ? data?.AuditeeBranchCode : "**"
                }-${
              data?.MCAuditProjectCode ? data?.MCAuditProjectCode : "**"
            }-${data?.RiskIssueCode ? data?.RiskIssueCode : "**"}
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
        <div><p>${data?.Activity ? data?.Activity : "**"}</p></div>
        <h3 style="font-weight: bold;margin-bottom:10px;">SUB AKTIVITAS</h3>
        <div><p>${data?.SubActivity ? data?.SubActivity : "**"}</p></div>
        <br/>
        <h3 style="font-weight: bold;margin-bottom:10px;">I. RISK ISSUE</h3>
        <div><p style="text-align: justify;">${
          data?.RiskIssueName ? data?.RiskIssueName : "**"
        }</p></div>
        <br/>
        <h3 style="font-weight: bold;margin-bottom:10px;">II. CONTROL</h3>
        <div>
        <h4>Keterangan</h4>
        <p>
        ${data?.PengujianControlDesc ? data?.PengujianControlDesc : "**"}
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
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{
                  item.mtd_stc_control_kritikalitas_kode
                }</td>
            </tr>
            </tbody>
        </table>
        </div>
        <br/>
        <h3 style="font-weight: bold;margin-bottom:10px;">III. PROGRAM AUDIT</h3>
        <div>
        ${data?.ProgramAudit ? data?.ProgramAudit : "**"}
        </div>
        <br/>
        <h3 style="font-weight: bold;margin-bottom:10px;">IV. RUANG LINGKUP</h3>
        <div>
        <table style="height: 160px; width: 100%; border-collapse: collapse;" border="0">
            <tbody>
            <tr>
            <td style="width: 33.3333%;">Sumber Informasi</td>
            <td style="width: 3.9593%;">:</td>
            <td style="width: 62.7073%;">${
              data?.SumberInformasi ? data?.SumberInformasi : "**"
            }</td>
            </tr>
            <tr>
            <td style="width: 33.3333%;">Periode Populasi</td>
            <td style="width: 3.9593%;">:</td>
            <td style="width: 62.7073%;">
              ${data?.PeriodeStart ? data?.PeriodeStart : "**"}` +
            " - " +
            `${data?.PeriodeEnd ? data?.PeriodeEnd : "**"}</td>
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
              data?.TeknikSamplingCode ? data?.TeknikSamplingCode : "**"
            }` +
            " - " +
            `${data?.TeknikSamplingDesc ? data?.TeknikSamplingDesc : "**"}</td>
            </tr>
            <tr>
            <td style="width: 33.3333%;">Keterangan</td>
            <td style="width: 3.9593%;">:</td>
            <td style="width: 62.7073%;">${
              data?.UraianSample ? data?.UraianSample : "**"
            }</td>
            </tr>
            </tbody>
            </table>
        </div>
        <br/>
        <h3 style="font-weight: bold;margin-bottom:10px;">V. KRITERIA</h3>
        <div>
        ${data?.KriteriaAudit ? data?.KriteriaAudit : "**"}
        <div>
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
                <div>
                    <p>{tipeSample}</p>
        <table>
            <thead>
                <th style="background-color: #3C64B1; color: white;">No</th>
                <th style="background-color: #3C64B1; color: white;">Nama File</th>
                <th style="background-color: #3C64B1; color: white;">{item}</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan Kelemahan Kontrol</th>
            </thead>
            <tbody>
                <tr>
                    <td>{idx + 1}</td>
                    <td>{item.nama_file}</td>
                    {keys
                      .map(
                        (val) => 
                        <td>{item.content[val]}</td>
                    
                      )
                      .join("")}
                    <td>{item.keterangan}</td>
                    <td>{item.kelemahan_control}</td>
                </tr>
            </tbody>
        </table>
                    <br/>
                    <br/>
                </div>
                <div>
                    <p>File</p>
        <table>
            <thead>
                <th style="background-color: #3C64B1; color: white;">No</th>
                <th style="background-color: #3C64B1; color: white;">Nama File</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan Kelemahan Kontrol</th>
            </thead>
            <tbody>
                <tr>
                <td>{idx + 1}</td>
                <td>{item.nama_file}</td>
                <td>{item.keterangan}</td>
                <td>{item.kelemahan_control}</td>
            </tr>
            </tbody>
        </table>
                    <br/>
                    <br/>
                </div>
                <div>
                    <p>{tipeSample}</p>
        <table>
            <thead>
                <th style="background-color: #3C64B1; color: white;">No</th>
                <th style="background-color: #3C64B1; color: white;">Nama File</th>
                <th style="background-color: #3C64B1; color: white;">{item}</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan Kelemahan Kontrol</th>
            </thead>
            <tbody>
                <tr>
                    <td>{idx + 1}</td>
                    <td>{item.nama_file}</td>
                    {keys
                      .map(
                        (val) => 
                        <td>{item.content[val]}</td>
                    
                      )
                      .join("")}
                    <td>{item.keterangan}</td>
                    <td>{item.kelemahan_control}</td>
                </tr>
            </tbody>
        </table>
                    <br/>
                    <br/>
                </div>
                <div>
                    <p>{tipeSample}</p>
        <table>
            <thead>
                <th style="background-color: #3C64B1; color: white;">No</th>
                <th style="background-color: #3C64B1; color: white;">Nama File</th>
                <th style="background-color: #3C64B1; color: white;">{item}</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan</th>
                <th style="background-color: #3C64B1; color: white;">Keterangan Kelemahan Kontrol</th>
            </thead>
            <tbody>
                <tr>
                    <td>{idx + 1}</td>
                    <td>{item.nama_file}</td>
                    {keys
                      .map(
                        (val) => 
                        <td>{item.content[val]}</td>
                    
                      )
                      .join("")}
                    <td>{item.keterangan}</td>
                    <td>{item.kelemahan_control}</td>
                </tr>
            </tbody>
        </table>
                    <br/>
                    <br/>
                </div>
            </body>
        <div>
        <br/>
        <h3 style="font-weight: bold;margin-bottom:10px;">VII. KESIMPULAN</h3>
        <div>
           <p> {data.kesimpulan} </p>
        <div>
        </main>`
          }
        />
      </div>
    </MainLayout>
  );
};

export default index;

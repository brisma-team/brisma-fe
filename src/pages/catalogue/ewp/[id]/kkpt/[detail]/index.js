import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import useKKPTById from "@/data/catalog/useKKPTById";
import { convertToRupiah, loadingSwal } from "@/helpers";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "@atlaskit/button";
import { ProjectInfo } from "@/components/molecules/catalog";

const index = () => {
  const router = useRouter();

  const [projectId, setProjectId] = useState("");
  const [kkptId, setKkptId] = useState("");
  const [data, setData] = useState({});
  const [penyebabList, setPenyebabList] = useState([]);
  const [rekomendasiList, setRekomendasiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + projectId },
    { name: "Riwayat KKPT", path: "/catalogue/ewp/" + projectId + "/kkpt" },
    {
      name: "Dokumen KKPT",
      path: "/catalogue/ewp/" + projectId + "/kkpt/" + kkptId,
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const { detail, id } = router.query;
    setKkptId(detail);
    setProjectId(id);
  }, [router.isReady]);

  const { kkptDetail } = useKKPTById(
    projectId !== undefined ? projectId.split("x1c-")[2] : null,
    projectId !== undefined ? projectId.split("x1c-")[0] : null,
    kkptId
  );

  useEffect(() => {
    if (kkptDetail !== undefined) {
      setData(kkptDetail.data.kkpt);
      setPenyebabList(kkptDetail.data.penyebab);
      setRekomendasiList(kkptDetail.data.rekomendasi);
      setIsLoading(false);
    }
  }, [kkptDetail]);

  useEffect(() => {
    if (!isLoading) loadingSwal("close");
  }, [isLoading]);

  const handlePrint = () => {
    window.frames["content-doc"].focus();
    window.frames["content-doc"].contentWindow.print();
  };

  let watermark = [];

  for (let index = 0; index < 140; index++) {
    watermark.push(`1151700023 - Aji M. Iqbal Fadhilah`);
  }

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"KKPT Dokumen"} />
        </div>
        <ProjectInfo
          type="ewp"
          id={projectId !== undefined ? projectId.split("x1c-")[1] : null}
        />
        <div className="flex mb-5 gap-2">
          <Button appearance="warning" onClick={handlePrint}>
            Generate to PDF
          </Button>
          <Button appearance="primary" isDisabled={true}>
            Generate to Docx
          </Button>
        </div>
        {/* Start Content */}
        <div className="w-[70rem] gap-6">
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
                          <header>
                            <div class="header">
                              <div style="text-align:center">
                                <h2 style="color:#000">KERTAS KERJA PENGEMBANGAN TEMUAN</h2>
                                <h2 style="color:#000">${data?.JenisAudit}</h2>
                                <h2 style="color:#000">${
                                  data?.AuditeeBranchName
                                }</h2>
                                <h2 style="color:#000">PERIODE AUDIT ${
                                  data?.Year
                                }</h2>
                              </div>
                              <div style="text-align:center">
                                <h3 style="color:#000">Ref No: ${
                                  data?.AuditeeBranchCode
                                } - ${data?.MCAuditProjectCode} - ${
                        data?.RiskIssueCode
                      } </h3>
                              </div>
                              <hr style="height:1px;border-width:0;color:gray;background-color:#000">
                              <div style="margin-top:10px">
                                <h3 lang="SV" dir="ltr">
                                  <strong>
                                    <u>JUDUL TEMUAN</u>
                                  </strong>
                                </h3>
                                <h3>${data?.KKPTTitle}</h3>
                              </div>
                            </div>
                          </header>
                          <main>
                            <section>
                              <article>
                                <p style="margin-bottom:20px;margin-top:10px">
                                  <strong>
                                    <u>KKPT INFO</u>
                                  </strong>
                                </p>
                                <div style="display:flex;margin-bottom:10px">
                                  <div style="width:100px">
                                    <b>Judul KKPT</b>
                                  </div>
                                  <div style="padding-left:10px">:</div>
                                  <div style="padding-left:10px">${
                                    data?.KKPTTitle
                                  }</div>
                                </div>
                                <div style="display:flex;margin-bottom:10px">
                                  <div style="width:100px">
                                    <b>Temuan Berulang</b>
                                  </div>
                                  <div style="padding-left:10px">:</div>
                                  <div style="padding-left:10px">${
                                    data?.TemuanBerulang === true
                                      ? "Ya"
                                      : "Tidak"
                                  }</div>
                                </div>
                                <div style="display:flex;margin-bottom:10px">
                                  <div style="width:100px">
                                    <b>Tipe Resiko</b>
                                  </div>
                                  <div style="padding-left:10px">:</div>
                                  <div style="padding-left:10px">${
                                    data?.RiskTypeName
                                  }</div>
                                </div>
                                <div style="display:flex;margin-bottom:10px">
                                  <div style="width:100px">
                                    <b>Focus Audit</b>
                                  </div>
                                  <div style="padding-left:10px">:</div>
                                  <div style="padding-left:10px">${
                                    data?.AuditFocusCode !== null &&
                                    data?.AuditFocusName !== null
                                      ? data?.AuditFocusCode +
                                        " - " +
                                        data?.AuditFocusName
                                      : ""
                                  }</div>
                                </div>
                                <div style="display:flex;margin-bottom:10px">
                                  <div style="width:100px">
                                    <b>Produk</b>
                                  </div>
                                  <div style="padding-left:10px">:</div>
                                  <div style="padding-left:10px"> ${
                                    data?.ProductCode ? data?.ProductCode : ""
                                  } </div>
                                </div>
                              </article>
                              <article><p>
                              <div style="display: flex;margin-bottom:10px;">
                                  <div style="width: 100px;"><b>Risk Issue</b></div>
                                  <div style="padding-left: 10px;">:</div>
                                  <div style="padding-left: 10px;">
                                  ${data?.RiskIssueName}
                                  </div>
                              </div>
                              <div style="display: flex;margin-bottom:10px;">
                                  <div style="width: 100px;"><b>Sub Major Proses</b></div>
                                  <div style="padding-left: 10px;">:</div>
                                  <div style="padding-left: 10px;"> 
                                  ${data?.SubMajor}
                                  </div>
                              </div>
                              <div style="display: flex;margin-bottom:10px;">
                                  <div style="width: 100px;"><b>Kategori Temuan</b></div>
                                  <div style="padding-left: 10px;">:</div>
                                  <div style="padding-left: 10px;">
                                  ${
                                    data?.KategoriTemuan == 1
                                      ? "Minor"
                                      : data?.KategoriTemuan == 2
                                      ? "Moderate"
                                      : "Major"
                                  }
                                  </div>
                              </div>
                              <div style="display: flex;margin-bottom:10px;">
                                  <div style="width: 100px;"><b>Auditee</b></div>
                                  <div style="padding-left: 10px;">:</div>
                                  <div style="padding-left: 10px;"> 
                                  ${
                                    data?.AuditeeBranchName
                                      ? data.AuditeeBranchName
                                      : "**"
                                  }
                                  </div>
                              </div>
                          </p></article>
                              <article><div style="margin-bottom: 40px;">
                              <p style="margin-bottom: 20px;"><strong>Kondisi</strong></p>
                              <div style="border-style: solid; padding: 4px;">${
                                data?.Condition ? data?.Condition : "**"
                              }</div>
                          </div>
                          <div style="margin-bottom: 40px;">
                              <p style="margin-bottom: 20px;"><strong>Kelemahan Pengendalian Intern</strong></p>
                              <div style="border-style: solid;  padding: 4px;">${
                                data?.KPI ? data?.KPI : "**"
                              }</div>
                          </div></article>
                              <article><div style="margin-bottom: 40px;">
                          <p lang="SV" dir="ltr"><strong><u>II. KRITERIA</u></strong></p>
                              <div style="border-style: solid;  padding: 4px;">${
                                data?.Criteria ? data?.Criteria : "**"
                              }</div>
                          </div></article>
                              <article><p lang="SV" dir="ltr"><strong><u>III. PENYEBAB</u></strong></p>
                              <table style="border-collapse: collapse; width: 100%; height: 90px;" border="1">
                                  <thead>
                                      <tr style="height: 18px;">
                                          <th style="height: 18px; text-align: center;background-color: #3C64B1; color: white;">Kode Penyebab</th>
                                          <th style="height: 18px; text-align: center;background-color: #3C64B1; color: white;">Nama Penyebab</th>
                                          <th style="height: 18px; text-align: center;background-color: #3C64B1; color: white;">Deskripsi Penyebab</th>
                                          <th style="height: 18px; text-align: center;background-color: #3C64B1; color: white;">PN</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  ${penyebabList.map((x) => {
                                    return `<tr style="height: 18px;">
                                        <td style="height: 18px;">
                                          ${x.PenyebabKode}
                                        </td>
                                        <td style="height: 18px;">
                                          ${x.PenyebabName}
                                        </td>
                                        <td style="height: 18px;">
                                          ${x.PenyebabDesc}
                                        </td>
                                        <td style="height: 18px;">
                                        ${x.PN.map(
                                          (person) => `<li>
                                            ${person.pn.pernr}
                                          </li>`
                                        )}
                                          
                                        </td>
                                      </tr>`;
                                  })}
                                      
                                  </tbody>
                              </table></article>
                              <article><p lang="SV" dir="ltr"><strong><u>IV. DAMPAK</u></strong></p>
                              <p><strong>A. Dampak Finansial</strong></p>
                              <p>Skor Dampak Finansial : ${
                                data?.FinancialImpact
                                  ? data.FinancialImpact
                                  : ""
                              }</p>
                              <p>Total Kerugian: ${
                                data?.FinancialLoss ? data.FinancialLoss : "-"
                              }</p>
                              <p>Gross: ${
                                data?.Gross
                                  ? "Rp. " + convertToRupiah(data?.Gross) + ",-"
                                  : ""
                              }</p>
                              <p>Table List Kerugian:</p>
                              <table style="border-collapse: collapse; width: 100%; height: 90px;" border="1">
                              <thead>
                              <tr style="height: 18px;">
                              <th style=" height: 18px; text-align: center;background-color: #3C64B1; color: white;">Jumlah Kerugian</th>
                              <th style=" height: 18px; text-align: center;background-color: #3C64B1; color: white;">jenis Kerugian</th>
                              <th style=" height: 18px; text-align: center;background-color: #3C64B1; color: white;">Keteranagn</th>
                              </tr>
                              </thead>
                             <tbody>
                             <tr style="height: 18px;">
                                    <td style=" height: 18px;">
                                    </td>
                                    <td style=" height: 18px;">
                                    </td>
                                    <td style=" height: 18px;">
                                    </td>
                               </tr>
                                
                             </tbody>
                             </table>
                              <p>&nbsp;</p>
                              <p><strong>B. Dampak Non Finansial</strong></p>
                              <p>Skor Dampak Non-Finansial : ${
                                data?.NonFinancialImpact
                                  ? data.NonFinancialImpact
                                  : ""
                              }</p>
                              <p>&nbsp;</p>
                              <p><strong>C. Kesimpulan Dampak</strong></p>
                              <p>Skor Dampak&nbsp; &nbsp;: ${
                                data?.Impact ? data?.Impact : "**"
                              }</p>
                              <p>Keterangan.&nbsp; &nbsp; &nbsp;: ${
                                data?.ImpactDescription
                                  ? data?.ImpactDescription
                                  : "**"
                              }</p></article>
                              <article><p lang="SV" dir="ltr"><strong><u>V. REKOMENDASI</u></strong></p>
                            <table style="border-collapse: collapse; width: 100%; height: 90px;" border="1">
                            <thead>
                            <tr style="height: 18px;">
                             <th style=" height: 18px; text-align: center;background-color: #3C64B1; color: white;">Tipe Rekomendasi</th>
                             <th style=" height: 18px; text-align: center;background-color: #3C64B1; color: white;">Branch Tujuan</th>
                             <th style=" height: 18px; text-align: center;background-color: #3C64B1; color: white;">Orgeh Tujuan</th>
                             <th style=" height: 18px; text-align: center;background-color: #3C64B1; color: white;">Keterangan</th>
                             </tr>
                            </thead>
                             <tbody>
                             ${rekomendasiList.map((item) => {
                               return `<tr style="height: 18px;">
                              <td style=" height: 18px;">${item.TipeRekomendasiName}</td>
                              <td style=" height: 18px;">${item.BranchTujuan}</td>
                              <td style=" height: 18px;">${item.OrgehTujuan}</td>
                              <td style=" height: 18px;">${item.ItemDesc}</td>
                            </tr>`;
                             })}
                               
                             </tbody>
                             </table>
                             </article>
                            </section>
                          </main>
                        </body>
                      </html>`}
                      style={{ minHeight: "29.7cm" }}
                    />
                    {/* <div
                      className="mt-4 p-10"
                      id="print-content"
                      dangerouslySetInnerHTML={{
                        __html: ,
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* End Content */}
      </div>
    </MainLayout>
  );
};

export default index;

import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import useCatalogEWPKKPTById from "@/data/catalog/useCatalogEWPKKPTById";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

const index = () => {
  const kkptid = useRouter().query.detail;
  const projectid = useRouter().query.id;
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    {
      name: "Pencarian Dokumen KKPT",
      path: "/catalogue/advance-filter/kkpt",
    },
    {
      name: "Detail Dokumen",
      path: "/catalogue/advance-filter/kkpt/1",
    },
  ];

  const [projectId, setProjectId] = useState("");
  const [kkptId, setKkptId] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (kkptid !== undefined) setKkptId(kkptid);
  }, [kkptid]);

  useEffect(() => {
    if (projectid !== undefined) setProjectId(projectid);
  }, [projectid]);

  const { kkptDetail } = useCatalogEWPKKPTById(
    projectId.split("x1c-")[2],
    projectId.split("x1c-")[0],
    kkptId
  );

  useEffect(() => {
    if (kkptDetail !== undefined) {
      console.log(kkptDetail);
      setData(kkptDetail.data.kkpt);
    }
  }, [kkptDetail]);

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen"} />
        </div>
        {/* Start Content */}
        <div className="w-[60rem] gap-6">
          <div>
            <Card>
              <div className="overflow-y-scroll my-2">
                <div className={``}>
                  <div className="h-full w-full">
                    <div
                      className="mt-4 p-10"
                      dangerouslySetInnerHTML={{
                        __html: `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width,initial-scale=1">
                            <style>
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
                          <body>
                            <header>
                              <div class="header">
                                <div style="text-align:center">
                                  <h2 style="color:#000">KERTAS KERJA PENGEMBANGAN TEMUAN</h2>
                                  <h2 style="color:#000">${data?.JenisAudit}</h2>
                                  <h2 style="color:#000">data.mapa_uker.ref_auditee_branch_name.toUpperCase()</h2>
                                  <h2 style="color:#000">PERIODE AUDIT ${data?.Year}</h2>
                                </div>
                                <div style="text-align:center">
                                  <h3 style="color:#000">Ref No: data.mapa_uker.ref_auditee_branch_kode - data.mapa_uker_mcr.ref_mcr_kode - ${data?.RiskIssueCode} </h3>
                                </div>
                                <hr style="height:1px;border-width:0;color:gray;background-color:#000">
                                <div>
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
                                  <p style="margin-bottom:20px">
                                    <strong>
                                      <u>KKPT INFO</u>
                                    </strong>
                                  </p>
                                  <div style="display:flex;margin-bottom:10px">
                                    <div style="width:100px">
                                      <b>Judul KKPT</b>
                                    </div>
                                    <div style="padding-left:10px">:</div>
                                    <div style="padding-left:10px">${data?.KKPTTitle}</div>
                                  </div>
                                  <div style="display:flex;margin-bottom:10px">
                                    <div style="width:100px">
                                      <b>Temuan Berulang</b>
                                    </div>
                                    <div style="padding-left:10px">:</div>
                                    <div style="padding-left:10px">value.kkpt.is_temuan_berulang === true ? "Ya" : value.kkpt.is_temuan_berulang === false ? "Tidak" : "" </div>
                                  </div>
                                  <div style="display:flex;margin-bottom:10px">
                                    <div style="width:100px">
                                      <b>Tipe Resiko</b>
                                    </div>
                                    <div style="padding-left:10px">:</div>
                                    <div style="padding-left:10px">value.kkpt.mtd_stc_risk_type_kode !== null ? value.kkpt.mtd_stc_risk_type_name : ""</div>
                                  </div>
                                  <div style="display:flex;margin-bottom:10px">
                                    <div style="width:100px">
                                      <b>Focus Audit</b>
                                    </div>
                                    <div style="padding-left:10px">:</div>
                                    <div style="padding-left:10px">value.kkpt.audit_focus_kode !== null ? value.kkpt.audit_focus_name : "" </div>
                                  </div>
                                  <div style="display:flex;margin-bottom:10px">
                                    <div style="width:100px">
                                      <b>Produk</b>
                                    </div>
                                    <div style="padding-left:10px">:</div>
                                    <div style="padding-left:10px"> value.kkpt.products_kode </div>
                                  </div>
                                </article>
                                -----------------------------------------------------
                                <article>worksheetDoc(data.kkpt)</article>
                                -----------------------------------------------------
                                <article><p>
                                <div style="display: flex;margin-bottom:10px;">
                                    <div style="width: 100px;"><b>Risk Issue</b></div>
                                    <div style="padding-left: 10px;">:</div>
                                    <div style="padding-left: 10px;">
                                      data.mapa_uker_mcr.ref_risk_issue_name
                                    </div>
                                </div>
                                <div style="display: flex;margin-bottom:10px;">
                                    <div style="width: 100px;"><b>Proses Major</b></div>
                                    <div style="padding-left: 10px;">:</div>
                                    <div style="padding-left: 10px;">
                                      data.sub_major_proses.mtd_major_proses.nama
                                    </div>
                                </div>
                                <div style="display: flex;margin-bottom:10px;">
                                    <div style="width: 100px;"><b>Sub Major Proses</b></div>
                                    <div style="padding-left: 10px;">:</div>
                                    <div style="padding-left: 10px;"> 
                                      data.sub_major_proses.nama
                                    </div>
                                </div>
                                <div style="display: flex;margin-bottom:10px;">
                                    <div style="width: 100px;"><b>Kategori Temuan</b></div>
                                    <div style="padding-left: 10px;">:</div>
                                    <div style="padding-left: 10px;">
                                      data.kkpt.kkpt_kategori.kategori_temuan_kode === "1"
                                        ? "Minor"
                                        : data.kkpt.kkpt_kategori.kategori_temuan_kode === "2"
                                        ? "Moderate"
                                        : data.kkpt.kkpt_kategori.kategori_temuan_kode === "3"
                                        ? "Major"
                                        : ""
                                    </div>
                                </div>
                                <div style="display: flex;margin-bottom:10px;">
                                    <div style="width: 100px;"><b>Auditee</b></div>
                                    <div style="padding-left: 10px;">:</div>
                                    <div style="padding-left: 10px;"> 
                                      data.mapa_uker.ref_auditee_branch_name
                                    </div>
                                </div>
                            </p></article>
                                -----------------------------------------------------
                                <article><div style="margin-bottom: 40px;">
                                <p style="margin-bottom: 20px;"><strong>Kondisi</strong></p>
                                <div style="border-style: solid; padding: 4px;">data.kondisi</div>
                            </div>
                            <div style="margin-bottom: 40px;">
                                <p style="margin-bottom: 20px;"><strong>Kelemahan Pengendalian Intern</strong></p>
                                <div style="border-style: solid;  padding: 4px;">data.kpi</div>
                            </div></article>
                                -----------------------------------------------------
                                <article><div style="margin-bottom: 40px;">
                            <p lang="SV" dir="ltr"><strong><u>II. KRITERIA</u></strong></p>
                                <div style="border-style: solid;  padding: 4px;">data.kriteria</div>
                            </div></article>
                                -----------------------------------------------------
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
                                        <tr style="height: 18px;">
                                    <td style="height: 18px;">item.penyebab_kode</td>
                                    <td style="height: 18px;">item.penyebab_name</td>
                                    <td style="height: 18px;">item.desc</td>
                                    <td style="height: 18px;">
                                        <li>item?.pn?.pernr + " - " + item?.pn?.sname</li>
                                    </td>
                                  </tr>
                                    </tbody>
                                </table></article>
                                -----------------------------------------------------
                                <article><p lang="SV" dir="ltr"><strong><u>IV. DAMPAK</u></strong></p>
                                <p><strong>A. Dampak Finansial</strong></p>
                                <p>Skor Dampak Finansial : skorDampak(
                                  value.financial_impact_kode
                                )</p>
                                <p>Total Kerugian: value.total_kerugian</p>
                                <p>Gross: value.gross</p>
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
                                      item.jumlah_kerugian</td>
                                    <td style=" height: 18px;">item.jenis_kerugian</td>
                                    <td style=" height: 18px;">item.keterangan</td>
                                  </tr>
                               </tbody>
                               </table>
                                <p>&nbsp;</p>
                                <p><strong>B. Dampak Non Finansial</strong></p>
                                <p>Skor Dampak Non-Finansial :</p>
                                <p>Skor Dampak item.nama: 
                                  skorDampak(
                                    skor.filter((e) => e.nonfinancial_type_impact_kode === item.kode)[0]
                                      .mtd_stc_impact_kode</p>
                                <p>&nbsp;</p>
                                <p><strong>C. Kesimpulan Dampak</strong></p>
                                <p>Skor Dampak&nbsp; &nbsp;: skorDampak(value.impact_kode</p>
                                <p>Keterangan.&nbsp; &nbsp; &nbsp;: value.desc_impact</p></article>
                                -----------------------------------------------------
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
                                 <tr style="height: 18px;">
                                        <td style=" height: 18px;">item.tipe_rekomendasi_name</td>
                                        <td style=" height: 18px;">item.ref_uker_tujuan_branch_name</td>
                                        <td style=" height: 18px;">item.ref_uker_tujuan_orgeh_name</td>
                                        <td style=" height: 18px;">item.desc</td>
                                      </tr>
                               </tbody>
                               </table>
                               </article>
                                -----------------------------------------------------
                              </section>
                            </main>
                          </body>
                        </html>`,
                      }}
                    />
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

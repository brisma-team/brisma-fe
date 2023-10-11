import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { useSHAById } from "@/data/catalog";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

const index = () => {
  const id = useRouter().query.id;

  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState({});

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: "/catalogue/ewp" },
    { name: "Daftar Dokumen", path: "/catalogue/ewp/" + selectedId },
    {
      name: "Dokumen LHA-SHA",
      path: "/catalogue/ewp/" + selectedId + "/lha/sha",
    },
  ];
  useEffect(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  const { shaDetail } = useSHAById(
    selectedId.split("x1c-")[2],
    selectedId.split("x1c-")[0],
    selectedId.split("x1c-")[1]
  );

  useEffect(() => {
    if (shaDetail !== undefined) {
      setData(shaDetail.data.sha);
    }
  }, [shaDetail]);
  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Dokumen LHA-SHA"} />
        </div>
        {/* Start Content */}
        <div className="w-[70rem] gap-6">
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
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            * {
                              margin: 0;
                              padding: 0;
                              box-sizing: border-box;
                            }
                            table,
                            th,
                            td {
                              border: 1px solid gray;
                              border-collapse: collapse;
                              // text-align: center;
                            }
                            th {
                              background-color: #3C64B1;
                              color: white;
                            }
                            html {
                              font-size: 16px;
                              font-family: Arial, Helvetica, sans-serif;
                              color: #373F41
                            }
                            /* body {
                                  padding: 5rem 10%;
                                } */
                            /* main {
                                  border: 1px solid black;
                                } */
                            article {
                              display: grid;
                              grid-template-columns: 25px 1fr;
                              margin-bottom: 1em;
                            }
                            article > p {
                              margin: 0;
                            }
                            section > h4 {
                              margin-bottom: 0.5em;
                            }
                            .container {
                                margin-left: 80px;
                                margin-right: 80px;
                            }
                            section > p {
                              line-height: 1.5;
                              text-align: justify;
                            }
                            header {
                              display: flex;
                              justify-content: center;
                              text-align: center;
                              margin-bottom: 1em;
                            }
                            .header {
                              position: relative;
                              align-items: center;
                              letter-spacing: 0.3px;
                              width: 445px
                            }
                            header img {
                              width: 100px;
                              height: 100px;
                              position: absolute;
                              left: 0;
                            }
                          </style>
                          <title>13.Lampiran Format Usulan MAPA Tahunan Kanins</title>
                        </head>
                        <body>
                          <main>
                            <header>
                              <div class="header">
                                <h3>KERTAS KERJA PENGEMBANGAN TEMUAN</h3>
                                <h3>{data.ewp.audit_type_name.toUpperCase()}</h3>
                                <h3>{
                                  data.mapa_uker.ref_auditee_branch_name
                                }</h3>
                                <h3>PERIODE {data.ewp.audit_year}</h3>
                                <div style="margin-top: 10px;">
                                </div>
                              </div>
                            </header>
                            <div class="container">
                            <div style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            border-top: 3px solid #222222; 
                            margin: 1.5rem 0 1rem 0"
                            >
                            </div>
                            <section>
                                <h3>JUDUL TEMUAN</h3>
                                <div style="background: #F4F5F4; height: 47px; width: 100%; margin-top: 5px; margin-bottom: 30px">
                                    <div style="
                                        position: relative;
                                        top: 15px;
                                        left: 15px
                                        "> {
                                          data ? data.kkpt.judul_kkpt : ""
                                        } </div>
                                </div>
                        
                                <h3>Informasi Samples</h3>
                                
                                <div style="margin-bottom: 20px;">
                                  {table_sample_csv}
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  {table_sample_file}
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  {table_sample_frd}
                                </div>
                    
                                <div style="margin-bottom: 30px;">
                                  {table_sample_monber}
                                </div>
                        
                                <div style="
                                        display: flex;
                                        flex-direction: row; 
                                        margin-top: 10px;   
                                    ">
                                    <h3>Risk Issue : </h3>
                                        <p style="
                                        font-family: 'Mulish';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 16px;
                                        /* or 222% */
                                        align-items: center;
                                        letter-spacing: 0.2px;
                                        
                                        /* Light / Gray dark */
                                        
                                        color: #737B7D;">{
                                          data.mapa_uker_mcr.ref_risk_issue_kode
                                        } - {
                          data.mapa_uker_mcr.ref_risk_issue_name
                        } </p>
                                </div>
                                 <div style="
                                        display: flex;
                                        flex-direction: row; 
                                        margin-top: 10px;   
                                    ">
                                    <h3>Proses Major : </h3>
                                        <p style="
                                        font-family: 'Mulish';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 16px;
                                        /* or 222% */
                                        align-items: center;
                                        letter-spacing: 0.2px;
                                        
                                        /* Light / Gray dark */
                                        
                                        color: #737B7D;">{
                                          data
                                            ? data.sub_major_proses
                                                .mtd_major_proses.nama
                                              ? data.sub_major_proses
                                                  .mtd_major_proses.nama
                                              : ""
                                            : ""
                                        }</p>
                                    
                                </div>
                                 <div style="
                                        display: flex;
                                        flex-direction: row; 
                                        margin-top: 10px;   
                                    ">
                                    <h3>Sub Major Proses : </h3>
                                        <p style="
                                        font-family: 'Mulish';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 16px;
                                        /* or 222% */
                                        align-items: center;
                                        letter-spacing: 0.2px;
                                        /* Light / Gray dark */
                                        color: #737B7D;">{
                                          data
                                            ? data.sub_major_proses.nama
                                              ? data.sub_major_proses.nama
                                              : ""
                                            : ""
                                        }</p>
                                    
                                </div>
                                 <div style="
                                        display: flex;
                                        flex-direction: row; 
                                        margin-top: 10px;   
                                    ">
                                    <h3>Kategori Temuan: </h3>
                                        <p style="
                                        font-family: 'Mulish';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 16px;
                                        /* or 222% */
                                        align-items: center;
                                        letter-spacing: 0.2px;
                                        
                                        /* Light / Gray dark */
                                        
                                        color: #737B7D;"> {
                                          data.kkpt.kkpt_kategori
                                            .adj_kategori_temuan_kode
                                            ? parseKategoriKode(
                                                data.kkpt.kkpt_kategori
                                                  .adj_kategori_temuan_kode
                                              )
                                            : parseKategoriKode(
                                                data.kkpt.kkpt_kategori
                                                  .kategori_temuan_kode
                                              )
                                        }</p>
                                    
                                </div >
                                <div style="
                                        display: flex;
                                        flex-direction: row; 
                                        margin-top: 10px;   
                                    ">
                                    <h3>Level Temuan: </h3>
                                        <p style="
                                        font-family: 'Mulish';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 16px;
                                        /* or 222% */
                                        align-items: center;
                                        letter-spacing: 0.2px;
                                        
                                        /* Light / Gray dark */
                                        
                                        color: #737B7D;"> {
                                          data.mapa_uker.tipe_uker
                                        }</p>
                                    
                                </div >
                                 <div style="
                                        display: flex;
                                        flex-direction: row; 
                                        margin-top: 10px;   
                                        margin-bottom: 40px;
                                    ">
                                    <h3>Auditee : </h3>
                                        <p style="
                                        font-family: 'Mulish';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 16px;
                                        /* or 222% */
                                        align-items: center;
                                        letter-spacing: 0.2px;
                                        
                                        /* Light / Gray dark */
                                        
                                        color: #737B7D;"> {
                                          data.mapa_uker.ref_auditee_branch_kode
                                        } [ {
                          data.mapa_uker.ref_auditee_orgeh_kode
                        } ] - {data.mapa_uker.ref_auditee_branch_name} </p>
                                    
                                </div>
                        
                            <div>
                                <h2 style="margin-bottom: 40px;">I. Kondisi</h2>
                                <div>
                                <h3>Kondisi</h3>
                                <div style="width: 100%; height: auto; margin-right: 4px; text-align: justify; margin-top: 10px; margin-bottom: 10px; color: #737B7D">
                                    <p style="
                                    font-family: 'Mulish';
                                    font-style: normal;
                                    font-weight: 400;
                                    font-size: 16px;
                                    /* or 222% */
                                    align-items: justify;
                                    letter-spacing: 0.2px;
                                    
                                    /* Light / Gray dark */
                                    
                                    color: #737B7D;"> {data.kkpt.kondisi}</p>
                                </div>
                                    
                                </div>
                        
                                 <div>
                                    <h3>Kelemahan Pengendalian Intern</h3>
                                    <div style="width: 100%; height: auto; margin-right: 4px; text-align: justify; margin-top: 10px; margin-bottom: 10px">
                                        <p style="
                                        font-family: 'Mulish';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 16px;
                                        /* or 222% */
                                        align-items: justify;
                                        letter-spacing: 0.2px;
                                        
                                        /* Light / Gray dark */
                                        
                                        color: #737B7D;"> {data.kkpt.kpi}</p>
                                    </div>
                                </div>
                        
                        
                                
                                <h2 style="margin-top: 40px;">II. Kriteria</h2>
                                <div style="width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D">
                                <p style="
                                font-family: 'Mulish';
                                font-style: normal;
                                font-weight: 400;
                                font-size: 16px;
                                /* or 222% */
                                align-items: justify;
                                letter-spacing: 0.2px;
                                
                                /* Light / Gray dark */
                                
                                color: #737B7D;">{data.kkpt.kriteria}</p>
                                </div>
                    
                    
                    
                        
                                <h2 style="margin-top: 40px;">III. Penyebab</h2>
                                <div style="
                                  font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                  position: relative; left: 15px;
                                ">
                                <ol type="a">
                                  {
                                    data.kkpt.kkpt_penyebab_list != null ||
                                    data.kkpt.kkpt_penyebab_list.length > 0
                                      ? data.kkpt.kkpt_penyebab_list.map(
                                          (value, index) =>
                                            <div style="
                                    letter-spacing: 0.4px;
                                    margin-bottom: 10px;
                                    ">
                                    <li>{value.penyebab_kode} - {
                                              value.penyebab_name
                                            }</li>
                                    <p>{value.desc}</p>
                                    <p>PN Terkait :</p>
                                      <div style="
                                      position: relative; left: 20px
                                      ">
                                      <ul>
                                      {value.pn.map(
                                        (childValue, index) =>
                                           <li>{childValue.pn} - {childValue.nama}</li>
                                      )}
                                      </ul>
                                      </div>
                                    </div>
                                        )
                                      : ""
                                  }
                                  
                                  </ol>
                                </div>
                        
                                <h2 style="margin-top: 40px;">IV. Dampak</h2>
                                <div style="
                                  font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                  position: relative; left: 15px;
                                ">
                                <ol type="a">
                                    <div style="
                                    letter-spacing: 0.4px;
                                    margin-bottom: 10px;
                                    ">
                                    <li>Dampak Financial</li>
                                    <p>List Kerugian :</p>
                                      <div style="
                                      position: relative; left: 20px
                                      ">
                                      <ul>
                                    
                                       {
                                         data.kkpt.kkpt_impact.list_kerugian !==
                                         null
                                           ? data.kkpt.kkpt_impact.list_kerugian.map(
                                               (value, index) =>
                                                 <li>{rupiah(
                                                   value.jumlah_kerugian
                                                 )} [ {
                                                   value.jenis_kerugian
                                                 } ]</li>
                                          <p>{value.keterangan}</p>
                                         
                                             )
                                           : ""
                                       }
                                    
                                      </ul>
                                      </div>
                                    <p>Total Kerugian : {rupiah(
                                      data.kkpt.kkpt_impact.total_kerugian
                                    )}</p>
                                    <p>Gross Profit/cost : {rupiah(
                                      data.kkpt.kkpt_impact.gross
                                    )}</p>
                                    <p style="
                                    font-weight: bold;
                                  ">Skor dampak finansial: {parseImpactKode(
                                    data.kkpt.kkpt_impact.financial_impact_kode
                                  )}</p>
                                    </div>
                                    <div style="
                                    letter-spacing: 0.4px;
                                    margin-bottom: 10px;
                                    ">
                                    <li>Dampak Non Financial</li>
                                      <div style="
                                      position: relative; left: 20px
                                      ">
                                      <ul>
                                    
                                       {
                                         data.kkpt.kkpt_impact
                                           .list_nonfinancial != null
                                           ? data.kkpt.kkpt_impact.list_nonfinancial.map(
                                               (value, index) =>
                                                 <li>{parseImpactType(
                                                   value.nonfinancial_type_impact_kode
                                                 )} : {parseImpactKode(
                                                   value.mtd_stc_impact_kode
                                                 )}</li>
                                             )
                                           : ""
                                       }
                                    
                                      </ul>
                                      </div>
                                      <p style="
                                      font-weight: bold;
                                    ">Skor Dampak non Financial : {parseImpactKode(
                                      data.kkpt.kkpt_impact
                                        .nonfinancial_impact_kode
                                    )}</p>
                                    </div>
                                    <div style="
                                    letter-spacing: 0.4px;
                                    margin-bottom: 10px;
                                    ">
                                    <li>Dampak</li>
                                      <p>{
                                        data.kkpt.kkpt_impact.desc_impact
                                          ? data.kkpt.kkpt_impact.desc_impact
                                          : " - "
                                      }</p>
                                      <p style="
                                        font-weight: bold;
                                      ">Skor Dampak : {parseImpactKode(
                                        data.kkpt.kkpt_impact.impact_kode
                                      )}</p>
                                    </div>
                                  </ol>
                                </div>
                    
                                <h2 style="margin-top: 40px;">V. Likelihood</h2>
                                <div style="
                                letter-spacing: 0.4px;
                                font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                position: relative; left: 15px;
                              ">
                              <p>Jumlah Populasi : {
                                data.kkpt.kkpt_likelihood.jumlah_populasi
                              }</p>
                              <p>Jumlah Sample : {
                                data.kkpt.kkpt_likelihood.jumlah_sample
                              }</p>
                              <p>Jumlah Sample Bermasalah : {
                                data.kkpt.kkpt_likelihood
                                  .jumlah_sample_bermasalah
                              }</p>
                              <p style="font-weight: bold;">Skor Likelihood : {parseLikelihoodKode(
                                data.kkpt.kkpt_likelihood.likelihood_kode
                              )}</p>
                              </div>
                    
                              <h2 style="margin-top: 40px;">VI. Kategori Temuan</h2>
                                <div style="
                                letter-spacing: 0.4px;
                                font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                position: relative; left: 15px;
                              ">
                              {
                                data.kkpt.kkpt_kategori.adj_by
                                  ? <p>Kategori : {parseKategoriKode(
                                      data.kkpt.kkpt_kategori
                                        .kategori_temuan_kode
                                    )}</p>
                                <br>
                                <p style="font-weight: bold;">Adjustment Kategori</p>
                                <p>Skor Dampak : {parseImpactKode(
                                  data.kkpt.kkpt_kategori.adj_impact_kode
                                )}</p>
                                <p>Skor Likelihood : {parseLikelihoodKode(
                                  data.kkpt.kkpt_kategori.adj_likelihood_kode
                                )}</p>
                                <p>Kategori : {parseKategoriKode(
                                  data.kkpt.kkpt_kategori
                                    .adj_kategori_temuan_kode
                                )}</p>
                                <p>Alasan : {
                                  data.kkpt.kkpt_kategori.adj_alasan
                                }</p>
                                
                                
                                  : <p>Kategori : {parseKategoriKode(
                                      data.kkpt.kkpt_kategori
                                        .kategori_temuan_kode
                                    )}</p>
                                <br>
                                
                                
                              }
                              </div>
                        
                                <h2 style="margin-top: 40px;">VII. Rekomendasi</h2>
                                <div style="
                                letter-spacing: 0.4px;
                                font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                position: relative; left: 15px;
                              ">
                                <ol type="a">
                                  {
                                    corrective
                                      ? <li>Corrective</li>
                                    <div style="position: relative; left: 20px">
                                    <ul>
                                    {
                                      corrective
                                        ? corrective.map((value, index) => {
                                            return <li>{value.desc}</li>
                                              <p>Uker Tujuan : {value.ref_uker_tujuan_branch_kode} [ {value.ref_uker_tujuan_orgeh}} - {value.ref_uker_tujuan_branch_name} ]</p>;
                                          })
                                        : ""
                                    }
                                    </ul>
                                    </div>
                                      : ""
                                  }
                                  {
                                    preventive
                                      ? <li>Preventive</li>
                                    <div style="position: relative; left: 20px">
                                    <ul>
                                    {
                                      preventive
                                        ? preventive.map((value, index) => {
                                            return <li>{value.desc}</li>
                                            <p>Uker Tujuan : {
                                              value.ref_uker_tujuan_branch_kode
                                            } [ {
                                              value.ref_uker_tujuan_orgeh
                                                ? value.ref_uker_tujuan_orgeh
                                                : ""
                                            } ] - {
                                              value.ref_uker_tujuan_branch_name
                                            } </p>;
                                          })
                                        : ""
                                    }
                                    </ul>
                                    </div>
                                      : ""
                                  }
                                </ol>
                                  
                              </div>
                    
                    
                              {
                                data.kkpt.tanggapan_manajemen
                                  ? 
                              <h2 style="margin-top: 40px;">VIII. Tanggapan Management</h2>
                              <div style="
                              letter-spacing: 0.4px;
                              font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                              position: relative; left: 15px;
                            ">
                            <p style="
                                font-family: 'Mulish';
                                font-style: normal;
                                font-weight: 400;
                                font-size: 16px;
                                /* or 222% */
                                align-items: justify;
                                letter-spacing: 0.2px;
                                
                                /* Light / Gray dark */
                                
                                color: #737B7D;">{data.kkpt.tanggapan_manajemen}</p>
                                
                            </div>
                                  : ""
                              }
                            </div>
                            </section>
                            <footer>
                              <div style="display: flex; justify-content: end; margin: 5rem 75px;">
                                <p></p>
                              </div>
                              <div style="display: grid; grid-template-columns: 1fr 1fr; margin: 0 75px;">
                              </div>
                            </footer>
                            </div>
                          </main>
                        </body>
                        </html>
                        `,
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

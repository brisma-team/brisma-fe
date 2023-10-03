import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { DocumentItems } from "@/components/molecules/pat/dokumen";
import { MainLayout } from "@/layouts";
import { useRef, useState, useEffect } from "react";

const index = () => {
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
  const nav = [
    { idx: 0, name: "Latar Belakang dan Tujuan", url: "ltb" },
    { idx: 1, name: "Sumber Informasi", url: "si" },
    { idx: 2, name: "Ruang Lingkup", url: "target_audit" },
    { idx: 3, name: "Jadwal Kegiatan", url: "jadwal_audit" },
    { idx: 4, name: "Jadwal Konsulting", url: "jadwal_sbp" },
    { idx: 5, name: "Jadwal Lainnya", url: "kegiatan_lain" },
    {
      idx: 6,
      name: "Susunan Tim Audit, Unit Kerja, Binaan & Auditor",
      url: "tim_audit",
    },
    { idx: 7, name: "Anggaran Audit", url: "anggaran" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeDivRef = useRef(null);
  const [hitEndpointCount, setHitEndpointCount] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const handleScrollHitEndpoint = () => {
    const parentContainer = document.querySelector(".parent");
    if (parentContainer) {
      const elements = Array.from(
        parentContainer.querySelectorAll(".page-container-a4")
      );
      const positions = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + parentContainer.scrollTop;
      });

      const viewportTop = parentContainer.scrollTop + 235;
      const viewportBottom = viewportTop + parentContainer.clientHeight + 235;

      let activeIndex = positions.findIndex(
        (position) => position >= viewportTop && position < viewportBottom
      );

      if (activeIndex === -1) {
        activeIndex = positions.findIndex(
          (position) => position >= viewportBottom
        );
      }

      setCurrentPosition(activeIndex);

      const isAtBottom =
        parentContainer.scrollTop + parentContainer.clientHeight ===
        parentContainer.scrollHeight;
      if (isAtBottom && hitEndpointCount < 7) {
        setHitEndpointCount((prev) => Math.min(prev + 1, 7));
      }
    }
  };

  useEffect(() => {
    if (activeDivRef.current) {
      activeDivRef.current.focus();
      const parentContainer = activeDivRef.current.closest(".parent");
      if (parentContainer) {
        const topOffset = activeDivRef.current.offsetTop - 220;
        parentContainer.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const addScrollListener = () => {
      const parentContainer = document.querySelector(".parent");
      if (parentContainer) {
        parentContainer.addEventListener("scroll", handleScrollHitEndpoint);
        return () => {
          parentContainer.removeEventListener(
            "scroll",
            handleScrollHitEndpoint
          );
        };
      }
    };

    const timeoutId = setTimeout(() => {
      addScrollListener();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);
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
                    {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">
                      <Viewer fileUrl={"/kkpt.pdf"} />
                    </Worker> */}
                    <div
                      className="mt-4"
                      dangerouslySetInnerHTML={{
                        __html: `
                        <!DOCTYPE html>
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
                          </style>
                          <title>13.Lampiran Format Usulan MAPA Tahunan Kanins</title>
                        </head>
                        <body>
                          <main>
                            <header>
                              <div class="header">
                                <h3>KERTAS KERJA PENGEMBANGAN TEMUAN</h3>
                                <h3>
                                Tipe Audit
                                </h3>
                                <h3>-** Tipe Audit</h3>
                                <h3>PERIODE -** 2022</h3>
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
                                        "> -** Judul KKPT </div>
                                </div>
                        
                                <h3>Informasi Samples</h3>
                                
                                <div style="margin-bottom: 20px;">
                                  -** Table Sample CSV
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  -** Table Sample File
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                  -** Table Sample FRD
                                </div>
                    
                                <div style="margin-bottom: 30px;">
                                  -** Table Sample Monber
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
                                        
                                        color: #737B7D;"> -** Risk Issue Code - -** Risk Issue Name </p>
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
                                        
                                        color: #737B7D;">-** Sub Major Process</p>
                                    
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
                                        color: #737B7D;"> -** Sub Major Process</p>
                                    
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
                                        
                                        color: #737B7D;"> -** Kategori </p>
                                    
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
                                        
                                        color: #737B7D;"> -** Tipe Uker</p>
                                    
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
                                        
                                        color: #737B7D;"> -** Auditee Branch Code [ -** Auditee Orgeh Code ] - -** Auditee Branch Name </p>
                                    
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
                                    
                                    color: #737B7D;"> -** KKPT Kondisi</p>
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
                                        
                                        color: #737B7D;"> -** KKPT KPI</p>
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
                                
                                color: #737B7D;"> -** KKPT Criteria</p>
                                </div>
                    
                    
                    
                        
                                <h2 style="margin-top: 40px;">III. Penyebab</h2>
                                <div style="
                                  font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                  position: relative; left: 15px;
                                ">
                                <ol type="a">
                                  -** Penyebab
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
                                    
                                       -** KKPT Impact
                                    
                                      </ul>
                                      </div>
                                    <p>Total Kerugian : -** Total Kerugian </p>
                                    <p>Gross Profit/cost : -** Gross </p>
                                    <p style="
                                    font-weight: bold;
                                  ">Skor dampak finansial: -** Skor Dampak</p>
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
                                    -** KKPT Non Financial
                                    
                                      </ul>
                                      </div>
                                      <p style="
                                      font-weight: bold;
                                    ">Skor Dampak non Financial : -** Skor Dampak Non Financial</p>
                                    </div>
                                    <div style="
                                    letter-spacing: 0.4px;
                                    margin-bottom: 10px;
                                    ">
                                    <li>Dampak</li>
                                      <p> -** Dampak</p>
                                      <p style="
                                        font-weight: bold;
                                      ">Skor Dampak : -** Skor Dampak</p>
                                    </div>
                                  </ol>
                                </div>
                    
                                <h2 style="margin-top: 40px;">V. Likelihood</h2>
                                <div style="
                                letter-spacing: 0.4px;
                                font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                position: relative; left: 15px;
                              ">
                              <p>Jumlah Populasi : -** Jumlah Populasi</p>
                              <p>Jumlah Sample : -** Jumlah Sample</p>
                              <p>Jumlah Sample Bermasalah : -** Jumlah Sample Bermasalah</p>
                              <p style="font-weight: bold;">Skor Likelihood : -** Skor Likelihood</p>
                              </div>
                    
                              <h2 style="margin-top: 40px;">VI. Kategori Temuan</h2>
                                <div style="
                                letter-spacing: 0.4px;
                                font-size: 16px; width: 100%; height: auto; margin-right: 4px; margin-top: 10px; margin-bottom: 20px; color: #737B7D;
                                position: relative; left: 15px;
                              ">
                              -** KKPT Kategori </p>
                                <br>
                                <p style="font-weight: bold;">Adjustment Kategori</p>
                                <p>Skor Dampak : -** Skor Dampak</p>
                                <p>Skor Likelihood : -** Skor Likelihood</p>
                                <p>Kategori : -** Kategori</p>
                                <p>Alasan : -** Alasan</p>
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
                                  <li>Corrective</li>
                                    <div style="position: relative; left: 20px">
                                    <ul>
                                    -** Uker Tujuan
                                    </ul>
                                    </div>
                                </ol>
                                  
                              </div>

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
                                
                                color: #737B7D;">-** Tanggapan</p>
                                
                            </div>
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

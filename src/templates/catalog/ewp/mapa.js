import { useMapaById } from "@/data/catalog";
import { useState, useEffect } from "react";
import dateLocaleString from "@/helpers/dateLocaleString";
import { convertToRupiah, loadingSwal } from "@/helpers";

const mapaHtml = (year, source, id) => {
  const [data, setData] = useState();
  const [anggaran, setAnggaran] = useState([]);
  const [apHeader, setApHeader] = useState();
  const [apBody, setApBody] = useState([]);
  const [mcr, setMcr] = useState([]);
  const { mapaDetail, mapaDetailIsLoading } = useMapaById(year, source, id);

  useEffect(() => {
    if (mapaDetail !== undefined) {
      setData(mapaDetail.data.mapa);
      setAnggaran(mapaDetail.data.anggaran);
      setApHeader(mapaDetail.data.ap_header);
      setApBody(mapaDetail.data.ap_body);
      setMcr(mapaDetail.data.mcr);
    }
    console.log(mapaDetail);
  }, [mapaDetail]);

  useEffect(() => {
    if (anggaran?.length > 0) {
      anggaran.map((d) => {
        console.log(d.TipeAnggaran);
      });
    }
  }, [anggaran]);

  useEffect(() => {
    mapaDetailIsLoading && data == undefined
      ? loadingSwal()
      : loadingSwal("close");
  }, [mapaDetailIsLoading]);

  return mapaDetailIsLoading
    ? `<p>Loading data...</p>`
    : `<main>
  <header>
    <img src="data:image/jpeg;base64,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" 
    alt="alt text" 
    />
    <div class="header">
      <h2>PT Bank Rakyat Indonesia (PERSERO), Tbk</h2>
      <h3 >AUDIT INTERN WILAYAH</h3>
    </div>
  </header>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      border-top: 3px solid #222222;
      border-bottom: 1px solid #222222;
      padding: 1rem 0;
      margin: 1.5rem 0 1rem 0;
    "
  >
    <h3>REGULER AUDIT</h3>
    <h3>MEMORANDUM ANALISIS PERENCANAAN AUDIT</h3>
  </div>
  <article>
    <h4>I. LATAR BELAKANG</h4>
    <section>
      ${data?.LatarBelakang ? data.LatarBelakang : "**"}
    </section>
  </article>
  <article>
    <h4>II. TUJUAN</h4>
    <section>
      ${data?.Tujuan ? data.Tujuan : "**"}
    </section>
  </article>
  <article>
    <h4>III. SUMBER INFORMASI</h4>
    <section>
      ${data?.SumberInformasi ? data.SumberInformasi : "**"}
    </section>
  </article>
  <article>
    <h4>IV. ANALISIS PERENCANAAN</h4>
    <section>
      <style>
        table {
          width: 100%;
          border: 1px solid;
        }
        th, td {
          border: 1px solid;
          padding: 15px;
        }
      </style>
  
      <figure class="table" style="margin-top: 30px;">
        <p><strong>Unit Kerja: </strong></p>
        <p>${apHeader?.UkerAuditee}</p>
        <p><strong>Aktivitas: </strong></p>
        <p>${apHeader?.AktivitasName}</p>
        <p><strong>Analisa Aktivitas: </strong></p>
        <p>${apHeader?.AnalisaAktivitas}</p>
              <p><strong>Ruang Lingkup Audit & Penugasan Audit:</strong></p>
                <table>
                    <thead>
                      <tr>
                        <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Manual Control</p></th>
                        <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Risk Issue</p></th>
                        <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Sample</p></th>
                        <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Auditor</p></th>
                      </tr>
                    </thead>
                    ${
                      apBody && apBody?.length > 0
                        ? apBody
                            .filter(
                              (data) =>
                                data?.ManualControlKode ||
                                data?.RiskIssueName ||
                                data?.JumlahSample ||
                                data?.Auditor
                            )
                            .map((data) => {
                              return `
                              <tbody>
                                <tr>
                                  <td>${data?.ManualControlKode}</td>
                                  <td>${data?.RiskIssueName} - ${
                                data?.RiskIssueName
                              }</td>
                                  <td>${
                                    data?.JumlahSample ? data.JumlahSample : 0
                                  }</td>
                                  <td>${
                                    data?.Auditor?.pn && data?.Auditor?.name
                                      ? data.Auditor.pn +
                                        " - " +
                                        data.Auditor.name
                                      : "Auditor tidak ditemukan"
                                  }</td>
                                </tr>
                              </tbody>`;
                            })
                            .join("")
                        : ""
                    }
            </table>
      </figure>
    </section>
  </article>
  <article>
    <h4>V. RINGKASAN DAFTAR PENUGASAN AUDIT</h4>
    <section>
      <div style="padding-left: 1rem; padding-right: 1rem">
        <style>
table {
border: 1px solid;
}
th, td {
border: 1px solid;
padding: 15px;
}
</style>
<figure class="table">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">No</p></th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Unit Kerja</p></th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Manual Control</p></th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Risk Issue Kode</p></th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Auditor</p></th>
            </tr>
        </thead>
        ${mcr
          ?.map((data, index) => {
            return `
              <tbody>
                <tr>
                    <td>${index + 1}</td>
                    <td>${data?.BranchName}</td>
                    <td>${
                      data?.SubActivityName + " - " + data?.SubMajorName
                    }</td>
                    <td>${data?.RiskIssueCode}</td>
                    <td>${
                      data?.Auditor?.pn && data?.Auditor?.name
                        ? data.Auditor.pn + " - " + data.Auditor.name
                        : "Auditor tidak ditemukan"
                    }</td>
                </tr>
            </tbody>
          `;
          })
          .join("")}
        
    </table>
</figure>
      </div>
    </section>
  </article>
  <article>
    <h4>VI. PROGRAM AUDIT</h4>
    <section>
      ${mcr
        ?.map((data) => {
          return `
    <strong><p>Manual Control: ${
      data.SubActivityName + " - " + data.SubMajorName
    }</p></strong>
    <table>
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Risk Issue</p></th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Program Audit</p></th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>
                      <strong>${data.RiskIssueCode}</strong>
                    </td>
                    <td>${data.ProgramAudit}</td>
                  </tr>
        </tbody>
    </table>
    <br/>
`;
        })
        .join("")}
    </section>
  </article>
  <article>
    <h4>VII. JADWAL AUDIT</h4>
    <section>
      <div style="padding-left: 1rem; padding-right: 1rem">
        <style>
table {
border: 1px solid;
}
th, td {
border: 1px solid;
padding: 15px;
}
</style>
<figure>
<table style="width: 100%;">
    <thead>
        <tr>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">No</p></th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Kegiatan</p></th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Start</p></th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">End</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><p style="text-align:center;">1</p></td>
            <td><p style="text-align:center;">Penyusunan MAPA</p</td>
            <td><p style="text-align:center;">${
              data?.PenyusunanMapaPlanStart
                ? dateLocaleString(data.PenyusunanMapaPlanStart.split(".")[0])
                : "**"
            }</p></td>
            <td><p style="text-align:center;">${
              data?.PenyusunanMapaPlanEnd
                ? dateLocaleString(data.PenyusunanMapaPlanEnd.split(".")[0])
                : "**"
            }</p></td>
        </tr>
        <tr>
            <td><p style="text-align:center;">2</p></td>
            <td><p style="text-align:center;">Entrance Meeting</p</td>
            <td><p style="text-align:center;">${
              data?.EntranceMeetingPlanStart
                ? dateLocaleString(data.EntranceMeetingPlanStart.split(".")[0])
                : "**"
            }</p></td>
            <td><p style="text-align:center;">${
              data?.EntranceMeetingPlanEnd
                ? dateLocaleString(data.EntranceMeetingPlanEnd.split(".")[0])
                : "**"
            }</p></td>
        </tr>
        <tr>
            <td><p style="text-align:center;">3</p></td>
            <td><p style="text-align:center;">Pelaksanaan Audit</p</td>
            <td><p style="text-align:center;">${
              data?.PelaksanaanAuditPlanStart
                ? dateLocaleString(data.PelaksanaanAuditPlanStart.split(".")[0])
                : "**"
            }</p></td>
            <td><p style="text-align:center;">${
              data?.PelaksanaanAuditPlanEnd
                ? dateLocaleString(data.PelaksanaanAuditPlanEnd.split(".")[0])
                : "**"
            }</p></td>
        </tr>
        <tr>
            <td><p style="text-align:center;">4</p></td>
            <td><p style="text-align:center;">Exit Meeting</p</td>
            <td><p style="text-align:center;">${
              data?.ExitMeetingPlanStart
                ? dateLocaleString(data.ExitMeetingPlanStart.split(".")[0])
                : "**"
            }</p></td>
            <td><p style="text-align:center;">${
              data?.ExitMeetingPlanEnd
                ? dateLocaleString(data.ExitMeetingPlanEnd.split(".")[0])
                : "**"
            }</p></td>
        </tr>
        <tr>
            <td><p style="text-align:center;">5</p></td>
            <td><p style="text-align:center;">Surat Hasil Audit</p</td>
            <td><p style="text-align:center;">${
              data?.PenyusunanLHAPlanStart
                ? dateLocaleString(data.PenyusunanLHAPlanStart.split(".")[0])
                : "**"
            }</p></td>
            <td><p style="text-align:center;">${
              data?.PenyusunanLHAPlanEnd
                ? dateLocaleString(data.PenyusunanLHAPlanEnd.split(".")[0])
                : "**"
            }</p></td>
        </tr>
        <tr>
            <td><p style="text-align:center;">6</p></td>
            <td><p style="text-align:center;">Wrapup Meeting</p</td>
            <td><p style="text-align:center;">${
              data?.WrapupMeetingPlanStart
                ? dateLocaleString(data.WrapupMeetingPlanStart.split(".")[0])
                : "**"
            }</p></td>
            <td><p style="text-align:center;">${
              data?.WrapupMeetingPlanEnd
                ? dateLocaleString(data.WrapupMeetingPlanEnd.split(".")[0])
                : "**"
            }</p></td>
        </tr>
    </tbody>
</table>
</figure>
      </div>
    </section>
  </article>
  <article>
    <h4>VIII. TIM AUDIT</h4>
    <section>
      <div style="padding-left: 1rem; padding-right: 1rem">
        
<table>
<tbody>
    <tr>
        <td><span style="font-size:20px"><strong>Manager Audit</strong></span></td>
        <td><span style="font-size:20px">:</span></td>
        <td><span style="font-size:20px">
        ${data?.ManajerAudit[0] ? data.ManajerAudit[0] : "**"} 
        - ${data?.ManajerAudit[1] ? data.ManajerAudit[1] : "**"} 
</span></td>
    </tr>
    <tr>
        <td><span style="font-size:20px"><strong>Ketua Tim Audit</strong></span></td>
        <td><span style="font-size:20px">:</span></td>
        <td><span style="font-size:20px">
        ${data?.KetuaTimAudit[0] ? data.KetuaTimAudit[0] : "**"}  - ${
        data?.KetuaTimAudit[1] ? data.KetuaTimAudit[1] : "**"
      } 
</span></td>
    </tr>
    <tr>
        <td><span style="font-size:20px"><strong>Anggota Tim Audit</strong></span></td>
        <td><span style="font-size:20px">:</span></td>
        <td><span style="font-size:20px">-</span></td>
        </tr>
</tbody>
</table>
      </div>
    </section>
  </article>
  <article>
    <h4>IX. ANGGARAN</h4>
    <section>
      <div style="padding-left: 1rem; padding-right: 1rem">
        
<figure class="table">
    <table style="width: 100%;" cellpadding="3" cellspacing="0">
        <thead>
            <tr>
                <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">No</p></th>
                <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">TipeAnggaran</p></th>
                <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">Tanggal</p></th>
                <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">Keterangan</p></th>
                <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">Jumlah</p></th>
            </tr>
        </thead>
        <tbody>
        
        ${
          anggaran?.length > 0 &&
          anggaran
            ?.map((x, index) => {
              return `<tr >
                <td style="text-align:center">
                  <p style="font-size:16px">${index + 1}</p>
                </td>
                <td>
                  <p style="font-size:16px">${x.TipeAnggaran}</p>
                </td>
                <td style="text-align:center">
                  <p style="font-size:16px">${
                    x.TanggalAnggaran
                      ? dateLocaleString(x.TanggalAnggaran.split(".")[0])
                      : "-"
                  }</p>
                </td>
                <td>
                  <p style="font-size:16px">${
                    x.DeskripsiAnggaran !== null ? x.DeskripsiAnggaran : "-"
                  }</p>
                </td>
                <td>
                  <p style="font-size:16px">Rp. ${convertToRupiah(
                    x.TotalAnggaran
                  )}</p>
                </td>
              </tr>`;
            })
            .join("")
        }
            
    <tr>
        <td colspan="4" rowspan="1"><p style="font-size:16px"><strong>Total</strong></p></td>
        <td><p style="font-size:16px">Rp. ${convertToRupiah(
          anggaran?.reduce((accumulator, currentValue) => {
            const num = Number(currentValue.TotalAnggaran); // Convert the string to a number
            if (!isNaN(num)) {
              return accumulator + num;
            }
            return accumulator;
          }, 0)
        )}</p></td>
    </tr>
        </tbody>
    </table>
</figure>
      </div>
    </section>
  </article>
  <footer>
    <div style="display: flex; justify-content: center">
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <p>Disiapkan Oleh,</p>
        
        <p>${data?.KetuaTimAudit[0] ? data.KetuaTimAudit[0] : "**"}  - ${
        data?.KetuaTimAudit[1] ? data.KetuaTimAudit[1] : "**"
      } </p>
        <h4>Ketua Tim Audit</h4>
      </div>
    </div>
    <br />
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <p>Mengetahui,</p>
        
        <p>${data?.ManajerAudit[0] ? data.ManajerAudit[0] : "**"}  - ${
        data?.ManajerAudit[1] ? data.ManajerAudit[1] : "**"
      } </p>
        <h4>Manager Audit</h4>
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <p>Menyetujui,</p>
        <p>${data?.PNKepalaUKA} - ${data?.NamaKepalaUKA}</p>
        <h4>Kepala Audit Intern</h4>
      </div>
    </div>
  </footer>
</main>`;
};

export default mapaHtml;

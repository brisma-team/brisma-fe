import { useState, useEffect, useMemo } from "react";
import useOverviewPAT from "@/data/catalog/pat/useOverviewPAT";
import { convertToRupiah, loadingSwal } from "@/helpers";

export const patHtml = (id) => {
  const [data, setData] = useState();
  const [jadwalKegiatan, setJadwalKegiatan] = useState([]);
  const [jadwalSBP, setJadwalSBP] = useState([]);
  const [jadwalLainnya, setJadwalLainnya] = useState([]);
  const [timAudit, setTimAudit] = useState([]);
  const [targetAudit, setTargetAudit] = useState(undefined);
  const [anggaran, setAnggaran] = useState(undefined);
  const [anggaranDinas, setAnggaranDinas] = useState(undefined);
  const { overviewDetail, overviewDetailIsLoading } = useOverviewPAT(id);

  useEffect(() => {
    if (overviewDetail !== undefined) {
      setData(overviewDetail.data.pat);
      setJadwalKegiatan(overviewDetail.data.jadwal_kegiatan);
      setJadwalSBP(overviewDetail.data.jadwal_sbp);
      setJadwalLainnya(overviewDetail.data.jadwal_lainnya);
      setTimAudit(overviewDetail.data.tim_audit);
      setTargetAudit(overviewDetail.data.target_audit);
      setAnggaran(overviewDetail.data.anggaran.totalAnggaran);
      setAnggaranDinas(overviewDetail.data.anggaran.allAnggaranDinas);
    }
  }, [overviewDetail]);

  useEffect(() => {
    overviewDetailIsLoading && data == undefined
      ? loadingSwal()
      : loadingSwal("close");
  }, [overviewDetailIsLoading]);

  const prepareDataAnggaran = (tahun, x) => {
    const total_dinas = x.allAnggaranDinas;
    const pemeliharaan = x.allAnggaranKegiatan.kategori.find(
      (k) => k.nama === "Pemeliharaan"
    );
    const kendaraan = pemeliharaan.sub_kategori.find(
      (k) => k.nama === "Kendaraan"
    ).amount;
    const mesin = pemeliharaan.sub_kategori.find(
      (k) => k.nama === "Mesin"
    ).amount;
    const inventaris = pemeliharaan.sub_kategori.find(
      (k) => k.nama === "Inventaris"
    ).amount;
    const total_pemeliharaan =
      Number(kendaraan) + Number(mesin) + Number(inventaris);

    const barangJasa = x.allAnggaranKegiatan.kategori.find(
      (k) => k.nama === "Barang & Jasa"
    );
    const porto = barangJasa.sub_kategori.find(
      (k) => k.nama === "Porto"
    ).amount;
    const percetakan = barangJasa.sub_kategori.find(
      (k) => k.nama === "Percetakan"
    ).amount;
    const atk = barangJasa.sub_kategori.find((k) => k.nama === "ATK").amount;
    const komputer = barangJasa.sub_kategori.find(
      (k) => k.nama === "Supply Komputer"
    ).amount;
    const total_barang_jasa =
      Number(porto) + Number(percetakan) + Number(atk) + Number(komputer);

    const umumLainnya = x.allAnggaranKegiatan.kategori.find(
      (k) => k.nama === "Umum lainnya"
    );
    const representasi = umumLainnya.sub_kategori.find(
      (k) => k.nama === "Representasi"
    ).amount;
    const rapat = umumLainnya.sub_kategori.find(
      (k) => k.nama === "Rapat"
    ).amount;
    const total_umum_lainnya = Number(representasi) + Number(rapat);

    const total =
      Number(total_barang_jasa) +
      Number(total_pemeliharaan) +
      Number(total_umum_lainnya) +
      Number(total_dinas);

    return {
      tahun,
      total_dinas,
      total_pemeliharaan,
      kendaraan,
      mesin,
      inventaris,
      total_barang_jasa,
      porto,
      percetakan,
      atk,
      komputer,
      total_umum_lainnya,
      representasi,
      rapat,
      total,
    };
  };
  const objectAnggaran = useMemo(() => {
    return anggaran !== undefined && prepareDataAnggaran(2023, anggaran);
  }, [anggaran]);

  return overviewDetailIsLoading
    ? `<p>Loading data...</p>`
    : `<main>
  <header>
    <img src="data:image/jpeg;base64,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" 
    alt="alt text" 
    />
    <div class="header">
      <h2>PT Bank Rakyat Indonesia (PERSERO), Tbk</h2>
      <h3 >${data?.uka_name.toUpperCase()}</h3>
    </div>
  </header>
  <div style="
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-top: 3px solid #222222; 
  border-bottom: 1px solid #222222; 
  padding: 1rem 0; 
  margin: 1.5rem 0 1rem 0"
  >
    <h3>PERENCANAAN TAHUN AUDIT (PAT)</h3>
    <div style="margin-top: 0.5rem;">
      <div style="width: 250px; display: grid; grid-template-columns: 125px 1fr;">
        <p style="justify-self: left;">Tahun</p>
        <P style="justify-self: left;">2023</P>
      </div>
    </div>
  </div>
  <article>
    <h4>A.</h4>
    <section>
      <h4>Latar Belakang dan Tujuan Audit</h4>
      ${data?.latar_belakang}
    </section>
  </article>
  <article>
    <h4>B.</h4>
    <section>
      <h4>Sumber Informasi</h4>
      ${data?.sumber_informasi}
    </section>
  </article>
  <article>
    <h4>C.</h4>
    <section>
      <h4>Ruang Lingkup Audit (Target Audit)</h4>
    <div class="sub_section_ruang_lingkup">
      <h4>1. </h4>
      <h4>Reguler Audit</h4>
      <div></div>
      <table>
          <tr>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">No</th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">Objek Audit</th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">Σ Uker</th>
              <th colspan="2" style="background-color: #3C64B1; color: white;">Target Audit</th>
          </tr>
          <tr>
              <th style="background-color: #3C64B1; color: white;">Σ Objek Audit</th>
              <th style="background-color: #3C64B1; color: white;">% Objek Audit</th>
          </tr>
        
        ${
          targetAudit?.existing !== undefined &&
          Object.keys(targetAudit?.existing)
            .map((k, idx) => {
              return `<tr>
            <td>
                ${idx + 1}
            </td>
            <td>
                <p style="text-align:center;">${k}</p>
            </td>
            <td>
                <p style="text-align:center;">${targetAudit.existing[k]}</p>
            </td>
            <td>
                <p style="text-align:center;">${
                  targetAudit.target.reguler[k] || 0
                }</p>
            </td>
            <td>
                <p style="text-align:center;">${
                  Number(targetAudit.target.reguler[k]) === 0 ||
                  targetAudit.target.reguler[k] === undefined
                    ? 0
                    : Math.round(
                        Number(
                          targetAudit.target.reguler[k] /
                            Number(targetAudit.existing[k]) || 0
                        ) * 100
                      )
                }%</p>
            </td>
            </tr>`;
            })
            .join("")
        }
        
    </table>
    </div>
    <div class="sub_section_ruang_lingkup">
    <h4>2. </h4>
    <h4>Special Audit</h4>
    <div></div>
    <table>
        <tr>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">No</th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">Objek Audit</th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">Σ Uker</th>
            <th colspan="2" style="background-color: #3C64B1; color: white;">Target Audit</th>
        </tr>
        <tr>
            <th style="background-color: #3C64B1; color: white;">Σ Objek Audit</th>
            <th style="background-color: #3C64B1; color: white;">% Objek Audit</th>
        </tr>
        ${
          targetAudit?.existing !== undefined &&
          Object.keys(targetAudit?.existing)
            .map((k, idx) => {
              return `<tr>
              <td>
                  ${idx + 1}
              </td>
              <td>
                  <p style="text-align:center;">${k}</p>
              </td>
              <td>
                  <p style="text-align:center;">${targetAudit.existing[k]}</p>
              </td>
              <td>
                  <p style="text-align:center;">${
                    targetAudit.target.special[k] || 0
                  }</p>
              </td>
              <td>
                  <p style="text-align:center;">${
                    Number(targetAudit.target.special[k]) === 0 ||
                    targetAudit.target.special[k] === undefined
                      ? 0
                      : Math.round(
                          Number(
                            targetAudit.target.special[k] /
                              Number(targetAudit.existing[k]) || 0
                          ) * 100
                        )
                  }%</p>
              </td>
          </tr>`;
            })
            .join("")
        }
  </table>
</div>
<div class="sub_section_ruang_lingkup">
    <h4>3.</h4>
    <h4>Tematik Audit</h4>
    <div></div>
    <table>
        <thead>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Tema
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Objek Audit/Uker
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
        ${
          targetAudit?.target.tematik !== undefined &&
          targetAudit?.target.tematik
            .map((t, idx) => {
              return `<tr>
                        <td>
                            <p style="text-align:center;">${idx + 1}</p>
                        </td>
                        <td>
                            <p style="text-align:center;">${
                              t.tema_audit_name
                            }</p>
                        </td>
                        <td>
                        ${t.uker
                          .map(
                            (u) =>
                              `<p style="text-align:center;">${u.uker_name}</p>`
                          )
                          .join("")}
                        </td>
                    </tr>`;
            })
            .join("")
        }
      </tbody>
  </table>
</div>
    </section>
  </article>
  <article>
    <h4>D.</h4>
    <section>
      <h4>Jadwal Kegiatan Audit</h4>
      <figure class="table">
  <table style="width: 100%;">
      <thead>
          <tr>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      No
                  </p>
                  <p style="text-align:center;">
                      &nbsp;
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Objek Audit
                  </p>
                  <p style="text-align:center;">
                      &nbsp;
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Tim Audit
                  </p>
                  <p style="text-align:center;">
                      &nbsp;
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Tipe Audit
                  </p>
                  <p style="text-align:center;">
                      &nbsp;
                  </p>
              </th>
              <th colspan="12" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Periode
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Objek Audit
                  </p>
                  <p style="text-align:center;">
                      &nbsp;
                  </p>
              </th>
          </tr>
          <tr>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jan
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Feb
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Mar
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Apr
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Mei
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jun
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jul
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Ags
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Sep
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Okt
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Nov
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Des
                  </p>
              </th>
          </tr>
      </thead>
      <tbody>
      ${jadwalKegiatan
        .map((d, index) => {
          return `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${
                      d.jadwal_audit.TipeAuditKode === "REG"
                        ? d.jadwal_audit.uker
                        : `${d.jadwal_audit.uker}, ...`
                    }
                </td>
                <td>
                    ${d.jadwal_audit.NamaTimAudit}
                </td>
                <td>
                    ${d.jadwal_audit.TipeAuditName}
                </td>
                ${[...Array(12)]
                  .map((_, idx) => {
                    return `<td ${
                      idx + 1 >=
                        new Date(d.jadwal_audit.JadwalMulai).getMonth() + 1 &&
                      idx + 1 <=
                        new Date(d.jadwal_audit.JadwalAkhir).getMonth() + 1 &&
                      'style="background-color:hsl(210, 75%, 60%);"'
                    }></td>`;
                  })
                  .join("")}
                <td>
                ${Object.keys(d.targetAudit.count_target_jenis_auditee.existing)
                  .map((k) => {
                    const existing =
                      d.targetAudit.count_target_jenis_auditee.existing[k] || 0;
                    const target =
                      d.targetAudit.count_target_jenis_auditee.target[k] || 0;
                    const percent = Math.round(
                      (Number(target) / Number(existing)) * 100
                    );
                    return `
                      <p>
                          ${k}: [${existing}][${target}] ${percent}%&nbsp;
                      </p>
                    `;
                  })
                  .join("")}
                </td>
            </tr>
            `;
        })
        .join("")}
        </tbody>
    </table>
    </figure>
    </section>
  </article>
  <article>
    <h4>E.</h4>
    <section>
      <h4>Jadwal SBP</h4>
      <figure class="table">
  <table style="width: 100%;">
      <thead>
          <tr>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      No
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Nama Kegiatan
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Uker SBP
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Pembicara
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      PIC
                  </p>
              </th>
              <th colspan="12" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Periode
                  </p>
              </th>
          </tr>
          <tr>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jan
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Feb
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Mar
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Apr
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Mei
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jun
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jul
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Ags
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Sep
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Okt
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Nov
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Des
                  </p>
              </th>
          </tr>
      </thead>
      ${jadwalSBP
        .map((d, index) => {
          return `<tbody>
                        <tr>
                        <td>${index + 1}</td>
                        <td>${d.NamaSBP}</td>
                        <td>${d.Orgeh ? d.Orgeh : "-"}</td>
                        <td>
                    ${d.Pembicara.map(
                      (p, i) => `<p key=${i}>${p[0] + " - " + p[1]}</p>`
                    ).join("")}
                        </td>
                        <td>
                            ${d.PenanggungJawab.map(
                              (p, i) => `<p key="${i}">${p[0]} - ${p[1]}</p>`
                            ).join("")}
                        </td>
                ${[...Array(12)]
                  .map(
                    (_, idx) =>
                      `<td ${
                        idx + 1 >= new Date(d.JadwalMulai).getMonth() + 1 &&
                        idx + 1 <= new Date(d.JadwalAkhir).getMonth() + 1 &&
                        'style="background-color:hsl(210, 75%, 60%);"'
                      }></td>`
                  )
                  .join("")}
                    </tr>
                    </tbody>`;
        })
        .join("")}
      
  </table>
</figure>
    </section>
  </article>
  <article>
    <h4>F.</h4>
    <section>
      <h4>Jadwal Lainnya</h4>
      <figure class="table">
  <table style="width: 100%;">
      <thead>
          <tr>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      No
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Nama Kegiatan
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Uker
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Anggota
                  </p>
              </th>
              <th colspan="12" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Periode
                  </p>
              </th>
          </tr>
          <tr>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jan
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Feb
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Mar
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Apr
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Mei
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jun
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Jul
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Ags
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Sep
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Okt
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Nov
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Des
                  </p>
              </th>
          </tr>
      </thead>
      
      ${jadwalLainnya
        .map((d, index) => {
          return `<tbody key=${index}>
                    <tr>
                    <td>${index + 1}</td>
                    <td>${d.NamaKegiatan}</td>
                    <td>${d.Orgeh}</td>
                    <td>
                    <p>${d.PN + " - " + d.Nama + " - " + d.Jabatan}</p>
                    </td>
                    ${[...Array(12)]
                      .map(
                        (_, idx) =>
                          `<td ${
                            idx + 1 >= new Date(d.JadwalMulai).getMonth() + 1 &&
                            idx + 1 <= new Date(d.JadwalAkhir).getMonth() + 1 &&
                            'style="background-color:hsl(210, 75%, 60%);"'
                          }></td>`
                      )
                      .join("")}
                </tr>
                </tbody>`;
        })
        .join("")}
  </table>
</figure>
    </section>
  </article>
  <article>
    <h4>G.</h4>
    <section>
      <h4>Susunan Tim Audit, Unit Kerja Binaan, & Auditor Pembina</h4>
      <figure class="table">
  <table style="width: 100%;">
      <thead>
          <tr>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      No
                  </p>
              </th>
              <th colspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Susunan Tim
                  </p>
              </th>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Uker Binaan &amp; Auditor Pembina
                  </p>
              </th>
          </tr>
          <tr>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Tim
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Nama
                  </p>
              </th>
          </tr>
      </thead>

      ${timAudit
        .map((d, index) => {
          return `
        <tbody key=${index}>
            <tr>
        <td>
            ${index + 1}
        </td>
        <td>
            ${d.NamaTim}
        </td>
        <td>
            <p>
                <b>MA</b>: ${d.MA.pn} - ${d.MA.nama}
            </p>
            <p>
                <b>KTA</b>: ${d.KTA.pn} - ${d.KTA.nama}
            </p>
            <p>
                <b>ATA</b>:&nbsp;
            </p>
            ${d.ATA.map((a) => `<p>${a[0]} - ${a[1]}</p>`).join("")}
        </td>
        <td style="text-align:left;">
            ${d.ATA.map(
              (a) =>
                `<p style="margin-bottom:5px;">
                ${a[0]} - ${a[1]}: ${a[2] ? a[2] : "-"}
                </p>`
            ).join("")}
        </td>
        </tr>
        </tbody>`;
        })
        .join("")}
  </table>
</figure>
    </section>
  </article>
  <article>
    <h4>H.</h4>
    <section>
      <h4>Anggaran Audit</h4>
      <p>
  <span style="color:rgb(0,0,0);">Rencana anggaran dalam rangka pelaksanaan audit untuk tahun ${convertToRupiah(
    objectAnggaran.tahun
  )}, adalah sbb:</span>
</p>
    1. Biaya Pemeliharaan <span style="color:rgb(0,0,0);">………………………………………………………………………. Rp ${convertToRupiah(
      objectAnggaran.total_pemeliharaan
    )}</span>
<p style="margin-left:40px;">
  a. Pemeliharaan dan Perbaikan AT kendaraan ....<span style="color:rgb(0,0,0);">…</span>... Rp ${convertToRupiah(
    objectAnggaran.kendaraan
  )}
</p>
<p style="margin-left:40px;">
  b. Pemeliharaan dan Perbaikan AT mesin-mesin ..<span style="color:rgb(0,0,0);">…</span> Rp ${convertToRupiah(
    objectAnggaran.mesin
  )}
</p>
<p style="margin-left:40px;">
  c. Pemeliharaan dan Perbaikan AT Inventaris .....<span style="color:rgb(0,0,0);">……</span> Rp ${convertToRupiah(
    objectAnggaran.inventaris
  )}
</p>
<p>
  2. Biaya Perjalanan Dinas Jabatan ....................................................<span style="color:rgb(0,0,0);">………</span>...... Rp ${convertToRupiah(
    objectAnggaran.total_dinas
  )}
</p>
<p>
  <span style="color:rgb(0,0,0);">3. Biaya Barang dan Jasa Pihak ke 3 ………………………………………………… Rp ${convertToRupiah(
    objectAnggaran.total_barang_jasa
  )}</span>
</p>
<p style="margin-left:40px;">
  a. Biaya Porto .......................................................<span style="color:rgb(0,0,0);">……………</span> Rp ${convertToRupiah(
    objectAnggaran.porto
  )}
</p>
<p style="margin-left:40px;">
  b. Biaya Percetakan ..............................................<span style="color:rgb(0,0,0);">…………</span>. Rp ${convertToRupiah(
    objectAnggaran.percetakan
  )}
</p>
<p style="margin-left:40px;">
  c. Biaya Alat Tulis Kantor (ATK) .........................<span style="color:rgb(0,0,0);">……</span>.<span style="color:rgb(0,0,0);">…</span>.. Rp ${convertToRupiah(
    objectAnggaran.atk
  )}
</p>
<p style="margin-left:40px;">
  d. Biaya Supplies Komputer ................................<span style="color:rgb(0,0,0);">…………</span> Rp ${convertToRupiah(
    objectAnggaran.komputer
  )}
</p>
<p>
  <span style="color:rgb(0,0,0);">4. Biaya Umum Lainnya .......................................................……………………….. Rp ${convertToRupiah(
    objectAnggaran.total_umum_lainnya
  )}</span>
</p>
<p style="margin-left:40px;">
  <span style="color:rgb(0,0,0);">a. Biaya Rapat .....................................................………….... Rp ${convertToRupiah(
    objectAnggaran.rapat
  )}</span>
</p>
<p style="margin-left:40px;">
  <span style="color:rgb(0,0,0);">b. Biaya Representasi ........................................................ Rp ${convertToRupiah(
    objectAnggaran.representasi
  )}</span>
</p>
<p style="margin-left:40px;">
  &nbsp;
</p>
<p>
  <span style="color:rgb(0,0,0);"><strong>Total Biaya …………………………………………………………………… Rp ${convertToRupiah(
    objectAnggaran.total
  )}</strong></span>
</p>
<p>
  <span class="text-small" style="color:rgb(0,0,0);">(Rincian Biaya Perjalanan Dinas Jabatan terlampir)</span>
</p>
      <p style="font-size: 0.8rem;">(Rincian Biaya Perjalanan Dinas Jabatan terlampir)</p>
    </section>
  </article>
  <article>
    <div></div>
    <section>
      <h4 style="text-align: center; margin-top: 1rem;">Biaya Perjalanan Dinas Jabatan</h4>
      <figure class="table">
    <table style="table-layout: fixed; width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Kegiatan
                    </p>
                </th>
                <th colspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Peserta
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Tempat/Kegiatan Auditee
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Bulan Kegiatan
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Lama Kegiatan
                    </p>
                </th>
                <th colspan="5" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Biaya Perjalanan Dinas Jabatan
                    </p>
                </th>
            </tr>
            <tr>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Jabatan / Golongan / Pangkat
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Jumlah Orang
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Tiket PP
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Transport Lokal
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Uang Harian
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Biaya Akomodasi
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Total Biaya
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
        ${
          anggaranDinas !== undefined &&
          anggaranDinas
            .map((d, idx) => {
              const length = Object.keys(d.Jabatan).length;
              Object.keys(d.Jabatan)
                .map((k, i) => {
                  const currJabatan = d.Jabatan[k];
                  return `
                <tr>
                    ${
                      i === 0
                        ? `
                        <td rowspan="${d.Jabatan.length}">
                          <p style="text-align:center; word-wrap: break-word;">
                              ${idx + 1}
                          </p>
                        </td>
                        <td rowspan="${d.Jabatan.length}">
                          <p style="text-align:center; word-wrap: break-word;">
                              ${d.nama_kegiatan}
                          </p>
                        </td>
                      `
                        : ""
                    }
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${k}
                      </p>
                    </td>
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${currJabatan.jumlah}
                      </p>
                    </td>
                    ${
                      i === 0
                        ? `
                      <td rowspan="${d.Jabatan.length}">
                        <p style="text-align:center; word-wrap: break-word;">
                            ${d.tempat_kegiatan}
                        </p>
                      </td>
                      <td rowspan="${length}">
                        <p style="text-align:center; word-wrap: break-word;">
                            ${d.bulan}
                        </p>
                      </td>
                      `
                        : ""
                    }
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${currJabatan.lama_kegiatan} hari
                      </p>
                    </td>
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${convertToRupiah(currJabatan.biaya_tiket)}
                      </p>
                    </td>
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${convertToRupiah(currJabatan.biaya_transport)}
                      </p>
                    </td>
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${convertToRupiah(currJabatan.biaya_perjalanan)}
                      </p>
                    </td>
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${convertToRupiah(currJabatan.biaya_akomodasi)}
                      </p>
                    </td>
                    <td>
                      <p style="text-align:center; word-wrap: break-word;">
                          ${convertToRupiah(currJabatan.total_biaya)}
                      </p>
                    </td>
                </tr>
              `;
                })
                .join("");
            })
            .join("")
        }
      </tbody>
  </table>
</figure>
    </section>
  </article>
  <article>
    <div></div>
    <section>
      <h4 style="text-align: center;">Biaya Lainnya</h4>
      <figure class="table">
  <table style="width: 100%;">
      <thead>
          <tr>
              <th rowspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      No
                  </p>
              </th>
              <th colspan="3" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Biaya Pemeliharaan &amp; Perbaikan AT
                  </p>
              </th>
              <th colspan="4" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Biaya Barang &amp; Jasa Pihak Ke III
                  </p>
              </th>
              <th colspan="2" style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Biaya Umum Lainnya
                  </p>
              </th>
          </tr>
          <tr>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Kendaraan
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Mesin
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Inventaris
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Porto
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Percetakan
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      ATK
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Supplies Komputer
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Representasi
                  </p>
              </th>
              <th style="background-color: #3C64B1; color: white;">
                  <p style="text-align:center;">
                      Rapat
                  </p>
              </th>
          </tr>
      </thead>
      <tbody>
          <tr>
        <td><p style="text-align:center;">{idx + 1}</p></td>
        {d.kategori
          .map((k) =>
            k.sub_kategori
              .map(
                (s) =>
                  <td>
                    <p style="text-align:center;">
                      {numberWithCommas(s.amount[0].amount)}
                    </p>
                  </td>,
              )
              .join(""),
          )
          .join("")}
    </tr>
      </tbody>
  </table>
</figure>
    </section>
  </article>
  <footer>
    <div style="display: flex; justify-content: end; margin: 5rem 75px;">
      <p>{tanggal}</p>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; margin: 0 75px;">
      {
        !signers
          ? ""
          : signers
              .map(
                (s) =>
                  
                    <div style="{
                      signers.length < 2 ? "grid-column: 2;" : ""
                    } display: flex; flex-direction: column; justify-content: center; align-items: center;">
                      <div style="margin-bottom: 1rem;">
                        {qr.imageSync({s.from.pn} - {s.from.nama}, {
                          type: "svg",
                          size: 3,
                        })}
                      </div>
                      <p>
                        {s.from.pn}
                      </p>
                      <p>
                        {s.from.nama}
                      </p>
                      <h4>{s.from.jabatan}</h4>
                    </div>
                  
              )
              .join("")
      }
    </div>
  </footer>
</main>
`;
};

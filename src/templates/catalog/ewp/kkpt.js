import { useState, useEffect } from "react";
import { useKKPTById } from "@/data/catalog";
import { convertToRupiah, loadingSwal } from "@/helpers";
const kkptHtml = (year, source, id) => {
  const [data, setData] = useState();
  const [penyebabList, setPenyebabList] = useState([]);
  const [rekomendasiList, setRekomendasiList] = useState([]);

  const { kkptDetail, kkptDetailIsLoading } = useKKPTById(year, source, id);

  useEffect(() => {
    if (kkptDetail !== undefined) {
      setData(kkptDetail.data.kkpt);
      setPenyebabList(kkptDetail.data.penyebab);
      setRekomendasiList(kkptDetail.data.rekomendasi);
    }
  }, [kkptDetail]);

  useEffect(() => {
    kkptDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [kkptDetailIsLoading]);

  const convertSkorDampak = (skorDampak) => {
    if (skorDampak == "ST" || skorDampak == 5) {
      return "Sangat Tinggi (ST)";
    } else if (skorDampak == "T" || skorDampak == 4) {
      return "Tinggi (T)";
    } else if (skorDampak == "SD" || skorDampak == 3) {
      return "Sedang (SD)";
    } else if (skorDampak == "R" || skorDampak == 2) {
      return "Rendah (R)";
    } else if (skorDampak == "SR" || skorDampak == 1) {
      return "Sangat Rendah (SR)";
    } else {
      return "Tidak ada skor dampak.";
    }
  };

  return kkptDetailIsLoading
    ? `<p>Loading data...</p>`
    : `
  <main>
  <header>
    <div class="header">
      <div style="text-align:center">
        <h2 style="color:#000">KERTAS KERJA PENGEMBANGAN TEMUAN</h2>
        <h2 style="color:#000">${
          data?.JenisAudit ? data.JenisAudit.toUpperCase() : ""
        }</h2>
        <h2 style="color:#000">${data?.AuditeeBranchName}</h2>
        <h2 style="color:#000">PERIODE AUDIT ${data?.Year}</h2>
      </div>
      <div style="text-align:center">
        <h3 style="color:#000">Ref No: ${data?.AuditeeBranchCode} - ${
        data?.MCAuditProjectCode
      } - ${data?.RiskIssueCode} </h3>
      </div>
      <hr style="height:1px;border-width:0;color:gray;background-color:#000">
      <div style="margin-top:10px">
        <h3 lang="SV" dir="ltr">
          <strong>
            <u>JUDUL TEMUAN</u>
          </strong>
        </h3>
        <h3>${
          data?.KKPTTitle ? data.KKPTTitle : "Judul KKPT tidak ditemukan"
        }</h3>
      </div>
    </div>
  </header>
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
            data?.KKPTTitle ? data.KKPTTitle : "Judul KKPT tidak ditemukan"
          }</div>
        </div>
        <div style="display:flex;margin-bottom:10px">
          <div style="width:100px">
            <b>Temuan Berulang</b>
          </div>
          <div style="padding-left:10px">:</div>
          <div style="padding-left:10px">${
            data?.TemuanBerulang == true || data?.TemuanBerulang == 1
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
            data?.RiskTypeName ? data.RiskTypeName : "-"
          }</div>
        </div>
        <div style="display:flex;margin-bottom:10px">
          <div style="width:100px">
            <b>Focus Audit</b>
          </div>
          <div style="padding-left:10px">:</div>
          <div style="padding-left:10px">${
            data?.AuditFocusCode !== null && data?.AuditFocusName !== null
              ? data?.AuditFocusCode + " - " + data?.AuditFocusName
              : ""
          }</div>
        </div>
        <div style="display:flex;margin-bottom:10px">
          <div style="width:100px">
            <b>Produk</b>
          </div>
          <div style="padding-left:10px">:</div>
          <div style="padding-left:10px"> ${
            data?.ProductCode.length > 0 ? data.ProductName : "-"
          } </div>
        </div>
      </article>
      <article><p>
      <div style="display: flex;margin-bottom:10px;">
          <div style="width: 100px;"><b>Risk Issue</b></div>
          <div style="padding-left: 10px;">:</div>
          <div style="padding-left: 10px;">
          ${data?.RiskIssueName ? data.RiskIssueName : "-"}
          </div>
      </div>
      <div style="display: flex;margin-bottom:10px;">
          <div style="width: 100px;"><b>Sub Major Proses</b></div>
          <div style="padding-left: 10px;">:</div>
          <div style="padding-left: 10px;"> 
          ${data?.SubMajor ? data.SubMajor : "-"}
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
          ${data?.AuditeeBranchName ? data.AuditeeBranchName : "-"}
          </div>
      </div>
  </p></article>
      <article><div style="margin-bottom: 40px;">
      <p style="margin-bottom: 20px;"><strong>Kondisi</strong></p>
      <div style="border-style: solid; padding: 4px;">${
        data?.Condition ? data?.Condition : "-"
      }</div>
  </div>
  <div style="margin-bottom: 40px;">
      <p style="margin-bottom: 20px;"><strong>Kelemahan Pengendalian Intern</strong></p>
      <div style="border-style: solid;  padding: 4px;">${
        data?.KPI ? data?.KPI : "-"
      }</div>
  </div></article>
      <article><div style="margin-bottom: 40px;">
  <p lang="SV" dir="ltr"><strong><u>II. KRITERIA</u></strong></p>
      <div style="border-style: solid;  padding: 4px;">${
        data?.Criteria ? data?.Criteria : "-"
      }</div>
  </div></article>
      <article><br><br><br><br><p lang="SV" dir="ltr"><strong><u>III. PENYEBAB</u></strong></p>
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
          ${
            source == 2
              ? penyebabList
                  .map((x) => {
                    return `<tr style="height: 18px;text-align: center">
                <td style="height: 18px;">
                  ${x.PenyebabKode}
                </td>
                <td style="height: 18px;">
                  ${x.PenyebabName}
                </td>
                <td style="height: 18px;">
                  ${x.PenyebabDesc}
                </td>
                <td style="height: 18px;width:100px">
                ${
                  source == "2" || source == 2
                    ? x?.PN?.map(
                        (person) => `<li>
                    ${person.pn.pernr ? person.pn.pernr : "-"}
                  </li>`
                      ).join(" ")
                    : "-"
                }
                  
                </td>
              </tr>`;
                  })
                  .join(" ")
              : penyebabList
                  .map((x) => {
                    return `<tr style="height: 18px;text-align: center">
              <td style="height: 18px;">
                ${x.PenyebabKode1}
              </td>
              <td style="height: 18px;">
                ${x.PenyebabName1}
              </td>
              <td style="height: 18px;">
                ${x.PenyebabDesc}
              </td>
              <td style="height: 18px;width:100px">-</td>
            </tr><tr style="height: 18px;text-align: center">
            <td style="height: 18px;">
              ${x.PenyebabKode2}
            </td>
            <td style="height: 18px;">
              ${x.PenyebabName2}
            </td>
            <td style="height: 18px;">
              ${x.PenyebabDesc}
            </td>
            <td style="height: 18px;width:100px">-</td>
          </tr><tr style="height: 18px;text-align: center">
          <td style="height: 18px;">
            ${x.PenyebabKode3}
          </td>
          <td style="height: 18px;">
            ${x.PenyebabName3}
          </td>
          <td style="height: 18px;">
            ${x.PenyebabDesc}
          </td>
          <td style="height: 18px;width:100px">-</td>
        </tr>`;
                  })
                  .join(" ")
          }
              
          </tbody>
      </table></article>
      <article><p lang="SV" dir="ltr"><strong><u>IV. DAMPAK</u></strong></p>
      <p><strong>A. Dampak Finansial</strong></p>
      <p>Skor Dampak Finansial : ${
        data?.FinancialImpact == ""
          ? convertSkorDampak(data.FinancialImpact)
          : "<i><b>Tidak ada skor.</b></i>"
      }</p>
      <p>Total Kerugian: ${
        "Rp. " + convertToRupiah(data?.FinancialLoss) + ",-" || "-"
      }</p>
      <p>Gross: ${"Rp. " + convertToRupiah(data?.Gross) + ",-" || "-"}</p>
      <p>&nbsp;</p>
      <p><strong>B. Dampak Non Finansial</strong></p>
      <p>Skor Dampak Non-Finansial : ${
        data?.NonFinancialImpact
          ? convertSkorDampak(data.NonFinancialImpact)
          : "<i><b>Tidak ada skor.</b></i>"
      }</p>
      <p>&nbsp;</p>
      <p><strong>C. Kesimpulan Dampak</strong></p>
      <p>Skor Dampak&nbsp; &nbsp;: ${
        data?.Impact
          ? convertSkorDampak(data?.Impact)
          : "<i><b>Tidak ada skor.</b></i>"
      }</p>
      <p>Keterangan&nbsp; &nbsp; &nbsp; &nbsp;: ${
        data?.ImpactDescription
          ? data?.ImpactDescription
          : "<i><b>Tidak ada Deskripsi.</b></i>"
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
     ${
       rekomendasiList?.length > 0
         ? rekomendasiList
             .map((item) => {
               return `<tr style="height: 18px;">
      <td style=" height: 18px;text-align: center">${
        item.TipeRekomendasiName || "-"
      }</td>
      <td style=" height: 18px;text-align: center">${
        item.BranchTujuan || "-"
      }</td>
      <td style=" height: 18px;text-align: center">${
        item.OrgehTujuan || "-"
      }</td>
      <td style=" height: 18px;">${item.ItemDesc || "-"}</td>
    </tr>`;
             })
             .join(" ")
         : `<tr><td colspan="4" style="height: 18px;text-align: center">Data tidak ditemukan</td></tr>`
     }
       
     </tbody>
     </table>
     </article>
    </section>
  </main>
    `;
};

export default kkptHtml;

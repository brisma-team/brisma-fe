import useAddendumMAPAById from "@/data/catalog/ewp/useAddendumMAPAById";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";

const addendumMapaHtml = (year, id) => {
  const [data, setData] = useState();
  const { addendumMAPAData, addendumMAPADataIsLoading } =
    useAddendumMAPAById(id);

  useEffect(() => {
    if (addendumMAPAData !== undefined) {
      setData(addendumMAPAData.data.data_addendum);
    }
  }, [addendumMAPAData]);

  useEffect(() => {
    addendumMAPADataIsLoading ? loadingSwal() : loadingSwal("close");
  }, [addendumMAPADataIsLoading]);

  const remapPart = (part, part_name, detail_part) => {
    switch (part) {
      case "analisis_perencanaan_mcr":
        return `<div><b>Risk Issue</b></div>
            <br />
            <div><b>Uker:</b> ${
              detail_part?.ref_auditee_branch_kode
                ? detail_part?.ref_auditee_branch_kode
                : "-"
            } / ${
          detail_part?.ref_auditee_orgeh_kode
            ? detail_part?.ref_auditee_orgeh_kode
            : "-"
        } - ${detail_part?.ref_auditee_branch_name}</div>
            <div><b>Aktivitas:</b> ${
              detail_part?.ref_aktivitas_name
                ? detail_part?.ref_aktivitas_name
                : "-"
            }</div>
            <div><b>Sub Aktivitas:</b> ${
              detail_part?.mcr[0]?.ref_sub_aktivitas_name
                ? detail_part.mcr[0].ref_sub_aktivitas_name
                : "-"
            }</div>`;
      case "saved_sample_adendum":
        return `<div><b><u>Analisa Sample</u></b></div>
            <br />
            <div><b>Uker:</b> ${
              detail_part[0]?.branch_kode &&
              detail_part[0]?.orgeh_kode &&
              detail_part[0]?.branch_name
                ? detail_part[0].branch_kode +
                  " / " +
                  detail_part[0].orgeh_kode +
                  " - " +
                  detail_part[0]?.branch_name
                : "-"
            }</div>
            <div><b>Aktivitas:</b> ${
              detail_part?.aktivitas_name ? detail_part.aktivitas_name : "-"
            }</div>
            <div><b>Sub Aktivitas:</b> ${
              detail_part?.mcr?.ref_sub_aktivitas_name
                ? detail_part.mcr.ref_sub_aktivitas_name
                : "-"
            }</div>
            <div><b>Sub Major:</b> ${
              detail_part?.mcr?.ref_sub_major_kode
                ? detail_part.mcr.ref_sub_major_kode
                : "-"
            }</div>
            <div><b>Risk Issue:</b> ${
              detail_part?.mcr?.ref_risk_issue_kode
                ? detail_part.mcr.ref_risk_issue_kode
                : "-"
            }</div>`;
      case "penugasan_kkpa":
        return `<div>Penugasan</div>
            <br />
            <div>Uker: ${detail_part.branch_kode} / ${detail_part.orgeh_kode} - ${detail_part.branch_name}</div>
            <div>Aktivitas: ${detail_part.aktivitas_name}</div>
            <div>Subaktivitas: ${detail_part.sub_aktivitas_name}</div>
            <div>Submajor: ${detail_part.sub_major_kode}</div>
            <div>Risk Issue: ${detail_part.risk_issue_kode}</div>`;
      case "analisa_aktivitas":
        return `<div>Analisa Aktivitas</div>
            <br />
            <div>Uker: ${detail_part?.mapa_uker?.ref_auditee_branch_kode} / ${detail_part?.mapa_uker?.ref_auditee_orgeh_kode} - ${detail_part?.mapa_uker?.ref_auditee_branch_name}</div>
            <div>Aktivitas: ${detail_part.mtd_aktivitas_name}</div>`;
      default:
        return part_name;
    }
  };

  const remapDokumenAddendum = (part, content) => {
    switch (part) {
      case "saved_sample_adendum":
        return remapSample(content);
      case "analisis_perencanaan_mcr":
        return remapRiskIssue(content) || "<b>Tetap</b>";
    }
  };

  const remapSample = (data) => {
    return `
      <div><b><u>Terdapat:</u></b></div>
      <br />
      <div><b>Csv: </b>${
        data?.samples ? data?.samples?.length : "0"
      } sampel</div>
      <div><b>File: </b>0 sampel</div>
      <div><b>Monber: </b>0 sampel</div>
      <div><b>Frd: </b>0 sampel</div>`;
  };

  const remapRiskIssue = (data) => {
    return data?.mcr
      ?.map(
        (item_risk) =>
          `<ul style={{ listStyleType: 'circle', marginLeft: '15px'}}>
          <li>
            <div className="mb-5">
              <div className="mb-2"><b>Risk Issue:</b> ${
                item_risk.ref_risk_issue_kode || ""
              }</div>
              <br/>
              <div><u><b>Terdapat</b></u></div>
              <div><b>Csv:</b> ${
                item_risk?.mapa_sample ? item_risk.mapa_sample.length : "0"
              } sample</div>
              <div><b>File:</b> 0 sample</div>
              <div><b>Monber:</b> 0 sample</div>
              <div><b>Frd:</b> 0 sample</div>
            </div>
            <br/>
          </li>
          
        </ul>`
      )
      .join(" ");
  };

  return addendumMAPADataIsLoading
    ? `<p>Loading data...</p>`
    : `
  <main>
    <header>
      <div class="header">
        <h2>Satuan Kerja Audit Intern</h2>
        <h3 >BRISMA</h3>
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
      <h3>Adendum</h3>
      <h3>Memorandum Analisis Perencanaan Audit</h3>
      <div style="margin-top: 0.5rem;">
        <div style="width: 250px; display: grid; grid-template-columns: 125px 1fr;">
          <p style="justify-self: left;">Tahun</p>
          <P style="justify-self: left;">${year}</P>
        </div>
      </div>
    </div>
    <section>
        <figure class="table">
    <table style="width: 100%; overflow: hidden;">
        <thead>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Part
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sebelum
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sesudah
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Alasan
                    </p>
                </th>
            </tr>
        </thead>
        ${data
          ?.map((c, index) => {
            return `<tbody>
            
        <tr key=${index}>
            <td width="25%" style="padding: 10px;">
                <p style="text-align:center;">
                    ${remapPart(c.Part, c.PartName, c.Sebelum)}
                </p>
            </td>
            <td width="15%" style="padding: 10px">
               ${remapDokumenAddendum(c.Part, c.Sebelum)}
            </td>
            <td width="15%" style="padding: 10px;">
              ${remapDokumenAddendum(c.Part, c.Sesudah)}
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    ${
                      c.Alasan
                        ? c.Alasan
                        : "<i><b>Alasan tidak ditemukan</b></i>"
                    }
                </p>
            </td>
        </tr>
        </tbody>`;
          })
          .join("")}
    </table>
    </figure>
    </section>
  </main>
`;
};

export default addendumMapaHtml;

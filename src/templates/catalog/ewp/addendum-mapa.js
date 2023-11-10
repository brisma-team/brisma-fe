import useAddendumMAPAById from "@/data/catalog/ewp/useAddendumMAPAById";
import { useState, useEffect } from "react";

const addendumMapaHtml = (year, id) => {
  const [data, setData] = useState();
  const { addendumMAPAData } = useAddendumMAPAById(id);

  useEffect(() => {
    if (addendumMAPAData !== undefined) {
      setData(addendumMAPAData.data.data_addendum);
    }
  }, [addendumMAPAData]);

  const remapPart = (part, part_name, detail_part) => {
    switch (part) {
      case "analisis_perencanaan_mcr":
        return `<div>Risk Issue</div>
            <br />
            <div>Uker: ${
              detail_part?.ref_auditee_branch_kode
                ? detail_part?.ref_auditee_branch_kode
                : "-"
            } / ${
          detail_part?.ref_auditee_orgeh_kode
            ? detail_part?.ref_auditee_orgeh_kode
            : "-"
        } - ${detail_part?.ref_auditee_branch_name}</div>
            <div>Aktivitas: ${
              detail_part?.ref_aktivitas_name
                ? detail_part?.ref_aktivitas_name
                : "-"
            }</div>
            <div>Subaktivitas: ${
              detail_part?.ref_sub_aktivitas_name
                ? detail_part?.ref_sub_aktivitas_name
                : "-"
            }</div>`;
      case "saved_sample_addendum":
        return `<div>Analisa Sample</div>
            <br />
            <div>Uker: ${
              detail_part[0].branch_kode ? detail_part[0].branch_kode : "-"
            } / ${detail_part[0].orgeh_kode} - ${
          detail_part[0].branch_name
        }</div>
            <div>Aktivitas: ${
              detail_part[0].aktivitas_name
                ? detail_part[0].aktivitas_name
                : "-"
            }</div>
            <div>Subaktivitas: ${
              detail_part[0].sub_aktivitas_name
                ? detail_part[0].sub_aktivitas_name
                : "-"
            }</div>
            <div>Submajor: ${
              detail_part[0].sub_major_kode
                ? detail_part[0].sub_major_kode
                : "-"
            }</div>
            <div>Risk Issue: ${
              detail_part[0].risk_issue_kode
                ? detail_part[0].risk_issue_kode
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
      case "saved_sample_addendum":
        return remapSample(content);
      case "analisis_perencanaan_mcr":
        return remapRiskIssue(content) || "Tetap";
    }
  };

  const remapSample = (data) => {
    return data.map(
      (item) => `
          <div>Terdapat:</div>
          <div>Csv: ${item.samples.csv.length} sampel</div>
          <div>File: ${item.samples.file.length} sampel</div>
          <div>Monber: ${item.samples.monber.length} sampel</div>
          <div>Frd: ${item.samples.frd.length} sampel</div>`
    );
  };

  const remapRiskIssue = (data) => {
    return data?.mcr?.map(
      (item_risk) =>
        `<ul style={{ listStyleType: 'circle', marginLeft: '15px' }}>
          <li>
            <div className="mb-5">
              <div className="mb-2">Risk Issue: ${
                item_risk.ref_risk_issue_kode || ""
              }</div>
              <div>Terdapat Sample:</div>
              <div>Csv: ${item_risk?.samples?.csv?.length || ""} sample</div>
              <div>File: ${item_risk?.samples?.file?.length || ""} sample</div>
              <div>Monber: ${
                item_risk?.samples?.monber?.length || ""
              } sample</div>
              <div>Frd: ${item_risk?.samples?.frd?.length || ""} sample</div>
            </div>
          </li>
        </ul>`
    );
  };

  return `
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
            <td>
                <p style="text-align:center;">
                    ${remapPart(c.Part, c.PartName, c.Sebelum)}
                </p>
            </td>
            <td style="padding: 10px;">
               ${remapDokumenAddendum(c.Part, c.Sebelum)}
            </td>
            <td style="padding: 10px;">
              ${remapDokumenAddendum(c.Part, c.Sesudah)}
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    ${c.Alasan}
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

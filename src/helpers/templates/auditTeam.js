const prepareData = (data) => {
  return data
    .map((d, idx) => {
      return `
      <tr style="border: 1px solid black;">
        <td style="border: 1px solid black; padding: 10px; text-align: center;">
          ${idx + 1}
        </td>
        <td style="border: 1px solid black; padding: 10px; text-align: left;">
          ${d.name}
        </td>
        <td style="border: 1px solid black; padding: 10px; text-align: left;">
          <ul style="margin: 0; padding: 0; list-style-type: none;">
            ${d.ref_tim_audit_mas
              .map((a) => `<li>${a.pn_ma} - ${a.nama_ma}</li>`)
              .join("")}
          </ul>
        </td>
        <td style="border: 1px solid black; padding: 10px; text-align: left;">
          ${d.ref_tim_audit_kta
            .map((a) => `<p style="margin: 0;">${a.pn_kta} - ${a.nama_kta}</p>`)
            .join("")}
        </td>
        <td style="border: 1px solid black; padding: 10px; text-align: left;">
          ${d.ref_tim_audit_ata
            .map((a) => `<p style="margin: 0;">${a.pn_ata} - ${a.nama_ata}</p>`)
            .join("")}
        </td>
        <td style="border: 1px solid black; padding: 10px; text-align: left;">
          ${d.ref_tim_audit_ata
            .map(
              (a) =>
                `<p style="margin: 0;">${a.pn_ata} - ${
                  a.nama_ata
                }: ${a.ref_ata_ukers
                  .map((u) => `${u.orgeh_name}`)
                  .join(", ")}</p>`
            )
            .join("")}
        </td>
      </tr>`;
    })
    .join("");
};

const tim_audit = (timRows) => `
<figure class="table" style="border-bottom: 1px solid black;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead style="border: 1px solid black;">
      <tr style="border: 1px solid black;">
        <th rowspan="2" style="background-color: #3C64B1; color: white; border: 1px solid black; padding: 10px;">
          <p style="text-align: center; margin: 0;">No</p>
        </th>
        <th rowspan="2" style="background-color: #3C64B1; color: white; border: 1px solid black; padding: 10px;">
          <p style="text-align: center; margin: 0;">Tim Audit</p>
        </th>
        <th colspan="3" style="background-color: #3C64B1; color: white; border: 1px solid black; padding: 10px;">
          <p style="text-align: center; margin: 0;">Susunan Tim Audit</p>
        </th>
        <th rowspan="2" style="background-color: #3C64B1; color: white; border: 1px solid black; padding: 10px;">
          <p style="text-align: center; margin: 0;">Unit Kerja Binaan</p>
        </th>
      </tr>
      <tr style="border: 1px solid black;">
        <th style="background-color: #3C64B1; color: white; border: 1px solid black; padding: 10px;">
          <p style="text-align: center; margin: 0;">MA</p>
        </th>
        <th style="background-color: #3C64B1; color: white; border: 1px solid black; padding: 10px;">
          <p style="text-align: center; margin: 0;">KTA</p>
        </th>
        <th style="background-color: #3C64B1; color: white; border: 1px solid black; padding: 10px;">
          <p style="text-align: center; margin: 0;">ATA</p>
        </th>
      </tr>
    </thead>
    <tbody>
      ${timRows}
    </tbody>
  </table>
</figure>`;

export const getAuditTeamTable = (data) => tim_audit(prepareData(data));

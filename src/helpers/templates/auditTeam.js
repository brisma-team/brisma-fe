const prepareData = (data) => {
  return data
    .map((d, idx) => {
      return `
      <tr style="border: 1px solid black;">
        <td style="border: 1px solid black;">
          ${idx + 1}
        </td>
        <td style="border: 1px solid black;">
          ${d.name}
        </td>
        <td style="border: 1px solid black;">
          <ul>
            ${d.ref_tim_audit_mas
              .map(
                (a) =>
                  `<li>
                ${a.pn_ma} - ${a.nama_ma}
              </li>`
              )
              .join("")}
          </ul>
        </td>
        <td style="border: 1px solid black;">
          ${d.ref_tim_audit_kta
            .map(
              (a) =>
                `<p>
              ${a.pn_kta} - ${a.nama_kta}
            </p>`
            )
            .join("")}
        </td>
        <td style="border: 1px solid black;">
          ${d.ref_tim_audit_ata
            .map(
              (a) =>
                `<p>
              ${a.pn_ata} - ${a.nama_ata}
            </p>`
            )
            .join("")}
        </td>
        <td style="border: 1px solid black;">
          ${d.ref_tim_audit_ata
            .map(
              (a) =>
                `<p>
              ${a.pn_ata} - ${a.nama_ata}: ${a.ref_ata_ukers
                  .map((u) => `${u.orgeh_name}`)
                  .join(", ")}
            </p>`
            )
            .join("")}
        </td>
      </tr>`;
    })
    .join("");
};

const tim_audit = (timRows) => `
<figure class="table" style="border-bottom: 1px solid black;">
    <table style="width: 100%;">
        <thead style="border: 1px solid black;">
            <tr style="border: 1px solid black;">
                <th rowspan="2" style="background-color: #3C64B1; color: white; border: 1px solid black;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; border: 1px solid black;">
                    <p style="text-align:center;">
                        Tim Audit
                    </p>
                </th>
                <th colspan="3" style="background-color: #3C64B1; color: white; border: 1px solid black;">
                    <p style="text-align:center;">
                        Susunan Tim Audit
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; border: 1px solid black;">
                    <p style="text-align:center;">
                        Unit Kerja Binaan
                    </p>
                </th>
            </tr>
            <tr style="border: 1px solid black;">
                <th style="background-color: #3C64B1; color: white; border: 1px solid black;">
                    <p style="text-align:center;">
                        MA
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; border: 1px solid black;">
                    <p style="text-align:center;">
                        KTA
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; border: 1px solid black;">
                    <p style="text-align:center;">
                        ATA
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${timRows}
        </tbody>
    </table>
</figure>`;

export const getAuditTeamTable = (data) => tim_audit(prepareData(data));

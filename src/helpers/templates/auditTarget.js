const auditTarget = (data) => {
  // const letters = "abcdefghijklmnopqrstuvwxyz";
  if (!data) {
    return "";
  }

  const arrData = [];

  for (const typeKey in data) {
    for (const categoryKey in data[typeKey]) {
      data[typeKey][categoryKey].forEach((v) => {
        const innerLoopHTML = `
            <table border="1" cellspacing="0" cellpadding="6" style="width: 100%; border-collapse: collapse; border: 0.5px solid black;">
              <thead>
                <tr>
                  <th rowspan="2" style="background-color: #3C64B1; color: white; text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">No</p>
                  </th>
                  <th rowspan="2" style="background-color: #3C64B1; color: white; text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">Objek Audit</p>
                  </th>
                  <th rowspan="2" style="background-color: #3C64B1; color: white; text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">∑ Uker</p>
                  </th>
                  <th colspan="2" style="background-color: #3C64B1; color: white; text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">Target Audit</p>
                  </th>
                </tr>
                <tr>
                  <th style="background-color: #3C64B1; color: white; text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">∑ Objek Audit</p>
                  </th>
                  <th style="background-color: #3C64B1; color: white; text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">% Objek Audit</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                ${v.count_target_jenis_auditee
                  .map(
                    (x, idx) => `
                <tr>
                  <td style="text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">${idx + 1}</p>
                  </td>
                  <td style="text-align: left; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">${x.name}</p>
                  </td>
                  <td style="text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">${x.existing}</p>
                  </td>
                  <td style="text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">${x.target}</p>
                  </td>
                  <td style="text-align: center; padding: 10px; border: 1px solid black;">
                    <p style="margin: 0;">
                      ${
                        x.existing
                          ? (parseInt(x.target) * parseInt(x.existing)) / 100
                          : 0
                      } %
                    </p>
                  </td>
                </tr>`
                  )
                  .join("")}
              </tbody>
            </table>

          `;
        arrData.push(innerLoopHTML);
      });
    }
  }

  return arrData.join("");
};
export const getAuditTargetTable = (data) => auditTarget(data);

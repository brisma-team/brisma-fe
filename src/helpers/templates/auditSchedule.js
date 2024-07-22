import convertDate from "../converDate";

const prepareData = (data) => {
  console.log(data);
  return data
    .map((d, idx) => {
      const start_month = convertDate(d?.pelaksanaan_start, "-");
      const end_month = convertDate(d?.pelaksanaan_end, "-");

      return `
      <tr style="border: 1px solid black;">
          <td style="border: 1px solid black; text-align: center;">
              ${idx + 1}
          </td>
          <td style="border: 1px solid black; text-align: center;">
              ${d?.tim_audit?.name || ""}
          </td>
          <td style="border: 1px solid black; text-align: center;">
              ${d?.ref_tipe?.nama || ""}
          </td>
          <td style="border: 1px solid black; text-align: center;">
              ${start_month || ""}
          </td>
          <td style="border: 1px solid black; text-align: center;">
              ${end_month || ""}
          </td>
          <td style="border: 1px solid black; text-align: center;">
              ${
                d?.auditee_jadwal_audits?.length > 0
                  ? d?.auditee_jadwal_audits
                      ?.map((a) => a?.ref_auditee_orgeh_kode)
                      .join(", ")
                  : ""
              }
          </td>
      </tr>`;
    })
    .join("");
};

const auditSchedule = (rows) => `
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="border: 1px solid black; background-color: #3C64B1; color: white;">
                <th rowspan="2" style="border: 1px solid black; padding: 8px;">
                    <p style="text-align:center; margin: 0;">
                        No
                    </p>
                </th>
                <th rowspan="2" style="border: 1px solid black; padding: 8px;">
                    <p style="text-align:center; margin: 0;">
                        Tim Audit
                    </p>
                </th>
                <th rowspan="2" style="border: 1px solid black; padding: 8px;">
                    <p style="text-align:center; margin: 0;">
                        Tipe Audit
                    </p>
                </th>
                <th rowspan="2" style="border: 1px solid black; padding: 8px;">
                    <p style="text-align:center; margin: 0;">
                        Tanggal Mulai
                    </p>
                </th>
                <th rowspan="2" style="border: 1px solid black; padding: 8px;">
                    <p style="text-align:center; margin: 0;">
                        Tanggal Berakhir
                    </p>
                </th>
                <th rowspan="2" style="border: 1px solid black; padding: 8px;">
                    <p style="text-align:center; margin: 0;">
                        Objek Audit
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>`;

export const getAuditScheduleTable = (data) => auditSchedule(prepareData(data));

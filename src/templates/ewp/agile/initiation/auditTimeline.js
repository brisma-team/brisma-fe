import { convertDate } from "@/helpers";

const auditTimelineHtml = (data) => {
  return `<table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <th width="8%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
                <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Keterangan</p></th>
                <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tanggal Dimulai</p></th>
                <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tanggal Berkakhir</p></th>
            </tr>
        </thead>
        <tbody>
        ${
          data.length
            ? data
                ?.map((v, index) => {
                  return `<tr >
                <td style="text-align:center; border: 1px solid #ccc;">
                  <p style="font-size:12px">${index + 1}</p>
                </td>
                <td style="border: 1px solid #ccc;">
                  <p style="font-size:12px">${v?.title}</p>
                </td>
                <td style="border: 1px solid #ccc;">
                  <p style="font-size:12px">${
                    v?.start_date ? convertDate(v?.start_date, "-", "d") : ""
                  }</p>
                </td>
                <td style="border: 1px solid #ccc;">
                  <p style="font-size:12px">${
                    v?.end_date ? convertDate(v?.end_date, "-", "d") : "-"
                  }</p>
                </td>
              </tr>`;
                })
                .join("")
            : ""
        }
        </tbody>
      </table>
          `;
};

export default auditTimelineHtml;

import { convertDate } from "@/helpers";

const rekomendasiHtml = (data) => {
  return `
  <table style="width: 100%;" cellpadding="3" cellspacing="0">
  <thead>
      <tr>
          <th width="10%" style="background-color: #3C64B1; color: white;"><p style="font-size:14px; text-align:center">No</p></th>
          <th width="25%" style="background-color: #3C64B1; color: white;"><p style="font-size:14px">Deadline</p></th>
          <th width="65%" style="background-color: #3C64B1; color: white;"><p style="font-size:14px">Uraian Rekomendasi</p></th>
      </tr>
  </thead>
  <tbody>
  ${
    data?.length > 0
      ? data
          ?.map((v, index) => {
            return `<tr >
          <td width="10%" style="text-align:center">
            <p style="font-size:12px">${index + 1}</p>
          </td>
          <td width="25%">
            <p style="font-size:12px">${convertDate(v?.deadline, "-", "d")}</p>
          </td>
          <td width="65%">
            <p style="font-size:12px">${v?.desc}</p>
          </td>
        </tr>`;
          })
          .join("")
      : `<tr>
      <td colspan="3" style="text-align:center; border: 1px solid #ccc;">
        <p style="font-size:12px">No Data Available</p>
      </td>
    </tr>`
  }
  </tbody>
</table>
  `;
};

export default rekomendasiHtml;

import { convertDate } from "@/helpers";

const jadwalHtml = (data) => {
  return `
  <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
  <thead>
      <tr>
      <th width="10%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
      <th width="30%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Kegiatan</p></th>
      <th width="30%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tanggal Dimulai</p></th>
      <th width="30%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tanggal Selesai</p></th>
      </tr>
  </thead>
  <tbody>
  ${
    data?.length > 0
      ? data
          ?.map((v, index) => {
            return `<tr>
          <td width="10%" style="text-align:center; border: 1px solid #ccc;">
            <p style="font-size:12px">${index + 1}</p>
          </td>
          <td width="30%" style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.keterangan}</p>
          </td>
          <td width="30%" style="border: 1px solid #ccc;">
            <p style="font-size:12px">${convertDate(v?.start, "-", "d")}</p>
          </td>
          <td width="30%" style="border: 1px solid #ccc;">
            <p style="font-size:12px">${convertDate(v?.end, "-", "d")}</p>
          </td>
        </tr>`;
          })
          .join("")
      : `<tr><td colspan="5" style="text-align:center; border: 1px solid #ccc;">
      <p style="font-size:12px">No Data Available</p>
    </td></tr>`
  }
  </tbody>
</table>
  `;
};

export default jadwalHtml;

import { convertDate, convertToRupiah } from "@/helpers";

const anggaranHtml = (data) => {
  return `
  <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
  <thead>
      <tr>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tipe Anggaran</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Periode</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Keterangan</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Jumlah</p></th>
      </tr>
  </thead>
  <tbody>
  
  ${
    data?.length > 0 &&
    data
      ?.map((v, index) => {
        return `<tr>
          <td style="text-align:center; border: 1px solid #ccc;">
            <p style="font-size:12px">${index + 1}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.tipe_anggaran_name}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${convertDate(
              v?.tanggal,
              "-",
              "d"
            )} s/d ${
          v?.tanggal_end ? convertDate(v?.tanggal_end, "-", "d") : "-"
        }</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.deskripsi || "-"}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">Rp. ${convertToRupiah(v?.amount)}</p>
          </td>
        </tr>`;
      })
      .join("")
  }
      
<tr>
  <td colspan="4" style="border: 1px solid #ccc; padding-left: 8px; padding-right: 8px;"><p style="font-size:16px; font-weight: 600;">Total</p></td>
  <td style="border: 1px solid #ccc;"><p style="font-size:12px">Rp. ${convertToRupiah(
    data?.reduce((accumulator, currentValue) => {
      const num = Number(currentValue?.amount);
      if (!isNaN(num)) {
        return accumulator + num;
      }
      return accumulator;
    }, 0)
  )}</p></td>
</tr>
  </tbody>
</table>
  `;
};

export default anggaranHtml;

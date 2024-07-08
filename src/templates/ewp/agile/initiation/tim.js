const timHtml = (data) => {
  return `<table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
      <thead>
          <tr>
              <th width="8%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
              <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Role</p></th>
              <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">PN</p></th>
              <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Nama</p></th>
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
                <p style="font-size:12px">${v?.role}</p>
              </td>
              <td style="border: 1px solid #ccc;">
                <p style="font-size:12px">${v?.pic?.pn}</p>
              </td>
              <td style="border: 1px solid #ccc;">
                <p style="font-size:12px">${v?.pic?.nama || "-"}</p>
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

export default timHtml;

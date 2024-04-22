const addendumDocs = (data) => {
  return `
    <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contoh Dokumen HTML</title>
  </head>
  <body>
  <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
  <thead>
      <tr>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;" width="7%"><p style="font-size:14px; text-align:center">No</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;" width="22%"><p style="font-size:14px">Section</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;" width="18%"><p style="font-size:14px">Keterangan</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;" width="18%"><p style="font-size:14px">Sebelum</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;" width="18%"><p style="font-size:14px">Sesudah</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;" width="19%"><p style="font-size:14px">Alasan</p></th>
      </tr>
  </thead>
  <tbody>
  
  ${
    data?.length > 0 &&
    data
      ?.map((v, index) => {
        return `<tr>
          <td style="text-align:center; border: 1px solid #ccc;" width="7%">
            <p style="font-size:12px">${index + 1}</p>
          </td>
          <td style="border: 1px solid #ccc; padding-left:4px; padding-right:4px" width="22%">
            <p style="font-size:12px">${v?.part || "-"}</p>
          </td>
          <td style="border: 1px solid #ccc; padding-left:4px; padding-right:4px" width="18%">
            <p style="font-size:12px">${v?.keterangan || "-"}</p>
          </td>
          <td style="border: 1px solid #ccc; padding-left:4px; padding-right:4px" width="18%">
            <p style="font-size:12px">${v?.note_sebelum || "-"}</p>
          </td>
          <td style="border: 1px solid #ccc; padding-left:4px; padding-right:4px" width="18%">
            <p style="font-size:12px">${v?.note_sesudah || "-"}</p>
          </td>
          <td style="border: 1px solid #ccc; padding-left:4px; padding-right:4px" width="19%">
            <p style="font-size:12px">${v?.alasan || "-"}</p>
          </td>
        </tr>`;
      })
      .join("")
  }
  </tbody>
</table>
  </body>
  </html>
    `;
};

export default addendumDocs;

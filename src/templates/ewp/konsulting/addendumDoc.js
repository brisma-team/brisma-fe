const addendumDocs = (uka, data) => {
  return `
    <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contoh Dokumen HTML</title>
      <style>
      header {
        display: flex;
        justify-content: center;
        text-align: center;
        margin-bottom: 1em;
      }
      .header {
        position: relative;
      }
      header img {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 0;
      }
      .container {
        width: 100%;
        padding-right: 10px;
        padding-left: 10px;
        margin-right: auto;
        margin-left: auto;
      }

      .flex {
        display: flex;
      }
      
      .flex-col {
          flex-direction: column;
      }
      
      @media (min-width: 576px) {
          .container {
              max-width: 540px;
          }
      }
      
      @media (min-width: 768px) {
          .container {
              max-width: 720px;
          }
      }
      
      @media (min-width: 992px) {
          .container {
              max-width: 960px;
          }
      }
      
      @media (min-width: 1200px) {
          .container {
              max-width: 1140px;
          }
      }
    </style>
  </head>
  <body>
  <header>
      <div class="header">
        <h2>PT Bank Rakyat Indonesia (PERSERO), Tbk</h2>
        <h3>${
          uka?.kode && uka?.name !== "aikp1" ? uka?.name : "Head Office Audit"
        }</h3>
      </div>
    </header>
    <div
      style="
        display: flex;
        justify-content: center;
        text-align: center;
        border-top: 3px solid #222222;
        border-bottom: 1px solid #222222;
      "
    >
      <h4>ADDENDUM MEMORANDUM ANALISIS PERENCANAAN AUDIT</h4>
    </div>
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
    data?.length > 0
      ? data
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
      : `<tr>
      <td colspan="6" style="text-align:center; border: 1px solid #ccc;">
        <p style="font-size:12px">No Data Available</p>
      </td>
    </tr>`
  }
  </tbody>
</table>
  </body>
  </html>
    `;
};

export default addendumDocs;

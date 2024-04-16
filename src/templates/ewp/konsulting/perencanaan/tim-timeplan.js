const timTimeplanHtml = (data) => {
  return `<p style="font-weight: 600">1. P.I.C Auditor</p>
  <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
  <thead>
      <tr>
          <th width="8%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">PN</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Nama</p></th>
      </tr>
  </thead>
  <tbody>
  ${
    data?.auditor?.length > 0 &&
    data?.auditor
      ?.map((v, index) => {
        return `<tr >
          <td style="text-align:center; border: 1px solid #ccc;">
            <p style="font-size:12px">${index + 1}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.pn}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.nama || "-"}</p>
          </td>
        </tr>`;
      })
      .join("")
  }
  </tbody>
</table>
      <p style="font-weight: 600">2. P.I.C Auditee</p>
      <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
  <thead>
      <tr>
          <th width="8%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">PN</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Nama</p></th>
      </tr>
  </thead>
  <tbody>
  ${
    data?.auditee?.length > 0 &&
    data?.auditee
      ?.map((v, index) => {
        return `<tr >
          <td style="text-align:center; border: 1px solid #ccc;">
            <p style="font-size:12px">${index + 1}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.pn}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.nama || "-"}</p>
          </td>
        </tr>`;
      })
      .join("")
  }
  </tbody>
</table>
      <p style="font-weight: 600">3. Anggota Tim Audit</p>
      <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
  <thead>
      <tr>
          <th width="8%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">PN</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Nama</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Mandays</p></th>
          <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Deskripsi</p></th>
      </tr>
  </thead>
  <tbody>
  ${
    data?.ata?.length > 0 &&
    data?.ata
      ?.map((v, index) => {
        return `<tr >
          <td style="text-align:center; border: 1px solid #ccc;">
            <p style="font-size:12px">${index + 1}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.pn}</p>
          </td>
          <td style="border: 1px solid #ccc;">
            <p style="font-size:12px">${v?.nama}</p>
          </td>
          <td style="border: 1px solid #ccc;">
          <p style="font-size:12px">${v?.mandays}</p>
        </td>
        <td style="border: 1px solid #ccc;">
          <p style="font-size:12px">${v?.deskripsi || ""}</p>
        </td>
          </tr>`;
      })
      .join("")
  }
  </tbody>
</table>
    `;
};

export default timTimeplanHtml;

const programKerjaHtml = (data) => {
  return data?.length
    ? data
        ?.map((v, i) => {
          return `
    <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <th width="3"><p style="font-size:14px; font-weight: 500">${
              i + 1 + "."
            }</p></th>
            <th width="16%"><p style="font-size:14px; font-weight: 500">Auditor</p></th>
            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
            <th width="80%"><p style="font-size:14px; font-weight: 500">${
              v?.pn_pic
            } - ${v?.nama_pic}</p></th>
        </tr>
        <tr>
        <th width="5"></th>
            <th width="16%"><p style="font-size:14px; font-weight: 500">Lingkup</p></th>
            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
            <th width="80%"><p style="font-size:14px; font-weight: 500">${
              v?.mapa_uker_mcr?.lingkup_pemeriksaan?.judul_lingkup_pemeriksaan
            }</p></th>
        </tr>
        <tr>
        <th width="5"></th>
            <th width="16%"><p style="font-size:14px; font-weight: 500">Risk</p></th>
            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
            <th width="80%"><p style="font-size:14px; font-weight: 500">${
              v?.mapa_uker_mcr?.mtd_risk_issue?.abbr
            } - ${v?.mapa_uker_mcr?.mtd_risk_issue?.nama}</p></th>
        </tr>
        <tr>
        <th width="5"></th>
            <th width="16%"><p style="font-size:14px; font-weight: 500">Control</p></th>
            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
            <th width="80%"><p style="font-size:14px; font-weight: 500">${
              v?.mtd_control?.abbr
            } - ${v?.mtd_control?.nama}</p></th>
        </tr>
        <th width="5"></th>
            <th width="16%"><p style="font-size:14px; font-weight: 500">Uraian</p></th>
            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
            <th width="80%">${v?.uraian || ""}</th>
        </tr>
    </tbody>
  </table>
    `;
        })
        .join("")
    : "";
};

export default programKerjaHtml;

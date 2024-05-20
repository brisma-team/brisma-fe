const ukerAssessmentHtml = (data) => {
  return `
    <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
    <thead>
        <tr>
            <th width="8%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
            <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Branch</p></th>
            <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Orgeh</p></th>
            <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tipe Uker</p></th>
            <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Deskripsi</p></th>
            <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Lampiran</p></th>
        </tr>
    </thead>
    <tbody>
    ${
      data?.ukerAssesment?.length > 0 &&
      data?.ukerAssesment
        ?.map((v, index) => {
          return `<tr >
            <td style="text-align:center; border: 1px solid #ccc;">
              <p style="font-size:12px">${index + 1}</p>
            </td>
            <td style="border: 1px solid #ccc;">
              <p style="font-size:12px">${
                v?.ref_auditee_branch_kode +
                  " - " +
                  v?.ref_auditee_branch_name || "-"
              }</p>
            </td>
            <td style="border: 1px solid #ccc;">
              <p style="font-size:12px">${
                v?.ref_auditee_orgeh_kode + " - " + v?.ref_auditee_orgeh_name ||
                "-"
              }</p>
            </td>
            <td style="border: 1px solid #ccc;">
              <p style="font-size:12px">${v?.tipe_uker || "-"}</p>
            </td>
            <td style="border: 1px solid #ccc;">
              <p style="font-size:12px">${v?.desc || "-"}</p>
            </td>
            <td style="border: 1px solid #ccc;">
              <p style="font-size:12px">${v?.attachments[0] || "-"}</p>
            </td>
          </tr>`;
        })
        .join("")
    }
    </tbody>
  </table>
      `;
};

export default ukerAssessmentHtml;

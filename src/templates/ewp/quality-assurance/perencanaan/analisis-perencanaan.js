const analisisPerencanaanHtml = (data) => {
  return `
        ${
          data?.length
            ? data
                ?.map((dataUker, indexUker) => {
                  return `
                <p style="font-weight: 600">${indexUker + 1}. [${
                    dataUker?.ref_auditee_orgeh_kode
                  }][${dataUker?.ref_auditee_branch_kode}] - ${
                    dataUker?.ref_auditee_branch_name
                  }</p>
                ${
                  dataUker?.mapa_project_audit?.length
                    ? `<table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
                      <thead>
                          <tr>
                              <th width="8%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px; text-align:center">No</p></th>
                              <th width="32%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Objek Audit</p></th>
                              <th width="10%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tahun</p></th>
                              <th width="15%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Tipe EWP</p></th>
                              <th width="15%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">Jenis EWP</p></th>
                              <th width="20%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px">PIC Analisator</p></th>
                          </tr>
                      </thead>
                        <tbody>
                        ${dataUker?.mapa_project_audit
                          ?.map((dataProject, indexProject) => {
                            return `<tr>
                                <td width="8%" style="text-align:center; border: 1px solid #ccc;">
                                    <p style="font-size:12px">${
                                      indexProject + 1
                                    }</p>
                                </td>
                                <td width="32%" style="border: 1px solid #ccc;">
                                    <p style="font-size:12px">
                                        [${dataProject?.project_id?.toUpperCase()}] ${
                              dataProject?.project_name
                            }
                                    </p>
                                </td>
                                <td width="10%" style="border: 1px solid #ccc;">
                                    <p style="font-size:12px">${
                                      dataProject?.tahun || "-"
                                    }</p>
                                </td>
                                <td width="15%" style="border: 1px solid #ccc;">
                                    <p style="font-size:12px">${
                                      dataProject?.mtd_tipe?.nama || "-"
                                    }</p>
                                </td>
                                <td width="15%" style="border: 1px solid #ccc;">
                                    <p style="font-size:12px">${
                                      dataProject?.mtd_jenis?.nama || "-"
                                    }</p>
                                </td>
                                <td width="20%" style="border: 1px solid #ccc;">
                                    <p style="font-size:12px">${
                                      dataProject?.pn_pic
                                        ? `${dataProject?.pn_pic} - ${dataProject?.name_pic}`
                                        : "-"
                                    }</p>
                                </td>
                            </tr>`;
                          })
                          .join("")}
                        </tbody>
                  </table>`
                    : ""
                }
            `;
                })
                .join("")
            : ""
        }
    `;
};

export default analisisPerencanaanHtml;

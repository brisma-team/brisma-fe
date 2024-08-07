const workingPaperHtml = (data) => {
  console.log("data => ", data);
  return `
<table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate; margin-top: -4px;" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th width="26%"><p style="font-size:14px; font-weight: 600">Auditor</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 600">:</p></th>
                  <th width="71%"><p style="font-size:14px; font-weight: 600">${
                    data?.auditor?.pn
                      ? `${data?.auditor?.pn} - ${data?.auditor?.name}`
                      : ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="26%"><p style="font-size:14px; font-weight: 600">UKER / Divisi</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 600">:</p></th>
                  <th width="71%"><p style="font-size:14px; font-weight: 600">${
                    data?.user_stories_uker?.ref_auditee_orgeh_kode
                      ? `${data?.user_stories_uker?.ref_auditee_branch_kode} - ${data?.user_stories_uker?.ref_auditee_branch_name}`
                      : ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="26%"><p style="font-size:14px; font-weight: 600">Story Point (Risk Issue)</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 600">:</p></th>
                  <th width="71%"><p style="font-size:14px; font-weight: 600">${
                    data?.user_stories_uker?.user_stories?.ref_risk_issue_kode
                      ? `${data?.user_stories_uker?.user_stories?.ref_risk_issue_abbr} - ${data?.user_stories_uker?.user_stories?.ref_risk_issue_name}`
                      : ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="26%"><p style="font-size:14px; font-weight: 600">Epic (Sub Major Risk)</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 600">:</p></th>
                  <th width="71%"><p style="font-size:14px; font-weight: 600">${
                    data?.auditor?.pn
                      ? `${data?.auditor?.pn} - ${data?.auditor?.name}`
                      : ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="26%"><p style="font-size:14px; font-weight: 600">Status</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 600">:</p></th>
                  <th width="71%"><p style="font-size:14px; font-weight: 600">${
                    data?.status_persetujuan
                  }</p></th>
                </tr>
                <tr>
                  <th width="26%"><p style="font-size:14px; font-weight: 600">Kesimpulan</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 600">:</p></th>
                  <th width="71%"><p style="font-size:14px; font-weight: 600">${
                    data?.kesimpulan || ""
                  }</p></th>
                </tr>
              </tbody>
            </table>
  ${
    data?.task?.length
      ? data?.task
          ?.map((taskData, taskIndex) => {
            return `
            <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate; margin-top: 10px;" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th width="3"><p style="font-size:14px; font-weight: 400">${
                    taskIndex + 1 + "."
                  }</p>
                  </th>
                  <th width="24%"><p style="font-size:14px; font-weight: 400">Description</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 400">:</p></th>
                  <th width="75%"><p style="font-size:14px; font-weight: 400">${
                    taskData?.description
                  }</p></th>
                </tr>
                <tr>
                  <th width="3"></th>
                  <th width="24%"><p style="font-size:14px; font-weight: 400">Assigne</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 400">:</p></th>
                  <th width="75%"><p style="font-size:14px; font-weight: 400">${
                    taskData?.pn_auditor
                      ? `${taskData?.pn_auditor} - ${taskData?.name_auditor}`
                      : ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="3"></th>
                  <th width="24%"><p style="font-size:14px; font-weight: 400">Status</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 400">:</p></th>
                  <th width="75%"><p style="font-size:14px; font-weight: 400">${
                    taskData?.status_penyelesaian || ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="3"></th>
                  <th width="24%"><p style="font-size:14px; font-weight: 400">Potential Problem</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 400">:</p></th>
                  <th width="75%"><p style="font-size:14px; font-weight: 400">${
                    taskData?.potensial_isu || ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="3"></th>
                  <th width="24%"><p style="font-size:14px; font-weight: 400">Comment</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 400">:</p></th>
                  <th width="75%"><p style="font-size:14px; font-weight: 400">${
                    taskData?.comment || ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="3"></th>
                  <th width="24%"><p style="font-size:14px; font-weight: 400">Task Type</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 400">:</p></th>
                  <th width="75%"><p style="font-size:14px; font-weight: 400">${
                    taskData?.task_type_name || ""
                  }</p></th>
                </tr>
                <tr>
                  <th width="3"></th>
                  <th width="24%"><p style="font-size:14px; font-weight: 400">Efektivitas</p></th>
                  <th width="1%"><p style="font-size:14px; font-weight: 400">:</p></th>
                  <th width="75%"><p style="font-size:14px; font-weight: 400">${
                    taskData?.hasil_pengujian || ""
                  }</p></th>
                </tr>
              </tbody>
            </table>`;
          })
          .join("")
      : ""
  }`;
};

export default workingPaperHtml;

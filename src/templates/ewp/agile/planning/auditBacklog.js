const auditBacklogHtml = (data) => {
  return `${
    data?.length
      ? data
          ?.map((sprintData, sprintIndex) => {
            return `
    <div><p style="font-weight: 700">${sprintIndex + 1}. ${
              sprintData?.sprint_name
            }</p>
            ${
              sprintData?.user_stories?.length
                ? sprintData?.user_stories?.map(
                    (userStoryData, userStoryIndex) => {
                      return `<div>
                      <p style="font-weight: 600">${sprintIndex + 1}.${
                        userStoryIndex + 1
                      }. ${userStoryData?.ref_risk_issue_abbr} - ${
                        userStoryData?.ref_risk_issue_name
                      }</p>
                      <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate; margin-top: -5px;" cellspacing="0" cellpadding="0">
                        <tbody>
                          <tr>
                            <th width="24%"><p style="font-size:14px; font-weight: 500">Feature</p></th>
                            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                            <th width="75%"><p style="font-size:14px; font-weight: 500">${
                              userStoryData?.feature
                            }</p></th>
                          </tr>
                          <tr>
                            <th width="24%"><p style="font-size:14px; font-weight: 500">Estimate</p></th>
                            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                            <th width="75%"><p style="font-size:14px; font-weight: 500">${
                              userStoryData?.estimate || 0
                            } Hari</p></th>
                          </tr>
                          <tr>
                            <th width="24%"><p style="font-size:14px; font-weight: 500">Priority</p></th>
                            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                            <th width="75%"><p style="font-size:14px; font-weight: 500">${
                              userStoryData?.priority
                            }</p></th>
                          </tr>
                          <tr>
                            <th width="24%"><p style="font-size:14px; font-weight: 500">User Story Description</p></th>
                            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                            <th width="75%"><p style="font-size:14px; font-weight: 500">${
                              userStoryData?.user_story_desc
                            }</p></th>
                          </tr>
                          <tr>
                            <th width="24%"><p style="font-size:14px; font-weight: 500">Definition of Ready</p></th>
                            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                            <th width="75%"><p style="font-size:14px; font-weight: 500">${
                              userStoryData?.definition_of_ready
                            }</p></th>
                          </tr>
                          <tr>
                            <th width="24%"><p style="font-size:14px; font-weight: 500">Definition of Ready</p></th>
                            <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                            <th width="75%"><p style="font-size:14px; font-weight: 500">${
                              userStoryData?.definition_of_done
                            }</p></th>
                          </tr>
                        </tbody>
                      </table>
                      <p style="font-weight: 600">Uker :</p>
                      <table
                        style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate; margin-bottom:10px;"
                        cellSpacing="0"
                        cellPadding="0"
                      >
                        <thead>
                          <tr>
                            <th
                              width="8%"
                              style="background-color: #3C64B1; color: white; border: 1px solid #fff;"
                            >
                              <p style="font-size:14px; text-align:center">No</p>
                            </th>
                            <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;">
                              <p style="font-size:14px">Branch</p>
                            </th>
                            <th style="background-color: #3C64B1; color: white; border: 1px solid #fff;">
                              <p style="font-size:14px">Orgeh</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${
                            userStoryData?.user_stories_uker?.length
                              ? userStoryData?.user_stories_uker
                                  ?.map((ukerData, ukerIndex) => {
                                    return `<tr >
                                          <td style="text-align:center; border: 1px solid #ccc;">
                                            <p style="font-size:12px">${
                                              ukerIndex + 1
                                            }</p>
                                          </td>
                                          <td style="border: 1px solid #ccc;">
                                            <p style="font-size:12px">${
                                              ukerData?.ref_auditee_branch_kode +
                                                " - " +
                                                ukerData?.ref_auditee_branch_name ||
                                              "-"
                                            }</p>
                                          </td>
                                          <td style="border: 1px solid #ccc;">
                                            <p style="font-size:12px">${
                                              ukerData?.ref_auditee_orgeh_kode +
                                                " - " +
                                                ukerData?.ref_auditee_orgeh_name ||
                                              "-"
                                            }</p>
                                          </td>
                                        </tr>`;
                                  })
                                  .join("")
                              : ""
                          }
                        </tbody>
                      </table>
                      
                      ${
                        userStoryData?.user_story_task?.length
                          ? `<p style="font-weight: 600">Task :</p>${userStoryData?.user_story_task
                              ?.map((taskData, taskIndex) => {
                                return `
                                <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate; margin-top: -4px;" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <th width="3"><p style="font-size:14px; font-weight: 500">${
                                        taskIndex + 1 + "."
                                      }</p>
                                      </th>
                                      <th width="24%"><p style="font-size:14px; font-weight: 500">Description</p></th>
                                      <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                                      <th width="75%"><p style="font-size:14px; font-weight: 500">${
                                        taskData?.description
                                      }</p></th>
                                    </tr>
                                    <tr>
                                      <th width="3"></th>
                                      <th width="24%"><p style="font-size:14px; font-weight: 500">Status</p></th>
                                      <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                                      <th width="75%"><p style="font-size:14px; font-weight: 500">${
                                        taskData?.status_penyelesaian
                                      }</p></th>
                                    </tr>
                                    <tr>
                                      <th width="3"></th>
                                      <th width="24%"><p style="font-size:14px; font-weight: 500">Potential Problem</p></th>
                                      <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                                      <th width="75%"><p style="font-size:14px; font-weight: 500">${
                                        taskData?.potensial_isu
                                      }</p></th>
                                    </tr>
                                    <tr>
                                      <th width="3"></th>
                                      <th width="24%"><p style="font-size:14px; font-weight: 500">Comment</p></th>
                                      <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                                      <th width="75%"><p style="font-size:14px; font-weight: 500">${
                                        taskData?.comment
                                      }</p></th>
                                    </tr>
                                    <tr>
                                      <th width="3"></th>
                                      <th width="24%"><p style="font-size:14px; font-weight: 500">Task Type</p></th>
                                      <th width="1%"><p style="font-size:14px; font-weight: 500">:</p></th>
                                      <th width="75%"><p style="font-size:14px; font-weight: 500">${
                                        taskData?.task_type_name
                                      }</p></th>
                                    </tr>
                                  </tbody>
                                </table>`;
                              })
                              .join("")}`
                          : ""
                      }
                      </div>`;
                    }
                  )
                : ""
            }
          <div>`;
          })
          .join("")
      : ""
  }`;
};

export default auditBacklogHtml;

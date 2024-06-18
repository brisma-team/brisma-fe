import { convertDate } from "@/helpers";

const formatRecommendationType = (type) => {
  if (!type) return "";
  return type
    .split("_")
    .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase())
    .join(" ");
};

const generateActionPlanHtml = (actionPlans) => {
  if (!actionPlans || actionPlans?.length === 0) {
    return '<p style="font-size:12px; color: #777; font-style: italic;">No Data Available</p>';
  }

  return `
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        ${actionPlans
          ?.map(
            (plan) => `
            <li style="font-size:12px; margin-bottom: 10px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
              <div style="margin-bottom: 5px;">
                <span style="font-weight: bold;">Desc:</span> ${plan?.desc}
              </div>
              <div>
                <span style="font-weight: bold;">Deadline:</span> ${convertDate(
                  plan?.batas_waktu,
                  "-",
                  "d"
                )}
              </div>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
};

const generateRecommendationHtml = (recommendations) => {
  if (!recommendations || recommendations?.length === 0) {
    return `<tr><td colspan="3" style="text-align:center; border: 1px solid #ccc;">
        <p style="font-size:12px; font-style: italic; font-weight: bold">No Data Available</p>
      </td></tr>`;
  }

  return recommendations
    ?.map(
      (recommendation, index) => `
        <tr>
          <td width="10%" style="text-align:center; border: 1px solid #ccc; padding: 8px;">
            <p style="font-size:12px; margin: 0;">${index + 1}</p>
          </td>
          <td width="40%" style="border: 1px solid #ccc; padding: 8px; ">
            <p style="font-size:12px; margin: 0;"><span style="font-weight: bold;">Desc:</span> ${
              recommendation?.desc
            }</p>
            <p style="font-size:12px; margin: 0; color: #555;"><span style="font-weight: bold;">Tipe:</span> ${formatRecommendationType(
              recommendation?.tipe_rekomendasi_name
            )}</p>
          </td>
          <td width="50%" style="border: 1px solid #ccc; padding: 10px; ">
            ${generateActionPlanHtml(recommendation?.action_plans)}
          </td>
        </tr>
      `
    )
    .join("");
};

const generateProjectSurveyHtml = (survey, index) => `
  <div style="margin-bottom: 20px; margin-top: 10px">
    <p style="font-weight: 600; font-size: 12px; margin-bottom: 5px;">
      ${index + ". " + survey?.kkpa?.project_survey?.nama_survey}
    </p>
    <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th width="10%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;">
            <p style="font-size:14px; text-align:center">No</p>
          </th>
          <th width="40%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;">
            <p style="font-size:14px">Rekomendasi</p>
          </th>
          <th width="50%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;">
            <p style="font-size:14px">Action Plan</p>
          </th>
        </tr>
      </thead>
      <tbody>
        ${generateRecommendationHtml(survey?.kkpt_rekomendasi_list)}
      </tbody>
    </table>
  </div>
`;

const rencanaPerbaikanHtml = (data) => {
  const uraian = data?.uraian || "No Data Available";
  const rekomendasiHtml =
    data?.rekomendasi
      ?.map((survey, index) => generateProjectSurveyHtml(survey, index + 1))
      .join("") || "";

  return `
    <article style="margin-bottom: 10px; width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
      <b>Uraian</b> : ${uraian}
    </article>
    <article style="margin-bottom: 10px; width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
      <b>Rekomendasi dan Action Plan</b> : ${rekomendasiHtml}
    </article>
    
  `;
};

export default rencanaPerbaikanHtml;

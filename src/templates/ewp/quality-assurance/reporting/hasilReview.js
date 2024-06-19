const formatRecommendationType = (type) => {
  if (!type) return "";
  return type
    .split("_")
    .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase())
    .join(" ");
};
const generateRumusHtml = (rumus) => {
  if (!rumus || Object.keys(rumus).length === 0) {
    return "0";
  }

  return `
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        ${Object.entries(rumus)
          .map(
            ([key, value]) => `
            <li key="${key}" style="font-size:12px; margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; background-color: #f9f9f9;">
              <div style="margin-bottom: 5px;">
                ${value}
              </div>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
};

const generateBodyHtml = (item) => {
  if (!item || item.length === 0) {
    return `<tr><td colspan="3" style="text-align:center; border: 1px solid #ccc;">
          <p style="font-size:12px; font-style: italic; font-weight: bold">No Data Available</p>
        </td></tr>`;
  }

  return item
    .map(
      (v, index) => `
          <tr>
            <td width="10%" style="text-align:center; border: 1px solid #ccc; padding: 8px;">
              <p style="font-size:12px; margin: 0;">${index + 1}</p>
            </td>
            <td width="40%" style="border: 1px solid #ccc; padding: 8px; ">
              <p style="font-size:12px; margin: 0;">${
                v?.project_id + " - " + v?.project_name
              }</p>
            </td>
            <td width="50%" style="border: 1px solid #ccc; padding: 10px;">
              ${generateRumusHtml(v?.rumus)}
            </td>
          </tr>
        `
    )
    .join("");
};

const getUniqueRumusKeys = (items) => {
  const keys = new Set();
  items.forEach((item) => {
    if (item.rumus) {
      Object.keys(item.rumus).forEach((key) => keys.add(key));
    }
  });
  return Array.from(keys);
};

const generateProjectHtml = (items) => {
  const uniqueKeys = getUniqueRumusKeys(items);

  return `
      <div style="margin-bottom: 20px; margin-top: 10px">
        <table style="width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th width="10%" style="background-color: #3C64B1; border: 1px solid #fff;">
                <p style="font-size:14px; text-align:center; color: #fff;">No</p>
              </th>
              <th width="40%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;">
                <p style="font-size:14px; color: #fff;">Branch</p>
              </th>
              ${uniqueKeys
                .map(
                  (key) => `
                  <th width="50%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;">
                    <p style="font-size:14px; color: #fff;">${formatRecommendationType(
                      key
                    )}</p>
                  </th>
                `
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${generateBodyHtml(items)}
          </tbody>
        </table>
      </div>
    `;
};

const hasilReviewHtml = (data) => {
  return `
      <article style="margin-bottom: 10px; width: 100%; border-style: none !important; border: 0px solid #fff; border-collapse: separate;" cellspacing="0" cellpadding="0">
        ${generateProjectHtml(data)}
      </article>
    `;
};

export default hasilReviewHtml;

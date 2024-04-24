import withTokenConfig from "./withTokenConfig";
import successSwal from "./successSwal";
import errorSwal from "./errorSwal";

const fetchApi = async (method, url, body, withoutSwal, messageSuccess) => {
  try {
    const { headers } = withTokenConfig();
    const options = {
      method,
      headers: {
        Authorization: headers.Authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Unknown error";
      if (errorData?.errorData?.length > 0) {
        return await errorSwal(errorMessage, fetchHTML(errorData?.errorData));
      }
      return await errorSwal(errorMessage);
    }

    const responseData = await response.json();
    if (!withoutSwal) {
      messageSuccess;
      await successSwal(messageSuccess || responseData?.message);
    }
    return responseData;
  } catch (e) {
    throw new Error(e?.message || "An error occurred");
  }
};

const fetchHTML = (data) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Table Custom</title>
        <link rel="stylesheet" href="style.css">
        <style>

        .dataTables-custom {
          /* tambahkan gaya CSS sesuai kebutuhan */
      }
      
      .dataTables-custom table {
          width: 100%;
          border-collapse: collapse;
      }
      
      .dataTables-custom th,
      .dataTables-custom td {
          padding: 8px;
          border: 1px solid #e2e8f0; /* warna border sesuaikan dengan kebutuhan */
      }
      
      .dataTables-custom th.hidden,
      .dataTables-custom td.hidden {
          display: none;
      }
      
      .dataTables-custom .cell-custom-dataTables {
          /* tambahkan gaya CSS sesuai kebutuhan */
      }
      
      .dataTables-custom .overflow-hidden {
          overflow: hidden;
      }
      
      .dataTables-custom .text-ellipsis {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      }
      table {
        font-size: 14px;
      }
      </style>
    </head>
    <body>
    <div class="dataTables-custom">
    <table>
        <thead>
            <tr>
                <th class="hidden"></th>
                <th class="border-t border-x cell-custom-dataTables" style="width: 20%; text-align: center;">No</th>
                <th class="border-t border-x cell-custom-dataTables" style="width: 80%; ">Description</th>
            </tr>
        </thead>
        <tbody>
        ${data
          ?.map(
            (data, index) => `<tr>
                <td class="border-r cell-custom-dataTables overflow-hidden text-ellipsis break-words" style="width: 20%; text-align: center;">${
                  index + 1
                }</td>
                <td class="border-r cell-custom-dataTables overflow-hidden text-ellipsis break-words" style="width: 80%;">${
                  data?.message
                }</td>
              </tr>`
          )
          .join(" ")}
        </tbody>
    </table>
</div>

    </body>
    </html>
    `;
};

export default fetchApi;

import { convertDate } from "@/helpers";

const dokumenRPMDoc = (data, index) => {
  return `
    <p style="font-size: 18px; font-weight: bold;">${index + 1}. ${
    data?.judul
  }</p>
    <table style="width: 100%; border-collapse: separate; border: 0; border-style: none !important;">
    <tbody>
      <tr>
        <th width="13%">
          <p style="font-size: 14px; font-weight: 500;">Kondisi</p>
        </th>
        <th width="1%">
          <p style="font-size: 14px; font-weight: 500;">:</p>
        </th>
        <th width="86%">${data?.kondisi || "-"}
        </th>
      </tr>
      <tr>
        <th width="13%">
          <p style="font-size: 14px; font-weight: 500;">Sebab</p>
        </th>
        <th width="1%">
          <p style="font-size: 14px; font-weight: 500;">:</p>
        </th>
        <th width="86%">
        ${data?.sebab || "-"}
        </th>
      </tr>
      <tr>
        <th width="13%">
          <p style="font-size: 14px; font-weight: 500;">Tanggapan</p>
        </th>
        <th width="1%">
          <p style="font-size: 14px; font-weight: 500;">:</p>
        </th>
        <th width="86%">
        ${data?.tanggapan_manajemen || "-"}
        </th>
      </tr>
      <table>
        <thead>
            <tr>
                <th width="15%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px;">Deadline</p></th>
                <th width="25%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px;">Deskripsi</p></th>
                <th width="20%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px;">Lampiran</p></th>
                <th width="15%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px;">Status</p></th>
                <th width="25%" style="background-color: #3C64B1; color: white; border: 1px solid #fff;"><p style="font-size:14px;">Tanggapan</p></th>
            </tr>
        </thead>
        <tbody>
          ${
            data?.rekomendasi?.length
              ? data?.rekomendasi
                  .map((data_rekomendasi, i) => {
                    return `
                      <tr key="${i}">
                        <td width="15%" class="table-cell">${convertDate(
                          data_rekomendasi?.deadline,
                          "-",
                          "d"
                        )}</td>
                        <td width="25%" class="table-cell">${
                          data_rekomendasi?.desc
                        }</td>
                        <td width="20%" class="table-cell">${
                          data_rekomendasi?.lampiran?.length
                            ? data_rekomendasi?.lampiran
                                ?.map((data_lampiran, index_lampiran) => {
                                  return `
                                  <span style="display: inline-block;">${
                                    index_lampiran + 1
                                  }.</span>
                                  <a href="${data_lampiran?.file_url}">${
                                    data_lampiran?.file_name
                                  }</a>
                                    `;
                                })
                                .join("")
                            : ""
                        }</td>
                        <td width="15%" class="table-cell">${
                          data_rekomendasi?.status || ""
                        }</td>
                        <td width="25%" class="table-cell">${
                          data_rekomendasi?.tanggapan || ""
                        }</td>
                      </tr>
                    `;
                  })
                  .join("")
              : `<tr>
              <td colspan="5" style="text-align:center; border: 1px solid #ccc;">
                <p style="font-size:12px">No Data Available</p>
              </td>
            </tr>`
          }
        </tbody>
      </table>
    </tbody>
  </table>
  <br/>
      `;
};

export default dokumenRPMDoc;

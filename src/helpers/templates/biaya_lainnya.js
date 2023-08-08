import { numberWithCommas } from "../../utils/helper";

const prepareData = (data) => {
  const rows = data.map((d, idx) => {
    return `
      <tr>
          <td><p style="text-align:center;">${idx + 1}</p></td>
          ${d.kategori
            .map((k) =>
              k.sub_kategori
                .map(
                  (s) =>
                    `<td>
                      <p style="text-align:center;">
                        ${numberWithCommas(s.amount[0].amount)}
                      </p>
                    </td>`,
                )
                .join(""),
            )
            .join("")}
      </tr>`;
  });
  // Push total
  rows.push(
    `
      <tr style="">
          <td><p style="text-align:center; font-size: bold;">Total</p></td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[0].sub_kategori[0].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[0].sub_kategori[1].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[0].sub_kategori[2].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[1].sub_kategori[0].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[1].sub_kategori[1].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[1].sub_kategori[2].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[1].sub_kategori[3].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[2].sub_kategori[0].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += Number(d.kategori[2].sub_kategori[1].amount[0].amount)),
                0,
              ),
            )}
            </p>
          </td>
      </tr>
    `,
  );
  return rows.join("");
};

const biaya_lainnya = (rows) => `
<figure class="table">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th colspan="3" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Biaya Pemeliharaan &amp; Perbaikan AT
                    </p>
                </th>
                <th colspan="4" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Biaya Barang &amp; Jasa Pihak Ke III
                    </p>
                </th>
                <th colspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Biaya Umum Lainnya
                    </p>
                </th>
            </tr>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Kendaraan
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Mesin
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Inventaris
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Porto
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Percetakan
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        ATK
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Supplies Komputer
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Representasi
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Rapat
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
</figure>`;

export const getBiayaLainTable = (data) => biaya_lainnya(prepareData(data));

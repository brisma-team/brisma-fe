import { numberWithCommas } from "../../utils/helper";

const prepareData = (data) => {
  const rows = data.map((d, idx) => {
    const length = Object.keys(d.Jabatan).length;

    const row = Object.keys(d.Jabatan).map((k, i) => {
      const currJabatan = d.Jabatan[k];
      return `
        <tr>
            ${
              i === 0
                ? `
                <td rowspan="${length}">
                  <p style="text-align:center; word-wrap: break-word;">
                      ${idx + 1}
                  </p>
                </td>
                <td rowspan="${length}">
                  <p style="text-align:center; word-wrap: break-word;">
                      ${d.nama_kegiatan}
                  </p>
                </td>
              `
                : ""
            }
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${k}
              </p>
            </td>
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${currJabatan.jumlah}
              </p>
            </td>
            ${
              i === 0
                ? `
              <td rowspan="${length}">
                <p style="text-align:center; word-wrap: break-word;">
                    ${d.tempat_kegiatan}
                </p>
              </td>
              <td rowspan="${length}">
                <p style="text-align:center; word-wrap: break-word;">
                    ${d.bulan}
                </p>
              </td>
              `
                : ""
            }
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${currJabatan.lama_kegiatan} hari
              </p>
            </td>
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${numberWithCommas(currJabatan.biaya_tiket)}
              </p>
            </td>
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${numberWithCommas(currJabatan.biaya_transport)}
              </p>
            </td>
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${numberWithCommas(currJabatan.biaya_perjalanan)}
              </p>
            </td>
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${numberWithCommas(currJabatan.biaya_akomodasi)}
              </p>
            </td>
            <td>
              <p style="text-align:center; word-wrap: break-word;">
                  ${numberWithCommas(currJabatan.total_biaya)}
              </p>
            </td>
        </tr>
      `;
    });

    return row.join("");
  });

  const totalBiayaPerjalananDinas = data.reduce((prev, curr) => {
    const totalSatuKegiatan = Object.keys(curr.Jabatan).reduce(
      (p, c) => (p += Number(curr.Jabatan[c].total_biaya)),
      0,
    );
    return (prev += totalSatuKegiatan);
  }, 0);

  rows.push(`
    <tr>
        <td colspan="11">
            Total Biaya Perjalanan Dinas
        </td>
        <td>
            <p style="text-align:center;">${numberWithCommas(
              totalBiayaPerjalananDinas,
            )}</p>
        </td>
    </tr>
  `);
  return rows.join("");
};

const biaya_dinas = (rows) => `
<figure class="table">
    <table style="table-layout: fixed; width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Kegiatan
                    </p>
                </th>
                <th colspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Peserta
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Tempat/Kegiatan Auditee
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Bulan Kegiatan
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Lama Kegiatan
                    </p>
                </th>
                <th colspan="5" style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Biaya Perjalanan Dinas Jabatan
                    </p>
                </th>
            </tr>
            <tr>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Jabatan / Golongan / Pangkat
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Jumlah Orang
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Tiket PP
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Transport Lokal
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Uang Harian
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Biaya Akomodasi
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white; word-wrap: break-word;">
                    <p style="text-align:center;">
                        Total Biaya
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
</figure>`;

export const getBiayaDinasTable = (data) => biaya_dinas(prepareData(data));

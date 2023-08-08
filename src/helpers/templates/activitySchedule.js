import convertDate from "../converDate";

const prepareData = (data) => {
  return data
    .map((d, idx) => {
      const start_month = convertDate(d.pelaksanaan_start, "-");
      const end_month = convertDate(d.pelaksanaan_end, "-");

      return `<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">${idx + 1}</td>
			<td style="border: 1px solid black;">${d.sbp_name}</td>
			<td style="border: 1px solid black;">${d.orgeh_name}</td>
			<td style="border: 1px solid black;">
				${d.penanggung_jawab.map((p) => `<p>${p.pn} - ${p.nama}</p>`).join("")}
			</td>
      ${[...Array(12)]
        .map(
          (_, idx) =>
            `<td ${
              idx + 1 >= start_month &&
              idx + 1 <= end_month &&
              'style="background-color:hsl(210, 75%, 60%);"'
            }></td>`
        )
        .join("")}
		</tr>`;
    })
    .join("");
};

const activitySchedule = (sbpRows) => `
<figure class="table" style="border-bottom: 1px solid black;">
    <table style="width: 100%;">
        <thead style="border: 1px solid black;">
            <tr style="border: 1px solid black;">
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Nama Kegiatan
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Uker SBP
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Pembicara
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        PIC
                    </p>
                </th>
                <th colspan="12" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Periode
                    </p>
                </th>
            </tr>
            <tr style="border: 1px solid black;">
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Jan
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Feb
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Mar
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Apr
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Mei
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Jun
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Jul
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Ags
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sep
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Okt
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Nov
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Des
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${sbpRows}
        </tbody>
    </table>
</figure>`;

export const getActivityScheduleTable = (data) =>
  activitySchedule(prepareData(data));

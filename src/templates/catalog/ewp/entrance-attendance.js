import { useModuleById } from "@/data/catalog";
import { useState, useEffect } from "react";
import dateLocaleString from "@/helpers/dateLocaleString";

const entAttHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail } = useModuleById(
    year,
    source,
    id,
    "entrance_attendance"
  );

  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail.data.content);
    }
  }, [moduleDetail]);

  return `
    <main>
    <p><strong>Entrance Attendance</strong></p>
    <table>
        <thead>
          <tr>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">No</p></th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Nama Anggota</p></th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Tanggal Absen</p></th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Jabatan</p></th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">UKER</p></th>
          </tr>
        </thead>
        ${
          data &&
          data
            .filter(
              (item) =>
                item.PN ||
                item.Nama ||
                item.TanggalAbsen ||
                item.Jabatan ||
                item.UnitKerja
            )
            .map((item, index) => {
              return `
                      <tbody>
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.PN} - ${item.Nama}</td>
                            <td>${dateLocaleString(
                              item.TanggalAbsen,
                              true
                            )}</td>
                            <td>${item.Jabatan}</td>
                            <td>${item.UnitKerja}</td>
                        </tr>
                      </tbody>
                    `;
            })
            .join(", ")
        }
</table>
    </main>
`;
};

export default entAttHtml;

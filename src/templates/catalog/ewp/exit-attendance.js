import { useModuleById } from "@/data/catalog";
import { useState, useEffect } from "react";
import dateLocaleString from "@/helpers/dateLocaleString";
import { loadingSwal } from "@/helpers";

const exitAttHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail, moduleDetailIsLoading } = useModuleById(
    year,
    source,
    id,
    "exit_attendance"
  );

  useEffect(() => {
    moduleDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [moduleDetailIsLoading]);

  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail.data.content);
    }
  }, [moduleDetail]);

  return `
    <main>
    <h2><strong>Exit Attendance</strong></h2>
    <table style="width: 100%; border: 1px solid #000; border-collapse: collapse;">
        <tr>
            <th style="width: 5%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">No</th>
            <th style="width: 25%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Peserta</th>
            <th style="width: 22%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Tanggal Kehadiran</th>
            <th style="width: 23%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Jabatan</th>
            <th style="width: 25%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Unit Kerja</th>
        </tr>
        ${
          moduleDetailIsLoading
            ? `<tr>
            <td colspan="5" style="text-align:center;border: 1px solid #000; padding: 8px;">Loading data...</td></tr>`
            : data &&
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
                        <tr>
                        <td style="text-align:center;border: 1px solid #000; padding: 8px;">${
                          index + 1
                        }</td>
                        <td style="border: 1px solid #000; padding: 8px;">${
                          item.PN
                        } - ${item.Nama}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${dateLocaleString(
                          item.TanggalAbsen,
                          true
                        )}</td>
                            <td style="border: 1px solid #000; padding: 8px;">${
                              item.Jabatan
                            }</td>
                            <td style="border: 1px solid #000; padding: 8px;">${
                              item.UnitKerja
                            }</td>
                        </tr>
                    `;
                })
                .join("")
        }
    </table>
    </main>
`;
};

export default exitAttHtml;

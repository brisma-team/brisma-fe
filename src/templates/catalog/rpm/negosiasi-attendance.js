import useRPMModuleById from "@/data/catalog/rpm";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";
import dateLocaleString from "@/helpers/dateLocaleString";

const negoAttHtml = (id, noEvaluasi) => {
  const [data, setData] = useState([]);
  const { moduleDetail, moduleDetailIsLoading } = useRPMModuleById(
    id,
    "negosiasi-attendance",
    noEvaluasi
  );

  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail?.data.content);
    }
  }, [moduleDetail]);

  useEffect(() => {
    moduleDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [moduleDetailIsLoading]);

  return moduleDetailIsLoading
    ? `<p>Loading data...</p>`
    : `
    <main>
      <h2><strong>Negosiasi Attendance</strong></h2>
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
              : data
                  .map((item, index) => {
                    const parsedItem = JSON.parse(item);
                    return `
                          <tr>
                          <td style="text-align:center;border: 1px solid #000; padding: 8px;">${
                            index + 1
                          }</td>
                          <td style="border: 1px solid #000; padding: 8px;">${
                            parsedItem.pn
                          } - ${parsedItem.nama}</td>
                          <td style="border: 1px solid #000; padding: 8px;">${dateLocaleString(
                            parsedItem.tanggal_absen,
                            true
                          )}</td>
                              <td style="border: 1px solid #000; padding: 8px;">${
                                parsedItem.jabatan
                              }</td>
                              <td style="border: 1px solid #000; padding: 8px;">${
                                parsedItem.orgeh_name
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

export default negoAttHtml;

const rteHtml = (data, actionPlan) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return `
  <main>
    <section>
        <article>
            <p style="margin-bottom:20px;margin-top:10px">
                <strong>
                    <u>KKPT Information</u>
                </strong>
            </p>
            <div style="display:flex;margin-bottom:10px">
                <div style="width:100px">
                    <b>Judul KKPT</b>
                </div>
                <div style="padding-left:10px">:</div>
                <div style="padding-left:10px">${data?.KKPTTitle}</div>
            </div>
            <div style="display:flex;margin-bottom:10px">
                <div style="width:100px">
                    <b>Temuan Berulang</b>
                </div>
                <div style="padding-left:10px">:</div>
                <div style="padding-left:10px">${
                  data?.TemuanBerulang === true ? "Ya" : "Tidak"
                }</div>
            </div>
            <div style="display:flex;margin-bottom:10px">
                <div style="width:100px">
                    <b>Tipe Resiko</b>
                </div>
                <div style="padding-left:10px">:</div>
                <div style="padding-left:10px">${data?.RiskTypeName}</div>
            </div>
        </article>
        <article>
            <p style="margin-bottom: 10px;">
                <div style="display: flex;margin-bottom:10px;">
                    <div style="width: 100px;"><b>Risk Issue</b></div>
                    <div style="padding-left: 10px;">:</div>
                    <div style="padding-left: 10px;">
                    ${data?.RiskIssueName}
                    </div>
                </div>
                <div style="display: flex;margin-bottom:10px;">
                    <div style="width: 100px;"><b>Sub Major Proses</b></div>
                    <div style="padding-left: 10px;">:</div>
                    <div style="padding-left: 10px;"> 
                    ${data?.SubMajor}
                    </div>
                </div>
                <div style="display: flex;margin-bottom:10px;">
                    <div style="width: 100px;"><b>Kategori Temuan</b></div>
                    <div style="padding-left: 10px;">:</div>
                    <div style="padding-left: 10px;">
                    ${
                      data?.KategoriTemuan == 1
                        ? "Minor"
                        : data?.KategoriTemuan == 2
                        ? "Moderate"
                        : "Major"
                    }
                    </div>
                </div>
                <div style="display: flex;margin-bottom:10px;">
                    <div style="width: 100px;"><b>Auditee</b></div>
                    <div style="padding-left: 10px;">:</div>
                    <div style="padding-left: 10px;"> 
                    ${data?.AuditeeBranchName ? data.AuditeeBranchName : "**"}
                    </div>
                </div>
            </p>
        </article>  
        <hr>
        <article style="margin-top:10px">
        ${actionPlan
          .map((val, index) => {
            return `<p style="margin-bottom:20px;margin-top:10px" key=${index}>
            <strong>
                Rekomendasi ${index + 1} - ${capitalizeFirstLetter(
              val.Recommendation
            )}
            </strong>
        </p>
        <div style="margin-top: 10px;">
            <table style="width: 100%; border: 1px solid #000; border-collapse: collapse;">
                <tr>
                    <th style="width: 10%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">No</th>
                    <th style="width: 30%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Action Plan</th>
                    <th style="width: 40%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Tindak Lanjut</th>
                    <th style="width: 20%;border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Hasil Evaluasi</th>
                </tr>
                ${val.MergedData.map((ap, i) => {
                  return `<tr key=${i}>
                  <td style="text-align: center;border: 1px solid #000; padding: 8px;">${
                    i + 1
                  }</td>
                    <td style="border: 1px solid #000; padding: 8px;">${
                      ap[0]
                    }</td>
                    <td style="border: 1px solid #000; padding: 8px;">
                    <ul>
                    ${ap[1]
                      .map((tl, x) => {
                        let tl2 = JSON.parse(tl);
                        return `<li key=${x}>${tl2.deskripsi}`;
                      })
                      .join("")}
                        
                    </ul>
                    </td>
                    <td style="text-align: center;border: 1px solid #000; padding: 8px;">${
                      ap[2]
                    }</td>
                </tr>`;
                }).join("")}
                
                
            </table>
        </div>`;
          })
          .join("")}
            
        </article>
    </section>
  </main>
    `;
};

export default rteHtml;

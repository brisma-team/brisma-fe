// const prepareData = (data) => {
//   let reguler, special;
//   if (data?.Individual?.Reguler && data?.Individual?.Reguler?.length) {
//     reguler = data?.Individual?.Reguler.map((k, idx) => {
//       return `
//         <tr>
//             <td>
//               <p style="text-align:center;">${idx + 1}</p>
//             </td>
//             <td>
//                 <p style="text-align:left;">${k.name_kegiatan_audit}</p>
//             </td>
//             <td>
//                 <p style="text-align:left;">${k.deskripsi}</p>
//             </td>
//         </tr>`;
//     }).join("");
//   }

//   if (data?.Individual?.Special && data?.Individual?.Special?.length) {
//     special = data?.Individual?.Special.map((k, idx) => {
//       return `
//       <tr>
//           <td>
//             <p style="text-align:center;">${idx + 1}</p>
//           </td>
//           <td>
//               <p style="text-align:left;">${k.name_kegiatan_audit}</p>
//           </td>
//           <td>
//               <p style="text-align:left;">${k.deskripsi}</p>
//           </td>
//       </tr>`;
//     }).join("");
//   }

//   const arrData = [];
//   if (data) {
//     for (const typeKey in data) {
//       for (const jenisKey in data[typeKey]) {
//         data[typeKey][jenisKey].map((v) => {
//           arrData.push({ name: typeKey, data: v });
//         });
//       }
//     }
//   }

//   return { regulerRows: reguler, specialRows: special, tematikRows: tematik };
// };

// const rows = (data) => {
//         return `
//       <tr>
//           <td>
//             <p style="text-align:center;">${idx + 1}</p>
//           </td>
//           <td>
//               <p style="text-align:left;">${k.name_kegiatan_audit}</p>
//           </td>
//           <td>
//               <p style="text-align:left;">${k.deskripsi}</p>
//           </td>
//       </tr>`;
//     }).join("");
// }

const auditTarget = (data) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  if (!data) {
    return "";
  }

  const arrData = [];
  for (const typeKey in data) {
    const typeIndex = Object.keys(data).indexOf(typeKey);
    const typeLetter = letters[Object.keys(data).indexOf(typeKey)];
    for (const categoryKey in data[typeKey]) {
      // const categoryIndex = Object.keys(data[typeKey]).indexOf(categoryKey);
      data[typeKey][categoryKey].map((v) => {
        arrData.push(
          `<div class="sub_section_ruang_lingkup" style="margin-bottom: 30px;">
          <h4 style="line-height: 6px;">${typeLetter}. ${typeKey}</h4>
          <h4 style="line-height: 6px;">${typeLetter}.${
            typeIndex + 1
          } ${categoryKey}</h4>
          <h4 style="line-height: 6px;">${typeLetter}.${
            typeIndex + 1
          }.1 Detail Jadwal Audit</h4>
          <table>
            <thead>
              <tr>
                  <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">No</p>
                  </th>
                  <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">Uker Audit</p>
                  </th>
                  <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">Deskripsi</p>
                  </th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <h4 style="line-height: 6px;">a.1.2 Rekapan Objek Audit</h4>
          <table border="1" cellspacing="0" cellpadding="6">
            <thead>
              <tr>
                  <th rowspan="2" style="background-color: #3C64B1; color: white;">
                      <p style="text-align:center;">
                          No
                      </p>
                  </th>
                  <th rowspan="2" style="background-color: #3C64B1; color: white;">
                      <p style="text-align:center;">
                          Objek Audit
                      </p>
                  </th>
                  <th rowspan="2" style="background-color: #3C64B1; color: white;">
                      <p style="text-align:center;">
                          ∑ Uker
                      </p>
                  </th>
                  <th colspan="2" style="background-color: #3C64B1; color: white;">
                      <p style="text-align:center;">
                          Target Audit
                      </p>
                  </th>
              </tr>
              <tr>
                  <th style="background-color: #3C64B1; color: white;">
                      <p style="text-align:center;">
                          ∑ Objek Audit
                      </p>
                  </th>
                  <th style="background-color: #3C64B1; color: white;">
                      <p style="text-align:center;">
                          % Objek Audit
                      </p>
                  </th>
              </tr>
            </thead>
            <tbody>
              ${v.count_target_jenis_auditee.map((x, idx) => {
                return `<tr>
                  <td>
                    <p style="text-align:center;">${idx + 1}</p>
                  </td>
                  <td>
                      <p style="text-align:left;">${x.name}</p>
                  </td>
                  <td>
                      <p style="text-align:center;">${x.existing}</p>
                  </td>
                  <td>
                      <p style="text-align:center;">${x.target}</p>
                  </td>
                  <td>
                      <p style="text-align:center;">${
                        x.existing
                          ? (parseInt(x.target) * parseInt(x.existing)) / 100
                          : 0
                      } %</p>
                  </td>
                </tr>`;
              })}
            </tbody>
          </table>
        </div>`
        );
      });
    }
  }

  return arrData.join("");
};

// for (const categoryKey in data[typeKey]) {
//   const categoryIndex = Object.keys(data[typeKey]).indexOf(categoryKey);
//   data[typeKey][categoryKey].map((v) => {
//     return `<div class="sub_section_ruang_lingkup">
//     <div style="margin-bottom: 30px;">
//       <h4 style="line-height: 6px;">${typeLetter}. ${typeKey}</h4>
//       <h4 style="line-height: 6px;">a.1 Reguler Audit</h4>
//       <h4 style="line-height: 6px;">a.1.1 Detail Jadwal Audit</h4>
//       <table>
//         <thead>
//           <tr>
//               <th rowspan="2" style="background-color: #3C64B1; color: white;">
//                 <p style="text-align:center;">No</p>
//               </th>
//               <th rowspan="2" style="background-color: #3C64B1; color: white;">
//                 <p style="text-align:center;">Uker Audit</p>
//               </th>
//               <th rowspan="2" style="background-color: #3C64B1; color: white;">
//                 <p style="text-align:center;">Deskripsi</p>
//               </th>
//           </tr>
//         </thead>
//         <tbody>
//         </tbody>
//       </table>
//       <h4 style="line-height: 6px;">a.1.2 Rekapan Objek Audit</h4>
//       <table border="1" cellspacing="0" cellpadding="6">
//         <thead>
//           <tr>
//               <th rowspan="2" style="background-color: #3C64B1; color: white;">
//                   <p style="text-align:center;">
//                       No
//                   </p>
//               </th>
//               <th rowspan="2" style="background-color: #3C64B1; color: white;">
//                   <p style="text-align:center;">
//                       Objek Audit
//                   </p>
//               </th>
//               <th rowspan="2" style="background-color: #3C64B1; color: white;">
//                   <p style="text-align:center;">
//                       ∑ Uker
//                   </p>
//               </th>
//               <th colspan="2" style="background-color: #3C64B1; color: white;">
//                   <p style="text-align:center;">
//                       Target Audit
//                   </p>
//               </th>
//           </tr>
//           <tr>
//               <th style="background-color: #3C64B1; color: white;">
//                   <p style="text-align:center;">
//                       ∑ Objek Audit
//                   </p>
//               </th>
//               <th style="background-color: #3C64B1; color: white;">
//                   <p style="text-align:center;">
//                       % Objek Audit
//                   </p>
//               </th>
//           </tr>
//         </thead>
//         <tbody>
//         </tbody>
//       </table>
//     </div>
//   </div>`;
//   });
// }
// }
// };

// console.log("DATA => ", data);
export const getAuditTargetTable = (data) => auditTarget(data);

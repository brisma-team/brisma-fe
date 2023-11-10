import { useAddendumPATById } from "@/data/catalog/pat";
import { useState, useEffect } from "react";

export const addendumPatHtml = (year, id) => {
  const [data, setData] = useState();
  const { addendumPATData } = useAddendumPATById(id);

  useEffect(() => {
    if (addendumPATData !== undefined) {
      setData(addendumPATData.data.data_addendum);
    }
  }, [addendumPATData]);
  return `
  <main>
    <header>
      <div class="header">
        <h2>Satuan Kerja Audit Intern</h2>
        <h3 >BRISMA</h3>
      </div>
    </header>
    <div style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-top: 3px solid #222222; 
    border-bottom: 1px solid #222222; 
    padding: 1rem 0; 
    margin: 1.5rem 0 1rem 0"
    >
      <h3>Adendum</h3>
      <h3>Perencanaan Audit Tahunan</h3>
      <div style="margin-top: 0.5rem;">
        <div style="width: 250px; display: grid; grid-template-columns: 125px 1fr;">
          <p style="justify-self: left;">Tahun</p>
          <P style="justify-self: left;">${year}</P>
        </div>
      </div>
    </div>
    <section>
        <figure class="table">
    <table style="width: 100%; overflow: hidden;">
        <thead>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Part
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sebelum
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sesudah
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Alasan
                    </p>
                </th>
            </tr>
        </thead>
        ${data
          ?.map((c, index) => {
            return `<tbody>
            
        <tr key=${index}>
            <td>
                <p style="text-align:center;">
                    Jadwal Audit
                </p>
            </td>
            <td style="padding: 10px;">
               ${
                 c.sebelum == null
                   ? `<p> Tetap </p>`
                   : `<p>
                        Nama Kegiatan: ${c.sebelum.jadwal.name_kegiatan_audit}
                    </p>
                    <p>
                        Tipe Audit: ${
                          c.Sebelum.jadwal.ref_mtd_stc_audit_type_kode
                            .audit_type
                        }
                    </p>
                    <p>
                        Nama Tim Audit: ${c.Sebelum.tim_name}
                    </p>
                    <p>
                        Total Anggaran: Rp. ${c.Sebelum.jadwal.total_anggaran}
                    </p>
                    <p>
                        Periode Kegiatan: ${
                          c.sebelum.jadwal.pelaksanaan_start
                        } sd ${c.sebelum.jadwal.pelaksanaan_end}
                    </p>
                    <p>Uker: </p>
                    ${c.Sebelum.auditeeOrObjek
                      .map((a) => `<p>- ${a.branch_name}</p>`)
                      .join("")}
                    <p>
                        Nama Maker: {c.sebelum.jadwal.pic_jadwal_audit.nama}
                    </p>`
               }
            </td>
            <td style="padding: 10px;">
                    <p>
                        Nama Kegiatan: ${c.Sesudah.name_kegiatan_audit}
                    </p>
                    <p>
                        Tipe Audit: ${c.Sesudah.audit_type.audit_type}
                    </p>
                    <p>
                        Nama Tim Audit: ${c.Sesudah.tim[0].tim_name}
                    </p>
                    <p>
                        Total Anggaran: Rp. ${c.Sesudah.total_anggaran}
                    </p>
                    <p>
                        Periode Kegiatan: ${c.Sesudah.pelaksanaan_start} sd ${
              c.Sesudah.pelaksanaan_end
            }
                    </p>
                    <p>Uker: </p>
                    ${c.Sesudah.uker
                      .map((a) => `<p>- ${a.branch_name}</p>`)
                      .join("")}
                    <p>
                        Nama Maker: ${c.Sesudah.pic_jadwal_audit.nama}
                    </p>
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    ${c.Alasan}
                </p>
            </td>
        </tr>
        </tbody>`;
          })
          .join("")}
    </table>
</figure>
    </section>
  </main>
`;
};

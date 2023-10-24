// import { useEntNotById } from "@/data/catalog";
// import { useState, useEffect } from "react";

export const addendumPatHtml = (year, source, id) => {
  //   const [data, setData] = useState();
  //   const { entNotDetail } = useEntNotById(year, source, id);

  //   useEffect(() => {
  //     if (entNotDetail !== undefined) {
  //       setData(entNotDetail.data.entrance_notulen);
  //     }
  //   }, [entNotDetail]);
  console.log(year, source, id);

  return `
  <main>
    <header>
      <div class="header">
        <h2>Satuan Kerja Audit Intern</h2>
        <h3 >BRISMA</h3>
        <div style="margin-top: 10px;">
          <div style="display: grid; grid-template-columns: 75px 1fr">
            <h4 style="justify-self: left">Alamat</h4>
            <h4 style="justify-self: left">: {uka_info?.alamat}</h4>
          </div>
          <div style="display: grid; grid-template-columns: 75px 1fr">
            <h4 style="justify-self: left">No. Tlp</h4>
            <h4 style="justify-self: left">: {uka_info?.no_telp}</h4>
          </div>
        </div>
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
          <P style="justify-self: left;">{periode}</P>
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
        <tbody>
            <tr>
            <td>
                <p style="text-align:center;">
                    Latar Belakang
                </p>
            </td>
            <td>
                <p style="text-align:center;">
                    Tetap
                </p>
            </td>
            <td style="padding: 10px;">
                <p>
                    Tanggal perubahan: {moment(lb.updatedAt).format(
                      "DD MMMM YYYY HH:mm"
                    )}
                </p>
                <p>
                    Maker: {lb.sesudah.pic ? lb.sesudah.pic.nama : ""}
                </p>
            </td>
            <td style="padding: 10px;">
                <p style="text-align:center; padding: 10px;">
                    {lb.alasan_adendum}
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="text-align:center;">
                    Sumber Informasi
                </p>
            </td>
            <td>
                <p style="text-align:center;">
                    Tetap
                </p>
            </td>
            <td style="padding: 10px;">
                <p>
                    Tanggal perubahan: {moment(si.updatedAt).format(
                      "DD MMMM YYYY HH:mm"
                    )}
                </p>
                <p>
                    Maker: {si.sesudah.pic ? si.sesudah.pic.nama : ""}
                </p>
            </td>
            <td style="padding: 10px;">
                <p style="text-align:center; padding: 10px;">
                    {si.alasan_adendum}
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="text-align:center;">
                    Tim Audit
                </p>
            </td>
            <td style="padding: 10px;">
                {
                  t.sebelum
                    ? <p>
                        Nama Tim: {t.sebelum.name}
                    </p>
                    <p>
                        MA: {t.sebelum.nama_ma}
                    </p>
                    <p>
                       KTA: {t.sebelum.nama_kta}
                    </p>
                    <p>ATA:</p>
                    {t.sebelum.atas.map((a) => <p>{a.name}</p>).join("")}
                    : "-"
                }
            </td>
            <td style="padding: 10px;">
                {
                  t.sesudah
                    ? <p>
                        Nama Tim: {t.sesudah.name}
                    </p>
                    <p>
                        MA: {t.sesudah.pn_ma.nama}
                    </p>
                    <p>
                       KTA: {t.sesudah.pn_kta.nama}
                    </p>
                    <p>ATA:</p>
                    {t.sesudah.atas.map((a) => <p>- {a.nama}</p>).join("")}
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    {t.alasan_adendum}
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="text-align:center;">
                    Jadwal Audit
                </p>
            </td>
            <td style="padding: 10px;">
               {
                 c.sebelum
                   ? 
                    <p>
                        Nama Kegiatan: {c.sebelum.jadwal.name_kegiatan_audit}
                    </p>
                    <p>
                        Tipe Audit: {
                          c.sebelum.jadwal.ref_mtd_stc_audit_type_kode
                            .audit_type
                        }
                    </p>
                    <p>
                        Nama Tim Audit: {c.sebelum.tim_name}
                    </p>
                    <p>
                        Total Anggaran: Rp. {numberWithCommas(
                          c.sebelum.jadwal.total_anggaran
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: {moment(
                          c.sebelum.jadwal.pelaksanaan_start
                        ).format("DD MMMM YYYY")} sd {moment(
                       c.sebelum.jadwal.pelaksanaan_end
                     ).format("DD MMMM YYYY")}
                    </p>
                    <p>Uker: </p>
                    {c.sebelum.auditeeOrObjek
                      .map((a) => <p>- {a.branch_name}</p>)
                      .join("")}
                    <p>
                        Nama Maker: {c.sebelum.jadwal.pic_jadwal_audit.nama}
                    </p>
                    
                   : "-"
               }
            </td>
            <td style="padding: 10px;">
                {
                  c.sesudah
                    ? 
                    <p>
                        Nama Kegiatan: {c.sesudah.name_kegiatan_audit}
                    </p>
                    <p>
                        Tipe Audit: {c.sesudah.audit_type.audit_type}
                    </p>
                    <p>
                        Nama Tim Audit: {c.sesudah.tim[0].tim_name}
                    </p>
                    <p>
                        Total Anggaran: Rp. {numberWithCommas(
                          c.sesudah.total_anggaran
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: {moment(
                          c.sesudah.pelaksanaan_start
                        ).format("DD MMMM YYYY")} sd {moment(
                        c.sesudah.pelaksanaan_end
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>Uker: </p>
                    {c.sesudah.uker
                      .map((a) => <p>- {a.branch_name}</p>)
                      .join("")}
                    <p>
                        Nama Maker: {c.sesudah.pic_jadwal_audit.nama}
                    </p>
                    
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    {c.alasan_adendum}
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="text-align:center;">
                    Jadwal Consulting
                </p>
            </td>
            <td style="padding: 10px;">
               {
                 c.sebelum
                   ? 
                    <p>
                        Nama Kegiatan: {c.sebelum.jadwal.sbp_name}
                    </p>
                    <p>
                        Uker: {c.sebelum.jadwal.branch_name}
                    </p>
                    <p>Nama Pembicara: </p>
                    {c.sebelum.pembicara
                      .map((a) => <p>- {a.nama_pembicara}</p>)
                      .join("")}
                    <p>Nama PIC: </p>
                    {c.sebelum.penanggung_jawab
                      .map((a) => <p>- {a.nama_penanggung_jawab}</p>)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. {numberWithCommas(
                          c.sebelum.jadwal.total_anggaran
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: {moment(
                          c.sebelum.jadwal.pelaksanaan_start
                        ).format("DD MMMM YYYY")} sd {moment(
                       c.sebelum.jadwal.pelaksanaan_end
                     ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: {
                          c.sebelum.jadwal.pic_maker_jadwal_sbp.nama
                        }
                    </p>
                    
                   : "-"
               }
            </td>
            <td style="padding: 10px;">
                {
                  c.sesudah
                    ? 
                    <p>
                        Nama Kegiatan: {c.sesudah.name}
                    </p>
                    <p>
                        Uker: {c.sesudah.branch_name}
                    </p>
                    <p>Nama Pembicara: </p>
                    {c.sesudah.pembicara
                      .map((a) => <p>- {a.nama}</p>)
                      .join("")}
                    <p>Nama PIC: </p>
                    {c.sesudah.penanggung_jawab
                      .map((a) => <p>- {a.nama}</p>)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. {numberWithCommas(
                          c.sesudah.total_anggaran
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: {moment(
                          c.sesudah.pelaksanaan_start
                        ).format("DD MMMM YYYY")} sd {moment(
                        c.sesudah.pelaksanaan_end
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: {c.sesudah.pic_maker_jadwal_sbp.nama}
                    </p>
                    
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    {c.alasan_adendum}
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="text-align:center;">
                    Kegiatan Lain
                </p>
            </td>
            <td style="padding: 10px;">
               {
                 c.sebelum
                   ? 
                    <p>
                        Nama Kegiatan: {c.sebelum.kegiatan_lain.nama}
                    </p>
                    <p>
                        Uker: {c.sebelum.branch_name}
                    </p>
                    <p>Nama Anggota: </p>
                    {c.sebelum.anggota_kegiatan
                      .map((a) => <p>- {a.nama_anggota}</p>)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. {numberWithCommas(
                          c.sebelum.kegiatan_lain.total_anggaran
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: {moment(
                          c.sebelum.kegiatan_lain.pelaksanaan_start
                        ).format("DD MMMM YYYY")} sd {moment(
                       c.sebelum.kegiatan_lain.pelaksanaan_end
                     ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: {
                          c.sebelum.kegiatan_lain.pic_maker_kegiatan_lain.nama
                        }
                    </p>
                    
                   : "-"
               }
            </td>
            <td style="padding: 10px;">
                {
                  c.sesudah
                    ? 
                    <p>
                        Nama Kegiatan: {c.sesudah.nama}
                    </p>
                    <p>
                        Uker: {c.sesudah.branch_name}
                    </p>
                    <p>Nama Anggota: </p>
                    {c.sesudah.anggota
                      .map((a) => <p>- {a.nama}</p>)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. {numberWithCommas(
                          c.sesudah.total_anggaran
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: {moment(
                          c.sesudah.pelaksanaan_start
                        ).format("DD MMMM YYYY")} sd {moment(
                        c.sesudah.pelaksanaan_end
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: {c.sesudah.pic_maker_kegiatan_lain.nama}
                    </p>
                    
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    {c.alasan_adendum}
                </p>
            </td>
        </tr>
        </tbody>
    </table>
</figure>
    </section>
    <footer>
      <div style="display: flex; justify-content: end; margin: 5rem 20px;" class="footerHandSign">
        <p>{tanggal}</p>
      </div>
      <div style="display: flex; justify-content: end; margin: 5rem 20px; float: right;" class="footerDiv">
        {
          !signers
            ? ""
            : signers
                .map(
                  (s) =>
                    
                      <div style="{
                        signers.length < 2 ? "grid-column: 2;" : ""
                      } display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; line-height: 1.5; float: right;">
                        <p style="width: 150px;">
                          {s.from.pn}
                        </p>
                        <p style="width: 150px;">
                          {s.from.nama}
                        </p>
                        <h4 style="width: 150px;">{s.from.jabatan}</h4>
                      </div>
                    
                )
                .join("")
        }
      </div>
    </footer>
  </main>
`;
};

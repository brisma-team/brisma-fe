import * as yup from "yup";

const schedulePATSchema = yup.object().shape({
  audit_year: yup.string().required("Silahkan pilih tahun"),
  pat_jadwal_kegiatan_id: yup
    .string()
    .required("Silahkan pilih jadwal audit terlebih dahulu"),
  audited: yup
    .boolean()
    .test(
      "is-audited",
      "Jadwal sudah di-Audit, silahkan pilih jadwal lain",
      (value) => {
        return !value || value === false;
      }
    ),
});

const summaryPATSchema = yup.object().shape({
  info_periode_pelaksanaan_start: yup.string().required("Wajib diisi"),
  info_periode_pelaksanaan_end: yup.string().required("Wajib diisi"),
});

const documentNonPATSchema = yup.object().shape({
  no_surat: yup.string().required("Wajib diisi"),
  perihal: yup.string().required("Wajib diisi"),
  tanggal_surat: yup.string().required("Wajib diisi"),
  url_file_surat: yup.string().required("Wajib diisi"),
});

const scheduleNonPATSchema = yup.object().shape({
  project_name: yup.string().required("Wajib diisi"),
  ref_metode: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  ref_tipe: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  ref_jenis: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  info_periode_pelaksanaan_start: yup.string().required("Wajib diisi"),
  info_periode_pelaksanaan_end: yup.string().required("Wajib diisi"),
});

export {
  schedulePATSchema,
  summaryPATSchema,
  documentNonPATSchema,
  scheduleNonPATSchema,
};
